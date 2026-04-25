import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { OrdersController } from './orders.controller';

describe('OrdersController access', () => {
  const ordersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOrders: jest.fn(),
    getStatusHistory: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  let controller: OrdersController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrdersController(ordersService as any);
  });

  it('should allow user to request own orders', async () => {
    ordersService.findOrders.mockResolvedValue([{ id: 1 }]);
    const req = { user: { userId: 42, role: Role.USER } } as any;

    const result = await controller.findOne(42, req);

    expect(result).toEqual([{ id: 1 }]);
    expect(ordersService.findOrders).toHaveBeenCalledWith(42);
  });

  it('should deny user requesting another user orders', async () => {
    const req = { user: { userId: 42, role: Role.USER } } as any;

    expect(() => controller.findOne(43, req)).toThrow(ForbiddenException);
    expect(ordersService.findOrders).not.toHaveBeenCalled();
  });

  it('should allow admin requesting any user orders', async () => {
    ordersService.findOrders.mockResolvedValue([{ id: 2 }]);
    const req = { user: { userId: 1, role: Role.ADMIN } } as any;

    const result = await controller.findOne(43, req);

    expect(result).toEqual([{ id: 2 }]);
    expect(ordersService.findOrders).toHaveBeenCalledWith(43);
  });

  it('should deny unauthenticated request', async () => {
    const req = {} as any;

    expect(() => controller.findOne(43, req)).toThrow(ForbiddenException);
    expect(ordersService.findOrders).not.toHaveBeenCalled();
  });

  it('should return current user orders via /orders/me handler', async () => {
    ordersService.findOrders.mockResolvedValue([{ id: 7 }]);
    const req = { user: { userId: 55, role: Role.USER } } as any;

    const result = await controller.findMyOrders(req);

    expect(result).toEqual([{ id: 7 }]);
    expect(ordersService.findOrders).toHaveBeenCalledWith(55);
  });

  it('should deny unauthenticated access to /orders/me handler', async () => {
    const req = {} as any;

    expect(() => controller.findMyOrders(req)).toThrow(ForbiddenException);
    expect(ordersService.findOrders).not.toHaveBeenCalled();
  });
});
