export type CartCustomCandyCakeConfig = {
  type?: undefined;
  version: number;
  layout?: "box" | "round-basket" | "tiered-tower" | "heart-box";
  shape: "round" | "square" | "heart";
  size: "small" | "medium" | "large";
  // Legacy custom cakes may still contain levels/tiers, but the current builder
  // is single-level only.
  levels?: number;
  tiers?: number;
  theme: "pink" | "gold" | "kids" | "premium" | "mixed";
  baseColor: string;
  ribbonColor: string;
  outerCandyId?: string;
  innerCandyId?: string;
  innerFillPreset?: "level" | "stacked" | "mound";
  candies: Array<{
    id: string;
    name?: string;
    type?: string;
    quantity: number;
    color?: string;
  }>;
  decorations: Array<{
    type: "ribbon" | "bow" | "topper" | "card" | "flower";
    color?: string;
    text?: string;
  }>;
  inscription?: string;
};

export type CartCustomCakeConfig = {
  type: "custom_cake";
  base: "round" | "heart" | "square";
  size: "s" | "m" | "l" | "xl";
  innerLayer: Array<{
    candyId: "milka" | "raffaello" | "kinder" | "ferrero" | "merci";
    percentage: number;
  }>;
  color: "pink" | "gold" | "white";
  outerLayer:
    | "kinder-chocolate"
    | "kinder-bueno"
    | "milka-baton"
    | "twix"
    | "rittersport"
    | "kitkat"
    | "snikers"
    | "milkiway";
  wrapper: "satin" | "lace" | "kraft" | "transparent";
  packaging: "standard" | "window" | "gift" | "premium-box";
  decor: Array<"bow" | "topper"> | "none" | "flowers" | "bow" | "topper";
  messageText?: string;
  totalPrice?: number;
};

export type AddCustomCandyCakePayload = {
  quantity: number;
  config: CartCustomCakeConfig;
};

export type CartType = {
  id: number;
  name: string;
  productId: number | null;
  inStock: number;
  reservedQty?: number;
  quantity: number;
  price: number;
  imageUrl: string;
  isCustom?: boolean;
  customConfig?: CartCustomCakeConfig | CartCustomCandyCakeConfig;
  customPreviewUrl?: string | null;
};
