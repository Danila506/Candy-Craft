export type CakeBaseId = "round" | "heart" | "square";
export type CakeSizeId = "s" | "m" | "l" | "xl";
export type CakeColorId = "pink" | "gold" | "white";
export type CakeDecorId = "bow" | "topper";
export type CakeOuterLayerId =
  | "kinder-chocolate"
  | "kinder-bueno"
  | "milka-baton"
  | "twix"
  | "rittersport"
  | "kitkat"
  | "snikers"
  | "milkiway";
export type CakeInnerCandyId =
  | "milka"
  | "raffaello"
  | "kinder"
  | "ferrero"
  | "merci";
export type CakeWrapperId = "satin" | "lace" | "kraft" | "transparent";
export type CakePackagingId = "standard" | "window" | "gift" | "premium-box";

export type CakeInnerLayerPart = {
  candyId: CakeInnerCandyId;
  percentage: number;
};

export type CakeConstructorConfig = {
  type: "custom_cake";
  base: CakeBaseId;
  size: CakeSizeId;
  innerLayer: Array<CakeInnerLayerPart>;
  color: CakeColorId;
  outerLayer: CakeOuterLayerId;
  wrapper: CakeWrapperId;
  packaging: CakePackagingId;
  decor: Array<CakeDecorId>;
  messageText: string;
};

export type CakeOption<T extends string> = {
  id: T;
  label: string;
  description?: string;
  price: number;
};

export type CakeInnerCandyOption = {
  id: CakeInnerCandyId;
  label: string;
  mixCoefficient: number;
};

export const cakeOptions = {
  bases: [
    {
      id: "round",
      label: "Круглый торт",
      description: "Классическая форма",
      price: 2000,
    },
    {
      id: "heart",
      label: "Сердце",
      description: "Подарочный акцент",
      price: 2500,
    },
    {
      id: "square",
      label: "Квадратный торт",
      description: "Ровная современная форма",
      price: 2250,
    },
  ] satisfies Array<CakeOption<CakeBaseId>>,
  sizes: [
    { id: "s", label: "S", description: "14,5см", price: 250 },
    { id: "m", label: "M", description: "19,5см", price: 1000 },
    { id: "l", label: "L", description: "24,5см", price: 1750 },
    { id: "xl", label: "XL", description: "29,5см", price: 2500 },
  ] satisfies Array<CakeOption<CakeSizeId>>,
  innerCandies: [
    {
      id: "milka",
      label: "Milka",
      mixCoefficient: 1,
    },
    {
      id: "raffaello",
      label: "Raffaello",
      mixCoefficient: 1.24,
    },
    {
      id: "kinder",
      label: "Kinder",
      mixCoefficient: 1.08,
    },
    {
      id: "ferrero",
      label: "Ferrero",
      mixCoefficient: 1.38,
    },
    {
      id: "merci",
      label: "Merci",
      mixCoefficient: 1.12,
    },
  ] satisfies Array<CakeInnerCandyOption>,
  colors: [
    {
      id: "pink",
      label: "Розовый",
      price: 0,
    },
    {
      id: "gold",
      label: "Золото",
      price: 0,
    },
    {
      id: "white",
      label: "Белый",
      price: 0,
    },
  ] satisfies Array<CakeOption<CakeColorId>>,
  outerLayers: [
    {
      id: "kinder-chocolate",
      label: "Kinder Chocolate",
      price: 0,
    },
    {
      id: "kinder-bueno",
      label: "Kinder Bueno",
      price: 0,
    },
    {
      id: "milka-baton",
      label: "Milka Baton",
      price: 0,
    },
    {
      id: "twix",
      label: "Twix",
      price: 0,
    },
    {
      id: "rittersport",
      label: "RitterSport",
      price: 0,
    },
    {
      id: "kitkat",
      label: "Kitkat",
      price: 0,
    },
    {
      id: "snikers",
      label: "Snikers",
      price: 0,
    },
    {
      id: "milkiway",
      label: "MilkiWay",
      price: 0,
    },
  ] satisfies Array<CakeOption<CakeOuterLayerId>>,
  wrappers: [
    {
      id: "satin",
      label: "Атласная лента",
      description: "Классическая лента вокруг торта",
      price: 0,
    },
    {
      id: "lace",
      label: "Кружевная обёртка",
      description: "Нежная фактурная отделка по борту",
      price: 0,
    },
    {
      id: "kraft",
      label: "Крафт-бортик",
      description: "Спокойная натуральная подача",
      price: 0,
    },
    {
      id: "transparent",
      label: "Прозрачный борт",
      description: "Акцент на видимые конфеты",
      price: 0,
    },
  ] satisfies Array<CakeOption<CakeWrapperId>>,
  packaging: [
    {
      id: "standard",
      label: "Фирменная коробка",
      description: "Белая коробка CandyCraft",
      price: 0,
    },
    {
      id: "window",
      label: "Коробка с окном",
      description: "Торт виден до открытия",
      price: 875,
    },
    {
      id: "gift",
      label: "Подарочная упаковка",
      description: "Бант, бирка и праздничная подача",
      price: 1250,
    },
  ] satisfies Array<CakeOption<CakePackagingId>>,
  decor: [
    {
      id: "bow",
      label: "Бант",
      description: "Декоративный бант на торте",
      price: 375,
    },
    {
      id: "topper",
      label: "Топпер с надписью",
      description: "Верхний топпер с вашим текстом",
      price: 500,
    },
  ] satisfies Array<CakeOption<CakeDecorId>>,
} as const;

export const defaultCakeConfig: CakeConstructorConfig = {
  type: "custom_cake",
  base: "round",
  size: "m",
  innerLayer: [{ candyId: "kinder", percentage: 100 }],
  color: "pink",
  outerLayer: "kinder-chocolate",
  wrapper: "satin",
  packaging: "standard",
  decor: [],
  messageText: "",
};

export function getOptionLabel<T extends string>(
  options: Array<CakeOption<T>>,
  id: T,
) {
  return options.find((option) => option.id === id)?.label ?? id;
}

const innerLayerBasePricesBySize: Record<CakeSizeId, number> = {
  s: 950,
  m: 1450,
  l: 2050,
  xl: 2750,
};

const innerLayerMinPriceBySize: Record<CakeSizeId, number> = {
  s: 900,
  m: 1300,
  l: 1850,
  xl: 2500,
};

const innerLayerMaxPriceBySize: Record<CakeSizeId, number> = {
  s: 1400,
  m: 2100,
  l: 2950,
  xl: 3900,
};

export function getInnerLayerPercentSum(innerLayer: Array<CakeInnerLayerPart>) {
  const sum = innerLayer.reduce((acc, part) => acc + (part.percentage || 0), 0);
  return Math.round(sum * 100) / 100;
}

function formatPercent(percentage: number) {
  if (Number.isInteger(percentage)) {
    return String(percentage);
  }

  return percentage.toFixed(1).replace(/\.0$/, "");
}

export function getInnerLayerSummary(innerLayer: Array<CakeInnerLayerPart>) {
  const candyMap = new Map(
    cakeOptions.innerCandies.map((candy) => [candy.id, candy]),
  );
  const parts = innerLayer
    .filter((part) => part.percentage > 0)
    .map((part) => {
      const candy = candyMap.get(part.candyId);
      if (!candy) return null;
      return `${candy.label} ${formatPercent(part.percentage)}%`;
    })
    .filter((part): part is string => Boolean(part));

  return parts.join(", ");
}

export function getDecorSummary(decor: Array<CakeDecorId>) {
  if (!decor.length) {
    return "Без декора";
  }

  const selected = cakeOptions.decor
    .filter((option) => decor.includes(option.id))
    .map((option) => option.label);

  return selected.join(", ");
}

function roundToStep(value: number, step: number) {
  if (step <= 0) {
    return Math.round(value);
  }

  return Math.round(value / step) * step;
}

export function estimateInnerLayer(
  size: CakeSizeId,
  innerLayer: Array<CakeInnerLayerPart>,
) {
  const basePrice = innerLayerBasePricesBySize[size] ?? 0;
  const minPrice = innerLayerMinPriceBySize[size] ?? 0;
  const maxPrice = innerLayerMaxPriceBySize[size] ?? Number.MAX_SAFE_INTEGER;
  const percentSum = getInnerLayerPercentSum(innerLayer);
  const candyMap = new Map(
    cakeOptions.innerCandies.map((candy) => [candy.id, candy]),
  );
  const items = innerLayer
    .filter((part) => part.percentage > 0)
    .map((part) => {
      const candy = candyMap.get(part.candyId);
      if (!candy) return null;

      return {
        candyId: candy.id,
        label: candy.label,
        percentage: part.percentage,
      };
    })
    .filter(
      (
        item,
      ): item is {
        candyId: CakeInnerCandyId;
        label: string;
        percentage: number;
      } => Boolean(item),
    );

  const mixCoefficient =
    percentSum > 0
      ? items.reduce((sum, item) => {
          const candy = candyMap.get(item.candyId);
          if (!candy) return sum;
          return sum + (item.percentage / percentSum) * candy.mixCoefficient;
        }, 0)
      : 0;

  const rawPrice = basePrice * mixCoefficient;
  const roundedPrice = roundToStep(rawPrice, 50);
  const totalPrice =
    percentSum > 0 ? Math.min(maxPrice, Math.max(minPrice, roundedPrice)) : 0;

  return {
    items,
    totalPrice,
    mixCoefficient,
    basePrice,
    summary: getInnerLayerSummary(innerLayer),
  };
}

export function calculateCakePrice(config: CakeConstructorConfig) {
  const basePrice =
    cakeOptions.bases.find((option) => option.id === config.base)?.price ?? 0;
  const sizePrice =
    cakeOptions.sizes.find((option) => option.id === config.size)?.price ?? 0;
  const innerLayerPrice = estimateInnerLayer(
    config.size,
    config.innerLayer,
  ).totalPrice;
  const colorPrice =
    cakeOptions.colors.find((option) => option.id === config.color)?.price ?? 0;
  const outerLayerPrice = getOuterLayerPrice(config.size, config.outerLayer);
  const wrapperPrice =
    cakeOptions.wrappers.find((option) => option.id === config.wrapper)
      ?.price ?? 0;
  const packagingPrice =
    cakeOptions.packaging.find((option) => option.id === config.packaging)
      ?.price ?? 0;
  const decorPrice = config.decor.reduce((sum, decorId) => {
    const option = cakeOptions.decor.find(
      (candidate) => candidate.id === decorId,
    );
    return sum + (option?.price ?? 0);
  }, 0);

  return (
    basePrice +
    sizePrice +
    innerLayerPrice +
    colorPrice +
    outerLayerPrice +
    wrapperPrice +
    packagingPrice +
    decorPrice
  );
}

const outerLayerPricesBySize: Record<CakeSizeId, number> = {
  s: 1125,
  m: 1500,
  l: 1875,
  xl: 2250,
};

export function getOuterLayerPrice(
  size: CakeSizeId,
  outerLayer: CakeOuterLayerId,
) {
  const hasOuterLayer = cakeOptions.outerLayers.some(
    (option) => option.id === outerLayer,
  );

  if (!hasOuterLayer) {
    return 0;
  }

  return outerLayerPricesBySize[size] ?? 0;
}
