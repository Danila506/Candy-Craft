import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Order, OrderCreateDto, OrderStatusKey } from "../../types/OrderType";

export type OrderUpdateDto = {
    status?: OrderStatusKey;
    totalPrice?: number;
    items?: { productId: number; quantity: number }[];
};



type OrderContextType = {
    orders: Order[];
    fetchOrders: () => Promise<void>;
    updateOrder: (id: number, data: OrderUpdateDto) => Promise<void>;
    deleteOrder: (id: number) => Promise<void>;
    createOrder: (data: OrderCreateDto) => Promise<void>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used within OrderProvider");
    return context;
};

type Props = { children: ReactNode };

export const OrderProvider = ({ children }: Props) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:3000/orders");
            if (!res.ok) throw new Error("Не удалось загрузить заказы");
            const data: Order[] = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createOrder = async (data: OrderCreateDto) => {
      try {
          const res = await fetch(`http://localhost:3000/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Не удалось создать заказ");
          const created: Order = await res.json();
          setOrders((prev) => [...prev, created]);
          console.log(created);
      } catch (err) {
          console.error(err);
      }
    };

    const updateOrder = async (id: number, data: OrderUpdateDto) => {
        try {
            const res = await fetch(`http://localhost:3000/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log(res);
            if (!res.ok) throw new Error("Не удалось обновить заказ");
            const updated: Order = await res.json();
            setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteOrder = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/orders/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Не удалось удалить заказ");
            setOrders((prev) => prev.filter((o) => o.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{ orders, fetchOrders, updateOrder, deleteOrder, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
