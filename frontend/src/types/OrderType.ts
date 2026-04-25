export const OrderStatusLabels = {
  PENDING: "Создан",
  PAID: "Оплачен",
  PROCESSING: "Собирается",
  SHIPPED: "Отправлен",
  COMPLETED: "Выполнен",
  CANCELED: "Отменён",
} as const;

export type OrderStatusKey = keyof typeof OrderStatusLabels; // "PENDING" | "PAID" | ...

export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  publicOrderNumber?: string | null;
  userId: number;
  status: OrderStatusKey;
  totalPrice?: number; // legacy compatibility
  currency?: string;
  subtotalMinor?: number;
  discountTotalMinor?: number;
  taxTotalMinor?: number;
  deliveryFeeMinor?: number;
  giftTotalMinor?: number;
  finalAmountMinor?: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  fullName: string;
};

export type CreateOrderItemDto = {
  productId: number;
  quantity: number;
};

export type OrderCreateDto = {
  userId: number;
  fullName?: string;
  phone?: string;
  address?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
  comment?: string;
  currency?: string;
  deliveryOptionId?: number;
  giftOptionId?: number;
  items?: CreateOrderItemDto[];
};

export type OrderCreateResponseV2 = {
  id: number;
  publicOrderNumber?: string | null;
  currency: string;
  subtotalMinor: number;
  discountTotalMinor: number;
  taxTotalMinor: number;
  deliveryFeeMinor: number;
  giftTotalMinor: number;
  finalAmountMinor: number;
};
