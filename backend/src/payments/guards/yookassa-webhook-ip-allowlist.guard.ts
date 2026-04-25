import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class YooKassaWebhookIpAllowlistGuard implements CanActivate {
  private readonly logger = new Logger(YooKassaWebhookIpAllowlistGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = this.extractIp(req);
    const allowlist = this.getAllowlist();

    if (!allowlist.length) {
      this.logger.warn(
        JSON.stringify({
          event: 'yookassa_webhook_allowlist_not_configured',
          message:
            'YOOKASSA_WEBHOOK_ALLOWED_IPS is empty, webhook IP allowlist is disabled',
          at: new Date().toISOString(),
        }),
      );
      return true;
    }

    if (!allowlist.includes(ip)) {
      this.logger.warn(
        JSON.stringify({
          event: 'yookassa_webhook_ip_rejected',
          ip,
          allowlist,
          at: new Date().toISOString(),
        }),
      );
      throw new ForbiddenException('Webhook source IP is not allowed');
    }

    return true;
  }

  private getAllowlist(): string[] {
    return (process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS || '')
      .split(',')
      .map((ip) => ip.trim())
      .filter(Boolean);
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
