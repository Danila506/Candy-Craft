import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomUUID } from 'crypto';
import {
  CLOUDINARY_UPLOAD_CONTENT_TYPES,
  CreateCloudinarySignatureDto,
} from './dto/create-cloudinary-signature.dto';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {}

  createCloudinarySignature(dto: CreateCloudinarySignatureDto) {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');
    const uploadPreset = this.config.get<string>('CLOUDINARY_UPLOAD_PRESET');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new BadRequestException('Cloudinary is not configured');
    }

    if (dto.fileSize > MAX_IMAGE_SIZE_BYTES) {
      throw new BadRequestException('Image is too large');
    }

    if (!CLOUDINARY_UPLOAD_CONTENT_TYPES.includes(dto.contentType)) {
      throw new BadRequestException('Unsupported image type');
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${timestamp}-${randomUUID()}-${this.sanitizeFileName(
      dto.fileName,
    )}`;
    const paramsToSign: Record<string, string | number> = {
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
      allowedContentTypes: CLOUDINARY_UPLOAD_CONTENT_TYPES,
    };
  }

  private signCloudinaryParams(
    params: Record<string, string | number>,
    apiSecret: string,
  ) {
    const payload = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
  }

  private sanitizeFileName(fileName: string) {
    return fileName
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }
}
