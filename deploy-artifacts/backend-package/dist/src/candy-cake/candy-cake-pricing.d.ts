export type CandyCakeConfig = {
  type?: string;
  base?: string;
  size?: string;
  sweetSet?: string;
  color?: string;
  outerLayer?: string;
  wrapper?: string;
  packaging?: string;
  decor?: string;
  messageText?: string;
  totalPrice?: number;
};
export declare function calculateCandyCakePrice(
  config: CandyCakeConfig,
): number;
