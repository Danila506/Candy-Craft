import { ConfigService } from "@nestjs/config";
import { CreateCloudinarySignatureDto } from "./dto/create-cloudinary-signature.dto";
export declare class UploadsService {
  private readonly config;
  constructor(config: ConfigService);
  createCloudinarySignature(dto: CreateCloudinarySignatureDto): {
    cloudName: string;
    apiKey: string;
    signature: string;
    timestamp: number;
    folder: "products" | "categories";
    publicId: string;
    uploadPreset: string | null;
    maxFileSize: number;
    allowedContentTypes: readonly [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
  };
  private signCloudinaryParams;
  private sanitizeFileName;
}
