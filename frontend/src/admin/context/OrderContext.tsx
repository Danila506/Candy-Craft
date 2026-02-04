import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Order,
  OrderCreateDto,
  OrderStatusKey,
} from "../../types/OrderType";

import { http } from "../../api/http";
import { useAuth } from "../../contexts/AuthContext";

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
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const data = await http.get<Order[]>("/orders");
      setOrders(data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const createOrder = async (data: OrderCreateDto) => {
    try {
      const created = await http.post<Order>("/orders", data);
      setOrders((prev) => [...prev, created]);
      console.log(created);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrder = async (id: number, data: OrderUpdateDto) => {
    try {
      const updated = await http.patch<Order>(`/orders/${id}`, data);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      await http.del(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchOrders();
    }
  }, [user?.role]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        updateOrder,
        deleteOrder,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
