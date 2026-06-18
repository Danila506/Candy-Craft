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
import { createHash, randomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { ResendVerificationDto, VerifyEmailDto } from './dto/verify-email.dto';
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

function getRequiredOAuthEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new UnauthorizedException(
      `OAuth provider is not configured: ${name}`,
    );
  }
  return value;
}

function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
) {
  res.cookie('access_token', tokens.accessToken, {
    ...cookieBaseOptions(),
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refresh_token', tokens.refreshToken, {
    ...cookieBaseOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

function base64Url(buffer: Buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function createVkPkcePair() {
  const codeVerifier = base64Url(randomBytes(64));
  const codeChallenge = base64Url(
    createHash('sha256').update(codeVerifier).digest(),
  );

  return { codeVerifier, codeChallenge };
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

  @Post('verify-email')
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'auth:verify-email',
    maxEnv: 'AUTH_VERIFY_EMAIL_RATE_LIMIT_MAX',
    windowMsEnv: 'AUTH_VERIFY_EMAIL_RATE_LIMIT_WINDOW_MS',
    defaultMax: 20,
    defaultWindowMs: 15 * 60 * 1000,
  })
  @HttpCode(HttpStatus.OK)
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.auth.verifyEmail(dto);
  }

  @Post('resend-verification')
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'auth:resend-verification',
    maxEnv: 'AUTH_RESEND_VERIFICATION_RATE_LIMIT_MAX',
    windowMsEnv: 'AUTH_RESEND_VERIFICATION_RATE_LIMIT_WINDOW_MS',
    defaultMax: 5,
    defaultWindowMs: 15 * 60 * 1000,
  })
  @HttpCode(HttpStatus.OK)
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.auth.resendEmailVerification(dto.email);
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

    setAuthCookies(res, { accessToken, refreshToken });

    return res.redirect(`${getFrontendBaseUrl()}/account`);
  }

  @Get('yandex')
  async yandexAuth(@Res() res: Response) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: getRequiredOAuthEnv('YANDEX_CLIENT_ID'),
      redirect_uri: getRequiredOAuthEnv('YANDEX_CALLBACK_URL'),
      scope: 'login:email login:info',
    });

    return res.redirect(`https://oauth.yandex.ru/authorize?${params}`);
  }

  @Get('yandex/callback')
  async yandexCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const code = (req as any).query?.code as string | undefined;
    if (!code) throw new UnauthorizedException('Yandex OAuth code is missing');

    const { accessToken, refreshToken } = await this.auth.yandexLogin(code);
    setAuthCookies(res, { accessToken, refreshToken });

    return res.redirect(`${getFrontendBaseUrl()}/account`);
  }

  @Get('vk')
  async vkAuth(@Res() res: Response) {
    const state = randomBytes(24).toString('hex');
    const { codeVerifier, codeChallenge } = createVkPkcePair();

    res.cookie('vk_oauth_state', state, {
      ...cookieBaseOptions(),
      maxAge: 10 * 60 * 1000,
    });
    res.cookie('vk_code_verifier', codeVerifier, {
      ...cookieBaseOptions(),
      maxAge: 10 * 60 * 1000,
    });

    const params = new URLSearchParams({
      client_id: getRequiredOAuthEnv('VK_CLIENT_ID'),
      redirect_uri: getRequiredOAuthEnv('VK_CALLBACK_URL'),
      response_type: 'code',
      scope: 'vkid.personal_info email',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    const vkIdBaseUrl = process.env.VK_ID_BASE_URL || 'https://id.vk.com';
    return res.redirect(`${vkIdBaseUrl}/authorize?${params}`);
  }

  @Get('vk/callback')
  async vkCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const code = (req as any).query?.code as string | undefined;
    const deviceId = (req as any).query?.device_id as string | undefined;
    const state = (req as any).query?.state as string | undefined;
    const storedState = (req as any).cookies?.vk_oauth_state as
      | string
      | undefined;
    const codeVerifier = (req as any).cookies?.vk_code_verifier as
      | string
      | undefined;

    if (!code) throw new UnauthorizedException('VK OAuth code is missing');
    if (!deviceId) {
      throw new UnauthorizedException('VK OAuth device_id is missing');
    }
    if (!state || !storedState || state !== storedState) {
      throw new UnauthorizedException('VK OAuth state is invalid');
    }
    if (!codeVerifier) {
      throw new UnauthorizedException('VK OAuth code verifier is missing');
    }

    const { accessToken, refreshToken } = await this.auth.vkLogin({
      code,
      deviceId,
      codeVerifier,
      state,
    });
    setAuthCookies(res, { accessToken, refreshToken });
    res.clearCookie('vk_oauth_state', { ...cookieBaseOptions() });
    res.clearCookie('vk_code_verifier', { ...cookieBaseOptions() });

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
