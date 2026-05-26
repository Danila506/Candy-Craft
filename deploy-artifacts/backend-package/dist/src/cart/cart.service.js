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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const candy_cake_pricing_1 = require("../candy-cake/candy-cake-pricing");
let CartService = class CartService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async getOrCreateCart(userId, tx = this.prisma) {
    let cart = await tx.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      cart = await tx.cart.create({
        data: { userId },
      });
    }
    return cart;
  }
  toCartResponseItem(item) {
    if (item.product) {
      return {
        id: item.id,
        ...item.product,
        productId: item.productId,
        quantity: item.quantity,
        isCustom: false,
      };
    }
    return {
      id: item.id,
      name: item.customName ?? "Индивидуальный конфетный торт",
      productId: null,
      inStock: 5,
      reservedQty: 0,
      quantity: item.quantity,
      price: item.customPrice ?? 0,
      imageUrl: item.customPreviewUrl ?? "",
      isCustom: true,
      customConfig: item.customConfig,
      customPreviewUrl: item.customPreviewUrl,
    };
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
  async getCart(userId) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
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
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            inStock: true,
            reservedQty: true,
            imageUrl: true,
            categoryId: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return cartItems.map((item) => this.toCartResponseItem(item));
  }
  async addToCart(userId, createCartDto) {
    const { productId } = createCartDto;
    const result = await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          inStock: true,
          reservedQty: true,
        },
      });
      if (!product) {
        throw new common_1.NotFoundException("Product not found");
      }
      const cart = await this.getOrCreateCart(userId, tx);
      const existingCartItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        select: {
          quantity: true,
        },
      });
      const requestedQuantity = (existingCartItem?.quantity ?? 0) + 1;
      const available = Math.max(0, product.inStock - product.reservedQty);
      if (available < requestedQuantity) {
        throw new common_1.BadRequestException(
          `Not enough stock. Available: ${available}`,
        );
      }
      const cartItem = await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          cartId: cart.id,
          productId,
        },
        select: {
          id: true,
          productId: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              inStock: true,
              reservedQty: true,
              imageUrl: true,
              categoryId: true,
            },
          },
        },
      });
      const totals = await tx.cartItem.aggregate({
        where: {
          cartId: cart.id,
        },
        _sum: {
          quantity: true,
        },
      });
      return {
        cartItem,
        count: totals._sum.quantity ?? 0,
      };
    });
    return {
      item: this.toCartResponseItem(result.cartItem),
      count: result.count,
    };
  }
  async addCustomCandyCake(userId, createCustomCakeDto) {
    const customPrice = this.calculateCustomCakePrice(
      createCustomCakeDto.config,
    );
    const quantity = createCustomCakeDto.quantity ?? 1;
    const result = await this.prisma.$transaction(async (tx) => {
      const cart = await this.getOrCreateCart(userId, tx);
      const cartItem = await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId: null,
          quantity,
          customName: "Индивидуальный конфетный торт",
          customConfig: createCustomCakeDto.config,
          customPreviewUrl: null,
          customPrice,
        },
        select: {
          id: true,
          productId: true,
          quantity: true,
          customName: true,
          customConfig: true,
          customPreviewUrl: true,
          customPrice: true,
          product: true,
        },
      });
      const totals = await tx.cartItem.aggregate({
        where: {
          cartId: cart.id,
        },
        _sum: {
          quantity: true,
        },
      });
      return {
        cartItem,
        count: totals._sum.quantity ?? 0,
      };
    });
    return {
      item: this.toCartResponseItem(result.cartItem),
      count: result.count,
    };
  }
  async updateCartItem(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new common_1.BadRequestException("Quantity must be positive");
    }
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException("Cart not found");
    }
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      include: {
        product: true,
      },
    });
    if (!cartItem) {
      throw new common_1.NotFoundException("Item not found in cart");
    }
    if (!cartItem.product) {
      throw new common_1.BadRequestException(
        "Use cart item endpoint for custom candy cakes",
      );
    }
    const available = Math.max(
      0,
      cartItem.product.inStock - cartItem.product.reservedQty,
    );
    if (available < quantity) {
      throw new common_1.BadRequestException(
        `Not enough stock. Available: ${available}`,
      );
    }
    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: {
        product: true,
      },
    });
  }
  async updateCartItemById(userId, cartItemId, quantity) {
    if (quantity <= 0) {
      throw new common_1.BadRequestException("Quantity must be positive");
    }
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      include: {
        product: true,
      },
    });
    if (!cartItem) {
      throw new common_1.NotFoundException("Item not found in cart");
    }
    if (cartItem.product) {
      const available = Math.max(
        0,
        cartItem.product.inStock - cartItem.product.reservedQty,
      );
      if (available < quantity) {
        throw new common_1.BadRequestException(
          `Not enough stock. Available: ${available}`,
        );
      }
    }
    const updated = await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      select: {
        id: true,
        productId: true,
        quantity: true,
        customName: true,
        customConfig: true,
        customPreviewUrl: true,
        customPrice: true,
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            inStock: true,
            reservedQty: true,
            imageUrl: true,
            categoryId: true,
          },
        },
      },
    });
    return this.toCartResponseItem(updated);
  }
  async removeFromCart(userId, productId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException("Cart not found");
    }
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    if (!cartItem) {
      throw new common_1.NotFoundException("Item not found in cart");
    }
    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
    return { message: "Item removed from cart" };
  }
  async removeCartItemById(userId, cartItemId) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      select: {
        id: true,
      },
    });
    if (!cartItem) {
      throw new common_1.NotFoundException("Item not found in cart");
    }
    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
    return { message: "Item removed from cart" };
  }
  async clearCart(userId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException("Cart not found");
    }
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return { message: "Cart cleared" };
  }
  async getCartItemsCount(userId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });
    if (!cart) {
      return { count: 0 };
    }
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return { count: totalItems };
  }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService]),
  ],
  CartService,
);
//# sourceMappingURL=cart.service.js.map
