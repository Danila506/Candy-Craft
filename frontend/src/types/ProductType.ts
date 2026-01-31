export type ProductType = {
  categoryId: number;
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: number;
  imageUrl: string;
  category: {
    name: string;
  };
  className?: string;
};

// DTO для создания (без ID)
export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
  description: string;
  imageUrl: string;
  inStock: number;
}

// DTO для обновления (с ID)
export interface UpdateProductDto extends CreateProductDto {
  id: number;
}
