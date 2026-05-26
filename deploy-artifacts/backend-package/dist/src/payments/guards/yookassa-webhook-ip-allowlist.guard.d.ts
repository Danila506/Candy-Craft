import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class YooKassaWebhookIpAllowlistGuard implements CanActivate {
  private readonly logger;
  canActivate(context: ExecutionContext): boolean;
  private getAllowlist;
  private extractIp;
  private isTrustedForwarder;
  private getTrustedProxyIps;
  private normalizeIp;
  private isLoopback;
}
