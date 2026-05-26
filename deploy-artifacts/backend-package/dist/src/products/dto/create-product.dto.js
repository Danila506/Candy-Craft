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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProductDto {
  sku;
  slug;
  name;
  description;
  price;
  imageUrl;
  inStock;
  isActive;
  categoryId;
  cartId;
}
exports.CreateProductDto = CreateProductDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String),
  ],
  CreateProductDto.prototype,
  "sku",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String),
  ],
  CreateProductDto.prototype,
  "slug",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String),
  ],
  CreateProductDto.prototype,
  "name",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String),
  ],
  CreateProductDto.prototype,
  "description",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number),
  ],
  CreateProductDto.prototype,
  "price",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String),
  ],
  CreateProductDto.prototype,
  "imageUrl",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number),
  ],
  CreateProductDto.prototype,
  "inStock",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean),
  ],
  CreateProductDto.prototype,
  "isActive",
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata("design:type", Number)],
  CreateProductDto.prototype,
  "categoryId",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number),
  ],
  CreateProductDto.prototype,
  "cartId",
  void 0,
);
//# sourceMappingURL=create-product.dto.js.map
