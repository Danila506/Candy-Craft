import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Role } from '@prisma/client';
import { randomUUID } from 'crypto';

type PaymentStatusKey =
  | 'PENDING'
  | 'WAITING_FOR_CAPTURE'
  | 'SUCCEEDED'
  | 'CANCELED'
  | 'FAILED';

type WebhookRejectReason =
  | 'MISSING_PAYMENT_ID'
  | 'VERIFY_FAILED'
  | 'STATUS_MISMATCH'
  | 'AMOUNT_MISMATCH'
  | 'CURRENCY_MISMATCH';

type WebhookAuditContext = {
  ip?: string | null;
  userAgent?: string | null;
};

function toYooKassaStatus(status?: string): PaymentStatusKey {
  switch (status) {
    case 'pending':
      return 'PENDING';
    case 'waiting_for_capture':
      return 'WAITING_FOR_CAPTURE';
    case 'succeeded':
      return 'SUCCEEDED';
    case 'canceled':
      return 'CANCELED';
    default:
      return 'FAILED';
  }
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private static readonly rejectCounters = new Map<
    WebhookRejectReason,
    { count: number; windowStart: number }
  >();

  constructor(private readonly prisma: PrismaService) {}

  private getYooKassaApiCredentials() {
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      throw new BadRequestException(
        'YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY are required',
      );
    }

    return { shopId, secretKey };
  }

  private getYooKassaReturnUrl() {
    const returnUrl = process.env.YOOKASSA_RETURN_URL;
    if (!returnUrl) {
      throw new BadRequestException('YOOKASSA_RETURN_URL is required');
    }
    return returnUrl;
  }

  private async verifyYooKassaPayment(providerPaymentId: string) {
    const { shopId, secretKey } = this.getYooKassaApiCredentials();
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    const response = await fetch(
      `https://api.yookassa.ru/v3/payments/${providerPaymentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.id) {
      throw new ForbiddenException(
        'Не удалось верифицировать webhook YooKassa',
      );
    }

    return data;
  }

  private rejectWebhook(
    reason: WebhookRejectReason,
    message: string,
    details: Record<string, unknown> = {},
    type: 'bad_request' | 'forbidden' = 'forbidden',
  ): never {
    this.logger.warn(
      JSON.stringify({
        event: 'yookassa_webhook_rejected',
        reason,
        message,
        at: new Date().toISOString(),
        ...details,
      }),
    );
    this.trackWebhookRejectSpike(reason);

    if (type === 'bad_request') {
      throw new BadRequestException(message);
    }
    throw new ForbiddenException(message);
  }

  private trackWebhookRejectSpike(reason: WebhookRejectReason) {
    if (reason !== 'VERIFY_FAILED' && reason !== 'STATUS_MISMATCH') {
      return;
    }

    const windowMs =
      Number(process.env.YOOKASSA_WEBHOOK_ALERT_WINDOW_MS) || 300_000;
    const threshold =
      Number(process.env.YOOKASSA_WEBHOOK_ALERT_THRESHOLD) || 20;
    const now = Date.now();

    const current = PaymentsService.rejectCounters.get(reason);
    if (!current || now - current.windowStart >= windowMs) {
      PaymentsService.rejectCounters.set(reason, {
        count: 1,
        windowStart: now,
      });
      return;
    }

    current.count += 1;
    if (current.count === threshold) {
      this.logger.error(
        JSON.stringify({
          event: 'yookassa_webhook_rejected_spike',
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
    orderId: number,
    currentUserId: number,
    currentUserRole?: Role,
    clientIdempotencyKey?: string,
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
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);

    if (currentUserRole !== 'ADMIN' && order.userId !== currentUserId) {
      throw new ForbiddenException('Нельзя оплачивать чужой заказ');
    }

    if (order.status === 'PAID') {
      throw new BadRequestException('Заказ уже оплачен');
    }

    if (clientIdempotencyKey) {
      const existingByKey = await (this.prisma as any).payment.findUnique({
        where: { idempotencyKey: clientIdempotencyKey },
      });
      if (existingByKey) {
        return {
          paymentId: existingByKey.id,
          status: existingByKey.status,
          confirmationUrl: existingByKey.confirmationUrl,
          providerPaymentId: existingByKey.providerPaymentId,
        };
      }
    }

    const existingForOrder = await (this.prisma as any).payment.findFirst({
      where: {
        orderId,
        status: {
          in: ['PENDING', 'WAITING_FOR_CAPTURE', 'SUCCEEDED'],
        },
      },
      orderBy: { createdAt: 'desc' },
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
      throw new BadRequestException('Сумма заказа должна быть больше нуля');
    }

    const amountValue = (amountMinor / 100).toFixed(2);
    const idempotencyKey = clientIdempotencyKey || randomUUID();
    const requestPayload = {
      amount: {
        value: amountValue,
        currency: order.currency || 'RUB',
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: `${returnUrl}?orderId=${order.id}`,
      },
      description: `Order #${order.id}`,
      metadata: {
        orderId: String(order.id),
      },
    };

    const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotencyKey,
      },
      body: JSON.stringify(requestPayload),
    });

    const responsePayload = await response.json().catch(() => null);

    const mappedStatus = toYooKassaStatus(responsePayload?.status);

    const payment = await (this.prisma as any).payment.create({
      data: {
        orderId: order.id,
        provider: 'YOOKASSA',
        status: mappedStatus,
        amountMinor,
        currency: order.currency || 'RUB',
        providerPaymentId: responsePayload?.id ?? null,
        idempotencyKey,
        confirmationUrl:
          responsePayload?.confirmation?.confirmation_url ?? null,
        paidAt: mappedStatus === 'SUCCEEDED' ? new Date() : null,
      },
    });

    await (this.prisma as any).paymentAttempt.create({
      data: {
        paymentId: payment.id,
        requestPayload,
        responsePayload,
        httpStatus: response.status,
        errorMessage: response.ok ? null : 'YooKassa API error',
      },
    });

    if (!response.ok) {
      throw new BadGatewayException(
        responsePayload?.description || 'Ошибка создания платежа в YooKassa',
      );
    }

    if (mappedStatus === 'SUCCEEDED' && (order.status as string) !== 'PAID') {
      await this.prisma.$transaction(async (tx) => {
        await this.consumeReservedStock(
          tx,
          order.items,
          order.id,
          'Reserved stock consumed on payment success',
        );
        await tx.order.update({
          where: { id: order.id },
          data: { status: 'PAID' },
        });
        await tx.orderStatusHistory.create({
          data: {
            orderId: order.id,
            fromStatus: order.status,
            toStatus: 'PAID',
            reason: 'Payment succeeded (YooKassa)',
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

  async handleYooKassaWebhook(payload: any, audit?: WebhookAuditContext) {
    const eventType = payload?.event ?? 'unknown';
    const object = payload?.object ?? {};
    const providerPaymentId: string | undefined =
      typeof object?.id === 'string' ? object.id : undefined;
    if (!providerPaymentId) {
      this.rejectWebhook(
        'MISSING_PAYMENT_ID',
        'Некорректный webhook YooKassa',
        {
          eventType,
          ip: audit?.ip ?? null,
          userAgent: audit?.userAgent ?? null,
        },
        'bad_request',
      );
    }

    let verifiedPayment: any;
    try {
      verifiedPayment = await this.verifyYooKassaPayment(providerPaymentId);
    } catch {
      this.rejectWebhook(
        'VERIFY_FAILED',
        'Не удалось верифицировать webhook YooKassa',
        {
          eventType,
          providerPaymentId,
          ip: audit?.ip ?? null,
          userAgent: audit?.userAgent ?? null,
        },
      );
    }

    if (object?.status && object.status !== verifiedPayment.status) {
      this.rejectWebhook('STATUS_MISMATCH', 'Webhook payload mismatch', {
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
      this.rejectWebhook('AMOUNT_MISMATCH', 'Webhook amount mismatch', {
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
      this.rejectWebhook('CURRENCY_MISMATCH', 'Webhook currency mismatch', {
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
      ? await (this.prisma as any).payment.findFirst({
          where: {
            provider: 'YOOKASSA',
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
          provider: 'YOOKASSA',
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
          provider: 'YOOKASSA',
          eventType,
          payload,
          isProcessed: false,
        },
      });
    }

    if (!payment) return { ok: true, skipped: 'payment_not_found' };

    await this.prisma.$transaction(async (tx) => {
      await (tx as any).payment.update({
        where: { id: payment.id },
        data: {
          status: mappedStatus,
          paidAt: mappedStatus === 'SUCCEEDED' ? new Date() : null,
        },
      });

      if (mappedStatus === 'SUCCEEDED' && payment.order.status !== 'PAID') {
        await this.consumeReservedStock(
          tx,
          payment.order.items,
          payment.order.id,
          'Reserved stock consumed on payment success (webhook)',
        );
        await tx.order.update({
          where: { id: payment.order.id },
          data: { status: 'PAID' },
        });
        await tx.orderStatusHistory.create({
          data: {
            orderId: payment.order.id,
            fromStatus: payment.order.status,
            toStatus: 'PAID',
            reason: 'Payment succeeded (YooKassa webhook)',
          },
        });
      }

      if (providerEventId) {
        await (tx as any).paymentWebhookEvent.updateMany({
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

  async getOrderPayments(orderId: number, currentUserId: number, role?: Role) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true },
    });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    if (role !== 'ADMIN' && order.userId !== currentUserId) {
      throw new ForbiddenException('Нельзя смотреть платежи чужого заказа');
    }

    return (this.prisma as any).payment.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
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

  private async consumeReservedStock(
    tx: any,
    items: Array<{ productId: number | null; quantity: number }>,
    orderId: number,
    note: string,
  ) {
    for (const item of items) {
      if (!item.productId) continue;

      const updated = await (tx as any).product.updateMany({
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
        throw new BadRequestException(
          `Не удалось списать резерв по товару #${item.productId}`,
        );
      }

      await (tx as any).inventoryMovement.create({
        data: {
          productId: item.productId,
          orderId,
          type: 'OUT',
          quantity: item.quantity,
          note,
        },
      });
    }
  }
}
