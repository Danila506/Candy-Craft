import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalStorageService {
  private readonly uploadsDir = join(process.cwd(), 'uploads', 'products');
  private readonly baseUrl = 'http://localhost:3000/uploads/products';

  constructor() {
    // Создаем папку uploads если ее нет
    if (!existsSync(this.uploadsDir)) {
      mkdirSync(this.uploadsDir, { recursive: true });
      console.log(`Создана папка для загрузок: ${this.uploadsDir}`);
    }
  }

  /**
   * Сохраняет файл локально и возвращает URL
   */
  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('Файл не предоставлен');
    }

    // Проверяем тип файла (только изображения)
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException('Разрешены только изображения: JPEG, PNG, GIF, WebP');
    }

    // Проверяем размер (макс 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Размер файла не должен превышать 5MB');
    }

    // Генерируем уникальное имя файла
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(this.uploadsDir, fileName);

    // Сохраняем файл
    writeFileSync(filePath, file.buffer);

    // Возвращаем публичный URL
    return `${this.baseUrl}/${fileName}`;
  }

  /**
   * Удаляет файл
   */
  async deleteFile(imageUrl: string): Promise<void> {
    try {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        const filePath = join(this.uploadsDir, fileName);
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      }
    } catch (error) {
      console.error('Ошибка удаления файла:', error);
    }
  }

  /**
   * Получает путь к файлу из URL
   */
  getFilePathFromUrl(imageUrl: string): string | null {
    try {
      const fileName = imageUrl.split('/').pop();
      return fileName ? join(this.uploadsDir, fileName) : null;
    } catch {
      return null;
    }
  }
}