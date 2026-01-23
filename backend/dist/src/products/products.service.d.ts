import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Product[]>;
    removeAll(): Promise<string>;
    create(dto: CreateProductDto): Promise<Product>;
    findByCategory(categoryId: number): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    removeById(id: number): Promise<{
        message: string;
    }>;
    update(id: number, dto: CreateProductDto): Promise<{
        message: string;
        changedProduct: Product;
    }>;
}
