import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ObservabilityService } from 'src/observability/observability.service';

describe('PaymentsService webhook validation', () => {
  const prisma = {
    $transaction: jest.fn(),
  };

  let service: PaymentsService;
  let observability: ObservabilityService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.YOOKASSA_SHOP_ID = 'shop-id';
    process.env.YOOKASSA_SECRET_KEY = 'secret-key';
    observability = new ObservabilityService();
    service = new PaymentsService(prisma as any, observability);
    (service as any).prisma.payment = { findFirst: jest.fn() };
  });

  it('should throw BadRequest when webhook does not contain payment id', async () => {
    await expect(service.handleYooKassaWebhook({})).rejects.toThrow(
      BadRequestException,
    );
    expect(
      observability.getCounterValue('webhook_rejected_total', {
        provider: 'YOOKASSA',
        reason: 'MISSING_PAYMENT_ID',
      }),
    ).toBe(1);
  });

  it('should reject webhook when payload status mismatches verified payment', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_1',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    await expect(
      service.handleYooKassaWebhook({
        event: 'payment.succeeded',
        object: {
          id: 'pay_1',
          status: 'pending',
          amount: { value: '100.00', currency: 'RUB' },
        },
      }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should accept verified webhook and skip when payment is not found in db', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_2',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    ((service as any).prisma.payment.findFirst as jest.Mock).mockResolvedValue(
      null,
    );

    const result = await service.handleYooKassaWebhook({
      event: 'payment.succeeded',
      object: {
        id: 'pay_2',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      },
    });

    expect(result).toEqual({ ok: true, skipped: 'payment_not_found' });
  });

  it('should release reserved stock and cancel order when payment is canceled', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_canceled',
        status: 'canceled',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    ((service as any).prisma.payment.findFirst as jest.Mock).mockResolvedValue({
      id: 10,
      order: {
        id: 20,
        status: 'PENDING',
        items: [{ productId: 30, quantity: 2 }],
      },
    });

    const tx = {
      payment: { update: jest.fn() },
      product: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
      order: { update: jest.fn() },
    };
    prisma.$transaction.mockImplementation(async (callback) => callback(tx));

    const result = await service.handleYooKassaWebhook({
      event: 'payment.canceled',
      object: {
        id: 'pay_canceled',
        status: 'canceled',
        amount: { value: '100.00', currency: 'RUB' },
      },
    });

    expect(result).toEqual({ ok: true });
    expect(tx.product.updateMany).toHaveBeenCalledWith({
      where: { id: 30, reservedQty: { gte: 2 } },
      data: { reservedQty: { decrement: 2 } },
    });
    expect(tx.order.update).toHaveBeenCalledWith({
      where: { id: 20 },
      data: { status: 'CANCELED' },
    });
  });
});
