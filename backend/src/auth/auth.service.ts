import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { normalizeRuPhone } from 'src/utils/phone';
import type { StringValue } from 'ms';

function msFromExpires(expires: string) {
  // простая поддержка 15m/30d/1h
  const m = expires.match(/^(\d+)([smhd])$/);
  if (!m) throw new Error('Bad expires format');
  const n = Number(m[1]);
  const unit = m[2];
  const mult =
    unit === 's'
      ? 1000
      : unit === 'm'
        ? 60_000
        : unit === 'h'
          ? 3_600_000
          : 86_400_000; // d
  return n * mult;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private accessSecret = process.env.JWT_ACCESS_SECRET!;
  private refreshSecret = process.env.JWT_REFRESH_SECRET!;
  private accessExp: string = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
  private refreshExp: string = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

  async register(dto: CreateUserDto) {
    // 1) проверка паролей (фронт можно обойти — бэк обязан проверить)
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Пароли не совпадают');
    }

    // 2) нормализуем email
    const email = dto.email.trim().toLowerCase();

    // 3) нормализуем телефон
    const phone = normalizeRuPhone(dto.phone);
    // если телефон был введён, но не нормализовался — ошибка
    if (dto.phone?.trim() && !phone) {
      throw new BadRequestException('Некорректный номер телефона');
    }

    // 4) hash пароля
    const passwordHash = await argon2.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName.trim(),
          lastName: dto.lastName.trim(),
          email,
          phone: phone ?? null,
          passwordHash,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      });

      return user;
    } catch (e) {
      // уникальность email/phone
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        const target = (e.meta?.target as string[] | undefined) ?? [];
        if (target.includes('email'))
          throw new ConflictException('Email уже используется');
        if (target.includes('phone'))
          throw new ConflictException('Телефон уже используется');
        throw new ConflictException('Пользователь уже существует');
      }
      throw e;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        passwordHash: true,
      },
    });

    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Неверный email или пароль');

    const { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt } =
      await this.issueTokens(user.id, user.email);

    // сохраняем refresh hash в БД
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };

    return { accessToken, refreshToken, user: safeUser };
  }

  async refresh(refreshToken: string) {
    // 1) проверяем подпись refresh JWT
    let payload: any;
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.refreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = payload.sub as number;
    const email = payload.email as string;

    // 2) хэш и поиск в БД активного refresh
    const refreshTokenHash = await argon2.hash(refreshToken);

    // ⚠️ argon2.hash каждый раз разный из-за соли
    // значит искать по tokenHash напрямую нельзя.
    // Поэтому делаем иначе: храним hash и сверяем verify по каждой записи пользователя.
    // Это нормально, если у пользователя немного сессий. Можно ограничить.

    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      select: { id: true, tokenHash: true },
    });

    const match = await this.findMatchingToken(tokens, refreshToken);
    if (!match) throw new UnauthorizedException('Invalid refresh token');

    // 3) ротация: старый revoke, выдать новый
    await this.prisma.refreshToken.update({
      where: { id: match.id },
      data: { revokedAt: new Date() },
    });

    const issued = await this.issueTokens(userId, email);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: issued.refreshTokenHash,
        expiresAt: issued.refreshExpiresAt,
      },
    });

    return {
      accessToken: issued.accessToken,
      refreshToken: issued.refreshToken,
    };
  }

  private async findMatchingToken(
    tokens: { id: number; tokenHash: string }[],
    refreshToken: string,
  ) {
    for (const t of tokens) {
      const ok = await argon2
        .verify(t.tokenHash, refreshToken)
        .catch(() => false);
      if (ok) return { id: t.id };
    }
    return null;
  }

  private async issueTokens(userId: number, email: string) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      { secret: this.accessSecret, expiresIn: this.accessExp as StringValue },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email },
      { secret: this.refreshSecret, expiresIn: this.refreshExp as StringValue },
    );

    // hash refresh token (не access)
    const refreshTokenHash = await argon2.hash(refreshToken);
    const refreshExpiresAt = new Date(
      Date.now() + msFromExpires(this.refreshExp),
    );

    return { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt };
  }

  async logout(refreshToken: string) {
    // если есть refresh — ревокнем текущую сессию
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.refreshSecret,
      });

      const userId = payload.sub as number;

      const tokens = await this.prisma.refreshToken.findMany({
        where: { userId, revokedAt: null },
        select: { id: true, tokenHash: true },
      });

      const match = await this.findMatchingToken(tokens, refreshToken);
      if (match) {
        await this.prisma.refreshToken.update({
          where: { id: match.id },
          data: { revokedAt: new Date() },
        });
      }
    } catch {
      // игнор
    }
  }
}
