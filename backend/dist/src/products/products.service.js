"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.product.findMany();
    }
    async removeAll() {
        await this.prisma.product.deleteMany();
        return 'Все товары удалены';
    }
    async create(dto) {
        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: dto.categoryId }
            });
            if (!category) {
                throw new common_1.NotFoundException(`Категория с ID ${dto.categoryId} не найдена`);
            }
        }
        const product = await this.prisma.product.create({
            data: dto,
            include: {
                category: true
            }
        });
        return product;
    }
    async findByCategory(categoryId) {
        const category = await this.prisma.category.findFirst({
            where: { id: categoryId }
        });
        if (!category) {
            throw new common_1.NotFoundException(`Категория с ID ${categoryId} не найдена`);
        }
        return this.prisma.product.findMany({
            where: { category: { id: categoryId } },
        });
    }
    async findById(id) {
        const productId = await this.prisma.product.findFirst({
            where: { id }
        });
        if (!productId) {
            throw new common_1.NotFoundException(`Продукт с ID ${id} не найден`);
        }
        return productId;
    }
    async removeById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Товар с ID ${id} не найден`);
        }
        await this.prisma.cartItem.deleteMany({
            where: { productId: id }
        });
        await this.prisma.product.delete({
            where: { id }
        });
        return { message: 'Товар успешно удален вместе со связанными записями' };
    }
    async update(id, dto) {
        const product = await this.prisma.product.findFirst({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        const updatedProduct = await this.prisma.product.update({ where: product, data: dto });
        return { message: 'Товар изменен', changedProduct: updatedProduct };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map