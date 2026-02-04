import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  providers: [CategoriesService, RolesGuard],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
