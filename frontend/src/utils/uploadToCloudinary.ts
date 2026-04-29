import { http } from "../api/http";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

type CloudinarySignature = {
  cloudName: string;
  apiKey: string;
  signature: string;
  timestamp: number;
  folder: "categories" | "products";
  publicId: string;
  uploadPreset: string | null;
  maxFileSize: number;
  allowedContentTypes: string[];
};

export async function uploadToCloudinary(
  file: File,
  folder: "categories" | "products",
) {
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Файл больше 5 МБ");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Поддерживаются только JPEG, PNG, WebP и GIF");
  }

  const signedUpload = await http.post<CloudinarySignature>(
    "/uploads/cloudinary/signature",
    {
      folder,
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type,
    },
  );

  if (
    file.size > signedUpload.maxFileSize ||
    !signedUpload.allowedContentTypes.includes(file.type)
  ) {
    throw new Error("Файл не соответствует ограничениям загрузки");
  }

  const url = `https://api.cloudinary.com/v1_1/${signedUpload.cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signedUpload.apiKey);
  formData.append("timestamp", String(signedUpload.timestamp));
  formData.append("signature", signedUpload.signature);
  formData.append("folder", signedUpload.folder);
  formData.append("public_id", signedUpload.publicId);

  if (signedUpload.uploadPreset) {
    formData.append("upload_preset", signedUpload.uploadPreset);
  }

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data));

  if (!data.secure_url || typeof data.secure_url !== "string") {
    throw new Error("Cloudinary did not return image URL");
  }

  return data.secure_url as string;
}
