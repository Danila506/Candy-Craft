import { PrismaService } from "../prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { CreateCustomCandyCakeDto } from "./dto/create-custom-candy-cake.dto";
export declare class CartService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  private getOrCreateCart;
  private toCartResponseItem;
  private calculateCustomCakePrice;
  getCart(userId: number): Promise<any>;
  addToCart(
    userId: number,
    createCartDto: CreateCartItemDto,
  ): Promise<{
    item: any;
    count: number;
  }>;
  addCustomCandyCake(
    userId: number,
    createCustomCakeDto: CreateCustomCandyCakeDto,
  ): Promise<{
    item: any;
    count: number;
  }>;
  updateCartItem(
    userId: number,
    productId: number,
    quantity: number,
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
    userId: number,
    cartItemId: number,
    quantity: number,
  ): Promise<any>;
  removeFromCart(
    userId: number,
    productId: number,
  ): Promise<{
    message: string;
  }>;
  removeCartItemById(
    userId: number,
    cartItemId: number,
  ): Promise<{
    message: string;
  }>;
  clearCart(userId: number): Promise<{
    message: string;
  }>;
  getCartItemsCount(userId: number): Promise<{
    count: number;
  }>;
}
