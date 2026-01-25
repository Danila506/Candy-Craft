import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
export declare class CategoriesService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  create(dto: CreateCategoryDto): Promise<Category>;
  putUpdate(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<{
    name: string;
    description: string;
    imageUrl: string;
    id: number;
  }>;
  remove(id: number): Promise<Category>;
}
