import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

describe('PaymentsService webhook validation', () => {
  const prisma = {
    paymentWebhookEvent: {
      upsert: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  let service: PaymentsService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.YOOKASSA_SHOP_ID = 'shop-id';
    process.env.YOOKASSA_SECRET_KEY = 'secret-key';
    service = new PaymentsService(prisma as any);
    (service as any).prisma.payment = { findFirst: jest.fn() };
  });

  it('should throw BadRequest when webhook does not contain payment id', async () => {
    await expect(service.handleYooKassaWebhook({})).rejects.toThrow(
      BadRequestException,
    );
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
    expect(prisma.paymentWebhookEvent.upsert).toHaveBeenCalled();
  });
});
