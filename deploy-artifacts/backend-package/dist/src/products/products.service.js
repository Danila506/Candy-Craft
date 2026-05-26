"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  normalizeSlug(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  normalizeSku(value) {
    return value.toUpperCase().replace(/[^A-Z0-9_-]/g, "-");
  }
  async ensureUniqueSlug(baseInput, excludeId) {
    const base = this.normalizeSlug(baseInput) || "product";
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
  async ensureUniqueSku(baseInput, excludeId) {
    const base = this.normalizeSku(baseInput) || "SKU";
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
  async findAll(options) {
    const includeInactive = options?.includeInactive ?? false;
    const includeDeleted = options?.includeDeleted ?? false;
    return await this.prisma.product.findMany({
      where: {
        ...(includeInactive ? {} : { isActive: true }),
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      orderBy: { createdAt: "desc" },
      include: { category: { select: { name: true } } },
    });
  }
  async removeAll() {
    await this.prisma.product.updateMany({
      where: { deletedAt: null },
      data: { deletedAt: new Date(), isActive: false },
    });
    return "Все товары архивированы";
  }
  async create(dto) {
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new common_1.NotFoundException(
          `Категория с ID ${dto.categoryId} не найдена`,
        );
      }
    }
    const normalizedName = dto.name.trim();
    if (!normalizedName) {
      throw new common_1.BadRequestException("Название товара обязательно");
    }
    const slug = await this.ensureUniqueSlug(
      dto.slug?.trim() || normalizedName,
    );
    const sku = await this.ensureUniqueSku(
      dto.sku?.trim() || `SKU-${normalizedName}`,
    );
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
        e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new common_1.ConflictException(
          "Товар с таким SKU или slug уже существует",
        );
      }
      throw e;
    }
  }
  async findByCategory(categoryId) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) {
      throw new common_1.NotFoundException(
        `Категория с ID ${categoryId} не найдена`,
      );
    }
    return this.prisma.product.findMany({
      where: { category: { id: categoryId }, isActive: true, deletedAt: null },
    });
  }
  async findById(id) {
    const productId = await this.prisma.product.findFirst({
      where: { id, deletedAt: null, isActive: true },
    });
    if (!productId) {
      throw new common_1.NotFoundException(`Продукт с ID ${id} не найден`);
    }
    return productId;
  }
  async removeById(id) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new common_1.NotFoundException(`Товар с ID ${id} не найден`);
    }
    await this.prisma.cartItem.deleteMany({
      where: { productId: id },
    });
    await this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
    return {
      message: "Товар успешно архивирован вместе со связанными записями",
    };
  }
  async update(id, dto) {
    const product = await this.prisma.product.findFirst({ where: { id } });
    if (!product) {
      throw new common_1.NotFoundException(`Product with ID ${id} not found`);
    }
    const data = { ...dto };
    if (dto.name !== undefined) {
      const normalizedName = dto.name.trim();
      if (!normalizedName) {
        throw new common_1.BadRequestException("Название товара обязательно");
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
    return { message: "Товар изменен", changedProduct: updatedProduct };
  }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService]),
  ],
  ProductsService,
);
//# sourceMappingURL=products.service.js.map
