export type ProductType = {
  categoryId: number;
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  deletedAt?: string | null;
  inStock: number;
  reservedQty?: number;
  imageUrl: string;
  category: {
    name: string;
  };
  className?: string;
};

// DTO для создания (без ID)
export interface CreateProductDto {
  slug?: string;
  name: string;
  price: number;
  categoryId: number;
  description: string;
  imageUrl: string;
  inStock: number;
  isActive?: boolean;
}

// DTO для обновления (с ID)
export interface UpdateProductDto extends CreateProductDto {
  id: number;
}
