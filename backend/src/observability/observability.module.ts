import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ObservabilityService } from './observability.service';
import { StructuredLoggingInterceptor } from './structured-logging.interceptor';
import { requestIdMiddleware } from './request-id.middleware';

@Global()
@Module({
  providers: [
    ObservabilityService,
    {
      provide: APP_INTERCEPTOR,
      useClass: StructuredLoggingInterceptor,
    },
  ],
  exports: [ObservabilityService],
})
export class ObservabilityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requestIdMiddleware).forRoutes('*');
  }
}
