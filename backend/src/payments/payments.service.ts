import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
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
  constructor(private readonly prisma: PrismaService) {}

  private getYooKassaConfig() {
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const returnUrl = process.env.YOOKASSA_RETURN_URL;

    if (!shopId || !secretKey || !returnUrl) {
      throw new BadRequestException(
        'YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY / YOOKASSA_RETURN_URL are required',
      );
    }

    return { shopId, secretKey, returnUrl };
  }

  async createYooKassaPayment(
    orderId: number,
    currentUserId: number,
    currentUserRole?: Role,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        userId: true,
        status: true,
        currency: true,
        finalAmountMinor: true,
      },
    });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);

    if (currentUserRole !== 'ADMIN' && order.userId !== currentUserId) {
      throw new ForbiddenException('Нельзя оплачивать чужой заказ');
    }

    if (order.status === 'PAID') {
      throw new BadRequestException('Заказ уже оплачен');
    }

    const { shopId, secretKey, returnUrl } = this.getYooKassaConfig();

    const amountMinor = order.finalAmountMinor > 0 ? order.finalAmountMinor : 0;
    if (amountMinor <= 0) {
      throw new BadRequestException('Сумма заказа должна быть больше нуля');
    }

    const amountValue = (amountMinor / 100).toFixed(2);
    const idempotencyKey = randomUUID();
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

  async handleYooKassaWebhook(payload: any) {
    const eventType = payload?.event ?? 'unknown';
    const object = payload?.object ?? {};
    const providerPaymentId: string | undefined = object?.id;
    const mappedStatus = toYooKassaStatus(object?.status);
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
              select: { id: true, status: true },
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
}
