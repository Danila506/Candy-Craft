import { CategoryEntity } from 'src/categories/category.entity';
export declare class ProductEntity {
    id: number;
    name: string;
    description: string;
    price: number;
    inStock: number;
    isStock: boolean;
    imageUrl: string;
    category: CategoryEntity;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
