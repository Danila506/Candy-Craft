import { CreateCloudinarySignatureDto } from "./dto/create-cloudinary-signature.dto";
import { UploadsService } from "./uploads.service";
export declare class UploadsController {
  private readonly uploads;
  constructor(uploads: UploadsService);
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
}
