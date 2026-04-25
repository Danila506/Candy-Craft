import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { RATE_LIMIT_KEY, type RateLimitOptions } from './rate-limit.decorator';
import { SimpleRateLimitStore } from './simple-rate-limit.store';

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function normalizeIp(ip?: string) {
  if (!ip) return 'unknown';
  if (ip.startsWith('::ffff:')) return ip.slice('::ffff:'.length);
  if (ip === '::1') return '127.0.0.1';
  return ip;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RateLimitGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly store: SimpleRateLimitStore,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<RateLimitOptions>(
      RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const max = Number(process.env[options.maxEnv]) || options.defaultMax;
    const windowMs =
      Number(process.env[options.windowMsEnv]) || options.defaultWindowMs;
    const ip = normalizeIp(req.ip || req.socket?.remoteAddress);
    const identity = this.getIdentity(req);
    const key = `${options.keyPrefix}:${ip}:${identity}`;
    const bucket = this.store.increment(key, windowMs);

    if (bucket.count > max) {
      this.logger.warn(
        JSON.stringify({
          event: 'rate_limit_exceeded',
          keyPrefix: options.keyPrefix,
          ip,
          path: req.path,
          max,
          windowMs,
          at: new Date().toISOString(),
        }),
      );
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  private getIdentity(req: Request) {
    const email = (req.body as any)?.email;
    if (typeof email === 'string' && email.trim()) {
      return email.trim().toLowerCase();
    }

    const forwardedUserAgent = getHeaderValue(req.headers['user-agent']);
    return forwardedUserAgent?.slice(0, 80) || 'anonymous';
  }
}
