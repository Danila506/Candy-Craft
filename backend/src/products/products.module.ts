import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../categories/category.entity';
import { StorageModule } from 'src/storage/local-storage.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}