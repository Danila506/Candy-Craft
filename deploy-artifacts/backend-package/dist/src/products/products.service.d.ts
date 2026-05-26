import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "@prisma/client";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsService {
  private prisma;
  constructor(prisma: PrismaService);
  private normalizeSlug;
  private normalizeSku;
  private ensureUniqueSlug;
  private ensureUniqueSku;
  findAll(options?: {
    includeInactive?: boolean;
    includeDeleted?: boolean;
  }): Promise<Product[]>;
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
