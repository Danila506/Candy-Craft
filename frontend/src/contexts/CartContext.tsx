import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { CartType } from "../types/CartType";

interface CartContextType {
    cartCount: number;
    cartItems: CartType[]; // Добавляем массив товаров
    refreshCart: () => void;
    isItemInCart: (productId: number) => boolean; // Функция проверки
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cartItems, setCartItems] = useState<CartType[]>([]); // Сохраняем товары
    const cartCount = cartItems.length; // Считаем автоматически

    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://localhost:3000/cart/1");
            const data: CartType[] = await response.json();
            setCartItems(data); // Сохраняем ВЕСЬ массив товаров
        } catch (error) {
            console.error("Ошибка загрузки корзины: ", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const refreshCart = () => {
        fetchCartItems();
    };

    // Функция проверки товара в корзине
    const isItemInCart = (productId: number): boolean => {
        return cartItems.some((item) => item.id === productId);
    };

    const value = {
        cartCount,
        cartItems, // Экспортируем товары
        refreshCart,
        isItemInCart, // Экспортируем функцию проверки
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart должен использоваться внутри CartProvider");
    }
    return context;
};
