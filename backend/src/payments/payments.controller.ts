import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';
import type { Role } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('orders/:orderId/yookassa')
  @UseGuards(JwtAuthGuard)
  createYooKassaPayment(
    @Param('orderId') orderId: string,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Req() req: Request,
  ) {
    const currentUserId = (req as any).user?.userId as number;
    const role = (req as any).user?.role as Role | undefined;
    return this.paymentsService.createYooKassaPayment(
      +orderId,
      currentUserId,
      role,
      idempotencyKey,
    );
  }

  @Get('orders/:orderId')
  @UseGuards(JwtAuthGuard)
  getOrderPayments(@Param('orderId') orderId: string, @Req() req: Request) {
    const currentUserId = (req as any).user?.userId as number;
    const role = (req as any).user?.role as Role | undefined;
    return this.paymentsService.getOrderPayments(+orderId, currentUserId, role);
  }

  @Post('webhooks/yookassa')
  async handleYooKassaWebhook(@Body() payload: any) {
    return this.paymentsService.handleYooKassaWebhook(payload);
  }
}
