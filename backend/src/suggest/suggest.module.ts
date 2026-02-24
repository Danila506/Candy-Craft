import { Module } from '@nestjs/common';
import { SuggestController } from './suggest.controller';
import { SuggestService } from './suggest.service';

@Module({
  controllers: [SuggestController],
  providers: [SuggestService],
  exports: [SuggestService],
})
export class SuggestModule {}
