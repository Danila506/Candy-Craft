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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const yookassa_webhook_rate_limit_guard_1 = require("./guards/yookassa-webhook-rate-limit.guard");
const yookassa_webhook_ip_allowlist_guard_1 = require("./guards/yookassa-webhook-ip-allowlist.guard");
let PaymentsController = class PaymentsController {
  paymentsService;
  constructor(paymentsService) {
    this.paymentsService = paymentsService;
  }
  createYooKassaPayment(orderId, idempotencyKey, req) {
    const currentUserId = req.user?.userId;
    const role = req.user?.role;
    return this.paymentsService.createYooKassaPayment(
      +orderId,
      currentUserId,
      role,
      idempotencyKey,
    );
  }
  getOrderPayments(orderId, req) {
    const currentUserId = req.user?.userId;
    const role = req.user?.role;
    return this.paymentsService.getOrderPayments(+orderId, currentUserId, role);
  }
  async handleYooKassaWebhook(payload, req) {
    return this.paymentsService.handleYooKassaWebhook(payload, {
      ip: req.ip,
      userAgent: req.headers["user-agent"] ?? null,
    });
  }
};
exports.PaymentsController = PaymentsController;
__decorate(
  [
    (0, common_1.Post)("orders/:orderId/yookassa"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("orderId")),
    __param(1, (0, common_1.Headers)("idempotency-key")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  PaymentsController.prototype,
  "createYooKassaPayment",
  null,
);
__decorate(
  [
    (0, common_1.Get)("orders/:orderId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("orderId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0),
  ],
  PaymentsController.prototype,
  "getOrderPayments",
  null,
);
__decorate(
  [
    (0, common_1.Post)("webhooks/yookassa"),
    (0, common_1.UseGuards)(
      yookassa_webhook_ip_allowlist_guard_1.YooKassaWebhookIpAllowlistGuard,
      yookassa_webhook_rate_limit_guard_1.YooKassaWebhookRateLimitGuard,
    ),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  PaymentsController.prototype,
  "handleYooKassaWebhook",
  null,
);
exports.PaymentsController = PaymentsController = __decorate(
  [
    (0, common_1.Controller)("payments"),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService]),
  ],
  PaymentsController,
);
//# sourceMappingURL=payments.controller.js.map
