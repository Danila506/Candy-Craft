import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name, description, imageUrl } = dto;
    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
      },
    });
    return category;
  }

  async putUpdate(id: number, dto: UpdateCategoryDto) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Категория не найдена');

    const hasAny =
      dto?.name !== undefined ||
      dto?.description !== undefined ||
      dto?.imageUrl !== undefined;

    if (!hasAny) throw new BadRequestException('Пустое тело запроса');

    return this.prisma.category.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
        ...(dto.imageUrl !== undefined ? { imageUrl: dto.imageUrl } : {}),
      },
    });
  }

  async remove(id: number): Promise<Category> {
    try {
      const result = await this.prisma.category.delete({ where: { id } });
      return result;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
