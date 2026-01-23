import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';

import { Product } from '@prisma/client';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService,
  ) {}
// //! Поиск всех товаров
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  findAll(): Promise<Product[]> {
    return this.products.findAll();
  }
// //! Удаление всех товаров
  @Delete()
  removeAll(): Promise<string> {
    return this.products.removeAll();
  }

// //! Создание нового товара
  @Post()
  @ApiOperation({ summary: 'Создать товар' })
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.products.create(dto)
  }
//! Получение товара по категории
  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Получить товары по категории' })
  findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Product[]> {
    return this.products.findByCategory(categoryId);
  }

// //! Поиск товара по id
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product>{
    return this.products.findById(id)

  }

//! Удаление товара по id
  @Delete(':id')
  removeById(@Param('id', ParseIntPipe) id: number) {  
    return this.products.removeById(id);
  }

//! Изменение товара
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateProductDto){
    return this.products.update(id, dto)
  }


//   @Post(':id/upload-image')
//   @UseInterceptors(FileInterceptor('image'))
//   async uploadProductImage(
//     @Param('id', ParseIntPipe) id: number,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     try {
//       // Сохраняем файл локально
//       const imageUrl = await this.localStorageService.saveFile(file);
      
//       // Обновляем товар в базе
//       const updatedProduct = await this.productsService.updateProductImage(id, imageUrl);
      
//       return {
//         success: true,
//         message: 'Изображение успешно загружено',
//         data: {
//           productId: updatedProduct.id,
//           imageUrl: updatedProduct.imageUrl,
//         },
//       };
//     } catch (error) {
//       throw new BadRequestException(error.message || 'Ошибка загрузки изображения');
//     }
//   }
}