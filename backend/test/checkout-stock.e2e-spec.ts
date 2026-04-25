import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

class TestJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userIdHeader = req.headers['x-user-id'];
    const roleHeader = req.headers['x-user-role'];

    if (!userIdHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    const userId = Number(userIdHeader);
    if (!Number.isFinite(userId)) {
      throw new UnauthorizedException('Unauthorized');
    }

    req.user = {
      userId,
      role: (roleHeader as Role | undefined) ?? Role.USER,
    };
    return true;
  }
}

describe('Checkout stock flow (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let canRunDbE2e = false;
  let skipReason = '';

  const runId = `checkout-${Date.now()}`;
  const userEmail = `${runId}@example.test`;
  const categoryName = `${runId}-category`;
  const productSku = `${runId}-sku`;
  const productSlug = `${runId}-product`;
  const providerPaymentId = `pay_${runId}`;

  async function assertDatabaseSchemaReady() {
    try {
      await prisma.user.findFirst({ select: { id: true } });
      canRunDbE2e = true;
    } catch (error) {
      skipReason =
        error instanceof Error
          ? error.message
          : 'Prisma test database schema is not available';
      canRunDbE2e = false;
    }
  }

  async function cleanup() {
    if (!canRunDbE2e) return;

    const users = await prisma.user.findMany({
      where: { email: userEmail },
      select: { id: true },
    });
    const userIds = users.map((user) => user.id);
    const products = await prisma.product.findMany({
      where: { sku: productSku },
      select: { id: true },
    });
    const productIds = products.map((product) => product.id);
    const categories = await prisma.category.findMany({
      where: { name: categoryName },
      select: { id: true },
    });
    const categoryIds = categories.map((category) => category.id);
    const orders = userIds.length
      ? await prisma.order.findMany({
          where: { userId: { in: userIds } },
          select: { id: true },
        })
      : [];
    const orderIds = orders.map((order) => order.id);
    const payments = orderIds.length
      ? await (prisma as any).payment.findMany({
          where: { orderId: { in: orderIds } },
          select: { id: true },
        })
      : [];
    const paymentIds = payments.map((payment: { id: number }) => payment.id);
    const carts = userIds.length
      ? await prisma.cart.findMany({
          where: { userId: { in: userIds } },
          select: { id: true },
        })
      : [];
    const cartIds = carts.map((cart) => cart.id);

    if (paymentIds.length) {
      await (prisma as any).paymentWebhookEvent.deleteMany({
        where: { paymentId: { in: paymentIds } },
      });
      await (prisma as any).paymentAttempt.deleteMany({
        where: { paymentId: { in: paymentIds } },
      });
      await (prisma as any).payment.deleteMany({
        where: { id: { in: paymentIds } },
      });
    }
    await (prisma as any).paymentWebhookEvent.deleteMany({
      where: { providerEventId: `payment.succeeded:${providerPaymentId}` },
    });

    if (orderIds.length) {
      await prisma.inventoryMovement.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      await prisma.orderStatusHistory.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      await (prisma as any).orderAddress.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      await prisma.orderItem.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      await prisma.order.deleteMany({
        where: { id: { in: orderIds } },
      });
    }

    if (cartIds.length) {
      await prisma.cartItem.deleteMany({
        where: { cartId: { in: cartIds } },
      });
      await prisma.cart.deleteMany({
        where: { id: { in: cartIds } },
      });
    }
    if (userIds.length) {
      await (prisma as any).userAddress.deleteMany({
        where: { userId: { in: userIds } },
      });
      await prisma.user.deleteMany({
        where: { id: { in: userIds } },
      });
    }
    if (productIds.length) {
      await prisma.inventoryMovement.deleteMany({
        where: { productId: { in: productIds } },
      });
      await prisma.product.deleteMany({
        where: { id: { in: productIds } },
      });
    }
    if (categoryIds.length) {
      await prisma.category.deleteMany({
        where: { id: { in: categoryIds } },
      });
    }
  }

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET ??= 'test-access-secret';
    process.env.JWT_REFRESH_SECRET ??= 'test-refresh-secret';
    process.env.GOOGLE_CLIENT_ID ??= 'test-google-client-id';
    process.env.GOOGLE_CLIENT_SECRET ??= 'test-google-client-secret';
    process.env.GOOGLE_CALLBACK_URL ??=
      'http://localhost:3000/auth/google/callback';
    process.env.YOOKASSA_SHOP_ID = 'shop-id';
    process.env.YOOKASSA_SECRET_KEY = 'secret-key';
    process.env.YOOKASSA_RETURN_URL = 'http://localhost:5173/payment-result';
    process.env.YOOKASSA_WEBHOOK_ALLOWED_IPS = '127.0.0.1';
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_MAX = '100';
    process.env.YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS = '60000';
    delete process.env.YOOKASSA_WEBHOOK_REDIS_URL;
    delete process.env.REDIS_URL;

    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideGuard(JwtAuthGuard)
        .useClass(TestJwtGuard)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
      prisma = app.get(PrismaService);
      await assertDatabaseSchemaReady();
      await cleanup();
    } catch (error) {
      skipReason =
        error instanceof Error
          ? error.message
          : 'Checkout stock e2e setup failed';
      canRunDbE2e = false;
    }
  });

  afterAll(async () => {
    await cleanup().catch((error) => {
      console.warn('Checkout stock e2e cleanup skipped:', error);
    });
    await app?.close();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('reserves stock on order creation and consumes it after verified YooKassa webhook', async () => {
    if (!canRunDbE2e) {
      console.warn(
        `Skipping checkout stock DB e2e because test database is not ready: ${skipReason}`,
      );
      return;
    }

    const user = await prisma.user.create({
      data: {
        firstName: 'Checkout',
        lastName: 'User',
        email: userEmail,
        phone: `+7999${String(Date.now()).slice(-7)}`,
        passwordHash: 'test-password-hash',
        role: Role.USER,
      },
    });
    const category = await prisma.category.create({
      data: {
        name: categoryName,
        description: 'E2E category',
        imageUrl: 'https://example.test/category.png',
      },
    });
    const product = await prisma.product.create({
      data: {
        sku: productSku,
        slug: productSlug,
        name: 'E2E Candy Box',
        description: 'E2E product',
        price: 1200,
        imageUrl: 'https://example.test/product.png',
        inStock: 5,
        reservedQty: 0,
        categoryId: category.id,
      },
    });

    await request(app.getHttpServer())
      .post(`/cart/${user.id}/items`)
      .set('x-user-id', String(user.id))
      .set('x-user-role', Role.USER)
      .send({ productId: product.id })
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/cart/${user.id}/items/${product.id}`)
      .set('x-user-id', String(user.id))
      .set('x-user-role', Role.USER)
      .send({ quantity: 2 })
      .expect(200);

    const orderResponse = await request(app.getHttpServer())
      .post(`/orders/${user.id}`)
      .set('x-user-id', String(user.id))
      .set('x-user-role', Role.USER)
      .set('idempotency-key', `${runId}-order`)
      .send({
        address: 'Vladivostok, Test street 1',
        fullName: 'Checkout User',
        phone: '+7 999 123-45-67',
        deliveryOptionId: 1,
        giftOptionId: 3,
      })
      .expect(201);

    expect(orderResponse.body).toMatchObject({
      userId: user.id,
      status: 'PENDING',
      subtotalMinor: 240000,
      deliveryFeeMinor: 50000,
      giftTotalMinor: 10000,
      finalAmountMinor: 300000,
      totalPrice: 3000,
    });
    expect(orderResponse.body.items).toEqual([
      expect.objectContaining({
        productId: product.id,
        productName: product.name,
        quantity: 2,
        price: product.price,
      }),
    ]);

    await expect(
      prisma.product.findUniqueOrThrow({ where: { id: product.id } }),
    ).resolves.toMatchObject({ inStock: 5, reservedQty: 2 });
    await expect(
      prisma.inventoryMovement.findMany({
        where: { orderId: orderResponse.body.id },
        orderBy: { id: 'asc' },
      }),
    ).resolves.toEqual([
      expect.objectContaining({
        productId: product.id,
        type: 'RESERVE',
        quantity: 2,
      }),
    ]);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        id: providerPaymentId,
        status: 'pending',
        amount: { value: '3000.00', currency: 'RUB' },
        confirmation: {
          confirmation_url: 'https://yookassa.example.test/confirm',
        },
      }),
    }) as any;

    const paymentResponse = await request(app.getHttpServer())
      .post(`/payments/orders/${orderResponse.body.id}/yookassa`)
      .set('x-user-id', String(user.id))
      .set('x-user-role', Role.USER)
      .set('idempotency-key', `${runId}-payment`)
      .expect(201);

    expect(paymentResponse.body).toMatchObject({
      status: 'PENDING',
      providerPaymentId,
      confirmationUrl: 'https://yookassa.example.test/confirm',
    });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: providerPaymentId,
        status: 'succeeded',
        amount: { value: '3000.00', currency: 'RUB' },
      }),
    }) as any;

    await request(app.getHttpServer())
      .post('/payments/webhooks/yookassa')
      .send({
        event: 'payment.succeeded',
        object: {
          id: providerPaymentId,
          status: 'succeeded',
          amount: { value: '3000.00', currency: 'RUB' },
        },
      })
      .expect(201)
      .expect({ ok: true });

    await expect(
      prisma.order.findUniqueOrThrow({ where: { id: orderResponse.body.id } }),
    ).resolves.toMatchObject({ status: 'PAID' });
    await expect(
      prisma.product.findUniqueOrThrow({ where: { id: product.id } }),
    ).resolves.toMatchObject({ inStock: 3, reservedQty: 0 });
    await expect(
      prisma.inventoryMovement.findMany({
        where: { orderId: orderResponse.body.id },
        orderBy: { id: 'asc' },
      }),
    ).resolves.toEqual([
      expect.objectContaining({ type: 'RESERVE', quantity: 2 }),
      expect.objectContaining({ type: 'OUT', quantity: 2 }),
    ]);
    await expect(
      (prisma as any).paymentWebhookEvent.findUniqueOrThrow({
        where: {
          providerEventId: `payment.succeeded:${providerPaymentId}`,
        },
      }),
    ).resolves.toMatchObject({
      isProcessed: true,
      processingError: null,
    });
  });
});
