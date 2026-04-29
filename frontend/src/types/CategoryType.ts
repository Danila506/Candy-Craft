export type CategoryType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  className?: string;
};

export type CreateCategoryDto = {
  name: string;
  description: string;
  imageUrl: string;
};
