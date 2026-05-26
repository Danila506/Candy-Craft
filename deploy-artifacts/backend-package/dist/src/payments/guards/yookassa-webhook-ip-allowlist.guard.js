"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var YooKassaWebhookIpAllowlistGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YooKassaWebhookIpAllowlistGuard = void 0;
const common_1 = require("@nestjs/common");
let YooKassaWebhookIpAllowlistGuard =
  (YooKassaWebhookIpAllowlistGuard_1 = class YooKassaWebhookIpAllowlistGuard {
    logger = new common_1.Logger(YooKassaWebhookIpAllowlistGuard_1.name);
    canActivate(context) {
      const req = context.switchToHttp().getRequest();
      const ip = this.extractIp(req);
      const allowlist = this.getAllowlist();
      if (!allowlist.length) {
        if (process.env.NODE_ENV === "production") {
          this.logger.error(
            JSON.stringify({
              event: "yookassa_webhook_allowlist_not_configured",
              message: "YOOKASSA_WEBHOOK_ALLOWED_IPS is required in production",
              at: new Date().toISOString(),
            }),
          );
          throw new common_1.ForbiddenException(
            "Webhook IP allowlist is not configured",
          );
        }
        this.logger.warn(
          JSON.stringify({
            event: "yookassa_webhook_allowlist_not_configured",
            message:
              "YOOKASSA_WEBHOOK_ALLOWED_IPS is empty, webhook IP allowlist is disabled",
            at: new Date().toISOString(),
          }),
        );
        return true;
      }
      if (!allowlist.includes(ip)) {
        this.logger.warn(
          JSON.stringify({
            event: "yookassa_webhook_ip_rejected",
            ip,
            allowlist,
            at: new Date().toISOString(),
          }),
        );
        throw new common_1.ForbiddenException(
          "Webhook source IP is not allowed",
        );
      }
      return true;
    }
    getAllowlist() {
      return (process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS || "")
        .split(",")
        .map((ip) => ip.trim())
        .filter(Boolean);
    }
    extractIp(req) {
      const directIp = this.normalizeIp(
        req.ip || req.socket?.remoteAddress || "unknown",
      );
      const forwarded = req.headers["x-forwarded-for"];
      if (this.isTrustedForwarder(directIp)) {
        if (typeof forwarded === "string" && forwarded.trim()) {
          return this.normalizeIp(forwarded.split(",")[0].trim());
        }
        if (Array.isArray(forwarded) && forwarded.length > 0) {
          return this.normalizeIp(forwarded[0]);
        }
      }
      if (forwarded) {
        this.logger.warn(
          JSON.stringify({
            event: "yookassa_webhook_forwarded_for_ignored",
            directIp,
            at: new Date().toISOString(),
          }),
        );
      }
      return directIp;
    }
    isTrustedForwarder(ip) {
      if (this.isLoopback(ip)) return true;
      return this.getTrustedProxyIps().includes(ip);
    }
    getTrustedProxyIps() {
      return (process.env.YOOKASSA_WEBHOOK_TRUSTED_PROXY_IPS || "")
        .split(",")
        .map((ip) => this.normalizeIp(ip.trim()))
        .filter(Boolean);
    }
    normalizeIp(ip) {
      if (!ip) return "unknown";
      if (ip.startsWith("::ffff:")) return ip.slice("::ffff:".length);
      if (ip === "::1") return "127.0.0.1";
      return ip;
    }
    isLoopback(ip) {
      return ip === "127.0.0.1" || ip === "localhost";
    }
  });
exports.YooKassaWebhookIpAllowlistGuard = YooKassaWebhookIpAllowlistGuard;
exports.YooKassaWebhookIpAllowlistGuard =
  YooKassaWebhookIpAllowlistGuard =
  YooKassaWebhookIpAllowlistGuard_1 =
    __decorate([(0, common_1.Injectable)()], YooKassaWebhookIpAllowlistGuard);
//# sourceMappingURL=yookassa-webhook-ip-allowlist.guard.js.map
