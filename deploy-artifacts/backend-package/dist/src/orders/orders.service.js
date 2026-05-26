"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const phone_1 = require("../utils/phone");
const order_options_service_1 = require("./order-options.service");
const candy_cake_pricing_1 = require("../candy-cake/candy-cake-pricing");
function cleanText(value) {
  const v = value?.trim();
  return v ? v : null;
}
function buildStructuredAddress(dto) {
  const parts = [
    cleanText(dto.city),
    cleanText(dto.street),
    cleanText(dto.house) ? `д. ${cleanText(dto.house)}` : null,
    cleanText(dto.apartment) ? `кв. ${cleanText(dto.apartment)}` : null,
    cleanText(dto.entrance) ? `подъезд ${cleanText(dto.entrance)}` : null,
    cleanText(dto.floor) ? `этаж ${cleanText(dto.floor)}` : null,
  ].filter(Boolean);
  if (!parts.length) return null;
  return parts.join(", ");
}
let OrdersService = class OrdersService {
  prisma;
  orderOptions;
  constructor(prisma, orderOptions) {
    this.prisma = prisma;
    this.orderOptions = orderOptions;
  }
  buildPublicOrderNumber(id, createdAt) {
    const year = createdAt.getFullYear();
    return `ORD-${year}-${String(id).padStart(6, "0")}`;
  }
  getDeliveryFeeMinor(deliveryOptionId) {
    return this.orderOptions.getDeliveryFeeMinor(deliveryOptionId);
  }
  getGiftTotalMinor(giftOptionId) {
    return this.orderOptions.getGiftTotalMinor(giftOptionId);
  }
  calculateCommercialTotals(items, options = {}) {
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
      throw new common_1.BadRequestException(
        "Сумма заказа должна быть больше нуля",
      );
    }
    if (finalAmountMinor % 100 !== 0) {
      throw new common_1.BadRequestException(
        "Некорректная сумма заказа: finalAmountMinor должен быть кратен 100",
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
  assertCanChangeItems(orderStatus) {
    if (
      orderStatus === "PAID" ||
      orderStatus === "SHIPPED" ||
      orderStatus === "COMPLETED" ||
      orderStatus === "CANCELED"
    ) {
      throw new common_1.BadRequestException(
        "Нельзя менять состав заказа после оплаты, отправки, завершения или отмены",
      );
    }
  }
  aggregateItems(items) {
    const totals = new Map();
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) {
        throw new common_1.BadRequestException(
          "Количество должно быть больше 0",
        );
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
  calculateCustomCakePrice(config) {
    try {
      return (0, candy_cake_pricing_1.calculateCandyCakePrice)(config);
    } catch (error) {
      throw new common_1.BadRequestException(
        error instanceof Error
          ? error.message
          : "Некорректная конфигурация конфетного торта",
      );
    }
  }
  async create(dto, userId, idempotencyKey) {
    const normalizedIdempotencyKey = cleanText(idempotencyKey ?? undefined);
    if (normalizedIdempotencyKey) {
      const existing = await this.prisma.order.findFirst({
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
      throw new common_1.BadRequestException("Корзина пуста");
    }
    const address = cleanText(dto.address) ?? buildStructuredAddress(dto);
    if (!address) {
      throw new common_1.BadRequestException("Адрес обязателен");
    }
    const recipientPhone = cleanText(dto.phone)
      ? (0, phone_1.normalizeRuPhone)(dto.phone)
      : null;
    if (dto.phone && !recipientPhone) {
      throw new common_1.BadRequestException(
        "Некорректный номер телефона получателя",
      );
    }
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
    for (const item of sourceItems) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new common_1.BadRequestException(
          `Товар ${item.productId} не найден`,
        );
      }
      if (item.quantity <= 0) {
        throw new common_1.BadRequestException(
          "Количество должно быть больше 0",
        );
      }
      const available = Math.max(
        0,
        product.inStock - (product.reservedQty ?? 0),
      );
      if (available < item.quantity) {
        throw new common_1.BadRequestException(
          `Недостаточно товара "${product.name}". Доступно: ${available}, нужно: ${item.quantity}`,
        );
      }
    }
    const pricedItems = sourceItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, price: product.price };
    });
    const customPricedItems = customCartItems.map((item) => {
      if (item.quantity <= 0) {
        throw new common_1.BadRequestException(
          "Количество должно быть больше 0",
        );
      }
      return {
        cartItemId: item.id,
        productName: item.customName ?? "Индивидуальный конфетный торт",
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
    const currency = cleanText(dto.currency)?.toUpperCase() || "RUB";
    return this.prisma.$transaction(async (tx) => {
      for (const item of sourceItems) {
        const updated = await tx.$executeRaw`
          UPDATE "products"
          SET "reserved_qty" = "reserved_qty" + ${item.quantity}
          WHERE "id" = ${item.productId}
            AND ("in_stock" - "reserved_qty") >= ${item.quantity}
        `;
        if (updated === 0) {
          const p = products.find((x) => x.id === item.productId);
          throw new common_1.BadRequestException(
            `Товар "${p?.name ?? item.productId}" закончился или не хватает доступного остатка`,
          );
        }
      }
      const stockOrderItems = sourceItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
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
      const order = await tx.order.create({
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
      const orderWithPublicNumber = await tx.order.update({
        where: { id: order.id },
        data: { publicOrderNumber },
        include: { items: true },
      });
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: null,
          toStatus: order.status,
          reason: "Order created",
          changedByUserId: userId ?? null,
        },
      });
      if (sourceItems.length) {
        await tx.inventoryMovement.createMany({
          data: sourceItems.map((item) => ({
            productId: item.productId,
            orderId: order.id,
            type: "RESERVE",
            quantity: item.quantity,
            note: "Reserved on order creation",
          })),
        });
      }
      await tx.orderAddress.create({
        data: {
          orderId: order.id,
          country: cleanText(dto.country) ?? "Россия",
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
        const existingUserAddress = await tx.userAddress.findFirst({
          where: {
            userId,
            fullAddress: address,
          },
          select: { id: true },
        });
        if (existingUserAddress) {
          await tx.userAddress.update({
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
          await tx.userAddress.create({
            data: {
              userId,
              country: cleanText(dto.country) ?? "Россия",
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
      publicOrderNumber: order.publicOrderNumber ?? null,
      totalPrice: order.totalPrice,
      currency: order.currency,
      subtotalMinor: order.subtotalMinor,
      discountTotalMinor: order.discountTotalMinor,
      taxTotalMinor: order.taxTotalMinor,
      deliveryFeeMinor: order.deliveryFeeMinor,
      giftTotalMinor: order.giftTotalMinor ?? 0,
      finalAmountMinor: order.finalAmountMinor,
      status: order.status,
      createdAt: order.createdAt,
      fullName: `${order.user.firstName} ${order.user.lastName}`,
      items: order.items,
    }));
  }
  async findOrders(userId) {
    const orders = await this.prisma.order.findMany({
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
    if (!orders)
      throw new common_1.NotFoundException(`User with #${userId} not found`);
    return orders;
  }
  async update(id, dto, changedByUserId) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });
      if (!order)
        throw new common_1.NotFoundException(`Order #${id} not found`);
      const data = {};
      let stockItems = order.items;
      if (dto.status) data.status = dto.status;
      if (dto.items) {
        this.assertCanChangeItems(order.status);
        if (order.items.some((item) => !item.productId)) {
          throw new common_1.BadRequestException(
            "Заказы с индивидуальными конфетными тортами пока нельзя менять по составу",
          );
        }
        const requestedItems = this.aggregateItems(dto.items);
        if (!requestedItems.length) {
          throw new common_1.BadRequestException(
            "В заказе должен быть хотя бы один товар",
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
          throw new common_1.NotFoundException(
            `Product #${missingId} not found`,
          );
        }
        await this.reconcileReservedStock(tx, order.items, requestedItems, id);
        await tx.orderItem.deleteMany({
          where: { orderId: id },
        });
        const nextItems = requestedItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            product: { connect: { id: item.productId } },
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          };
        });
        const totals = this.calculateCommercialTotals(nextItems, {
          deliveryFeeMinor: order.deliveryFeeMinor ?? 0,
          giftTotalMinor: order.giftTotalMinor ?? 0,
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
        if (dto.status === "PAID") {
          await this.consumeReservedStock(
            tx,
            stockItems,
            order.id,
            "Reserved stock consumed on manual PAID status",
          );
        }
        if (dto.status === "CANCELED" && order.status !== "PAID") {
          await this.releaseReservedStock(
            tx,
            order.items,
            order.id,
            "Reserved stock released on order cancellation",
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
  async getStatusHistory(orderId) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    });
    if (!order)
      throw new common_1.NotFoundException(`Order #${orderId} not found`);
    return this.prisma.orderStatusHistory.findMany({
      where: { orderId },
      orderBy: { createdAt: "desc" },
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
  async remove(id) {
    return await this.prisma.order.delete({ where: { id } });
  }
  async consumeReservedStock(tx, items, orderId, note) {
    for (const item of items) {
      if (!item.productId) continue;
      const updated = await tx.product.updateMany({
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
        throw new common_1.BadRequestException(
          `Не удалось списать резерв по товару #${item.productId}`,
        );
      }
      await tx.inventoryMovement.create({
        data: {
          productId: item.productId,
          orderId,
          type: "OUT",
          quantity: item.quantity,
          note,
        },
      });
    }
  }
  async reserveAdditionalStock(tx, productId, quantity, orderId) {
    const updated = await tx.$executeRaw`
      UPDATE "products"
      SET "reserved_qty" = "reserved_qty" + ${quantity}
      WHERE "id" = ${productId}
        AND ("in_stock" - "reserved_qty") >= ${quantity}
    `;
    if (updated === 0) {
      throw new common_1.BadRequestException(
        `Недостаточно доступного остатка для товара #${productId}`,
      );
    }
    await tx.inventoryMovement.create({
      data: {
        productId,
        orderId,
        type: "RESERVE",
        quantity,
        note: "Reserved stock increased on order item update",
      },
    });
  }
  async reconcileReservedStock(tx, oldItems, nextItems, orderId) {
    const oldQty = new Map();
    const nextQty = new Map();
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
        await this.reserveAdditionalStock(tx, productId, diff, orderId);
      }
      if (diff < 0) {
        await this.releaseReservedStock(
          tx,
          [{ productId, quantity: Math.abs(diff) }],
          orderId,
          "Reserved stock released on order item update",
        );
      }
    }
  }
  async releaseReservedStock(tx, items, orderId, note) {
    for (const item of items) {
      if (!item.productId) continue;
      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          reservedQty: { gte: item.quantity },
        },
        data: {
          reservedQty: { decrement: item.quantity },
        },
      });
      if (updated.count > 0) {
        await tx.inventoryMovement.create({
          data: {
            productId: item.productId,
            orderId,
            type: "RELEASE",
            quantity: item.quantity,
            note,
          },
        });
      }
    }
  }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [
      prisma_service_1.PrismaService,
      order_options_service_1.OrderOptionsService,
    ]),
  ],
  OrdersService,
);
//# sourceMappingURL=orders.service.js.map
