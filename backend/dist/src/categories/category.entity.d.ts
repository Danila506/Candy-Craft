import { ProductEntity } from 'src/products/product.entity';
export declare class CategoryEntity {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
