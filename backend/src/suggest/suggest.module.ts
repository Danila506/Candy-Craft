import { Module } from '@nestjs/common';
import { SuggestController } from './suggest.controller';
import { SuggestService } from './suggest.service';
import { RateLimitGuard } from 'src/security/rate-limit.guard';
import { SimpleRateLimitStore } from 'src/security/simple-rate-limit.store';

@Module({
  controllers: [SuggestController],
  providers: [SuggestService, RateLimitGuard, SimpleRateLimitStore],
  exports: [SuggestService],
})
export class SuggestModule {}
