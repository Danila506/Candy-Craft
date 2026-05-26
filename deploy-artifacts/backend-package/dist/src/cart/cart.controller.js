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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const create_cart_item_dto_1 = require("./dto/create-cart-item.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_custom_candy_cake_dto_1 = require("./dto/create-custom-candy-cake.dto");
let CartController = class CartController {
  cartService;
  constructor(cartService) {
    this.cartService = cartService;
  }
  getAuthorizedUserId(req, requestUserId) {
    const authUserId = req.user?.userId;
    if (!authUserId || authUserId !== requestUserId) {
      throw new common_1.ForbiddenException(
        "You can only access your own cart",
      );
    }
    return authUserId;
  }
  getCartItemsCount(req, userId) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.getCartItemsCount(authorizedUserId);
  }
  getCart(req, userId) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.getCart(authorizedUserId);
  }
  addToCart(req, userId, createCartDto) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.addToCart(authorizedUserId, createCartDto);
  }
  addCustomCandyCake(req, userId, createCustomCakeDto) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.addCustomCandyCake(
      authorizedUserId,
      createCustomCakeDto,
    );
  }
  updateCartItem(req, userId, productId, updateCartItemDto) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.updateCartItem(
      authorizedUserId,
      productId,
      updateCartItemDto.quantity,
    );
  }
  updateCartItemById(req, userId, cartItemId, updateCartItemDto) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.updateCartItemById(
      authorizedUserId,
      cartItemId,
      updateCartItemDto.quantity,
    );
  }
  removeFromCart(req, userId, productId) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.removeFromCart(authorizedUserId, productId);
  }
  removeCartItemById(req, userId, cartItemId) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.removeCartItemById(authorizedUserId, cartItemId);
  }
  clearCart(req, userId) {
    const authorizedUserId = this.getAuthorizedUserId(req, userId);
    return this.cartService.clearCart(authorizedUserId);
  }
};
exports.CartController = CartController;
__decorate(
  [
    (0, common_1.Get)(":userId/count"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "getCartItemsCount",
  null,
);
__decorate(
  [
    (0, common_1.Get)(":userId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "getCart",
  null,
);
__decorate(
  [
    (0, common_1.Post)(":userId/items"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Object,
      Number,
      create_cart_item_dto_1.CreateCartItemDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "addToCart",
  null,
);
__decorate(
  [
    (0, common_1.Post)(":userId/custom-candy-cakes"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Object,
      Number,
      create_custom_candy_cake_dto_1.CreateCustomCandyCakeDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "addCustomCandyCake",
  null,
);
__decorate(
  [
    (0, common_1.Patch)(":userId/items/:productId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("productId", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Object,
      Number,
      Number,
      update_cart_item_dto_1.UpdateCartItemDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "updateCartItem",
  null,
);
__decorate(
  [
    (0, common_1.Patch)(":userId/custom-items/:cartItemId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("cartItemId", common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      Object,
      Number,
      Number,
      update_cart_item_dto_1.UpdateCartItemDto,
    ]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "updateCartItemById",
  null,
);
__decorate(
  [
    (0, common_1.Delete)(":userId/items/:productId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("productId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "removeFromCart",
  null,
);
__decorate(
  [
    (0, common_1.Delete)(":userId/custom-items/:cartItemId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("cartItemId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "removeCartItemById",
  null,
);
__decorate(
  [
    (0, common_1.Delete)(":userId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0),
  ],
  CartController.prototype,
  "clearCart",
  null,
);
exports.CartController = CartController = __decorate(
  [
    (0, common_1.Controller)("cart"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cart_service_1.CartService]),
  ],
  CartController,
);
//# sourceMappingURL=cart.controller.js.map
