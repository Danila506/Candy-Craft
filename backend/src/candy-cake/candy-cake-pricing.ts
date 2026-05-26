export type CandyCakeConfig = {
  type?: string;
  base?: string;
  size?: string;
  innerLayer?: Array<{
    candyId?: string;
    percentage?: number;
  }>;
  color?: string;
  outerLayer?: string;
  wrapper?: string;
  packaging?: string;
  decor?: string[] | string;
  messageText?: string;
  totalPrice?: number;
};

const basePrices: Record<string, number> = {
  round: 2000,
  heart: 2500,
  square: 2250,
};

const sizePrices: Record<string, number> = {
  s: 250,
  m: 1000,
  l: 1750,
  xl: 2500,
};

const innerLayerBasePricesBySize: Record<string, number> = {
  s: 950,
  m: 1450,
  l: 2050,
  xl: 2750,
};

const innerCandyMixCoefficients: Record<string, number> = {
  milka: 1,
  kinder: 1.08,
  merci: 1.12,
  raffaello: 1.24,
  ferrero: 1.38,
};

const innerLayerMinPriceBySize: Record<string, number> = {
  s: 900,
  m: 1300,
  l: 1850,
  xl: 2500,
};

const innerLayerMaxPriceBySize: Record<string, number> = {
  s: 1400,
  m: 2100,
  l: 2950,
  xl: 3900,
};

const colorPrices: Record<string, number> = {
  pink: 0,
  gold: 0,
  white: 0,
};

const outerLayerIds = new Set([
  'kinder-chocolate',
  'kinder-bueno',
  'milka-baton',
  'twix',
  'rittersport',
  'kitkat',
  'snikers',
  'milkiway',
]);

const outerLayerPricesBySize: Record<string, number> = {
  s: 1125,
  m: 1500,
  l: 1875,
  xl: 2250,
};

const wrapperPrices: Record<string, number> = {
  satin: 0,
  lace: 0,
  kraft: 0,
  transparent: 0,
};

const packagingPrices: Record<string, number> = {
  standard: 0,
  window: 875,
  gift: 1250,
  'premium-box': 2125,
};

const decorPrices: Record<string, number> = {
  bow: 375,
  topper: 500,
};

function calculateInnerLayerPrice(config: CandyCakeConfig) {
  if (!Array.isArray(config.innerLayer) || config.innerLayer.length === 0) {
    throw new Error('Выберите состав внутреннего слоя');
  }

  const basePrice = innerLayerBasePricesBySize[config.size || ''];
  const minPrice = innerLayerMinPriceBySize[config.size || ''];
  const maxPrice = innerLayerMaxPriceBySize[config.size || ''];
  if (
    basePrice === undefined ||
    minPrice === undefined ||
    maxPrice === undefined
  ) {
    throw new Error('Выберите корректный размер торта');
  }

  let percentageSum = 0;
  let mixCoefficient = 0;

  for (const part of config.innerLayer) {
    const candyId = part?.candyId || '';
    const percentage = Number(part?.percentage ?? NaN);

    const candyCoefficient = innerCandyMixCoefficients[candyId];
    if (candyCoefficient === undefined) {
      throw new Error('Выберите корректные конфеты для внутреннего слоя');
    }
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      throw new Error('Укажите корректные проценты внутреннего слоя');
    }

    percentageSum += percentage;
    mixCoefficient += (percentage / 100) * candyCoefficient;
  }

  if (Math.abs(percentageSum - 100) > 0.001) {
    throw new Error('Сумма процентов внутреннего слоя должна быть ровно 100');
  }

  const rawPrice = basePrice * mixCoefficient;
  const roundedPrice = Math.round(rawPrice / 50) * 50;
  return Math.min(maxPrice, Math.max(minPrice, roundedPrice));
}

export function calculateCandyCakePrice(config: CandyCakeConfig) {
  if (config.type !== 'custom_cake') {
    throw new Error('Некорректный тип индивидуального торта');
  }

  const basePrice = basePrices[config.base || ''];
  const sizePrice = sizePrices[config.size || ''];
  const innerLayerPrice = calculateInnerLayerPrice(config);
  const colorPrice = colorPrices[config.color || ''];
  const outerLayerPrice = outerLayerIds.has(config.outerLayer || '')
    ? outerLayerPricesBySize[config.size || '']
    : undefined;
  const wrapperPrice = wrapperPrices[config.wrapper || 'satin'];
  const packagingPrice = packagingPrices[config.packaging || 'standard'];
  const decorSelections = Array.isArray(config.decor)
    ? config.decor
    : config.decor
      ? [config.decor]
      : [];
  const decorPrice = decorSelections.reduce((sum, decorId) => {
    const price = decorPrices[decorId];
    if (price === undefined) {
      throw new Error('Выберите корректный декор');
    }
    return sum + price;
  }, 0);

  if (basePrice === undefined) {
    throw new Error('Выберите корректную форму торта');
  }
  if (sizePrice === undefined) {
    throw new Error('Выберите корректный размер торта');
  }
  if (colorPrice === undefined) {
    throw new Error('Выберите корректный цвет оформления');
  }
  if (outerLayerPrice === undefined) {
    throw new Error('Выберите корректный наружный ряд конфет');
  }
  if (wrapperPrice === undefined) {
    throw new Error('Выберите корректную обёртку торта');
  }
  if (packagingPrice === undefined) {
    throw new Error('Выберите корректную упаковку торта');
  }
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
