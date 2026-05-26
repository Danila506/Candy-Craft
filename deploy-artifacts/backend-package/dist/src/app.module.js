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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const cart_module_1 = require("./cart/cart.module");
const prisma_module_1 = require("./prisma/prisma.module");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const orders_module_1 = require("./orders/orders.module");
const auth_module_1 = require("./auth/auth.module");
const suggest_module_1 = require("./suggest/suggest.module");
const payments_module_1 = require("./payments/payments.module");
const security_module_1 = require("./security/security.module");
const observability_module_1 = require("./observability/observability.module");
const contact_module_1 = require("./contact/contact.module");
const uploads_module_1 = require("./uploads/uploads.module");
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        config_1.ConfigModule.forRoot({
          isGlobal: true,
        }),
        observability_module_1.ObservabilityModule,
        prisma_module_1.PrismaModule,
        security_module_1.SecurityModule,
        cart_module_1.CartModule,
        categories_module_1.CategoriesModule,
        products_module_1.ProductsModule,
        users_module_1.UsersModule,
        orders_module_1.OrdersModule,
        payments_module_1.PaymentsModule,
        auth_module_1.AuthModule,
        suggest_module_1.SuggestModule,
        contact_module_1.ContactModule,
        uploads_module_1.UploadsModule,
      ],
      controllers: [app_controller_1.AppController],
      providers: [app_service_1.AppService],
    }),
  ],
  AppModule,
);
//# sourceMappingURL=app.module.js.map
