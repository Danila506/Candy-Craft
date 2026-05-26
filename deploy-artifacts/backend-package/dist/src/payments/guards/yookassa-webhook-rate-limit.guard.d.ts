import { CanActivate, ExecutionContext } from "@nestjs/common";
import { RedisRateLimitStore } from "./redis-rate-limit.store";
export declare class YooKassaWebhookRateLimitGuard implements CanActivate {
  private readonly rateLimitStore;
  private readonly logger;
  constructor(rateLimitStore: RedisRateLimitStore);
  canActivate(context: ExecutionContext): Promise<boolean>;
  private extractIp;
}
