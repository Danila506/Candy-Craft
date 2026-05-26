export declare enum OrderStatusKey {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
export declare class UpdateOrderItemDto {
  productId: number;
  quantity: number;
}
export declare class UpdateOrderDto {
  status?: OrderStatusKey;
  statusReason?: string;
  items?: UpdateOrderItemDto[];
}
