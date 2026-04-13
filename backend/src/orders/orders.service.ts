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
import { normalizeRuPhone } from 'src/utils/phone';

function cleanText(value?: string) {
  const v = value?.trim();
  return v ? v : null;
}

function buildStructuredAddress(dto: CreateOrderDto): string | null {
  const parts = [
    cleanText(dto.city),
    cleanText(dto.street),
    cleanText(dto.house) ? `д. ${cleanText(dto.house)}` : null,
    cleanText(dto.apartment) ? `кв. ${cleanText(dto.apartment)}` : null,
    cleanText(dto.entrance) ? `подъезд ${cleanText(dto.entrance)}` : null,
    cleanText(dto.floor) ? `этаж ${cleanText(dto.floor)}` : null,
  ].filter(Boolean);

  if (!parts.length) return null;
  return parts.join(', ');
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private buildPublicOrderNumber(id: number, createdAt: Date) {
    const year = createdAt.getFullYear();
    return `ORD-${year}-${String(id).padStart(6, '0')}`;
  }

  async create(dto: CreateOrderDto, userId: number, idempotencyKey?: string) {
    const normalizedIdempotencyKey = cleanText(idempotencyKey ?? undefined);
    if (normalizedIdempotencyKey) {
      const existing = await (this.prisma as any).order.findFirst({
        where: {
          userId,
          idempotencyKey: normalizedIdempotencyKey,
        },
        include: { items: true },
      });
      if (existing) return existing;
    }

    const cartSnapshotItems = await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId,
        },
      },
      select: {
        productId: true,
        quantity: true,
      },
    });
    const sourceItems =
      dto.items && dto.items.length > 0 ? dto.items : cartSnapshotItems;
    if (!sourceItems.length) {
      throw new BadRequestException('Корзина пуста');
    }
    const address = cleanText(dto.address) ?? buildStructuredAddress(dto);
    if (!address) {
      throw new BadRequestException('Адрес обязателен');
    }
    const recipientPhone = cleanText(dto.phone)
      ? normalizeRuPhone(dto.phone)
      : null;
    if (dto.phone && !recipientPhone) {
      throw new BadRequestException('Некорректный номер телефона получателя');
    }

    // 1) Берём продукты из БД
    const productIds = sourceItems.map((i) => i.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        price: true,
        inStock: true,
        reservedQty: true,
      },
    });

    // 2) Проверка наличия
    for (const item of sourceItems) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Товар ${item.productId} не найден`);
      }
      if (item.quantity <= 0) {
        throw new BadRequestException('Количество должно быть больше 0');
      }
      const available = Math.max(
        0,
        product.inStock - ((product as any).reservedQty ?? 0),
      );
      if (available < item.quantity) {
        throw new BadRequestException(
          `Недостаточно товара "${product.name}". Доступно: ${available}, нужно: ${item.quantity}`,
        );
      }
    }

    // 3) Считаем totalPrice на бэке (лучше так)
    const subtotalMinor = sourceItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + product.price * item.quantity * 100;
    }, 0);
    const discountTotalMinor = Math.max(0, dto.discountTotalMinor ?? 0);
    const taxTotalMinor = Math.max(0, dto.taxTotalMinor ?? 0);
    const deliveryFeeMinor = Math.max(0, dto.deliveryFeeMinor ?? 0);
    const giftTotalMinor = Math.max(0, dto.giftTotalMinor ?? 0);
    const finalAmountMinor =
      subtotalMinor -
      discountTotalMinor +
      taxTotalMinor +
      deliveryFeeMinor +
      giftTotalMinor;
    if (finalAmountMinor <= 0) {
      throw new BadRequestException('Сумма заказа должна быть больше нуля');
    }
    const totalPrice = Math.round(finalAmountMinor / 100);
    const currency = cleanText(dto.currency)?.toUpperCase() || 'RUB';

    // 4) Транзакция: создаём заказ + резервируем остатки
    return this.prisma.$transaction(async (tx) => {
      // 4.1) Резервируем остатки атомарно (in_stock - reserved_qty >= quantity)
      for (const item of sourceItems) {
        const updated = await tx.$executeRaw`
          UPDATE "products"
          SET "reserved_qty" = "reserved_qty" + ${item.quantity}
          WHERE "id" = ${item.productId}
            AND ("in_stock" - "reserved_qty") >= ${item.quantity}
        `;

        // Если кто-то успел зарезервировать раньше — updated = 0
        if (updated === 0) {
          const p = products.find((x) => x.id === item.productId);
          throw new BadRequestException(
            `Товар "${p?.name ?? item.productId}" закончился или не хватает доступного остатка`,
          );
        }
      }

      // 4.2) Создаём заказ (и сохраняем snapshot цен/названий)
      const order = await (tx as any).order.create({
        data: {
          userId: userId ?? undefined,
          idempotencyKey: normalizedIdempotencyKey,
          address,
          totalPrice,
          currency,
          subtotalMinor,
          discountTotalMinor,
          taxTotalMinor,
          deliveryFeeMinor,
          giftTotalMinor,
          finalAmountMinor,
          items: {
            create: sourceItems.map((item) => {
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
      const publicOrderNumber = this.buildPublicOrderNumber(
        order.id,
        order.createdAt,
      );
      const orderWithPublicNumber = await (tx as any).order.update({
        where: { id: order.id },
        data: { publicOrderNumber },
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
      await (tx as any).inventoryMovement.createMany({
        data: sourceItems.map((item) => ({
          productId: item.productId,
          orderId: order.id,
          type: 'RESERVE',
          quantity: item.quantity,
          note: 'Reserved on order creation',
        })),
      });
      await (tx as any).orderAddress.create({
        data: {
          orderId: order.id,
          country: cleanText(dto.country) ?? 'Россия',
          city: cleanText(dto.city),
          street: cleanText(dto.street),
          house: cleanText(dto.house),
          apartment: cleanText(dto.apartment),
          entrance: cleanText(dto.entrance),
          floor: cleanText(dto.floor),
          intercom: cleanText(dto.intercom),
          postalCode: cleanText(dto.postalCode),
          comment: cleanText(dto.comment),
          recipientName: cleanText(dto.fullName),
          recipientPhone,
          fullAddress: address,
        },
      });

      if (userId) {
        const existingUserAddress = await (tx as any).userAddress.findFirst({
          where: {
            userId,
            fullAddress: address,
          },
          select: { id: true },
        });

        if (existingUserAddress) {
          await (tx as any).userAddress.update({
            where: { id: existingUserAddress.id },
            data: {
              city: cleanText(dto.city),
              street: cleanText(dto.street),
              house: cleanText(dto.house),
              apartment: cleanText(dto.apartment),
              entrance: cleanText(dto.entrance),
              floor: cleanText(dto.floor),
              intercom: cleanText(dto.intercom),
              postalCode: cleanText(dto.postalCode),
              comment: cleanText(dto.comment),
              recipientName: cleanText(dto.fullName),
              recipientPhone,
            },
          });
        } else {
          await (tx as any).userAddress.create({
            data: {
              userId,
              country: cleanText(dto.country) ?? 'Россия',
              city: cleanText(dto.city),
              street: cleanText(dto.street),
              house: cleanText(dto.house),
              apartment: cleanText(dto.apartment),
              entrance: cleanText(dto.entrance),
              floor: cleanText(dto.floor),
              intercom: cleanText(dto.intercom),
              postalCode: cleanText(dto.postalCode),
              comment: cleanText(dto.comment),
              recipientName: cleanText(dto.fullName),
              recipientPhone,
              fullAddress: address,
              isDefault: false,
            },
          });
        }
      }

      return orderWithPublicNumber;
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
      publicOrderNumber: (order as any).publicOrderNumber ?? null,
      totalPrice: order.totalPrice,
      currency: order.currency,
      subtotalMinor: order.subtotalMinor,
      discountTotalMinor: order.discountTotalMinor,
      taxTotalMinor: order.taxTotalMinor,
      deliveryFeeMinor: order.deliveryFeeMinor,
      giftTotalMinor: (order as any).giftTotalMinor ?? 0,
      finalAmountMinor: order.finalAmountMinor,
      status: order.status,
      createdAt: order.createdAt,
      fullName: `${order.user.firstName} ${order.user.lastName}`,
      items: order.items,
    }));
  }

  async findOrders(userId: number) {
    const orders = await (this.prisma as any).order.findMany({
      where: { userId: userId },
      select: {
        status: true,
        totalPrice: true,
        createdAt: true,
        id: true,
        publicOrderNumber: true,
      },
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
        if (dto.status === 'PAID') {
          await this.consumeReservedStock(
            tx,
            order.items,
            order.id,
            'Reserved stock consumed on manual PAID status',
          );
        }
        if (dto.status === 'CANCELED' && order.status !== 'PAID') {
          await this.releaseReservedStock(
            tx,
            order.items,
            order.id,
            'Reserved stock released on order cancellation',
          );
        }

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

  private async releaseReservedStock(
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
          reservedQty: { gte: item.quantity },
        },
        data: {
          reservedQty: { decrement: item.quantity },
        },
      });
      if (updated.count > 0) {
        await (tx as any).inventoryMovement.create({
          data: {
            productId: item.productId,
            orderId,
            type: 'RELEASE',
            quantity: item.quantity,
            note,
          },
        });
      }
    }
  }
}
