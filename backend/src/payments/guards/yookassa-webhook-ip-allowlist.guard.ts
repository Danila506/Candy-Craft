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
      if (process.env.NODE_ENV === 'production') {
        this.logger.error(
          JSON.stringify({
            event: 'yookassa_webhook_allowlist_not_configured',
            message: 'YOOKASSA_WEBHOOK_ALLOWED_IPS is required in production',
            at: new Date().toISOString(),
          }),
        );
        throw new ForbiddenException('Webhook IP allowlist is not configured');
      }

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
    const directIp = this.normalizeIp(
      req.ip || req.socket?.remoteAddress || 'unknown',
    );
    const forwarded = req.headers['x-forwarded-for'];

    if (this.isTrustedForwarder(directIp)) {
      if (typeof forwarded === 'string' && forwarded.trim()) {
        return this.normalizeIp(forwarded.split(',')[0].trim());
      }
      if (Array.isArray(forwarded) && forwarded.length > 0) {
        return this.normalizeIp(forwarded[0]);
      }
    }

    if (forwarded) {
      this.logger.warn(
        JSON.stringify({
          event: 'yookassa_webhook_forwarded_for_ignored',
          directIp,
          at: new Date().toISOString(),
        }),
      );
    }

    return directIp;
  }

  private isTrustedForwarder(ip: string): boolean {
    if (this.isLoopback(ip)) return true;
    return this.getTrustedProxyIps().includes(ip);
  }

  private getTrustedProxyIps(): string[] {
    return (process.env.YOOKASSA_WEBHOOK_TRUSTED_PROXY_IPS || '')
      .split(',')
      .map((ip) => this.normalizeIp(ip.trim()))
      .filter(Boolean);
  }

  private normalizeIp(ip: string): string {
    if (!ip) return 'unknown';
    if (ip.startsWith('::ffff:')) return ip.slice('::ffff:'.length);
    if (ip === '::1') return '127.0.0.1';
    return ip;
  }

  private isLoopback(ip: string): boolean {
    return ip === '127.0.0.1' || ip === 'localhost';
  }
}
