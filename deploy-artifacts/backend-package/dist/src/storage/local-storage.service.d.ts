export declare class LocalStorageService {
  private readonly uploadsDir;
  private readonly baseUrl;
  constructor();
  saveFile(file: Express.Multer.File): Promise<string>;
  deleteFile(imageUrl: string): Promise<void>;
  getFilePathFromUrl(imageUrl: string): string | null;
}
