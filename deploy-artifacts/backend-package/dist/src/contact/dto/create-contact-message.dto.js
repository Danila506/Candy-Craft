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
exports.CreateContactMessageDto = void 0;
const class_validator_1 = require("class-validator");
class CreateContactMessageDto {
  name;
  email;
  phone;
  message;
}
exports.CreateContactMessageDto = CreateContactMessageDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String),
  ],
  CreateContactMessageDto.prototype,
  "name",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String),
  ],
  CreateContactMessageDto.prototype,
  "email",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String),
  ],
  CreateContactMessageDto.prototype,
  "phone",
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(3000),
    __metadata("design:type", String),
  ],
  CreateContactMessageDto.prototype,
  "message",
  void 0,
);
//# sourceMappingURL=create-contact-message.dto.js.map
