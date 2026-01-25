// contexts/CategoryContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CategoryType, CreateCategoryDto } from "../types/CategoryType";

import { API_URL } from "../api/config";

type CategoryContextValue = {
  categories: CategoryType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;

  createCategory: (dto: CreateCategoryDto) => Promise<CategoryType>;
  updateCategory: (id: number, dto: CreateCategoryDto) => Promise<CategoryType>;
  deleteCategory: (id: number) => Promise<void>;
};

// ✅ поменяй под свой бэкенд

// Я использую эндпоинты: /api/categories
const ENDPOINT = `${API_URL}/categories`;

const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined,
);

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    // пытаемся вытащить текст ошибки
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await http<CategoryType[]>(ENDPOINT);
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
    const created = await http<CategoryType>(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(dto),
    });
    setCategories((prev) => [created, ...prev]);
    return created;
  };

  const updateCategory = async (id: number, dto: CreateCategoryDto) => {
    const updated = await http<CategoryType>(`${ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(dto),
    });
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const deleteCategory = async (id: number) => {
    await http<void>(`${ENDPOINT}/${id}`, { method: "DELETE" });
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
