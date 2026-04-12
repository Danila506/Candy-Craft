import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto, userId: number) {
    if (!dto.items?.length) {
      throw new BadRequestException('Корзина пустая');
    }
    const address = dto.address?.trim();
    if (!address) {
      throw new BadRequestException('Адрес обязателен');
    }

    // 1) Берём продукты из БД
    const productIds = dto.items.map((i) => i.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, inStock: true },
    });

    // 2) Проверка наличия
    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Товар ${item.productId} не найден`);
      }
      if (item.quantity <= 0) {
        throw new BadRequestException('Количество должно быть больше 0');
      }
      if (product.inStock < item.quantity) {
        throw new BadRequestException(
          `Недостаточно товара "${product.name}". В наличии: ${product.inStock}, нужно: ${item.quantity}`,
        );
      }
    }

    // 3) Считаем totalPrice на бэке (лучше так)
    const totalPrice = dto.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);
    const subtotalMinor = totalPrice * 100;
    const discountTotalMinor = 0;
    const taxTotalMinor = 0;
    const deliveryFeeMinor = 0;
    const finalAmountMinor =
      subtotalMinor - discountTotalMinor + taxTotalMinor + deliveryFeeMinor;

    // 4) Транзакция: создаём заказ + списываем остатки
    return this.prisma.$transaction(async (tx) => {
      // 4.1) Списываем остатки безопасно (условием inStock >= quantity)
      for (const item of dto.items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            inStock: { gte: item.quantity },
          },
          data: {
            inStock: { decrement: item.quantity },
          },
        });

        // Если кто-то успел купить раньше — updateMany вернёт 0
        if (updated.count === 0) {
          const p = products.find((x) => x.id === item.productId);
          throw new BadRequestException(
            `Товар "${p?.name ?? item.productId}" закончился или не хватает остатка`,
          );
        }
      }

      // 4.2) Создаём заказ (и сохраняем snapshot цен/названий)
      const order = await tx.order.create({
        data: {
          userId: userId ?? undefined,
          address,
          totalPrice,
          currency: 'RUB',
          subtotalMinor,
          discountTotalMinor,
          taxTotalMinor,
          deliveryFeeMinor,
          finalAmountMinor,
          items: {
            create: dto.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: item.quantity,
              };
            }),
          },
        },
        include: { items: true },
      });
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: null,
          toStatus: order.status,
          reason: 'Order created',
          changedByUserId: userId ?? null,
        },
      });

      return order;
    });
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        items: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return orders.map((order) => ({
      id: order.id,
      totalPrice: order.totalPrice,
      currency: order.currency,
      subtotalMinor: order.subtotalMinor,
      discountTotalMinor: order.discountTotalMinor,
      taxTotalMinor: order.taxTotalMinor,
      deliveryFeeMinor: order.deliveryFeeMinor,
      finalAmountMinor: order.finalAmountMinor,
      status: order.status,
      createdAt: order.createdAt,
      fullName: `${order.user.firstName} ${order.user.lastName}`,
      items: order.items,
    }));
  }

  async findOrders(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId: userId },
      select: { status: true, totalPrice: true, createdAt: true, id: true },
    });
    if (!orders) throw new NotFoundException(`User with #${userId} not found`);
    return orders;
  }

  async update(id: number, dto: UpdateOrderDto, changedByUserId?: number) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) throw new NotFoundException(`Order #${id} not found`);

      const data: Prisma.OrderUpdateInput = {};

      if (dto.status) data.status = dto.status;
      if (dto.totalPrice !== undefined) {
        const subtotalMinor = dto.totalPrice * 100;
        data.totalPrice = dto.totalPrice;
        data.subtotalMinor = subtotalMinor;
        data.finalAmountMinor = subtotalMinor;
      }

      // Если пришли новые items
      if (dto.items) {
        // Сначала удаляем старые
        await tx.orderItem.deleteMany({
          where: { orderId: id },
        });

        // Потом создаём новые
        data.items = {
          create: await Promise.all(
            dto.items.map(async (i) => {
              const product = await tx.product.findUnique({
                where: { id: i.productId },
              });
              if (!product)
                throw new NotFoundException(
                  `Product #${i.productId} not found`,
                );

              return {
                product: { connect: { id: i.productId } },
                productName: product.name,
                quantity: i.quantity,
                price: product.price,
              };
            }),
          ),
        };
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data,
        include: { items: true },
      });

      if (dto.status && dto.status !== order.status) {
        await tx.orderStatusHistory.create({
          data: {
            orderId: id,
            fromStatus: order.status,
            toStatus: dto.status,
            reason: dto.statusReason?.trim() || null,
            changedByUserId: changedByUserId ?? null,
          },
        });
      }

      return updatedOrder;
    });
  }

  async getStatusHistory(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);

    return this.prisma.orderStatusHistory.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fromStatus: true,
        toStatus: true,
        reason: true,
        createdAt: true,
        changedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({ where: { id } });
  }
}
