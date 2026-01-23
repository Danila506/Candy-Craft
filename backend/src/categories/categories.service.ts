import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';


@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany()
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
    const {name, description, imageUrl} = dto
    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
      }
    });
    return category
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {id}
    });
        if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const updatedCategory = await this.prisma.category.update({
      where: category,
      data: dto,
    });

    return updatedCategory;
  }

  async remove(id: number): Promise<Category> {
    try {
    const result = await this.prisma.category.delete({where: {id}});
    return result
    }catch{
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

  }

}