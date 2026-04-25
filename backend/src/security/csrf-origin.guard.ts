import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import { ObservabilityService } from 'src/observability/observability.service';

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://candy-craft.vercel.app',
  'https://candy-craft.onrender.com',
];

function parseOrigins(value?: string) {
  return (value || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

function getAllowedOrigins() {
  return new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...parseOrigins(process.env.FRONTEND_URL),
    ...parseOrigins(process.env.CSRF_ALLOWED_ORIGINS),
  ]);
}

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function getOriginFromReferer(referer?: string) {
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

@Injectable()
export class CsrfOriginGuard implements CanActivate {
  private readonly logger = new Logger(CsrfOriginGuard.name);

  constructor(private readonly observability: ObservabilityService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (this.isSafeMethod(req.method)) return true;
    if (!this.requiresCsrfCheck(req)) return true;

    const origin =
      getHeaderValue(req.headers.origin) ??
      getOriginFromReferer(getHeaderValue(req.headers.referer));

    if (origin && getAllowedOrigins().has(origin.replace(/\/+$/, ''))) {
      return true;
    }

    this.observability.incrementCounter('csrf_origin_rejected_total', {
      method: req.method,
      path: req.path,
    });
    this.logger.warn(
      JSON.stringify({
        event: 'csrf_origin_rejected',
        requestId: req.requestId ?? null,
        method: req.method,
        path: req.path,
        origin: origin ?? null,
        at: new Date().toISOString(),
      }),
    );
    throw new ForbiddenException('CSRF origin is not allowed');
  }

  private isSafeMethod(method: string) {
    return method === 'GET' || method === 'HEAD' || method === 'OPTIONS';
  }

  private requiresCsrfCheck(req: Request) {
    const path = req.path || req.url || '';
    if (path.startsWith('/payments/webhooks/')) return false;
    if (path.startsWith('/auth/')) return true;

    const cookieHeader = getHeaderValue(req.headers.cookie) ?? '';
    return /(?:^|;\s*)(access_token|refresh_token)=/.test(cookieHeader);
  }
}
