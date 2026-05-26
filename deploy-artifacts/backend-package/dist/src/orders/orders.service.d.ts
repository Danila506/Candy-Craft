import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { OrderOptionsService } from "./order-options.service";
export declare class OrdersService {
  private prisma;
  private readonly orderOptions;
  constructor(prisma: PrismaService, orderOptions: OrderOptionsService);
  private buildPublicOrderNumber;
  private getDeliveryFeeMinor;
  private getGiftTotalMinor;
  private calculateCommercialTotals;
  private assertCanChangeItems;
  private aggregateItems;
  private calculateCustomCakePrice;
  create(
    dto: CreateOrderDto,
    userId: number,
    idempotencyKey?: string,
  ): Promise<any>;
  findAll(): Promise<
    {
      id: number;
      publicOrderNumber: any;
      totalPrice: number;
      currency: string;
      subtotalMinor: number;
      discountTotalMinor: number;
      taxTotalMinor: number;
      deliveryFeeMinor: number;
      giftTotalMinor: any;
      finalAmountMinor: number;
      status: import("@prisma/client").$Enums.OrderStatus;
      createdAt: Date;
      fullName: string;
      items: {
        id: number;
        price: number;
        productName: string;
        quantity: number;
        customConfig: Prisma.JsonValue | null;
        customPreviewUrl: string | null;
        productId: number | null;
        orderId: number;
      }[];
    }[]
  >;
  findOrders(userId: number): Promise<any>;
  update(
    id: number,
    dto: UpdateOrderDto,
    changedByUserId?: number,
  ): Promise<
    {
      items: {
        id: number;
        price: number;
        productName: string;
        quantity: number;
        customConfig: Prisma.JsonValue | null;
        customPreviewUrl: string | null;
        productId: number | null;
        orderId: number;
      }[];
    } & {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      userId: number;
      publicOrderNumber: string | null;
      idempotencyKey: string | null;
      status: import("@prisma/client").$Enums.OrderStatus;
      totalPrice: number;
      currency: string;
      subtotalMinor: number;
      discountTotalMinor: number;
      taxTotalMinor: number;
      deliveryFeeMinor: number;
      giftTotalMinor: number;
      finalAmountMinor: number;
      address: string;
    }
  >;
  getStatusHistory(orderId: number): Promise<
    {
      id: number;
      createdAt: Date;
      fromStatus: import("@prisma/client").$Enums.OrderStatus | null;
      toStatus: import("@prisma/client").$Enums.OrderStatus;
      reason: string | null;
      changedBy: {
        id: number;
        email: string | null;
        firstName: string;
        lastName: string;
      } | null;
    }[]
  >;
  remove(id: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    publicOrderNumber: string | null;
    idempotencyKey: string | null;
    status: import("@prisma/client").$Enums.OrderStatus;
    totalPrice: number;
    currency: string;
    subtotalMinor: number;
    discountTotalMinor: number;
    taxTotalMinor: number;
    deliveryFeeMinor: number;
    giftTotalMinor: number;
    finalAmountMinor: number;
    address: string;
  }>;
  private consumeReservedStock;
  private reserveAdditionalStock;
  private reconcileReservedStock;
  private releaseReservedStock;
}
