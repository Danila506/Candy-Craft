import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class StructuredLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(StructuredLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logRequest(req, res.statusCode, Date.now() - startedAt);
      }),
      catchError((error) => {
        this.logRequest(
          req,
          error?.status ?? res.statusCode ?? 500,
          Date.now() - startedAt,
          error,
        );
        return throwError(() => error);
      }),
    );
  }

  private logRequest(
    req: Request,
    statusCode: number,
    durationMs: number,
    error?: unknown,
  ) {
    const payload = {
      event: 'http_request_completed',
      requestId: req.requestId ?? null,
      method: req.method,
      path: req.path,
      statusCode,
      durationMs,
      ip: req.ip ?? null,
      userAgent: req.headers['user-agent'] ?? null,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : undefined,
      at: new Date().toISOString(),
    };

    const line = JSON.stringify(payload);
    if (statusCode >= 500) {
      this.logger.error(line);
    } else if (statusCode >= 400) {
      this.logger.warn(line);
    } else {
      this.logger.log(line);
    }
  }
}
