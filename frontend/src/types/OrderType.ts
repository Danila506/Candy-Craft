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
    userId: number;
    status: OrderStatusKey;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
};


export type  CreateOrderItemDto = {
  productId: number
  quantity: number
}

export type OrderCreateDto = {
  userId: number
  items: CreateOrderItemDto[]
}