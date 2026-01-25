import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartType } from "../types/CartType";
import { API_URL, USER_ID } from "../api/config";

interface CartContextType {
  cartCount: number;
  cartItems: CartType[]; // Добавляем массив товаров
  refreshCart: () => void;
  isItemInCart: (productId: number) => boolean; // Функция проверки
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartType[]>([]); // Сохраняем товары
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/${USER_ID}`);
      const data: CartType[] = await response.json();
      setCartItems(data); // Сохраняем ВЕСЬ массив товаров
    } catch (error) {
      console.error("Ошибка загрузки корзины: ", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart/${USER_ID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Не удалось очистить корзину");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const refreshCart = () => {
    fetchCartItems();
  };

  const isItemInCart = (productId: number): boolean => {
    return cartItems.some((item) => item.id === productId);
  };

  const value = {
    cartCount,
    cartItems,
    refreshCart,
    isItemInCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
};
