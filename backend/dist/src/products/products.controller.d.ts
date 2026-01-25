import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
export declare class ProductsController {
  private readonly products;
  constructor(products: ProductsService);
  findAll(): Promise<Product[]>;
  removeAll(): Promise<string>;
  create(dto: CreateProductDto): Promise<Product>;
  findByCategory(categoryId: number): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  removeById(id: number): Promise<{
    message: string;
  }>;
  update(
    id: number,
    dto: UpdateProductDto,
  ): Promise<{
    message: string;
    changedProduct: Product;
  }>;
}
