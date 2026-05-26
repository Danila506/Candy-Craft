declare class CreateOrderItemDto {
  productId: number;
  quantity: number;
}
export declare class CreateOrderDto {
  fullName?: string;
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
  postalCode?: string;
  comment?: string;
  currency?: string;
  deliveryOptionId?: number;
  giftOptionId?: number;
  items?: CreateOrderItemDto[];
}
export {};
