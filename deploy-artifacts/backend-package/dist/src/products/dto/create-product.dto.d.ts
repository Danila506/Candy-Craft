export declare class CreateProductDto {
  sku?: string;
  slug?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: number;
  isActive?: boolean;
  categoryId: number;
  cartId?: number;
}
