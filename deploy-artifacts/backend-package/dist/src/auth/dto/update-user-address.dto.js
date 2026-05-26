"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_address_dto_1 = require("./create-user-address.dto");
class UpdateUserAddressDto extends (0, swagger_1.PartialType)(
  create_user_address_dto_1.CreateUserAddressDto,
) {}
exports.UpdateUserAddressDto = UpdateUserAddressDto;
//# sourceMappingURL=update-user-address.dto.js.map
