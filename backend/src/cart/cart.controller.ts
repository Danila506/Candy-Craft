import {
  ForbiddenException,
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import type { Request } from 'express';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCustomCandyCakeDto } from './dto/create-custom-candy-cake.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private getAuthorizedUserId(req: Request, requestUserId: number) {
    const authUserId = (req as any).user?.userId as number | undefined;

    if (!authUserId || authUserId !== requestUserId) {
      throw new ForbiddenException('You can only access your own cart');
    }
    return authUserId;
  }

  @Get(':userId/count')
  getCartItemsCount(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.getCartItemsCount(authorizedUserId);
  }

  // Получить корзину пользователя
  @Get(':userId')
  getCart(@Req() req: Request, @Param('userId', ParseIntPipe) userId: number) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.getCart(authorizedUserId);
  }

  // Добавить товар в корзину
  @Post(':userId/items')
  @HttpCode(HttpStatus.CREATED)
  addToCart(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCartDto: CreateCartItemDto,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.addToCart(authorizedUserId, createCartDto);
  }

  @Post(':userId/custom-candy-cakes')
  @HttpCode(HttpStatus.CREATED)
  addCustomCandyCake(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCustomCakeDto: CreateCustomCandyCakeDto,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.addCustomCandyCake(
      authorizedUserId,
      createCustomCakeDto,
    );
  }

  // Обновить количество товара в корзине
  @Patch(':userId/items/:productId')
  updateCartItem(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.updateCartItem(
      authorizedUserId,
      productId,
      updateCartItemDto.quantity,
    );
  }

  @Patch(':userId/custom-items/:cartItemId')
  updateCartItemById(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.updateCartItemById(
      authorizedUserId,
      cartItemId,
      updateCartItemDto.quantity,
    );
  }

  // Удалить товар из корзины
  @Delete(':userId/items/:productId')
  @HttpCode(HttpStatus.OK)
  removeFromCart(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.removeFromCart(authorizedUserId, productId);
  }

  @Delete(':userId/custom-items/:cartItemId')
  @HttpCode(HttpStatus.OK)
  removeCartItemById(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.removeCartItemById(authorizedUserId, cartItemId);
  }

  // Очистить корзину
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  clearCart(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.clearCart(authorizedUserId);
  }
}
