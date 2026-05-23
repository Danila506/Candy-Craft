import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CreateCustomCandyCakeDto } from './dto/create-custom-candy-cake.dto';
import { calculateCandyCakePrice } from 'src/candy-cake/candy-cake-pricing';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private async getOrCreateCart(userId: number, tx: any = this.prisma) {
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

  private toCartResponseItem(item: any) {
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
      name: item.customName ?? 'Индивидуальный конфетный торт',
      productId: null,
      inStock: 5,
      reservedQty: 0,
      quantity: item.quantity,
      price: item.customPrice ?? 0,
      imageUrl: item.customPreviewUrl ?? '',
      isCustom: true,
      customConfig: item.customConfig,
      customPreviewUrl: item.customPreviewUrl,
    };
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

  // Получить корзину пользователя
  async getCart(userId: number) {
    const cartItems = await (this.prisma as any).cartItem.findMany({
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
        id: 'asc',
      },
    });

    return cartItems.map((item) => this.toCartResponseItem(item));
  }

  // Добавить товар в корзину
  async addToCart(userId: number, createCartDto: CreateCartItemDto) {
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
        throw new NotFoundException('Product not found');
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
        throw new BadRequestException(
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

  async addCustomCandyCake(
    userId: number,
    createCustomCakeDto: CreateCustomCandyCakeDto,
  ) {
    const customPrice = this.calculateCustomCakePrice(
      createCustomCakeDto.config,
    );
    const quantity = createCustomCakeDto.quantity ?? 1;

    const result = await this.prisma.$transaction(async (tx) => {
      const cart = await this.getOrCreateCart(userId, tx);

      const cartItem = await (tx as any).cartItem.create({
        data: {
          cartId: cart.id,
          productId: null,
          quantity,
          customName: 'Индивидуальный конфетный торт',
          customConfig: createCustomCakeDto.config as any,
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
    if (!cartItem.product) {
      throw new BadRequestException(
        'Use cart item endpoint for custom candy cakes',
      );
    }

    // Проверяем наличие на складе
    const available = Math.max(
      0,
      cartItem.product.inStock - cartItem.product.reservedQty,
    );
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

  async updateCartItemById(
    userId: number,
    cartItemId: number,
    quantity: number,
  ) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be positive');
    }

    const cartItem = await (this.prisma as any).cartItem.findFirst({
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
      throw new NotFoundException('Item not found in cart');
    }

    if (cartItem.product) {
      const available = Math.max(
        0,
        cartItem.product.inStock - cartItem.product.reservedQty,
      );
      if (available < quantity) {
        throw new BadRequestException(
          `Not enough stock. Available: ${available}`,
        );
      }
    }

    const updated = await (this.prisma as any).cartItem.update({
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

  async removeCartItemById(userId: number, cartItemId: number) {
    const cartItem = await (this.prisma as any).cartItem.findFirst({
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
      throw new NotFoundException('Item not found in cart');
    }

    await (this.prisma as any).cartItem.delete({
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
