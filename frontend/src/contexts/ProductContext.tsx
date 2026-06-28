// contexts/ProductsContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CreateProductDto, ProductType } from "../types/ProductType";
import { http } from "../api/http";
import { useAuth } from "./AuthContext";

interface ProductsContextType {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  getProductById: (id: number) => ProductType | undefined;
  getProductBySlug: (slug: string) => ProductType | undefined;
  getProductsByCategory: (categoryId: number) => ProductType[];
  refreshProducts: () => Promise<void>;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, updatedData: CreateProductDto) => void;
  createProduct: (createdData: CreateProductDto) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      const result = await http.del<{ message?: string }>(`/products/${id}`);
      // Обновляем локальное состояние - удаляем товар из массива
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
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
      const updatedResponse = await http.put<{
        message: string;
        changedProduct: ProductType;
      }>(`/products/${id}`, updatedData);
      const updatedProduct = updatedResponse.changedProduct;

      // Обновляем товар в локальном состоянии
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product,
        ),
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

  //! Создание товара
  const createProduct = async (createdData: CreateProductDto) => {
    setLoading(true);
    try {
      const createdProduct = await http.post<ProductType>(
        "/products",
        createdData,
      );
      console.log("Товар успешно создан:", createdProduct);

      // Добавляем товар, который вернул сервер (с id!)
      setProducts((prev) => [...prev, createdProduct]);
      setError(null);

      // Возвращаем созданный товар для дальнейшего использования
      return createdProduct;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось создать товар";
      setError(errorMessage);
      console.error("Ошибка создания товара:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query =
        user?.role === "ADMIN" ? "/products?includeInactive=true" : "/products";
      const data = await http.get<ProductType[]>(query);
      setProducts(data ?? []);
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
  }, [user?.role]);

  // Получить товар по ID
  const getProductById = (id: number): ProductType | undefined => {
    return products.find((product) => product.id === id);
  };

  const getProductBySlug = (slug: string): ProductType | undefined => {
    return products.find((product) => product.slug === slug);
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
    getProductBySlug,
    getProductsByCategory,
    refreshProducts: fetchProducts,
    deleteProduct,
    updateProduct,
    createProduct,
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
      "useProducts должен использоваться внутри ProductsProvider",
    );
  }
  return context;
};
