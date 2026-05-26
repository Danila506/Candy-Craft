import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class StructuredLoggingInterceptor implements NestInterceptor {
  private readonly logger;
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): import("rxjs").Observable<any>;
  private logRequest;
}
