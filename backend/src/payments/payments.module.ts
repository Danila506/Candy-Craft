import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { YooKassaWebhookRateLimitGuard } from './guards/yookassa-webhook-rate-limit.guard';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, YooKassaWebhookRateLimitGuard],
})
export class PaymentsModule {}
