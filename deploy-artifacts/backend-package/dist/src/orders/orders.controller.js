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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const order_options_service_1 = require("./order-options.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
let OrdersController = class OrdersController {
  ordersService;
  orderOptions;
  constructor(ordersService, orderOptions) {
    this.ordersService = ordersService;
    this.orderOptions = orderOptions;
  }
  getAuthorizedUserId(req, requestedUserId) {
    const currentUserId = req.user?.userId;
    const role = req.user?.role;
    if (!currentUserId) {
      throw new common_1.ForbiddenException("Unauthorized");
    }
    if (role !== client_1.Role.ADMIN && currentUserId !== requestedUserId) {
      throw new common_1.ForbiddenException(
        "Нельзя просматривать заказы другого пользователя",
      );
    }
    return currentUserId;
  }
  create(userId, idempotencyKey, req, createOrderDto) {
    this.getAuthorizedUserId(req, userId);
    return this.ordersService.create(createOrderDto, userId, idempotencyKey);
  }
  findAll() {
    return this.ordersService.findAll();
  }
  findMyOrders(req) {
    const currentUserId = req.user?.userId;
    if (!currentUserId) {
      throw new common_1.ForbiddenException("Unauthorized");
    }
    return this.ordersService.findOrders(currentUserId);
  }
  getOptions() {
    return this.orderOptions.getPublicOptions();
  }
  findOne(id, req) {
    this.getAuthorizedUserId(req, id);
    return this.ordersService.findOrders(id);
  }
  findStatusHistory(id) {
    return this.ordersService.getStatusHistory(+id);
  }
  update(id, req, updateOrderDto) {
    const changedByUserId = req.user?.userId;
    return this.ordersService.update(+id, updateOrderDto, changedByUserId);
  }
  remove(id) {
    return this.ordersService.remove(+id);
  }
};
exports.OrdersController = OrdersController;
__decorate(
  [
    (0, common_1.Post)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Headers)("idempotency-key")),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Number,
      Object,
      Object,
      create_order_dto_1.CreateOrderDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "create",
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "findAll",
  null,
);
__decorate(
  [
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "findMyOrders",
  null,
);
__decorate(
  [
    (0, common_1.Get)("options"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "getOptions",
  null,
);
__decorate(
  [
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "findOne",
  null,
);
__decorate(
  [
    (0, common_1.Get)(":id/history"),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "findStatusHistory",
  null,
);
__decorate(
  [
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(
      jwt_auth_guard_1.JwtAuthGuard,
      roles_guard_1.RolesGuard,
    ),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      String,
      Object,
      update_order_dto_1.UpdateOrderDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "update",
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
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0),
  ],
  OrdersController.prototype,
  "remove",
  null,
);
exports.OrdersController = OrdersController = __decorate(
  [
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [
      orders_service_1.OrdersService,
      order_options_service_1.OrderOptionsService,
    ]),
  ],
  OrdersController,
);
//# sourceMappingURL=orders.controller.js.map
