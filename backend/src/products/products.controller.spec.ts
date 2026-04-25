import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ProductsController } from './products.controller';

describe('ProductsController catalog visibility', () => {
  const productsService = {
    findAll: jest.fn(),
    removeAll: jest.fn(),
    create: jest.fn(),
    findByCategory: jest.fn(),
    findById: jest.fn(),
    removeById: jest.fn(),
    update: jest.fn(),
  };

  let controller: ProductsController;

  beforeEach(() => {
    jest.clearAllMocks();
    productsService.findAll.mockResolvedValue([]);
    controller = new ProductsController(productsService as any);
  });

  it('allows public catalog requests without hidden products', async () => {
    await controller.findAll(undefined, undefined, {} as any);

    expect(productsService.findAll).toHaveBeenCalledWith({
      includeInactive: false,
      includeDeleted: false,
    });
  });

  it('denies hidden products for unauthenticated users', async () => {
    expect(() => controller.findAll('true', undefined, {} as any)).toThrow(
      ForbiddenException,
    );
    expect(productsService.findAll).not.toHaveBeenCalled();
  });

  it('allows hidden products for admins', async () => {
    await controller.findAll('true', '1', {
      user: { role: Role.ADMIN },
    } as any);

    expect(productsService.findAll).toHaveBeenCalledWith({
      includeInactive: true,
      includeDeleted: true,
    });
  });
});
