import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private normalizeSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private normalizeSku(value: string): string {
    return value.toUpperCase().replace(/[^A-Z0-9_-]/g, '-');
  }

  private async ensureUniqueSlug(baseInput: string, excludeId?: number) {
    const base = this.normalizeSlug(baseInput) || 'product';
    let candidate = base;
    let suffix = 1;

    while (true) {
      const existing = await this.prisma.product.findFirst({
        where: {
          slug: candidate,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: { id: true },
      });
      if (!existing) return candidate;
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
  }

  private async ensureUniqueSku(baseInput: string, excludeId?: number) {
    const base = this.normalizeSku(baseInput) || 'SKU';
    let candidate = base;
    let suffix = 1;

    while (true) {
      const existing = await this.prisma.product.findFirst({
        where: {
          sku: candidate,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: { id: true },
      });
      if (!existing) return candidate;
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
  }

  // //todo Поиск всех товаров
  async findAll(options?: {
    includeInactive?: boolean;
    includeDeleted?: boolean;
  }): Promise<Product[]> {
    const includeInactive = options?.includeInactive ?? false;
    const includeDeleted = options?.includeDeleted ?? false;
    return await this.prisma.product.findMany({
      where: {
        ...(includeInactive ? {} : { isActive: true }),
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { name: true } } },
    });
  }

  //todo Удаление всех товаров
  async removeAll(): Promise<string> {
    await this.prisma.product.updateMany({
      where: { deletedAt: null },
      data: { deletedAt: new Date(), isActive: false },
    });
    return 'Все товары архивированы';
  }
  //todo Создание нового товара
  // Метод 1: Используем только categoryId (если в схеме есть поле categoryId)
  async create(dto: CreateProductDto): Promise<Product> {
    // Проверяем существование категории, если передана
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `Категория с ID ${dto.categoryId} не найдена`,
        );
      }
    }

    const normalizedName = dto.name.trim();
    if (!normalizedName) {
      throw new BadRequestException('Название товара обязательно');
    }

    const slug = await this.ensureUniqueSlug(
      dto.slug?.trim() || normalizedName,
    );
    const sku = await this.ensureUniqueSku(
      dto.sku?.trim() || `SKU-${normalizedName}`,
    );

    // Создаем продукт
    //     const exists = await this.prisma.product.findFirst({
    //   where: { categoryId: dto.categoryId },
    // });
    // if (exists) throw new ConflictException("Товар уже существует");
    try {
      return await this.prisma.product.create({
        data: {
          ...dto,
          name: normalizedName,
          sku,
          slug,
          isActive: dto.isActive ?? true,
        },
        include: {
          category: true,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'Товар с таким SKU или slug уже существует',
        );
      }
      throw e;
    }
  }

  //todo Найти товары по категории
  async findByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Категория с ID ${categoryId} не найдена`);
    }

    return this.prisma.product.findMany({
      where: { category: { id: categoryId }, isActive: true, deletedAt: null },
    });
  }

  //todo Поиск товара по id
  async findById(id: number): Promise<Product> {
    const productId = await this.prisma.product.findFirst({
      where: { id, deletedAt: null, isActive: true },
    });
    if (!productId) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }
    return productId;
  }

  //todo Удаление товара по id
  async removeById(id: number): Promise<{ message: string }> {
    // 1. ПРОВЕРЯЕМ существует ли товар
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }

    // 2. УДАЛЯЕМ все элементы корзины с этим товаром
    await this.prisma.cartItem.deleteMany({
      where: { productId: id },
    });

    // 3. Архивируем товар (soft-delete)
    await this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    return {
      message: 'Товар успешно архивирован вместе со связанными записями',
    };
  }

  //todo Обновление товара
  async update(
    id: number,
    dto: UpdateProductDto,
  ): Promise<{ message: string; changedProduct: Product }> {
    const product = await this.prisma.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const data: Prisma.ProductUpdateInput = { ...dto };
    if (dto.name !== undefined) {
      const normalizedName = dto.name.trim();
      if (!normalizedName) {
        throw new BadRequestException('Название товара обязательно');
      }
      data.name = normalizedName;
    }
    if (dto.slug !== undefined) {
      data.slug = await this.ensureUniqueSlug(dto.slug.trim(), id);
    }
    if (dto.sku !== undefined) {
      data.sku = await this.ensureUniqueSku(dto.sku.trim(), id);
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data,
    });
    return { message: 'Товар изменен', changedProduct: updatedProduct };
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
