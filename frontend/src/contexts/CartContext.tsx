import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface CartContextType {
    cartCount: number;
    refreshCart: () => void;
    incrementCart: () => void;
    decrementCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cartCount, setCartCount] = useState<number>(0);

    const fetchCartCount = async () => {
        try {
            const response = await fetch("http://localhost:3000/cart/1");
            const data = await response.json();
            setCartCount(data.length);
        } catch (error) {
            console.log("Ошибка загрузки корзины: ", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    const refreshCart = () => {
        fetchCartCount();
    };

    const incrementCart = () => {
        setCartCount((prev) => prev + 1);
    };
    const decrementCart = () => {
        setCartCount((prev) => prev - 1);
    };

    const value = {
        cartCount,
        refreshCart,
        incrementCart,
        decrementCart,
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
