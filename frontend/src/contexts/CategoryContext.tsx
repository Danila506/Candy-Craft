// contexts/CategoryContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CategoryType, CreateCategoryDto } from "../types/CategoryType";

import { http } from "../api/http";
type CategoryContextValue = {
  categories: CategoryType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;

  createCategory: (dto: CreateCategoryDto) => Promise<CategoryType>;
  updateCategory: (id: number, dto: CreateCategoryDto) => Promise<CategoryType>;
  deleteCategory: (id: number) => Promise<void>;
};

const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await http.get<CategoryType[]>("/categories");
      setCategories(data);
    } catch (e: any) {
      setError(e?.message ?? "Ошибка загрузки категорий");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refetch();
  }, []);

  const createCategory = async (dto: CreateCategoryDto) => {
    const created = await http.post<CategoryType>("/categories", dto);
    setCategories((prev) => [created, ...prev]);
    return created;
  };

  const updateCategory = async (id: number, dto: CreateCategoryDto) => {
    const updated = await http.put<CategoryType>(`/categories/${id}`, dto);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const deleteCategory = async (id: number) => {
    await http.del<void>(`/categories/${id}`);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const value = useMemo<CategoryContextValue>(
    () => ({
      categories,
      isLoading,
      error,
      refetch,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [categories, isLoading, error],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return ctx;
}
