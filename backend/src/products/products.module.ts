import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';

@Module({
  providers: [ProductsService, RolesGuard, OptionalJwtAuthGuard],
  controllers: [ProductsController],
})
export class ProductsModule {}
