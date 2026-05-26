import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderOptionsService } from "./order-options.service";
import type { Request } from "express";
export declare class OrdersController {
  private readonly ordersService;
  private readonly orderOptions;
  constructor(ordersService: OrdersService, orderOptions: OrderOptionsService);
  private getAuthorizedUserId;
  create(
    userId: number,
    idempotencyKey: string | undefined,
    req: Request,
    createOrderDto: CreateOrderDto,
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
        customConfig: import("@prisma/client/runtime/client").JsonValue | null;
        customPreviewUrl: string | null;
        productId: number | null;
        orderId: number;
      }[];
    }[]
  >;
  findMyOrders(req: Request): Promise<any>;
  getOptions(): {
    delivery: {
      price: number;
      id: number;
      name: string;
      description: string;
      priceMinor: number;
      time?: string;
      available?: boolean;
    }[];
    gifts: {
      price: number;
      id: number;
      name: string;
      description: string;
      priceMinor: number;
      time?: string;
      available?: boolean;
    }[];
  };
  findOne(id: number, req: Request): Promise<any>;
  findStatusHistory(id: string): Promise<
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
  update(
    id: string,
    req: Request,
    updateOrderDto: UpdateOrderDto,
  ): Promise<
    {
      items: {
        id: number;
        price: number;
        productName: string;
        quantity: number;
        customConfig: import("@prisma/client/runtime/client").JsonValue | null;
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
  remove(id: string): Promise<{
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
}
