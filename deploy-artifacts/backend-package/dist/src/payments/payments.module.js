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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const payments_controller_1 = require("./payments.controller");
const yookassa_webhook_rate_limit_guard_1 = require("./guards/yookassa-webhook-rate-limit.guard");
const redis_rate_limit_store_1 = require("./guards/redis-rate-limit.store");
const yookassa_webhook_ip_allowlist_guard_1 = require("./guards/yookassa-webhook-ip-allowlist.guard");
let PaymentsModule = class PaymentsModule {};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate(
  [
    (0, common_1.Module)({
      controllers: [payments_controller_1.PaymentsController],
      providers: [
        payments_service_1.PaymentsService,
        yookassa_webhook_rate_limit_guard_1.YooKassaWebhookRateLimitGuard,
        yookassa_webhook_ip_allowlist_guard_1.YooKassaWebhookIpAllowlistGuard,
        redis_rate_limit_store_1.RedisRateLimitStore,
      ],
    }),
  ],
  PaymentsModule,
);
//# sourceMappingURL=payments.module.js.map
