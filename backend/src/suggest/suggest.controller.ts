import { Body, Controller, Post } from '@nestjs/common';
import { SuggestService } from './suggest.service';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Post('address')
  async address(@Body() body: { query: string; count?: number }) {
    return this.suggestService.suggestAddress(body?.query, body?.count ?? 8);
  }
}
