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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const create_cloudinary_signature_dto_1 = require("./dto/create-cloudinary-signature.dto");
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
let UploadsService = class UploadsService {
  config;
  constructor(config) {
    this.config = config;
  }
  createCloudinarySignature(dto) {
    const cloudName = this.config.get("CLOUDINARY_CLOUD_NAME");
    const apiKey = this.config.get("CLOUDINARY_API_KEY");
    const apiSecret = this.config.get("CLOUDINARY_API_SECRET");
    const uploadPreset = this.config.get("CLOUDINARY_UPLOAD_PRESET");
    if (!cloudName || !apiKey || !apiSecret) {
      throw new common_1.BadRequestException("Cloudinary is not configured");
    }
    if (dto.fileSize > MAX_IMAGE_SIZE_BYTES) {
      throw new common_1.BadRequestException("Image is too large");
    }
    if (
      !create_cloudinary_signature_dto_1.CLOUDINARY_UPLOAD_CONTENT_TYPES.includes(
        dto.contentType,
      )
    ) {
      throw new common_1.BadRequestException("Unsupported image type");
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${timestamp}-${(0, crypto_1.randomUUID)()}-${this.sanitizeFileName(dto.fileName)}`;
    const paramsToSign = {
      folder: dto.folder,
      public_id: publicId,
      timestamp,
    };
    if (uploadPreset) {
      paramsToSign.upload_preset = uploadPreset;
    }
    return {
      cloudName,
      apiKey,
      signature: this.signCloudinaryParams(paramsToSign, apiSecret),
      timestamp,
      folder: dto.folder,
      publicId,
      uploadPreset: uploadPreset || null,
      maxFileSize: MAX_IMAGE_SIZE_BYTES,
      allowedContentTypes:
        create_cloudinary_signature_dto_1.CLOUDINARY_UPLOAD_CONTENT_TYPES,
    };
  }
  signCloudinaryParams(params, apiSecret) {
    const payload = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return (0, crypto_1.createHash)("sha1")
      .update(`${payload}${apiSecret}`)
      .digest("hex");
  }
  sanitizeFileName(fileName) {
    return fileName
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService]),
  ],
  UploadsService,
);
//# sourceMappingURL=uploads.service.js.map
