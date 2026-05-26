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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const observability_service_1 = require("../observability/observability.service");
function toYooKassaStatus(status) {
  switch (status) {
    case "pending":
      return "PENDING";
    case "waiting_for_capture":
      return "WAITING_FOR_CAPTURE";
    case "succeeded":
      return "SUCCEEDED";
    case "canceled":
      return "CANCELED";
    default:
      return "FAILED";
  }
}
let PaymentsService = class PaymentsService {
  static {
    PaymentsService_1 = this;
  }
  prisma;
  observability;
  logger = new common_1.Logger(PaymentsService_1.name);
  static rejectCounters = new Map();
  constructor(prisma, observability) {
    this.prisma = prisma;
    this.observability = observability;
  }
  getYooKassaApiCredentials() {
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    if (!shopId || !secretKey) {
      throw new common_1.BadRequestException(
        "YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY are required",
      );
    }
    return { shopId, secretKey };
  }
  getYooKassaReturnUrl() {
    const returnUrl = process.env.YOOKASSA_RETURN_URL;
    if (!returnUrl) {
      throw new common_1.BadRequestException("YOOKASSA_RETURN_URL is required");
    }
    return returnUrl;
  }
  async verifyYooKassaPayment(providerPaymentId) {
    const { shopId, secretKey } = this.getYooKassaApiCredentials();
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");
    const response = await fetch(
      `https://api.yookassa.ru/v3/payments/${providerPaymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.id) {
      throw new common_1.ForbiddenException(
        "Не удалось верифицировать webhook YooKassa",
      );
    }
    return data;
  }
  rejectWebhook(reason, message, details = {}, type = "forbidden") {
    this.observability.incrementCounter("webhook_rejected_total", {
      provider: "YOOKASSA",
      reason,
    });
    this.logger.warn(
      JSON.stringify({
        event: "yookassa_webhook_rejected",
        reason,
        message,
        at: new Date().toISOString(),
        ...details,
      }),
    );
    this.trackWebhookRejectSpike(reason);
    if (type === "bad_request") {
      throw new common_1.BadRequestException(message);
    }
    throw new common_1.ForbiddenException(message);
  }
  trackWebhookRejectSpike(reason) {
    if (reason !== "VERIFY_FAILED" && reason !== "STATUS_MISMATCH") {
      return;
    }
    const windowMs =
      Number(process.env.YOOKASSA_WEBHOOK_ALERT_WINDOW_MS) || 300_000;
    const threshold =
      Number(process.env.YOOKASSA_WEBHOOK_ALERT_THRESHOLD) || 20;
    const now = Date.now();
    const current = PaymentsService_1.rejectCounters.get(reason);
    if (!current || now - current.windowStart >= windowMs) {
      PaymentsService_1.rejectCounters.set(reason, {
        count: 1,
        windowStart: now,
      });
      return;
    }
    current.count += 1;
    if (current.count === threshold) {
      this.logger.error(
        JSON.stringify({
          event: "yookassa_webhook_rejected_spike",
          reason,
          threshold,
          windowMs,
          count: current.count,
          at: new Date(now).toISOString(),
        }),
      );
    }
  }
  async createYooKassaPayment(
    orderId,
    currentUserId,
    currentUserRole,
    clientIdempotencyKey,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        userId: true,
        status: true,
        currency: true,
        finalAmountMinor: true,
        items: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });
    if (!order)
      throw new common_1.NotFoundException(`Order #${orderId} not found`);
    if (currentUserRole !== "ADMIN" && order.userId !== currentUserId) {
      throw new common_1.ForbiddenException("Нельзя оплачивать чужой заказ");
    }
    if (order.status === "PAID") {
      throw new common_1.BadRequestException("Заказ уже оплачен");
    }
    if (clientIdempotencyKey) {
      const existingByKey = await this.prisma.payment.findUnique({
        where: { idempotencyKey: clientIdempotencyKey },
        include: {
          attempts: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });
      if (existingByKey) {
        if (existingByKey.status === "FAILED") {
          const lastAttempt = existingByKey.attempts?.[0];
          throw new common_1.BadGatewayException(
            lastAttempt?.errorMessage ||
              "Предыдущая попытка создания платежа завершилась ошибкой",
          );
        }
        return {
          paymentId: existingByKey.id,
          status: existingByKey.status,
          confirmationUrl: existingByKey.confirmationUrl,
          providerPaymentId: existingByKey.providerPaymentId,
        };
      }
    }
    const existingForOrder = await this.prisma.payment.findFirst({
      where: {
        orderId,
        status: {
          in: ["PENDING", "WAITING_FOR_CAPTURE", "SUCCEEDED"],
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if (existingForOrder) {
      return {
        paymentId: existingForOrder.id,
        status: existingForOrder.status,
        confirmationUrl: existingForOrder.confirmationUrl,
        providerPaymentId: existingForOrder.providerPaymentId,
      };
    }
    const { shopId, secretKey } = this.getYooKassaApiCredentials();
    const returnUrl = this.getYooKassaReturnUrl();
    const amountMinor = order.finalAmountMinor > 0 ? order.finalAmountMinor : 0;
    if (amountMinor <= 0) {
      throw new common_1.BadRequestException(
        "Сумма заказа должна быть больше нуля",
      );
    }
    const amountValue = (amountMinor / 100).toFixed(2);
    const idempotencyKey = clientIdempotencyKey || (0, crypto_1.randomUUID)();
    const requestPayload = {
      amount: {
        value: amountValue,
        currency: order.currency || "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${returnUrl}?orderId=${order.id}`,
      },
      description: `Order #${order.id}`,
      metadata: {
        orderId: String(order.id),
      },
    };
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");
    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "Idempotence-Key": idempotencyKey,
      },
      body: JSON.stringify(requestPayload),
    });
    const responsePayload = await response.json().catch(() => null);
    const mappedStatus = toYooKassaStatus(responsePayload?.status);
    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        provider: "YOOKASSA",
        status: mappedStatus,
        amountMinor,
        currency: order.currency || "RUB",
        providerPaymentId: responsePayload?.id ?? null,
        idempotencyKey,
        confirmationUrl:
          responsePayload?.confirmation?.confirmation_url ?? null,
        paidAt: mappedStatus === "SUCCEEDED" ? new Date() : null,
      },
    });
    await this.prisma.paymentAttempt.create({
      data: {
        paymentId: payment.id,
        requestPayload,
        responsePayload,
        httpStatus: response.status,
        errorMessage: response.ok ? null : "YooKassa API error",
      },
    });
    if (!response.ok) {
      throw new common_1.BadGatewayException(
        responsePayload?.description || "Ошибка создания платежа в YooKassa",
      );
    }
    if (mappedStatus === "SUCCEEDED" && order.status !== "PAID") {
      await this.prisma.$transaction(async (tx) => {
        await this.consumeReservedStock(
          tx,
          order.items,
          order.id,
          "Reserved stock consumed on payment success",
        );
        await tx.order.update({
          where: { id: order.id },
          data: { status: "PAID" },
        });
        await tx.orderStatusHistory.create({
          data: {
            orderId: order.id,
            fromStatus: order.status,
            toStatus: "PAID",
            reason: "Payment succeeded (YooKassa)",
            changedByUserId: currentUserId,
          },
        });
      });
    }
    return {
      paymentId: payment.id,
      status: payment.status,
      confirmationUrl: payment.confirmationUrl,
      providerPaymentId: payment.providerPaymentId,
    };
  }
  async handleYooKassaWebhook(payload, audit) {
    const eventType = payload?.event ?? "unknown";
    const object = payload?.object ?? {};
    const providerPaymentId =
      typeof object?.id === "string" ? object.id : undefined;
    if (!providerPaymentId) {
      this.rejectWebhook(
        "MISSING_PAYMENT_ID",
        "Некорректный webhook YooKassa",
        {
          eventType,
          ip: audit?.ip ?? null,
          userAgent: audit?.userAgent ?? null,
        },
        "bad_request",
      );
    }
    let verifiedPayment;
    try {
      verifiedPayment = await this.verifyYooKassaPayment(providerPaymentId);
    } catch {
      this.rejectWebhook(
        "VERIFY_FAILED",
        "Не удалось верифицировать webhook YooKassa",
        {
          eventType,
          providerPaymentId,
          ip: audit?.ip ?? null,
          userAgent: audit?.userAgent ?? null,
        },
      );
    }
    if (object?.status && object.status !== verifiedPayment.status) {
      this.rejectWebhook("STATUS_MISMATCH", "Webhook payload mismatch", {
        eventType,
        providerPaymentId,
        providedStatus: object.status,
        verifiedStatus: verifiedPayment.status,
        ip: audit?.ip ?? null,
        userAgent: audit?.userAgent ?? null,
      });
    }
    if (
      object?.amount?.value &&
      verifiedPayment?.amount?.value &&
      object.amount.value !== verifiedPayment.amount.value
    ) {
      this.rejectWebhook("AMOUNT_MISMATCH", "Webhook amount mismatch", {
        eventType,
        providerPaymentId,
        providedAmount: object.amount.value,
        verifiedAmount: verifiedPayment.amount.value,
        ip: audit?.ip ?? null,
        userAgent: audit?.userAgent ?? null,
      });
    }
    if (
      object?.amount?.currency &&
      verifiedPayment?.amount?.currency &&
      object.amount.currency !== verifiedPayment.amount.currency
    ) {
      this.rejectWebhook("CURRENCY_MISMATCH", "Webhook currency mismatch", {
        eventType,
        providerPaymentId,
        providedCurrency: object.amount.currency,
        verifiedCurrency: verifiedPayment.amount.currency,
        ip: audit?.ip ?? null,
        userAgent: audit?.userAgent ?? null,
      });
    }
    const mappedStatus = toYooKassaStatus(verifiedPayment.status);
    const providerEventId = providerPaymentId
      ? `${eventType}:${providerPaymentId}`
      : null;
    const payment = providerPaymentId
      ? await this.prisma.payment.findFirst({
          where: {
            provider: "YOOKASSA",
            providerPaymentId,
          },
          include: {
            order: {
              select: {
                id: true,
                status: true,
                items: {
                  select: {
                    productId: true,
                    quantity: true,
                  },
                },
              },
            },
          },
        })
      : null;
    if (providerEventId) {
      await this.prisma.paymentWebhookEvent.upsert({
        where: { providerEventId },
        create: {
          paymentId: payment?.id ?? null,
          provider: "YOOKASSA",
          eventType,
          providerEventId,
          payload,
          isProcessed: false,
        },
        update: {
          payload,
          paymentId: payment?.id ?? null,
        },
      });
    } else {
      await this.prisma.paymentWebhookEvent.create({
        data: {
          paymentId: payment?.id ?? null,
          provider: "YOOKASSA",
          eventType,
          payload,
          isProcessed: false,
        },
      });
    }
    if (!payment) return { ok: true, skipped: "payment_not_found" };
    await this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: mappedStatus,
          paidAt: mappedStatus === "SUCCEEDED" ? new Date() : null,
        },
      });
      if (mappedStatus === "SUCCEEDED" && payment.order.status !== "PAID") {
        await this.consumeReservedStock(
          tx,
          payment.order.items,
          payment.order.id,
          "Reserved stock consumed on payment success (webhook)",
        );
        await tx.order.update({
          where: { id: payment.order.id },
          data: { status: "PAID" },
        });
        await tx.orderStatusHistory.create({
          data: {
            orderId: payment.order.id,
            fromStatus: payment.order.status,
            toStatus: "PAID",
            reason: "Payment succeeded (YooKassa webhook)",
          },
        });
      }
      if (providerEventId) {
        await tx.paymentWebhookEvent.updateMany({
          where: { providerEventId },
          data: {
            isProcessed: true,
            processedAt: new Date(),
            processingError: null,
          },
        });
      }
    });
    return { ok: true };
  }
  async getOrderPayments(orderId, currentUserId, role) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true },
    });
    if (!order)
      throw new common_1.NotFoundException(`Order #${orderId} not found`);
    if (role !== "ADMIN" && order.userId !== currentUserId) {
      throw new common_1.ForbiddenException(
        "Нельзя смотреть платежи чужого заказа",
      );
    }
    return this.prisma.payment.findMany({
      where: { orderId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        provider: true,
        status: true,
        amountMinor: true,
        currency: true,
        providerPaymentId: true,
        confirmationUrl: true,
        paidAt: true,
        createdAt: true,
      },
    });
  }
  async consumeReservedStock(tx, items, orderId, note) {
    for (const item of items) {
      if (!item.productId) continue;
      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          inStock: { gte: item.quantity },
          reservedQty: { gte: item.quantity },
        },
        data: {
          inStock: { decrement: item.quantity },
          reservedQty: { decrement: item.quantity },
        },
      });
      if (updated.count === 0) {
        throw new common_1.BadRequestException(
          `Не удалось списать резерв по товару #${item.productId}`,
        );
      }
      await tx.inventoryMovement.create({
        data: {
          productId: item.productId,
          orderId,
          type: "OUT",
          quantity: item.quantity,
          note,
        },
      });
    }
  }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService =
  PaymentsService =
  PaymentsService_1 =
    __decorate(
      [
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [
          prisma_service_1.PrismaService,
          observability_service_1.ObservabilityService,
        ]),
      ],
      PaymentsService,
    );
//# sourceMappingURL=payments.service.js.map
