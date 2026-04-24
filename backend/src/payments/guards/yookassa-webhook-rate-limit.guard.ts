import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';

type Bucket = {
  count: number;
  windowStart: number;
};

@Injectable()
export class YooKassaWebhookRateLimitGuard implements CanActivate {
  private static readonly buckets = new Map<string, Bucket>();
  private readonly logger = new Logger(YooKassaWebhookRateLimitGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = this.extractIp(req);
    const now = Date.now();

    const maxRequests =
      Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX) || 60;
    const windowMs =
      Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS) || 60_000;

    const current = YooKassaWebhookRateLimitGuard.buckets.get(ip);
    if (!current || now - current.windowStart >= windowMs) {
      YooKassaWebhookRateLimitGuard.buckets.set(ip, {
        count: 1,
        windowStart: now,
      });
      return true;
    }

    if (current.count >= maxRequests) {
      this.logger.warn(
        JSON.stringify({
          event: 'yookassa_webhook_rate_limited',
          ip,
          count: current.count,
          maxRequests,
          windowMs,
          at: new Date(now).toISOString(),
        }),
      );
      throw new HttpException(
        'Too many webhook requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    current.count += 1;
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
