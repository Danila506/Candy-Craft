import { http } from "./http";

export type CheckoutOption = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceMinor: number;
  time?: string;
  available?: boolean;
};

export type CheckoutOptionsResponse = {
  delivery: CheckoutOption[];
  gifts: CheckoutOption[];
};

export function getCheckoutOptions() {
  return http.get<CheckoutOptionsResponse>("/orders/options");
}
