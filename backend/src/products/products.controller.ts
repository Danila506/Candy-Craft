import {
  Controller,
  ForbiddenException,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}
  // //! Поиск всех товаров
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @UseGuards(OptionalJwtAuthGuard)
  findAll(
    @Query('includeInactive') includeInactive?: string,
    @Query('includeDeleted') includeDeleted?: string,
    @Req() req?: Request,
  ): Promise<Product[]> {
    const wantsInactive = includeInactive === 'true' || includeInactive === '1';
    const wantsDeleted = includeDeleted === 'true' || includeDeleted === '1';
    const role = (req as any)?.user?.role as Role | undefined;

    if ((wantsInactive || wantsDeleted) && role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Только администратор может просматривать скрытые или удаленные товары',
      );
    }

    return this.products.findAll({
      includeInactive: wantsInactive,
      includeDeleted: wantsDeleted,
    });
  }
  // //! Удаление всех товаров
  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeAll(): Promise<string> {
    return this.products.removeAll();
  }

  // //! Создание нового товара
  @Post()
  @ApiOperation({ summary: 'Создать товар' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.products.create(dto);
  }
  //! Получение товара по категории
  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Получить товары по категории' })
  findByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[]> {
    return this.products.findByCategory(categoryId);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Получить товар по slug' })
  findBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.products.findBySlug(slug);
  }

  // //! Поиск товара по id
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.products.findById(id);
  }

  //! Удаление товара по id
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeById(@Param('id', ParseIntPipe) id: number) {
    return this.products.removeById(id);
  }

  //! Изменение товара
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
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
