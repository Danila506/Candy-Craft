import { PrismaService } from "../prisma/prisma.service";
import type { Role } from "@prisma/client";
import { ObservabilityService } from "../observability/observability.service";
type WebhookAuditContext = {
  ip?: string | null;
  userAgent?: string | null;
};
export declare class PaymentsService {
  private readonly prisma;
  private readonly observability;
  private readonly logger;
  private static readonly rejectCounters;
  constructor(prisma: PrismaService, observability: ObservabilityService);
  private getYooKassaApiCredentials;
  private getYooKassaReturnUrl;
  private verifyYooKassaPayment;
  private rejectWebhook;
  private trackWebhookRejectSpike;
  createYooKassaPayment(
    orderId: number,
    currentUserId: number,
    currentUserRole?: Role,
    clientIdempotencyKey?: string,
  ): Promise<{
    paymentId: any;
    status: any;
    confirmationUrl: any;
    providerPaymentId: any;
  }>;
  handleYooKassaWebhook(
    payload: any,
    audit?: WebhookAuditContext,
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
  getOrderPayments(
    orderId: number,
    currentUserId: number,
    role?: Role,
  ): Promise<any>;
  private consumeReservedStock;
}
export {};
