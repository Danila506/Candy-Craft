import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';

@Module({
  providers: [LocalStorageService],
  exports: [LocalStorageService], // Экспортируем для использования в других модулях
})
export class StorageModule {}