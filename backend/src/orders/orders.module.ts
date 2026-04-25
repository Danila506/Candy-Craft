import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrderOptionsService } from './order-options.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderOptionsService, RolesGuard],
})
export class OrdersModule {}
