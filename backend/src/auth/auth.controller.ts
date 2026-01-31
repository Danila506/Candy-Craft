import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

function cookieBaseOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    secure: true, // prod: true (https)
    sameSite: 'none' as const, // для большинства случаев ок
    path: '/', // важно
  };
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.auth.register(createUserDto);
  }
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.auth.login(
      dto.email,
      dto.password,
    );

    res.cookie('access_token', accessToken, {
      ...cookieBaseOptions(),
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      ...cookieBaseOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { user };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rt = (req as any).cookies?.refresh_token as string | undefined;
    if (!rt) return { ok: false }; // или 401

    const { accessToken, refreshToken } = await this.auth.refresh(rt);

    res.cookie('access_token', accessToken, {
      ...cookieBaseOptions(),
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      ...cookieBaseOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { ok: true };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rt = (req as any).cookies?.refresh_token as string | undefined;
    if (rt) await this.auth.logout(rt);

    res.clearCookie('access_token', { ...cookieBaseOptions() });
    res.clearCookie('refresh_token', { ...cookieBaseOptions() });

    return { ok: true };
  }
}
