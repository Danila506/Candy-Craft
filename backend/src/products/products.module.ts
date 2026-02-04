import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  providers: [ProductsService, RolesGuard],
  controllers: [ProductsController],
})
export class ProductsModule {}
