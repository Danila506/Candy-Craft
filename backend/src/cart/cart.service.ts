import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // Получить корзину пользователя
  async getCart(userId: number) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      select: {
        productId: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            inStock: true,
            imageUrl: true,
            categoryId: true,
          },
        },
      },
    });

    return (cartItems as any[]).map((item) => ({
      ...item.product,
      productId: item.productId,
      quantity: item.quantity,
      reservedQty: item.product?.reservedQty ?? 0,
    }));
  }

  // Добавить товар в корзину
  async addToCart(userId: number, createCartDto: CreateCartItemDto) {
    const { productId } = createCartDto;

    // Проверяем существование товара
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      let cart = await tx.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
        });
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
          productId: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              inStock: true,
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
      item: {
        ...(result.cartItem as any).product,
        productId: result.cartItem.productId,
        quantity: result.cartItem.quantity,
        reservedQty: (result.cartItem as any).product?.reservedQty ?? 0,
      },
      count: result.count,
    };
  }

  // Обновить количество товара в корзине
  async updateCartItem(userId: number, productId: number, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be positive');
    }

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
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
      throw new NotFoundException('Item not found in cart');
    }

    // Проверяем наличие на складе
    const reservedQty = (cartItem.product as any).reservedQty ?? 0;
    const available = Math.max(0, cartItem.product.inStock - reservedQty);
    if (available < quantity) {
      throw new BadRequestException(
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

  // Удалить товар из корзины
  async removeFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
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
      throw new NotFoundException('Item not found in cart');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    return { message: 'Item removed from cart' };
  }

  // Очистить корзину
  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { message: 'Cart cleared' };
  }

  // Получить количество товаров в корзине
  async getCartItemsCount(userId: number) {
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
}
