// types/ProductFormData.ts
export interface ProductFormData {
  id?: number;           // Только для редактирования
  name: string;
  price: string | number;
  quantity: number;
  categoryId: number;    // ID категории, а не название
  description: string;
  imageUrl: string;
  inStock?: number;      // Остаток на складе
}

// Тип для создания/обновления
export interface CreateProductDto {
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
  description: string;
  imageUrl: string;
  inStock?: number;
}