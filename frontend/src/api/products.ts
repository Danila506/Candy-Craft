import type { CreateProductDto, ProductType } from "../types/ProductType";
import { API_URL } from "./config";

// api/products.ts
// Создание товара
export const createProduct = async (
  dto: CreateProductDto,
): Promise<ProductType> => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Ошибка создания товара");
  return response.json(); // Сервер вернет ProductType с id
};

// Обновление товара
export const updateProduct = async (
  id: number,
  dto: CreateProductDto,
): Promise<ProductType> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Ошибка обновления товара");
  return response.json(); // Сервер вернет обновленный ProductType
};
