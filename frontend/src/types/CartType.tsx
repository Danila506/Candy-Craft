export type CartType = {
  id: number;
  name: string;
  productId: number;
  inStock: number;
  reservedQty?: number;
  quantity: number;
  price: number;
  imageUrl: string;
};
