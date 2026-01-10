// contexts/ProductsContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { ProductType } from "../types/ProductType";

interface ProductsContextType {
    products: ProductType[];
    featuredProducts: ProductType[];
    loading: boolean;
    error: string | null;
    getProductById: (id: number) => ProductType | undefined;
    getProductsByCategory: (categoryId: number) => ProductType[];
    refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/products");
            if (!response.ok) throw new Error("Ошибка загрузки товаров");
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Не удалось загрузить товары");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Получить товар по ID
    const getProductById = (id: number): ProductType | undefined => {
        return products.find(product => product.id === id);
    };

    // Получить товары по категории
    const getProductsByCategory = (categoryId: number): ProductType[] => {
        return products.filter(product => product.categoryId === categoryId);
    };

    // Избранные товары (например, первые 4)
    const featuredProducts = products.slice(0, 4);

    const value = {
        products,
        featuredProducts,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        refreshProducts: fetchProducts,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts должен использоваться внутри ProductsProvider");
    }
    return context;
};