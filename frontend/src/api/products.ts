import type { CreateProductDto, ProductType } from "../types/ProductType";
import { http } from "./http";

// api/products.ts
// Создание товара
export const createProduct = async (
  dto: CreateProductDto,
): Promise<ProductType> => {
  return http.post<ProductType>("/products", dto);
};

// Обновление товара
export const updateProduct = async (
  id: number,
  dto: CreateProductDto,
): Promise<{ message: string; changedProduct: ProductType }> => {
  return http.put<{ message: string; changedProduct: ProductType }>(
    `/products/${id}`,
    dto,
  );
};
