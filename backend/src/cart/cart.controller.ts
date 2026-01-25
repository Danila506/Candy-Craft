import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Получить корзину пользователя
  @Get(':userId')
  getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCart(userId);
  }

  // Добавить товар в корзину
  @Post(':userId/items')
  @HttpCode(HttpStatus.CREATED)
  addToCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCartDto: CreateCartItemDto,
  ) {
    return this.cartService.addToCart(userId, createCartDto);
  }

  // Обновить количество товара в корзине
  @Patch(':userId/items/:productId')
  updateCartItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(
      userId,
      productId,
      updateCartItemDto.quantity,
    );
  }

  // Удалить товар из корзины
  @Delete(':userId/items/:productId')
  @HttpCode(HttpStatus.OK)
  removeFromCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }

  // Очистить корзину
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.clearCart(userId);
  }

  // Получить количество товаров в корзине
  @Get(':userId/count')
  getCartItemsCount(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCartItemsCount(userId);
  }
}
