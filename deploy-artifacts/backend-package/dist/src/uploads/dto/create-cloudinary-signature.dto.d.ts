declare const allowedFolders: readonly ["categories", "products"];
declare const allowedContentTypes: readonly [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export type CloudinaryUploadFolder = (typeof allowedFolders)[number];
export type CloudinaryUploadContentType = (typeof allowedContentTypes)[number];
export declare const CLOUDINARY_UPLOAD_FOLDERS: readonly [
  "categories",
  "products",
];
export declare const CLOUDINARY_UPLOAD_CONTENT_TYPES: readonly [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export declare class CreateCloudinarySignatureDto {
  folder: CloudinaryUploadFolder;
  fileName: string;
  fileSize: number;
  contentType: CloudinaryUploadContentType;
}
export {};
