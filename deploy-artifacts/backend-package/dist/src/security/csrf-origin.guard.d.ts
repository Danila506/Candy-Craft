import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ObservabilityService } from "../observability/observability.service";
export declare class CsrfOriginGuard implements CanActivate {
  private readonly observability;
  private readonly logger;
  constructor(observability: ObservabilityService);
  canActivate(context: ExecutionContext): boolean;
  private isSafeMethod;
  private requiresCsrfCheck;
}
