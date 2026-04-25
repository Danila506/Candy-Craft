import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SuggestService } from './suggest.service';
import { RateLimit } from 'src/security/rate-limit.decorator';
import { RateLimitGuard } from 'src/security/rate-limit.guard';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Post('address')
  @UseGuards(RateLimitGuard)
  @RateLimit({
    keyPrefix: 'suggest:address',
    maxEnv: 'SUGGEST_ADDRESS_RATE_LIMIT_MAX',
    windowMsEnv: 'SUGGEST_ADDRESS_RATE_LIMIT_WINDOW_MS',
    defaultMax: 60,
    defaultWindowMs: 60 * 1000,
  })
  async address(@Body() body: { query: string; count?: number }) {
    return this.suggestService.suggestAddress(body?.query, body?.count ?? 8);
  }
}
