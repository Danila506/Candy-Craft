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
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderOptionsService } from './order-options.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderOptions: OrderOptionsService,
  ) {}

  private getAuthorizedUserId(req: Request, requestedUserId: number) {
    const currentUserId = (req as any).user?.userId as number | undefined;
    const role = (req as any).user?.role as Role | undefined;

    if (!currentUserId) {
      throw new ForbiddenException('Unauthorized');
    }

    if (role !== Role.ADMIN && currentUserId !== requestedUserId) {
      throw new ForbiddenException(
        'Нельзя просматривать заказы другого пользователя',
      );
    }

    return currentUserId;
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id', ParseIntPipe) userId: number,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    this.getAuthorizedUserId(req, userId);
    return this.ordersService.create(createOrderDto, userId, idempotencyKey);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMyOrders(@Req() req: Request) {
    const currentUserId = (req as any).user?.userId as number | undefined;
    if (!currentUserId) {
      throw new ForbiddenException('Unauthorized');
    }
    return this.ordersService.findOrders(currentUserId);
  }

  @Get('options')
  getOptions() {
    return this.orderOptions.getPublicOptions();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    this.getAuthorizedUserId(req, id);
    return this.ordersService.findOrders(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
