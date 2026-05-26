import { PaymentsService } from "./payments.service";
import type { Request } from "express";
export declare class PaymentsController {
  private readonly paymentsService;
  constructor(paymentsService: PaymentsService);
  createYooKassaPayment(
    orderId: string,
    idempotencyKey: string | undefined,
    req: Request,
  ): Promise<{
    paymentId: any;
    status: any;
    confirmationUrl: any;
    providerPaymentId: any;
  }>;
  getOrderPayments(orderId: string, req: Request): Promise<any>;
  handleYooKassaWebhook(
    payload: any,
    req: Request,
  ): Promise<
    | {
        ok: boolean;
        skipped: string;
      }
    | {
        ok: boolean;
        skipped?: undefined;
      }
  >;
}
