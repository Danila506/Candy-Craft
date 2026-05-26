import { CartService } from "./cart.service";
import type { Request } from "express";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { CreateCustomCandyCakeDto } from "./dto/create-custom-candy-cake.dto";
export declare class CartController {
  private readonly cartService;
  constructor(cartService: CartService);
  private getAuthorizedUserId;
  getCartItemsCount(
    req: Request,
    userId: number,
  ): Promise<{
    count: number;
  }>;
  getCart(req: Request, userId: number): Promise<any>;
  addToCart(
    req: Request,
    userId: number,
    createCartDto: CreateCartItemDto,
  ): Promise<{
    item: any;
    count: number;
  }>;
  addCustomCandyCake(
    req: Request,
    userId: number,
    createCustomCakeDto: CreateCustomCandyCakeDto,
  ): Promise<{
    item: any;
    count: number;
  }>;
  updateCartItem(
    req: Request,
    userId: number,
    productId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<
    {
      product: {
        id: number;
        name: string;
        description: string;
        imageUrl: string;
        sku: string;
        slug: string;
        price: number;
        isActive: boolean;
        deletedAt: Date | null;
        inStock: number;
        reservedQty: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } & {
      id: number;
      quantity: number;
      customConfig: import("@prisma/client/runtime/client").JsonValue | null;
      customPreviewUrl: string | null;
      productId: number | null;
      cartId: number;
      customName: string | null;
      customPrice: number | null;
    }
  >;
  updateCartItemById(
    req: Request,
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<any>;
  removeFromCart(
    req: Request,
    userId: number,
    productId: number,
  ): Promise<{
    message: string;
  }>;
  removeCartItemById(
    req: Request,
    userId: number,
    cartItemId: number,
  ): Promise<{
    message: string;
  }>;
  clearCart(
    req: Request,
    userId: number,
  ): Promise<{
    message: string;
  }>;
}
