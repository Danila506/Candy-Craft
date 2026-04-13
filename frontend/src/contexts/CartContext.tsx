import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartType } from "../types/CartType";
import { http } from "../api/http";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cartCount: number;
  cartItems: CartType[];
  refreshCart: () => void;
  isItemInCart: (productId: number) => boolean;
  clearCart: () => void;
  addToCart: (productId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
  showAuthWarn: boolean;
  setShowAuthWarn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartType[]>([]);
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
      const data = await http.get<CartType[]>(`/cart/${userId}`);
      setCartItems(data ?? []);
    } catch (error) {
      console.error("Ошибка загрузки корзины: ", error);
    }
  };

  const clearCart = async () => {
    try {
      if (!userId) return;
      await http.del(`/cart/${userId}`);
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

      const data = await http.post<{ item: CartType }>(
        `/cart/${userId}/items`,
        {
          productId,
        },
      );
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

  const updateItemQuantity = async (productId: number, quantity: number) => {
    try {
      if (!userId) return;
      await http.patch(`/cart/${userId}/items/${productId}`, {
        quantity,
      });
      await fetchCartItems();
    } catch (error) {
      console.error("Ошибка обновления количества:", error);
      throw error;
    }
  };

  const removeItem = async (productId: number) => {
    try {
      if (!userId) return;
      await http.del(`/cart/${userId}/items/${productId}`);
      setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId),
      );
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
    updateItemQuantity,
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
