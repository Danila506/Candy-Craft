export type CakeBaseId = "round" | "heart" | "square";
export type CakeSizeId = "m" | "l";
export type CakeSweetSetId = "kinder" | "merci" | "mix" | "premium";
export type CakeColorId = "pink" | "gold" | "white";
export type CakeDecorId = "none" | "flowers" | "bow" | "topper";
export type CakeOuterLayerId =
  | "kinder-sticks"
  | "kitkat"
  | "merci-bars"
  | "wafer-rolls";
export type CakeWrapperId = "satin" | "lace" | "kraft" | "transparent";
export type CakePackagingId = "standard" | "window" | "gift" | "premium-box";

export type CakeConstructorConfig = {
  type: "custom_cake";
  base: CakeBaseId;
  size: CakeSizeId;
  sweetSet: CakeSweetSetId;
  color: CakeColorId;
  outerLayer: CakeOuterLayerId;
  wrapper: CakeWrapperId;
  packaging: CakePackagingId;
  decor: CakeDecorId;
  messageText: string;
};

export type CakeOption<T extends string> = {
  id: T;
  label: string;
  description?: string;
  price: number;
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
    { id: "m", label: "M", description: "Средний размер", price: 1000 },
    { id: "l", label: "L", description: "Большой размер", price: 1750 },
  ] satisfies Array<CakeOption<CakeSizeId>>,
  sweetSets: [
    {
      id: "kinder",
      label: "Kinder",
      description: "Внутренний набор Kinder-сладостей",
      price: 875,
    },
    {
      id: "merci",
      label: "Merci",
      description: "Внутри конфеты и мини-шоколад Merci",
      price: 1125,
    },
    {
      id: "mix",
      label: "Mix",
      description: "Смешанный набор конфет внутри",
      price: 750,
    },
    {
      id: "premium",
      label: "Premium",
      description: "Премиальный набор конфет внутри",
      price: 1500,
    },
  ] satisfies Array<CakeOption<CakeSweetSetId>>,
  colors: [
    {
      id: "pink",
      label: "Розовый",
      description: "Розовая лента и акценты",
      price: 0,
    },
    {
      id: "gold",
      label: "Золото",
      description: "Золотая лента и праздничные детали",
      price: 250,
    },
    {
      id: "white",
      label: "Белый",
      description: "Белая лента и светлые акценты",
      price: 0,
    },
  ] satisfies Array<CakeOption<CakeColorId>>,
  outerLayers: [
    {
      id: "kinder-sticks",
      label: "Kinder по борту",
      description: "Наружный ряд из Kinder-шоколада",
      price: 1125,
    },
    {
      id: "kitkat",
      label: "KitKat по борту",
      description: "Плотный ряд шоколадных батончиков",
      price: 1500,
    },
    {
      id: "merci-bars",
      label: "Merci по борту",
      description: "Аккуратный внешний ряд из Merci",
      price: 1875,
    },
    {
      id: "wafer-rolls",
      label: "Вафельные трубочки",
      description: "Наружный ряд из вафельных трубочек",
      price: 1375,
    },
  ] satisfies Array<CakeOption<CakeOuterLayerId>>,
  wrappers: [
    {
      id: "satin",
      label: "Атласная лента",
      description: "Классическая лента вокруг торта",
      price: 375,
    },
    {
      id: "lace",
      label: "Кружевная обёртка",
      description: "Нежная фактурная отделка по борту",
      price: 625,
    },
    {
      id: "kraft",
      label: "Крафт-бортик",
      description: "Спокойная натуральная подача",
      price: 250,
    },
    {
      id: "transparent",
      label: "Прозрачный борт",
      description: "Акцент на видимые конфеты",
      price: 500,
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
    {
      id: "premium-box",
      label: "Премиум-бокс",
      description: "Жёсткая коробка с ложементом",
      price: 2125,
    },
  ] satisfies Array<CakeOption<CakePackagingId>>,
  decor: [
    {
      id: "none",
      label: "Без декора",
      description: "Только торт и сладости",
      price: 0,
    },
    {
      id: "flowers",
      label: "Flowers",
      description: "Цветочный PNG-слой",
      price: 625,
    },
    {
      id: "bow",
      label: "Bow",
      description: "Бант поверх композиции",
      price: 375,
    },
    {
      id: "topper",
      label: "Topper",
      description: "Топпер с надписью",
      price: 500,
    },
  ] satisfies Array<CakeOption<CakeDecorId>>,
} as const;

export const defaultCakeConfig: CakeConstructorConfig = {
  type: "custom_cake",
  base: "round",
  size: "m",
  sweetSet: "kinder",
  color: "pink",
  outerLayer: "kinder-sticks",
  wrapper: "satin",
  packaging: "standard",
  decor: "flowers",
  messageText: "",
};

export const sweetLayouts: Array<{
  base: CakeBaseId;
  size: CakeSizeId;
  sweetSet: CakeSweetSetId;
  imageUrl: string;
  available: boolean;
}> = cakeOptions.bases.flatMap((base) =>
  cakeOptions.sizes.flatMap((size) =>
    cakeOptions.sweetSets.map((sweetSet) => ({
      base: base.id,
      size: size.id,
      sweetSet: sweetSet.id,
      imageUrl: `/constructor/sweets/${base.id}_${size.id}_${sweetSet.id}.png`,
      available: !(
        base.id === "heart" &&
        size.id === "l" &&
        sweetSet.id === "premium"
      ),
    })),
  ),
);

export function getOptionLabel<T extends string>(
  options: Array<CakeOption<T>>,
  id: T,
) {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function getSweetLayout(
  config: Pick<CakeConstructorConfig, "base" | "size" | "sweetSet">,
) {
  return sweetLayouts.find(
    (layout) =>
      layout.base === config.base &&
      layout.size === config.size &&
      layout.sweetSet === config.sweetSet &&
      layout.available,
  );
}

export function isSweetSetAvailable(
  config: Pick<CakeConstructorConfig, "base" | "size">,
  sweetSet: CakeSweetSetId,
) {
  return Boolean(getSweetLayout({ ...config, sweetSet }));
}

export function getFirstAvailableSweetSet(
  config: Pick<CakeConstructorConfig, "base" | "size">,
) {
  return (
    cakeOptions.sweetSets.find((sweetSet) =>
      isSweetSetAvailable(config, sweetSet.id),
    )?.id ?? "kinder"
  );
}

export function calculateCakePrice(config: CakeConstructorConfig) {
  const basePrice =
    cakeOptions.bases.find((option) => option.id === config.base)?.price ?? 0;
  const sizePrice =
    cakeOptions.sizes.find((option) => option.id === config.size)?.price ?? 0;
  const sweetSetPrice =
    cakeOptions.sweetSets.find((option) => option.id === config.sweetSet)
      ?.price ?? 0;
  const colorPrice =
    cakeOptions.colors.find((option) => option.id === config.color)?.price ?? 0;
  const outerLayerPrice =
    cakeOptions.outerLayers.find((option) => option.id === config.outerLayer)
      ?.price ?? 0;
  const wrapperPrice =
    cakeOptions.wrappers.find((option) => option.id === config.wrapper)
      ?.price ?? 0;
  const packagingPrice =
    cakeOptions.packaging.find((option) => option.id === config.packaging)
      ?.price ?? 0;
  const decorPrice =
    cakeOptions.decor.find((option) => option.id === config.decor)?.price ?? 0;

  return (
    basePrice +
    sizePrice +
    sweetSetPrice +
    colorPrice +
    outerLayerPrice +
    wrapperPrice +
    packagingPrice +
    decorPrice
  );
}
