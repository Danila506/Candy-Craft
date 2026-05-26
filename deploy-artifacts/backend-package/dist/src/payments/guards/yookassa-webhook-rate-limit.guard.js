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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var YooKassaWebhookRateLimitGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YooKassaWebhookRateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const redis_rate_limit_store_1 = require("./redis-rate-limit.store");
let YooKassaWebhookRateLimitGuard =
  (YooKassaWebhookRateLimitGuard_1 = class YooKassaWebhookRateLimitGuard {
    rateLimitStore;
    logger = new common_1.Logger(YooKassaWebhookRateLimitGuard_1.name);
    constructor(rateLimitStore) {
      this.rateLimitStore = rateLimitStore;
    }
    async canActivate(context) {
      const req = context.switchToHttp().getRequest();
      const ip = this.extractIp(req);
      const now = Date.now();
      const maxRequests =
        Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX) || 60;
      const windowMs =
        Number(process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS) || 60_000;
      const rateKey = `yookassa:webhook:rl:${ip}`;
      const { count, storage } = await this.rateLimitStore.incrementWithWindow(
        rateKey,
        windowMs,
      );
      if (count > maxRequests) {
        this.logger.warn(
          JSON.stringify({
            event: "yookassa_webhook_rate_limited",
            ip,
            count,
            maxRequests,
            windowMs,
            storage,
            at: new Date(now).toISOString(),
          }),
        );
        throw new common_1.HttpException(
          "Too many webhook requests",
          common_1.HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      return true;
    }
    extractIp(req) {
      const forwarded = req.headers["x-forwarded-for"];
      if (typeof forwarded === "string" && forwarded.trim()) {
        return forwarded.split(",")[0].trim();
      }
      if (Array.isArray(forwarded) && forwarded.length > 0) {
        return forwarded[0];
      }
      return req.ip || req.socket?.remoteAddress || "unknown";
    }
  });
exports.YooKassaWebhookRateLimitGuard = YooKassaWebhookRateLimitGuard;
exports.YooKassaWebhookRateLimitGuard =
  YooKassaWebhookRateLimitGuard =
  YooKassaWebhookRateLimitGuard_1 =
    __decorate(
      [
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [
          redis_rate_limit_store_1.RedisRateLimitStore,
        ]),
      ],
      YooKassaWebhookRateLimitGuard,
    );
//# sourceMappingURL=yookassa-webhook-rate-limit.guard.js.map
