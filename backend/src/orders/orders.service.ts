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
import { OrderOptionsService } from './order-options.service';
import { calculateCandyCakePrice } from 'src/candy-cake/candy-cake-pricing';

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
  constructor(
    private prisma: PrismaService,
    private readonly orderOptions: OrderOptionsService,
  ) {}

  private buildPublicOrderNumber(id: number, createdAt: Date) {
    const year = createdAt.getFullYear();
    return `ORD-${year}-${String(id).padStart(6, '0')}`;
  }

  private getDeliveryFeeMinor(deliveryOptionId?: number) {
    return this.orderOptions.getDeliveryFeeMinor(deliveryOptionId);
  }

  private getGiftTotalMinor(giftOptionId?: number) {
    return this.orderOptions.getGiftTotalMinor(giftOptionId);
  }

  private calculateCommercialTotals(
    items: Array<{ price: number; quantity: number }>,
    options: {
      deliveryOptionId?: number;
      giftOptionId?: number;
      deliveryFeeMinor?: number;
      giftTotalMinor?: number;
    } = {},
  ) {
    const subtotalMinor = items.reduce(
      (sum, item) => sum + item.price * item.quantity * 100,
      0,
    );
    const discountTotalMinor = 0;
    const taxTotalMinor = 0;
    const deliveryFeeMinor =
      options.deliveryFeeMinor ??
      this.getDeliveryFeeMinor(options.deliveryOptionId);
    const giftTotalMinor =
      options.giftTotalMinor ?? this.getGiftTotalMinor(options.giftOptionId);
    const finalAmountMinor =
      subtotalMinor -
      discountTotalMinor +
      taxTotalMinor +
      deliveryFeeMinor +
      giftTotalMinor;

    if (finalAmountMinor <= 0) {
      throw new BadRequestException('Сумма заказа должна быть больше нуля');
    }
    if (finalAmountMinor % 100 !== 0) {
      throw new BadRequestException(
        'Некорректная сумма заказа: finalAmountMinor должен быть кратен 100',
      );
    }

    return {
      subtotalMinor,
      discountTotalMinor,
      taxTotalMinor,
      deliveryFeeMinor,
      giftTotalMinor,
      finalAmountMinor,
      totalPrice: finalAmountMinor / 100,
    };
  }

  private assertCanChangeItems(orderStatus: OrderStatus) {
    if (
      orderStatus === 'PAID' ||
      orderStatus === 'SHIPPED' ||
      orderStatus === 'COMPLETED' ||
      orderStatus === 'CANCELED'
    ) {
      throw new BadRequestException(
        'Нельзя менять состав заказа после оплаты, отправки, завершения или отмены',
      );
    }
  }

  private aggregateItems(
    items: Array<{ productId: number; quantity: number }>,
  ) {
    const totals = new Map<number, number>();
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) {
        throw new BadRequestException('Количество должно быть больше 0');
      }
      totals.set(
        item.productId,
        (totals.get(item.productId) ?? 0) + item.quantity,
      );
    }
    return Array.from(totals.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  private calculateCustomCakePrice(config: unknown) {
    try {
      return calculateCandyCakePrice(config as any);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Некорректная конфигурация конфетного торта',
      );
    }
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

    const cartSnapshotItems = await (this.prisma as any).cartItem.findMany({
      where: {
        cart: {
          userId,
        },
      },
      select: {
        id: true,
        productId: true,
        quantity: true,
        customName: true,
        customConfig: true,
        customPreviewUrl: true,
        customPrice: true,
      },
    });
    const productCartItems = cartSnapshotItems.filter((item) => item.productId);
    const customCartItems = cartSnapshotItems.filter(
      (item) => !item.productId && item.customConfig,
    );
    const sourceItems = this.aggregateItems(
      productCartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    );
    if (!sourceItems.length && !customCartItems.length) {
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
    const pricedItems = sourceItems.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return { ...item, price: product.price };
    });
    const customPricedItems = customCartItems.map((item) => {
      if (item.quantity <= 0) {
        throw new BadRequestException('Количество должно быть больше 0');
      }
      return {
        cartItemId: item.id,
        productName: item.customName ?? 'Индивидуальный конфетный торт',
        quantity: item.quantity,
        price: this.calculateCustomCakePrice(item.customConfig),
        customConfig: item.customConfig,
        customPreviewUrl: item.customPreviewUrl ?? null,
      };
    });
    const allPricedItems = [...pricedItems, ...customPricedItems];
    const totals = this.calculateCommercialTotals(allPricedItems, {
      deliveryOptionId: dto.deliveryOptionId,
      giftOptionId: dto.giftOptionId,
    });
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
      const stockOrderItems = sourceItems.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      });
      const customOrderItems = customPricedItems.map((item) => ({
        productId: null,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        customConfig: item.customConfig,
        customPreviewUrl: item.customPreviewUrl,
      }));

      const order = await (tx as any).order.create({
        data: {
          userId: userId ?? undefined,
          idempotencyKey: normalizedIdempotencyKey,
          address,
          totalPrice: totals.totalPrice,
          currency,
          subtotalMinor: totals.subtotalMinor,
          discountTotalMinor: totals.discountTotalMinor,
          taxTotalMinor: totals.taxTotalMinor,
          deliveryFeeMinor: totals.deliveryFeeMinor,
          giftTotalMinor: totals.giftTotalMinor,
          finalAmountMinor: totals.finalAmountMinor,
          items: {
            create: [...stockOrderItems, ...customOrderItems],
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
        currency: true,
        finalAmountMinor: true,
        createdAt: true,
        id: true,
        publicOrderNumber: true,
      },
    });
    if (!orders) throw new NotFoundException(`User with #${userId} not found`);
    return orders;
  }

  async update(id: number, dto: UpdateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) throw new NotFoundException(`Order #${id} not found`);

      const data: Prisma.OrderUpdateInput = {};
      let stockItems: Array<{ productId: number | null; quantity: number }> =
        order.items;

      if (dto.status) data.status = dto.status;

      // Если пришли новые items
      if (dto.items) {
        this.assertCanChangeItems(order.status);
        if (order.items.some((item) => !item.productId)) {
          throw new BadRequestException(
            'Заказы с индивидуальными конфетными тортами пока нельзя менять по составу',
          );
        }
        const requestedItems = this.aggregateItems(dto.items);
        if (!requestedItems.length) {
          throw new BadRequestException(
            'В заказе должен быть хотя бы один товар',
          );
        }

        const productIds = requestedItems.map((i) => i.productId);
        const products = await tx.product.findMany({
          where: { id: { in: productIds } },
          select: {
            id: true,
            name: true,
            price: true,
          },
        });
        if (products.length !== productIds.length) {
          const foundIds = new Set(products.map((p) => p.id));
          const missingId = productIds.find(
            (productId) => !foundIds.has(productId),
          );
          throw new NotFoundException(`Product #${missingId} not found`);
        }

        await this.reconcileReservedStock(tx, order.items, requestedItems);

        // Сначала удаляем старые
        await tx.orderItem.deleteMany({
          where: { orderId: id },
        });

        // Потом создаём новые
        const nextItems = requestedItems.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return {
            product: { connect: { id: item.productId } },
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          };
        });
        const totals = this.calculateCommercialTotals(nextItems, {
          deliveryFeeMinor: order.deliveryFeeMinor ?? 0,
          giftTotalMinor: (order as any).giftTotalMinor ?? 0,
        });
        data.subtotalMinor = totals.subtotalMinor;
        data.discountTotalMinor = totals.discountTotalMinor;
        data.taxTotalMinor = totals.taxTotalMinor;
        data.deliveryFeeMinor = totals.deliveryFeeMinor;
        data.giftTotalMinor = totals.giftTotalMinor;
        data.finalAmountMinor = totals.finalAmountMinor;
        data.totalPrice = totals.totalPrice;

        data.items = {
          create: nextItems,
        };
        stockItems = requestedItems;
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data,
        include: { items: true },
      });

      if (dto.status && dto.status !== order.status) {
        if (dto.status === 'PAID') {
          await this.consumeReservedStock(tx, stockItems);
        }
        if (dto.status === 'CANCELED' && order.status !== 'PAID') {
          await this.releaseReservedStock(tx, order.items);
        }
      }

      return updatedOrder;
    });
  }

  async remove(id: number) {
    return await this.prisma.order.delete({ where: { id } });
  }

  private async consumeReservedStock(
    tx: any,
    items: Array<{ productId: number | null; quantity: number }>,
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
    }
  }

  private async reserveAdditionalStock(
    tx: any,
    productId: number,
    quantity: number,
  ) {
    const updated = await tx.$executeRaw`
      UPDATE "products"
      SET "reserved_qty" = "reserved_qty" + ${quantity}
      WHERE "id" = ${productId}
        AND ("in_stock" - "reserved_qty") >= ${quantity}
    `;

    if (updated === 0) {
      throw new BadRequestException(
        `Недостаточно доступного остатка для товара #${productId}`,
      );
    }
  }

  private async reconcileReservedStock(
    tx: any,
    oldItems: Array<{ productId: number | null; quantity: number }>,
    nextItems: Array<{ productId: number; quantity: number }>,
  ) {
    const oldQty = new Map<number, number>();
    const nextQty = new Map<number, number>();

    for (const item of oldItems) {
      if (!item.productId) continue;
      oldQty.set(
        item.productId,
        (oldQty.get(item.productId) ?? 0) + item.quantity,
      );
    }
    for (const item of nextItems) {
      nextQty.set(
        item.productId,
        (nextQty.get(item.productId) ?? 0) + item.quantity,
      );
    }

    const productIds = new Set([...oldQty.keys(), ...nextQty.keys()]);
    for (const productId of productIds) {
      const diff = (nextQty.get(productId) ?? 0) - (oldQty.get(productId) ?? 0);
      if (diff > 0) {
        await this.reserveAdditionalStock(tx, productId, diff);
      }
      if (diff < 0) {
        await this.releaseReservedStock(tx, [
          { productId, quantity: Math.abs(diff) },
        ]);
      }
    }
  }

  private async releaseReservedStock(
    tx: any,
    items: Array<{ productId: number | null; quantity: number }>,
  ) {
    for (const item of items) {
      if (!item.productId) continue;
      await (tx as any).product.updateMany({
        where: {
          id: item.productId,
          reservedQty: { gte: item.quantity },
        },
        data: {
          reservedQty: { decrement: item.quantity },
        },
      });
    }
  }
}
