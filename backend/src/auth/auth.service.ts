import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { normalizeRuPhone } from 'src/utils/phone';
import type { StringValue } from 'ms';
import { randomBytes } from 'crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

type SocialProvider = 'google' | 'yandex' | 'vk';

type SocialLoginProfile = {
  provider: SocialProvider;
  providerId: string;
  email: string | null;
  firstName: string;
  lastName: string;
};

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

function cleanText(value?: string) {
  const v = value?.trim();
  return v ? v : null;
}

function buildAddressLine(dto: {
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
}) {
  const parts = [
    cleanText(dto.city),
    cleanText(dto.street),
    cleanText(dto.house) ? `д. ${cleanText(dto.house)}` : null,
    cleanText(dto.apartment) ? `кв. ${cleanText(dto.apartment)}` : null,
    cleanText(dto.entrance) ? `подъезд ${cleanText(dto.entrance)}` : null,
    cleanText(dto.floor) ? `этаж ${cleanText(dto.floor)}` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new BadRequestException(`Не настроена переменная окружения ${name}`);
  }
  return value;
}

async function readOAuthJson<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const data = (await response.json().catch(() => null)) as
    | (T & { error?: string; error_description?: string })
    | null;

  if (!response.ok || data?.error) {
    throw new BadRequestException(
      data?.error_description ||
        data?.error ||
        'Не удалось получить данные OAuth-провайдера',
    );
  }

  return data as T;
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
  private readonly socialUserSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    role: true,
    googleId: true,
    yandexId: true,
    vkId: true,
  } as const;

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
          role: true,
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
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Неверный email или пароль');

    const { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt } =
      await this.issueTokens(user.id, user.email, user.role);

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
      role: user.role,
    };

    return { accessToken, refreshToken, user: safeUser };
  }

  async googleLogin(profile: {
    email: string | null;
    firstName: string;
    lastName: string;
    googleId: string;
  }) {
    return this.socialLogin({
      provider: 'google',
      providerId: profile.googleId,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }

  async yandexLogin(code: string) {
    const callbackUrl = requiredEnv('YANDEX_CALLBACK_URL');
    const tokenBody = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: requiredEnv('YANDEX_CLIENT_ID'),
      client_secret: requiredEnv('YANDEX_CLIENT_SECRET'),
      redirect_uri: callbackUrl,
    });

    const token = await readOAuthJson<{ access_token: string }>(
      'https://oauth.yandex.ru/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenBody,
      },
    );

    const profileUrl = new URL('https://login.yandex.ru/info');
    profileUrl.searchParams.set('format', 'json');
    profileUrl.searchParams.set('oauth_token', token.access_token);

    const profile = await readOAuthJson<{
      id: string;
      default_email?: string;
      first_name?: string;
      last_name?: string;
      real_name?: string;
      login?: string;
    }>(profileUrl.toString());

    const [fallbackFirstName, ...fallbackLastName] = (
      profile.real_name ||
      profile.login ||
      'Yandex User'
    ).split(' ');

    return this.socialLogin({
      provider: 'yandex',
      providerId: profile.id,
      email: profile.default_email ?? null,
      firstName: profile.first_name || fallbackFirstName || 'Yandex',
      lastName: profile.last_name || fallbackLastName.join(' ') || 'User',
    });
  }

  async vkLogin(params: {
    code: string;
    deviceId: string;
    codeVerifier: string;
    state: string;
  }) {
    const vkIdBaseUrl = process.env.VK_ID_BASE_URL || 'https://id.vk.com';
    const tokenBody = new URLSearchParams({
      grant_type: 'authorization_code',
      code: params.code,
      code_verifier: params.codeVerifier,
      client_id: requiredEnv('VK_CLIENT_ID'),
      device_id: params.deviceId,
      redirect_uri: requiredEnv('VK_CALLBACK_URL'),
      state: params.state,
    });

    const token = await readOAuthJson<{
      access_token: string;
      user_id?: string;
      id_token?: string;
      email?: string;
    }>(`${vkIdBaseUrl}/oauth2/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenBody,
    });

    const profileBody = new URLSearchParams({
      client_id: requiredEnv('VK_CLIENT_ID'),
      access_token: token.access_token,
    });

    const profileResponse = await readOAuthJson<{
      user?: {
        user_id?: string;
        id?: string | number;
        first_name?: string;
        last_name?: string;
        email?: string;
      };
    }>(`${vkIdBaseUrl}/oauth2/user_info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: profileBody,
    });
    const profile = profileResponse.user;

    if (!profile || (!profile.user_id && !profile.id && !token.user_id)) {
      throw new BadRequestException('Не удалось получить профиль VK');
    }

    return this.socialLogin({
      provider: 'vk',
      providerId: String(profile.user_id ?? profile.id ?? token.user_id),
      email: profile.email ?? token.email ?? null,
      firstName: profile.first_name || 'VK',
      lastName: profile.last_name || 'User',
    });
  }

  private async socialLogin(profile: SocialLoginProfile) {
    const providerIdField = {
      google: 'googleId',
      yandex: 'yandexId',
      vk: 'vkId',
    } satisfies Record<SocialProvider, 'googleId' | 'yandexId' | 'vkId'>;
    const providerIdKey = providerIdField[profile.provider];

    let user = await this.prisma.user.findUnique({
      where: { [providerIdKey]: profile.providerId } as any,
      select: this.socialUserSelect,
    });

    if (user) {
      return this.issueAuthSession(user);
    }

    if (!profile.email && profile.provider !== 'vk') {
      throw new BadRequestException(
        `Не удалось получить email от ${profile.provider.toUpperCase()}`,
      );
    }

    if (!user) {
      const email = profile.email?.trim().toLowerCase() ?? null;
      const byEmail = email
        ? await this.prisma.user.findUnique({
            where: { email },
            select: this.socialUserSelect,
          })
        : null;

      if (byEmail) {
        if (byEmail[providerIdKey] !== profile.providerId) {
          await this.prisma.user.update({
            where: { id: byEmail.id },
            data: { [providerIdKey]: profile.providerId } as any,
          });
        }
        user = { ...byEmail, [providerIdKey]: profile.providerId };
      } else {
        const passwordHash = await argon2.hash(randomBytes(32).toString('hex'));
        user = await this.prisma.user.create({
          data: {
            firstName: profile.firstName || profile.provider,
            lastName: profile.lastName || 'User',
            email,
            phone: null,
            passwordHash,
            [providerIdKey]: profile.providerId,
          } as any,
          select: this.socialUserSelect,
        });
      }
    }

    return this.issueAuthSession(user);
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

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, role: true },
    });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const issued = await this.issueTokens(userId, user.email, user.role);

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

  private async issueTokens(userId: number, email: string | null, role: Role) {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { secret: this.accessSecret, expiresIn: this.accessExp as StringValue },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      { secret: this.refreshSecret, expiresIn: this.refreshExp as StringValue },
    );

    // hash refresh token (не access)
    const refreshTokenHash = await argon2.hash(refreshToken);
    const refreshExpiresAt = new Date(
      Date.now() + msFromExpires(this.refreshExp),
    );

    return { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt };
  }

  private async issueAuthSession(user: {
    id: number;
    email: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: Role;
  }) {
    const { accessToken, refreshToken, refreshTokenHash, refreshExpiresAt } =
      await this.issueTokens(user.id, user.email, user.role);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    };
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
  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  async updateMe(userId: number, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const firstName = dto.firstName?.trim();
    const lastName = dto.lastName?.trim();
    const emailRaw = dto.email?.trim();
    const email = emailRaw ? emailRaw.toLowerCase() : undefined;
    const phoneRaw = dto.phone?.trim();
    const phone = phoneRaw ? normalizeRuPhone(phoneRaw) : null;

    if (dto.phone !== undefined && phoneRaw && !phone) {
      throw new BadRequestException('Некорректный номер телефона');
    }

    if (email && email !== user.email) {
      const exists = await this.prisma.user.findUnique({ where: { email } });
      if (exists) {
        throw new ConflictException('Email уже используется');
      }
    }

    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(firstName !== undefined ? { firstName } : {}),
          ...(lastName !== undefined ? { lastName } : {}),
          ...(email !== undefined ? { email } : {}),
          ...(dto.phone !== undefined ? { phone } : {}),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Email или телефон уже используются');
      }
      throw e;
    }
  }

  async listMyAddresses(userId: number) {
    await this.ensureUserExists(userId);
    return (this.prisma as any).userAddress.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createMyAddress(userId: number, dto: CreateUserAddressDto) {
    await this.ensureUserExists(userId);
    const recipientPhoneRaw = cleanText(dto.recipientPhone ?? undefined);
    const recipientPhone = recipientPhoneRaw
      ? normalizeRuPhone(recipientPhoneRaw)
      : null;
    if (recipientPhoneRaw && !recipientPhone) {
      throw new BadRequestException('Некорректный телефон получателя');
    }

    const fullAddress =
      cleanText(dto.fullAddress ?? undefined) ?? buildAddressLine(dto);
    if (!fullAddress) {
      throw new BadRequestException('Адрес обязателен');
    }

    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await (tx as any).userAddress.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return (tx as any).userAddress.create({
        data: {
          userId,
          label: cleanText(dto.label ?? undefined),
          country: cleanText(dto.country ?? undefined) ?? 'Россия',
          city: cleanText(dto.city ?? undefined),
          street: cleanText(dto.street ?? undefined),
          house: cleanText(dto.house ?? undefined),
          apartment: cleanText(dto.apartment ?? undefined),
          entrance: cleanText(dto.entrance ?? undefined),
          floor: cleanText(dto.floor ?? undefined),
          intercom: cleanText(dto.intercom ?? undefined),
          postalCode: cleanText(dto.postalCode ?? undefined),
          comment: cleanText(dto.comment ?? undefined),
          recipientName: cleanText(dto.recipientName ?? undefined),
          recipientPhone,
          fullAddress,
          isDefault: Boolean(dto.isDefault),
        },
      });
    });
  }

  async updateMyAddress(
    userId: number,
    addressId: number,
    dto: UpdateUserAddressDto,
  ) {
    const existing = await (this.prisma as any).userAddress.findFirst({
      where: { id: addressId, userId },
    });
    if (!existing) {
      throw new BadRequestException('Адрес не найден');
    }

    const recipientPhoneRaw = cleanText(dto.recipientPhone ?? undefined);
    const recipientPhone =
      recipientPhoneRaw !== null
        ? normalizeRuPhone(recipientPhoneRaw)
        : undefined;
    if (recipientPhoneRaw && !recipientPhone) {
      throw new BadRequestException('Некорректный телефон получателя');
    }

    const fullAddressCandidate =
      cleanText(dto.fullAddress ?? undefined) ?? buildAddressLine(dto);
    const fullAddress =
      fullAddressCandidate ??
      (dto.fullAddress !== undefined ? null : undefined);
    if (dto.fullAddress !== undefined && !fullAddress) {
      throw new BadRequestException('Адрес обязателен');
    }

    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault) {
        await (tx as any).userAddress.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return (tx as any).userAddress.update({
        where: { id: addressId },
        data: {
          ...(dto.label !== undefined
            ? { label: cleanText(dto.label ?? undefined) }
            : {}),
          ...(dto.country !== undefined
            ? { country: cleanText(dto.country ?? undefined) ?? 'Россия' }
            : {}),
          ...(dto.city !== undefined
            ? { city: cleanText(dto.city ?? undefined) }
            : {}),
          ...(dto.street !== undefined
            ? { street: cleanText(dto.street ?? undefined) }
            : {}),
          ...(dto.house !== undefined
            ? { house: cleanText(dto.house ?? undefined) }
            : {}),
          ...(dto.apartment !== undefined
            ? { apartment: cleanText(dto.apartment ?? undefined) }
            : {}),
          ...(dto.entrance !== undefined
            ? { entrance: cleanText(dto.entrance ?? undefined) }
            : {}),
          ...(dto.floor !== undefined
            ? { floor: cleanText(dto.floor ?? undefined) }
            : {}),
          ...(dto.intercom !== undefined
            ? { intercom: cleanText(dto.intercom ?? undefined) }
            : {}),
          ...(dto.postalCode !== undefined
            ? { postalCode: cleanText(dto.postalCode ?? undefined) }
            : {}),
          ...(dto.comment !== undefined
            ? { comment: cleanText(dto.comment ?? undefined) }
            : {}),
          ...(dto.recipientName !== undefined
            ? { recipientName: cleanText(dto.recipientName ?? undefined) }
            : {}),
          ...(dto.recipientPhone !== undefined ? { recipientPhone } : {}),
          ...(fullAddress !== undefined ? { fullAddress } : {}),
          ...(dto.isDefault !== undefined ? { isDefault: dto.isDefault } : {}),
        },
      });
    });
  }

  async deleteMyAddress(userId: number, addressId: number) {
    const existing = await (this.prisma as any).userAddress.findFirst({
      where: { id: addressId, userId },
      select: { id: true },
    });
    if (!existing) throw new BadRequestException('Адрес не найден');
    await (this.prisma as any).userAddress.delete({ where: { id: addressId } });
    return { ok: true };
  }

  private async ensureUserExists(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
