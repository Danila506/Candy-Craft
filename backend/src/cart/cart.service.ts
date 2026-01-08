import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
        userId: userId
      }
    },
    include: {
      product: true  // только продукт, без категории
    }
  });

  // Просто массив продуктов
  const products = cartItems.map(item => item.product);
  
  return products;

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



    // Находим или создаем корзину
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Проверяем, есть ли уже этот товар в корзине
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });


    // Добавляем новый товар в корзину
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
      },
      include: {
        product: true,
      },
    });
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
    if (cartItem.product.inStock < quantity) {
      throw new BadRequestException(
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

  // Удалить товар из корзины
  async removeFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found')
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