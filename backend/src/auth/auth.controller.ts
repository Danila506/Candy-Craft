import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { RateLimit } from 'src/security/rate-limit.decorator';
import { RateLimitGuard } from 'src/security/rate-limit.guard';

function cookieBaseOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    secure: isProd, // ✅ только в проде
    sameSite: isProd ? ('none' as const) : ('lax' as const), // ✅
    path: '/',
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
    if (!userId) throw new UnauthorizedException();
    return this.auth.me(userId);
  }

  @Post('register')
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'auth:register',
    maxEnv: 'AUTH_REGISTER_RATE_LIMIT_MAX',
    windowMsEnv: 'AUTH_REGISTER_RATE_LIMIT_WINDOW_MS',
    defaultMax: 10,
    defaultWindowMs: 15 * 60 * 1000,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.auth.register(createUserDto);
  }
  @Post('login')
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'auth:login',
    maxEnv: 'AUTH_LOGIN_RATE_LIMIT_MAX',
    windowMsEnv: 'AUTH_LOGIN_RATE_LIMIT_WINDOW_MS',
    defaultMax: 10,
    defaultWindowMs: 15 * 60 * 1000,
  })
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
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'auth:refresh',
    maxEnv: 'AUTH_REFRESH_RATE_LIMIT_MAX',
    windowMsEnv: 'AUTH_REFRESH_RATE_LIMIT_WINDOW_MS',
    defaultMax: 30,
    defaultWindowMs: 15 * 60 * 1000,
  })
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
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const userId = (req as any).user?.userId as number | undefined;
    return this.auth.updateMe(userId ?? 0, dto);
  }

  @Get('me/addresses')
  @UseGuards(JwtAuthGuard)
  async getMyAddresses(@Req() req: Request) {
    const userId = (req as any).user?.userId as number | undefined;
    if (!userId) throw new UnauthorizedException();
    return this.auth.listMyAddresses(userId);
  }

  @Post('me/addresses')
  @UseGuards(JwtAuthGuard)
  async createMyAddress(
    @Req() req: Request,
    @Body() dto: CreateUserAddressDto,
  ) {
    const userId = (req as any).user?.userId as number | undefined;
    if (!userId) throw new UnauthorizedException();
    return this.auth.createMyAddress(userId, dto);
  }

  @Patch('me/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  async updateMyAddress(
    @Req() req: Request,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() dto: UpdateUserAddressDto,
  ) {
    const userId = (req as any).user?.userId as number | undefined;
    if (!userId) throw new UnauthorizedException();
    return this.auth.updateMyAddress(userId, addressId, dto);
  }

  @Delete('me/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  async deleteMyAddress(
    @Req() req: Request,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    const userId = (req as any).user?.userId as number | undefined;
    if (!userId) throw new UnauthorizedException();
    return this.auth.deleteMyAddress(userId, addressId);
  }
}
