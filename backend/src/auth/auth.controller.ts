import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

function cookieBaseOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    secure: true, // prod: true (https)
    sameSite: 'none' as const, // для большинства случаев ок
    path: '/', // важно
  };
}

function getFrontendBaseUrl() {
  return (process.env.FRONTEND_URL || 'http://localhost:5173').replace(
    /\/+$/,
    '',
  );
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    const userId = (req as any).user?.userId as number | undefined;
    return this.auth.me(userId ?? 0);
  }

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return null;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.googleLogin(
      (req as any).user,
    );

    res.cookie('access_token', accessToken, {
      ...cookieBaseOptions(),
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      ...cookieBaseOptions(),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${getFrontendBaseUrl()}/account`);
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
