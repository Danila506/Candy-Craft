import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import { RedisRateLimitStore } from './redis-rate-limit.store';

@Injectable()
export class YooKassaWebhookRateLimitGuard implements CanActivate {
  private readonly logger = new Logger(YooKassaWebhookRateLimitGuard.name);
  constructor(private readonly rateLimitStore: RedisRateLimitStore) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = this.extractIp(req);
    const now = Date.now();

    const maxRequests =
      Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX) || 60;
    const windowMs =
      Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS) || 60_000;

    const rateKey = `yookassa:webhook:rl:${ip}`;
    const { count, storage } = await this.rateLimitStore.incrementWithWindow(
      rateKey,
      windowMs,
    );

    if (count > maxRequests) {
      this.logger.warn(
        JSON.stringify({
          event: 'yookassa_webhook_rate_limited',
          ip,
          count,
          maxRequests,
          windowMs,
          storage,
          at: new Date(now).toISOString(),
        }),
      );
      throw new HttpException(
        'Too many webhook requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  private extractIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.trim()) {
      return forwarded.split(',')[0].trim();
    }
    if (Array.isArray(forwarded) && forwarded.length > 0) {
      return forwarded[0];
    }
    return req.ip || req.socket?.remoteAddress || 'unknown';
  }
}
