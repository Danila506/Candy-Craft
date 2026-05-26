import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "@prisma/client";
export declare class CategoriesController {
  private readonly category;
  constructor(category: CategoriesService);
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  create(dto: CreateCategoryDto): Promise<Category>;
  putUpdate(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  }>;
  remove(id: number): Promise<Category>;
}
