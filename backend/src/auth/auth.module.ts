import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import type { Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { RateLimitGuard } from 'src/security/rate-limit.guard';
import { SimpleRateLimitStore } from 'src/security/simple-rate-limit.store';

const googleOAuthProviders =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL
    ? [GoogleStrategy]
    : [];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        (process.env.JWT_ACCESS_SECRET as Secret) ||
        (process.env.JWT_SECRET as Secret) ||
        'dev_secret',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    ...googleOAuthProviders,
    RateLimitGuard,
    SimpleRateLimitStore,
  ],
  exports: [AuthService],
})
export class AuthModule {}
