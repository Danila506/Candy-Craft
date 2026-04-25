import { INestApplication, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { PaymentsController } from '../src/payments/payments.controller';
import { RedisRateLimitStore } from '../src/payments/guards/redis-rate-limit.store';
import { YooKassaWebhookIpAllowlistGuard } from '../src/payments/guards/yookassa-webhook-ip-allowlist.guard';
import { YooKassaWebhookRateLimitGuard } from '../src/payments/guards/yookassa-webhook-rate-limit.guard';
import { PaymentsService } from '../src/payments/payments.service';
import { PrismaService } from '../src/prisma/prisma.service';

const prismaMock = {
  paymentWebhookEvent: {
    upsert: jest.fn(),
    create: jest.fn(),
    updateMany: jest.fn(),
  },
  payment: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  order: {
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  orderStatusHistory: {
    create: jest.fn(),
  },
  inventoryMovement: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
};

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    YooKassaWebhookIpAllowlistGuard,
    YooKassaWebhookRateLimitGuard,
    RedisRateLimitStore,
    { provide: PrismaService, useValue: prismaMock },
  ],
})
class TestPaymentsWebhookModule {}

describe('Payments webhook (e2e)', () => {
  let app: INestApplication<App>;
  let rateLimitStore: RedisRateLimitStore;

  beforeAll(async () => {
    process.env.YOOKASSA_SHOP_ID = 'shop-id';
    process.env.YOOKASSA_SECRET_KEY = 'secret-key';
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX = '100';
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS = '60000';
    process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS = '203.0.113.10,203.0.113.11';
    delete process.env.YOOKASSA_WEBHOOK_REDIS_URL;
    delete process.env.REDIS_URL;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestPaymentsWebhookModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    rateLimitStore = app.get(RedisRateLimitStore);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.payment.findFirst.mockResolvedValue(null);
    rateLimitStore.clearMemoryBucketsForTests();
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX = '100';
  });

  it('should return 400 for empty object.id', async () => {
    const response = await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.10')
      .send({
        event: 'payment.succeeded',
        object: {},
      })
      .expect(400);

    expect(response.body.message).toContain('Некорректный webhook YooKassa');
  });

  it('should return 403 for payload mismatch', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_mismatch',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    const response = await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.10')
      .send({
        event: 'payment.succeeded',
        object: {
          id: 'pay_mismatch',
          status: 'pending',
          amount: { value: '100.00', currency: 'RUB' },
        },
      })
      .expect(403);

    expect(response.body.message).toContain('Webhook payload mismatch');
  });

  it('should return 201 for valid payload', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_valid',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    const response = await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.11')
      .send({
        event: 'payment.succeeded',
        object: {
          id: 'pay_valid',
          status: 'succeeded',
          amount: { value: '100.00', currency: 'RUB' },
        },
      })
      .expect(201);

    expect(response.body).toEqual({ ok: true, skipped: 'payment_not_found' });
    expect(prismaMock.paymentWebhookEvent.upsert).toHaveBeenCalled();
  });

  it('should return 429 when rate limit is exceeded', async () => {
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX = '2';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'pay_limit',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      }),
    }) as any;

    const payload = {
      event: 'payment.succeeded',
      object: {
        id: 'pay_limit',
        status: 'succeeded',
        amount: { value: '100.00', currency: 'RUB' },
      },
    };

    await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.10')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.10')
      .send(payload)
      .expect(201);
    await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .set('x-forwarded-for', '203.0.113.10')
      .send(payload)
      .expect(429);
  });
});
