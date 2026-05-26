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
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const csrf_origin_guard_1 = require("./csrf-origin.guard");
const rate_limit_guard_1 = require("./rate-limit.guard");
const simple_rate_limit_store_1 = require("./simple-rate-limit.store");
let SecurityModule = class SecurityModule {};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate(
  [
    (0, common_1.Module)({
      providers: [
        core_1.Reflector,
        simple_rate_limit_store_1.SimpleRateLimitStore,
        rate_limit_guard_1.RateLimitGuard,
        {
          provide: core_1.APP_GUARD,
          useClass: csrf_origin_guard_1.CsrfOriginGuard,
        },
      ],
      exports: [
        rate_limit_guard_1.RateLimitGuard,
        simple_rate_limit_store_1.SimpleRateLimitStore,
      ],
    }),
  ],
  SecurityModule,
);
//# sourceMappingURL=security.module.js.map
