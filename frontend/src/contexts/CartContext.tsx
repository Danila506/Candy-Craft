import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartType } from "../types/CartType";
import { API_URL } from "../api/config";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cartCount: number;
  cartItems: CartType[]; // Добавляем массив товаров
  refreshCart: () => void;
  isItemInCart: (productId: number) => boolean; // Функция проверки
  clearCart: () => void;
  addToCart: (productId: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  showAuthWarn: boolean;
  setShowAuthWarn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartType[]>([]); // Сохраняем товары
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useAuth();
  const userId = user?.id;

  const [showAuthWarn, setShowAuthWarn] = useState(false);

  const fetchCartItems = async () => {
    if (!userId) {
      setCartItems([]);

      return;
    }
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        credentials: "include",
      });
      const data: CartType[] = await response.json();
      setCartItems(data); // Сохраняем ВЕСЬ массив товаров
    } catch (error) {
      console.error("Ошибка загрузки корзины: ", error);
    }
  };

  const clearCart = async () => {
    try {
      if (!userId) return;

      const res = await fetch(`${API_URL}/cart/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Не удалось очистить корзину");
      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const refreshCart = () => {
    fetchCartItems();
  };

  const addToCart = async (productId: number) => {
    try {
      if (!userId) {
        throw new Error("Пользователь не авторизован");
      }

      const response = await fetch(`${API_URL}/cart/${userId}/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Ошибка сервера");
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
      }

      const data: { item: CartType } = await response.json();
      console.log(data);
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (item) => item.id === data.item.id,
        );

        if (existingIndex === -1) {
          return [...prevItems, data.item];
        }

        return prevItems.map((item, index) =>
          index === existingIndex ? { ...item, ...data.item } : item,
        );
      });
    } catch (error) {
      console.error("Не удалось добавить товар:", error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      if (!userId) return;

      await fetch(`${API_URL}/cart/${userId}/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      refreshCart();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const isItemInCart = (productId: number): boolean => {
    return cartItems.some((item) => item.productId === productId);
  };

  const value = {
    cartCount,
    cartItems,
    refreshCart,
    isItemInCart,
    clearCart,
    addToCart,
    removeItem,
    showAuthWarn,
    setShowAuthWarn,
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
