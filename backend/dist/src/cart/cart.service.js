'use strict';
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
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
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
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CartService = void 0;
const common_1 = require('@nestjs/common');
const prisma_service_1 = require('../prisma/prisma.service');
let CartService = class CartService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async getCart(userId) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      include: {
        product: true,
      },
    });
    return cartItems.map((item) => ({
      ...item.product,
      productId: item.productId,
      quantity: item.quantity,
    }));
  }
  async addToCart(userId, createCartDto) {
    const { productId } = createCartDto;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new common_1.NotFoundException('Product not found');
    }
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
        include: {
          product: true,
        },
      });
    }
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
      include: {
        product: true,
      },
    });
  }
  async updateCartItem(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new common_1.BadRequestException('Quantity must be positive');
    }
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException('Cart not found');
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
      throw new common_1.NotFoundException('Item not found in cart');
    }
    if (cartItem.product.inStock < quantity) {
      throw new common_1.BadRequestException(
        `Not enough stock. Available: ${cartItem.product.inStock}`,
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
  async removeFromCart(userId, productId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException('Cart not found');
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
      throw new common_1.NotFoundException('Item not found in cart');
    }
    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
    return { message: 'Item removed from cart' };
  }
  async clearCart(userId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });
    if (!cart) {
      throw new common_1.NotFoundException('Cart not found');
    }
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return { message: 'Cart cleared' };
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
    __metadata('design:paramtypes', [prisma_service_1.PrismaService]),
  ],
  CartService,
);
//# sourceMappingURL=cart.service.js.map
