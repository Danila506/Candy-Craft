'use strict';
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
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
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
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoriesService = void 0;
const common_1 = require('@nestjs/common');
const prisma_service_1 = require('../prisma/prisma.service');
let CategoriesService = class CategoriesService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async findAll() {
    return this.prisma.category.findMany();
  }
  async findOne(id) {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });
    if (!category) {
      throw new common_1.NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
  async create(dto) {
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
  async putUpdate(id, dto) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists) throw new common_1.NotFoundException('Категория не найдена');
    const hasAny =
      dto?.name !== undefined ||
      dto?.description !== undefined ||
      dto?.imageUrl !== undefined;
    if (!hasAny) throw new common_1.BadRequestException('Пустое тело запроса');
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
  async remove(id) {
    try {
      const result = await this.prisma.category.delete({ where: { id } });
      return result;
    } catch {
      throw new common_1.NotFoundException(`Category with ID ${id} not found`);
    }
  }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [prisma_service_1.PrismaService]),
  ],
  CategoriesService,
);
//# sourceMappingURL=categories.service.js.map
