import {
  IsIn,
  IsInt,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const allowedFolders = ['categories', 'products'] as const;
const allowedContentTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

export type CloudinaryUploadFolder = (typeof allowedFolders)[number];
export type CloudinaryUploadContentType = (typeof allowedContentTypes)[number];

export const CLOUDINARY_UPLOAD_FOLDERS = allowedFolders;
export const CLOUDINARY_UPLOAD_CONTENT_TYPES = allowedContentTypes;

export class CreateCloudinarySignatureDto {
  @IsIn(allowedFolders)
  folder: CloudinaryUploadFolder;

  @IsString()
  @MinLength(1)
  @MaxLength(180)
  fileName: string;

  @IsInt()
  @Min(1)
  fileSize: number;

  @IsIn(allowedContentTypes)
  contentType: CloudinaryUploadContentType;
}
