import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { YooKassaWebhookRateLimitGuard } from './guards/yookassa-webhook-rate-limit.guard';
import { RedisRateLimitStore } from './guards/redis-rate-limit.store';
import { YooKassaWebhookIpAllowlistGuard } from './guards/yookassa-webhook-ip-allowlist.guard';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    YooKassaWebhookRateLimitGuard,
    YooKassaWebhookIpAllowlistGuard,
    RedisRateLimitStore,
  ],
})
export class PaymentsModule {}
