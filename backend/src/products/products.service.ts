import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryEntity } from 'src/categories/category.entity';
import { LocalStorageService } from 'src/storage/local-storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '../generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma:PrismaService,
  ) {}
// //todo Поиск всех товаров
  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany()
  } 

//todo Удаление всех товаров
  async removeAll(): Promise<string> {
    await this.prisma.product.deleteMany()
    return 'Все товары удалены' 
  }
//todo Создание нового товара
// Метод 1: Используем только categoryId (если в схеме есть поле categoryId)
async create(dto: CreateProductDto): Promise<Product> {
  // Проверяем существование категории, если передана
  if (dto.categoryId) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId }
    });
    
    if (!category) {
      throw new NotFoundException(
        `Категория с ID ${dto.categoryId} не найдена`
      );
    }
  }
  
  // Создаем продукт
  const product = await this.prisma.product.create({
    data: dto,
    include: {
      category: true
    }
  });
  
  return product;
}

//todo Найти товары по категории
  async findByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId }
    });
    
    if (!category) {
      throw new NotFoundException(`Категория с ID ${categoryId} не найдена`);
    }
    
    return this.prisma.product.findMany({
      where: { category: { id: categoryId } },
    });
  }

//todo Поиск товара по id
  async findById(id: number): Promise<Product> {
    const productId = await this.prisma.product.findFirst({
      where: {id}
    })
    if(!productId) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }
    return productId
  }

//todo Удаление товара по id
  async removeById(id: number): Promise<{
    message: string
    deletedProduct: Product}>{
    const product = await this.prisma.product.findFirst({where: {id}})

      if (!product)   throw new NotFoundException(`Товар с ID ${id} не найден`);

    const deletedProduct = {...product}
    await this.prisma.product.delete({where: {id}});

    return {
      message: `Товар с ID = ${id} успешно удален`,
      deletedProduct: deletedProduct
    }
  }

//todo Обновление товара
  async update(id: number, dto: CreateProductDto): Promise<{message: string, changedProduct: Product}>{
    const product = await this.prisma.product.findFirst({where: {id}})
    if (!product) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const updatedProduct = await this.prisma.product.update({where: product, data: dto})
    return {message:'Товар изменен', changedProduct: updatedProduct}
  }


//     async updateProductImage(id: number, imageUrl: string): Promise<Product> {
//     const product = await this.prisma.products.findFirst({ where: { id } });
    
//     if (!product) {
//       throw new NotFoundException(`Товар с ID ${id} не найден`);
//     }
    
// //? Если у товара уже есть изображение - удаляем старое
//     if (product.imageUrl && product.imageUrl.includes('/uploads/')) {
//       await this.localStorageService.deleteFile(product.imageUrl);
//     }
    
//     product.imageUrl = imageUrl;

//     return product
  
//   }
}