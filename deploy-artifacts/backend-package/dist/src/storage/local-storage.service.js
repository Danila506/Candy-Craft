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
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path_1 = require("path");
let LocalStorageService = class LocalStorageService {
  uploadsDir = (0, path_1.join)(process.cwd(), "uploads", "products");
  baseUrl = "http://localhost:3000/uploads/products";
  constructor() {
    if (!(0, fs_1.existsSync)(this.uploadsDir)) {
      (0, fs_1.mkdirSync)(this.uploadsDir, { recursive: true });
      console.log(`Создана папка для загрузок: ${this.uploadsDir}`);
    }
  }
  async saveFile(file) {
    if (!file) {
      throw new common_1.BadRequestException("Файл не предоставлен");
    }
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new common_1.BadRequestException(
        "Разрешены только изображения: JPEG, PNG, GIF, WebP",
      );
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new common_1.BadRequestException(
        "Размер файла не должен превышать 5MB",
      );
    }
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${(0, crypto_1.randomUUID)()}.${fileExtension}`;
    const filePath = (0, path_1.join)(this.uploadsDir, fileName);
    (0, fs_1.writeFileSync)(filePath, file.buffer);
    return `${this.baseUrl}/${fileName}`;
  }
  async deleteFile(imageUrl) {
    try {
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        const filePath = (0, path_1.join)(this.uploadsDir, fileName);
        if ((0, fs_1.existsSync)(filePath)) {
          (0, fs_1.unlinkSync)(filePath);
        }
      }
    } catch (error) {
      console.error("Ошибка удаления файла:", error);
    }
  }
  getFilePathFromUrl(imageUrl) {
    try {
      const fileName = imageUrl.split("/").pop();
      return fileName ? (0, path_1.join)(this.uploadsDir, fileName) : null;
    } catch {
      return null;
    }
  }
};
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = __decorate(
  [(0, common_1.Injectable)(), __metadata("design:paramtypes", [])],
  LocalStorageService,
);
//# sourceMappingURL=local-storage.service.js.map
