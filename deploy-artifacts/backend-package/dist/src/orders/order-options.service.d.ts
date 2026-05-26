import { ConfigService } from "@nestjs/config";
type OrderOptionConfig = {
  id: number;
  name: string;
  description: string;
  priceMinor: number;
  time?: string;
  available?: boolean;
};
export declare class OrderOptionsService {
  private readonly config;
  constructor(config: ConfigService);
  getDeliveryOptions(): OrderOptionConfig[];
  getGiftOptions(): OrderOptionConfig[];
  getPublicOptions(): {
    delivery: {
      price: number;
      id: number;
      name: string;
      description: string;
      priceMinor: number;
      time?: string;
      available?: boolean;
    }[];
    gifts: {
      price: number;
      id: number;
      name: string;
      description: string;
      priceMinor: number;
      time?: string;
      available?: boolean;
    }[];
  };
  getDeliveryFeeMinor(deliveryOptionId?: number): number;
  getGiftTotalMinor(giftOptionId?: number): number;
}
export {};
