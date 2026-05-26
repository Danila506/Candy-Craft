import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SimpleRateLimitStore } from "./simple-rate-limit.store";
import { ObservabilityService } from "../observability/observability.service";
export declare class RateLimitGuard implements CanActivate {
  private readonly reflector;
  private readonly store;
  private readonly observability;
  private readonly logger;
  constructor(
    reflector: Reflector,
    store: SimpleRateLimitStore,
    observability: ObservabilityService,
  );
  canActivate(context: ExecutionContext): boolean;
  private getIdentity;
}
