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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const optional_jwt_auth_guard_1 = require("../auth/optional-jwt-auth.guard");
let ProductsController = class ProductsController {
  products;
  constructor(products) {
    this.products = products;
  }
  findAll(includeInactive, includeDeleted, req) {
    const wantsInactive = includeInactive === "true" || includeInactive === "1";
    const wantsDeleted = includeDeleted === "true" || includeDeleted === "1";
    const role = req?.user?.role;
    if ((wantsInactive || wantsDeleted) && role !== client_1.Role.ADMIN) {
      throw new common_1.ForbiddenException(
        "Только администратор может просматривать скрытые или удаленные товары",
      );
    }
    return this.products.findAll({
      includeInactive: wantsInactive,
      includeDeleted: wantsDeleted,
    });
  }
  removeAll() {
    return this.products.removeAll();
  }
  create(dto) {
    return this.products.create(dto);
  }
  findByCategory(categoryId) {
    return this.products.findByCategory(categoryId);
  }
  findById(id) {
    return this.products.findById(id);
  }
  removeById(id) {
    return this.products.removeById(id);
  }
  update(id, dto) {
    return this.products.update(id, dto);
  }
};
exports.ProductsController = ProductsController;
__decorate(
  [
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all products" }),
    (0, swagger_1.ApiResponse)({
      status: 200,
      description: "Return all products.",
    }),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    __param(0, (0, common_1.Query)("includeInactive")),
    __param(1, (0, common_1.Query)("includeDeleted")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise),
  ],
  ProductsController.prototype,
  "findAll",
  null,
);
__decorate(
  [
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  ProductsController.prototype,
  "removeAll",
  null,
);
__decorate(
  [
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Создать товар" }),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise),
  ],
  ProductsController.prototype,
  "create",
  null,
);
__decorate(
  [
    (0, common_1.Get)("category/:categoryId"),
    (0, swagger_1.ApiOperation)({ summary: "Получить товары по категории" }),
    __param(0, (0, common_1.Param)("categoryId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise),
  ],
  ProductsController.prototype,
  "findByCategory",
  null,
);
__decorate(
  [
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise),
  ],
  ProductsController.prototype,
  "findById",
  null,
);
__decorate(
  [
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0),
  ],
  ProductsController.prototype,
  "removeById",
  null,
);
__decorate(
  [
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Number,
      update_product_dto_1.UpdateProductDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  ProductsController.prototype,
  "update",
  null,
);
exports.ProductsController = ProductsController = __decorate(
  [
    (0, swagger_1.ApiTags)("products"),
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService]),
  ],
  ProductsController,
);
//# sourceMappingURL=products.controller.js.map
