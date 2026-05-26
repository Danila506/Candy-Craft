export declare class CustomCandyCakeConfigDto {
  type: "custom_cake";
  base: string;
  size: string;
  sweetSet: string;
  color: string;
  outerLayer: string;
  wrapper: string;
  packaging: string;
  decor: string;
  messageText?: string;
  totalPrice?: number;
}
export declare class CreateCustomCandyCakeDto {
  quantity?: number;
  config: CustomCandyCakeConfigDto;
}
