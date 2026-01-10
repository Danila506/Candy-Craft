export type ProductType = {
    categoryId: number;
    id: number;
    name: string;
    description?: string;
    price: number;
    inStock: number;
    imageUrl: string;
    className?: string;
};
