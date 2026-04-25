import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CsrfOriginGuard } from './csrf-origin.guard';
import { RateLimitGuard } from './rate-limit.guard';
import { SimpleRateLimitStore } from './simple-rate-limit.store';

@Module({
  providers: [
    Reflector,
    SimpleRateLimitStore,
    RateLimitGuard,
    {
      provide: APP_GUARD,
      useClass: CsrfOriginGuard,
    },
  ],
  exports: [RateLimitGuard, SimpleRateLimitStore],
})
export class SecurityModule {}
