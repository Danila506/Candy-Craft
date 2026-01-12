// contexts/ProductsContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { CreateProductDto, ProductType } from "../types/ProductType";

interface ProductsContextType {
    products: ProductType[];
    loading: boolean;
    error: string | null;
    getProductById: (id: number) => ProductType | undefined;
    getProductsByCategory: (categoryId: number) => ProductType[];
    refreshProducts: () => Promise<void>;
    deleteProduct: (id: number) => void;
    updateProduct: (id: number, updatedData: CreateProductDto) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
    undefined
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const deleteProduct = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Получаем ответ от сервера
            const result = await response.json();

            // Обновляем локальное состояние - удаляем товар из массива
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );

            setError(null);

            // Можно показать уведомление об успешном удалении
            console.log(result.message);
        } catch (err) {
            setError("Не удалось удалить товар");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: number, updatedData: CreateProductDto) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка обновления товара");
            }

            const updatedProduct = await response.json();
            console.log("Товар успешно обновлен:", updatedProduct);

            // Обновляем товар в локальном состоянии
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, ...updatedData } : product
                )
            );

            setError(null);
            return updatedProduct;
        } catch (err) {
            setError("Не удалось обновить товар");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

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
        return products.find((product) => product.id === id);
    };

    // Получить товары по категории
    const getProductsByCategory = (categoryId: number): ProductType[] => {
        return products.filter((product) => product.categoryId === categoryId);
    };

    const value = {
        products,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        refreshProducts: fetchProducts,
        deleteProduct,
        updateProduct,
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
        throw new Error(
            "useProducts должен использоваться внутри ProductsProvider"
        );
    }
    return context;
};
