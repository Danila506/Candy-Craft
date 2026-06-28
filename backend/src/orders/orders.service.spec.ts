import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderOptionsService } from './order-options.service';

describe('OrdersService commercial totals and stock reservations', () => {
  function createOrderOptionsMock() {
    return new OrderOptionsService({
      get: jest.fn().mockReturnValue(undefined),
    } as any);
  }

  function createPrismaMock() {
    const tx = {
      $executeRaw: jest.fn().mockResolvedValue(1),
      order: {
        create: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
      },
      orderItem: {
        deleteMany: jest.fn(),
      },
      product: {
        findMany: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      userAddress: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const prisma = {
      cartItem: {
        findMany: jest.fn(),
      },
      product: {
        findMany: jest.fn(),
      },
      order: {
        findFirst: jest.fn(),
      },
      $transaction: jest.fn((callback: (tx: any) => unknown) => callback(tx)),
    };

    return { prisma, tx };
  }

  it('calculates order fees on the server and ignores spoofed money fields', async () => {
    const { prisma, tx } = createPrismaMock();
    const service = new OrdersService(prisma as any, createOrderOptionsMock());

    prisma.cartItem.findMany.mockResolvedValue([
      { productId: 10, quantity: 2 },
    ]);
    prisma.product.findMany.mockResolvedValue([
      {
        id: 10,
        name: 'Cake',
        price: 120,
        inStock: 10,
        reservedQty: 0,
      },
    ]);
    tx.order.create.mockResolvedValue({
      id: 5,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      status: 'PENDING',
    });
    tx.order.update.mockResolvedValue({ id: 5 });

    await service.create(
      {
        address: 'Test address',
        currency: 'RUB',
        deliveryOptionId: 1,
        giftOptionId: 2,
        discountTotalMinor: 999_999,
        taxTotalMinor: 999_999,
        deliveryFeeMinor: 1,
        giftTotalMinor: 1,
      } as any,
      7,
    );

    expect(tx.order.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          subtotalMinor: 24_000,
          discountTotalMinor: 0,
          taxTotalMinor: 0,
          deliveryFeeMinor: 50_000,
          giftTotalMinor: 15_000,
          finalAmountMinor: 89_000,
          totalPrice: 890,
        }),
      }),
    );
  });

  it('rejects unknown delivery options instead of trusting client fees', async () => {
    const { prisma } = createPrismaMock();
    const service = new OrdersService(prisma as any, createOrderOptionsMock());

    prisma.cartItem.findMany.mockResolvedValue([
      { productId: 10, quantity: 1 },
    ]);
    prisma.product.findMany.mockResolvedValue([
      {
        id: 10,
        name: 'Cake',
        price: 120,
        inStock: 10,
        reservedQty: 0,
      },
    ]);

    await expect(
      service.create({ address: 'Test address', deliveryOptionId: 999 }, 7),
    ).rejects.toThrow(BadRequestException);
  });

  it('reconciles reserved stock and consumes updated items when admin changes items and marks paid', async () => {
    const { prisma, tx } = createPrismaMock();
    const service = new OrdersService(prisma as any, createOrderOptionsMock());

    tx.order.findUnique.mockResolvedValue({
      id: 42,
      status: 'PENDING',
      discountTotalMinor: 0,
      taxTotalMinor: 0,
      deliveryFeeMinor: 30_000,
      giftTotalMinor: 0,
      items: [{ productId: 1, quantity: 2 }],
    });
    tx.product.findMany.mockResolvedValue([
      { id: 1, name: 'Cake', price: 100 },
      { id: 2, name: 'Candy', price: 50 },
    ]);
    tx.order.update.mockResolvedValue({
      id: 42,
      status: 'PAID',
      items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 3 },
      ],
    });

    await service.update(
      42,
      {
        status: 'PAID' as any,
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 3 },
        ],
      },
      9,
    );

    expect(tx.product.updateMany).toHaveBeenCalledWith({
      where: { id: 1, reservedQty: { gte: 1 } },
      data: { reservedQty: { decrement: 1 } },
    });
    expect(tx.$executeRaw).toHaveBeenCalledTimes(1);
    expect(tx.order.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          subtotalMinor: 25_000,
          deliveryFeeMinor: 30_000,
          finalAmountMinor: 55_000,
          totalPrice: 550,
        }),
      }),
    );
    expect(tx.product.updateMany).toHaveBeenCalledWith({
      where: {
        id: 1,
        inStock: { gte: 1 },
        reservedQty: { gte: 1 },
      },
      data: {
        inStock: { decrement: 1 },
        reservedQty: { decrement: 1 },
      },
    });
    expect(tx.product.updateMany).toHaveBeenCalledWith({
      where: {
        id: 2,
        inStock: { gte: 3 },
        reservedQty: { gte: 3 },
      },
      data: {
        inStock: { decrement: 3 },
        reservedQty: { decrement: 3 },
      },
    });
  });
});
