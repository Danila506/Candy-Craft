import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  Headers,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id') userId: string,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const requestedUserId = +userId;
    const currentUserId = (req as any).user?.userId as number | undefined;
    const role = (req as any).user?.role as Role | undefined;
    if (!currentUserId) {
      throw new ForbiddenException('Unauthorized');
    }
    if (role !== Role.ADMIN && currentUserId !== requestedUserId) {
      throw new ForbiddenException(
        'Нельзя создавать заказ для другого пользователя',
      );
    }
    return this.ordersService.create(
      createOrderDto,
      requestedUserId,
      idempotencyKey,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOrders(+id);
  }

  @Get(':id/history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findStatusHistory(@Param('id') id: string) {
    return this.ordersService.getStatusHistory(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const changedByUserId = (req as any).user?.userId as number | undefined;
    return this.ordersService.update(+id, updateOrderDto, changedByUserId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
