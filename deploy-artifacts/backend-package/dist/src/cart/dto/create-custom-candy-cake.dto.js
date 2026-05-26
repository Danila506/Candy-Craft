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
exports.CreateCustomCandyCakeDto = exports.CustomCandyCakeConfigDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CustomCandyCakeConfigDto {
  type;
  base;
  size;
  sweetSet;
  color;
  outerLayer;
  wrapper;
  packaging;
  decor;
  messageText;
  totalPrice;
}
exports.CustomCandyCakeConfigDto = CustomCandyCakeConfigDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["custom_cake"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "type",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["round", "heart", "square"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "base",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["m", "l"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "size",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["kinder", "merci", "mix", "premium"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "sweetSet",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["pink", "gold", "white"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "color",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)([
      "kinder-sticks",
      "kitkat",
      "merci-bars",
      "wafer-rolls",
    ]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "outerLayer",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["satin", "lace", "kraft", "transparent"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "wrapper",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["standard", "window", "gift", "premium-box"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "packaging",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["none", "flowers", "bow", "topper"]),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "decor",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String),
  ],
  CustomCandyCakeConfigDto.prototype,
  "messageText",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100000),
    __metadata("design:type", Number),
  ],
  CustomCandyCakeConfigDto.prototype,
  "totalPrice",
  void 0,
);
class CreateCustomCandyCakeDto {
  quantity;
  config;
}
exports.CreateCustomCandyCakeDto = CreateCustomCandyCakeDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number),
  ],
  CreateCustomCandyCakeDto.prototype,
  "quantity",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CustomCandyCakeConfigDto),
    __metadata("design:type", CustomCandyCakeConfigDto),
  ],
  CreateCustomCandyCakeDto.prototype,
  "config",
  void 0,
);
//# sourceMappingURL=create-custom-candy-cake.dto.js.map
