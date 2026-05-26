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
exports.SuggestModule = void 0;
const common_1 = require("@nestjs/common");
const suggest_controller_1 = require("./suggest.controller");
const suggest_service_1 = require("./suggest.service");
const rate_limit_guard_1 = require("../security/rate-limit.guard");
const simple_rate_limit_store_1 = require("../security/simple-rate-limit.store");
let SuggestModule = class SuggestModule {};
exports.SuggestModule = SuggestModule;
exports.SuggestModule = SuggestModule = __decorate(
  [
    (0, common_1.Module)({
      controllers: [suggest_controller_1.SuggestController],
      providers: [
        suggest_service_1.SuggestService,
        rate_limit_guard_1.RateLimitGuard,
        simple_rate_limit_store_1.SimpleRateLimitStore,
      ],
      exports: [suggest_service_1.SuggestService],
    }),
  ],
  SuggestModule,
);
//# sourceMappingURL=suggest.module.js.map
