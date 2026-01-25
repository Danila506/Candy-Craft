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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoriesController = void 0;
const common_1 = require('@nestjs/common');
const swagger_1 = require('@nestjs/swagger');
const categories_service_1 = require('./categories.service');
const create_category_dto_1 = require('./dto/create-category.dto');
const update_category_dto_1 = require('./dto/update-category.dto');
let CategoriesController = class CategoriesController {
  category;
  constructor(category) {
    this.category = category;
  }
  findAll() {
    return this.category.findAll();
  }
  findOne(id) {
    return this.category.findOne(id);
  }
  create(dto) {
    return this.category.create(dto);
  }
  putUpdate(id, dto) {
    console.log('PUT id:', id);
    console.log('PUT dto:', dto);
    return this.category.putUpdate(Number(id), dto);
  }
  remove(id) {
    return this.category.remove(id);
  }
};
exports.CategoriesController = CategoriesController;
__decorate(
  [
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  CategoriesController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get category by id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  CategoriesController.prototype,
  'findOne',
  null,
);
__decorate(
  [
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new category' }),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_category_dto_1.CreateCategoryDto]),
    __metadata('design:returntype', Promise),
  ],
  CategoriesController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'PutUpdate category' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      String,
      update_category_dto_1.UpdateCategoryDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  CategoriesController.prototype,
  'putUpdate',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete category' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  CategoriesController.prototype,
  'remove',
  null,
);
exports.CategoriesController = CategoriesController = __decorate(
  [
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __metadata('design:paramtypes', [categories_service_1.CategoriesService]),
  ],
  CategoriesController,
);
//# sourceMappingURL=categories.controller.js.map
