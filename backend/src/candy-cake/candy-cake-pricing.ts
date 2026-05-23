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

const basePrices: Record<string, number> = {
  round: 2000,
  heart: 2500,
  square: 2250,
};

const sizePrices: Record<string, number> = {
  m: 1000,
  l: 1750,
};

const sweetSetPrices: Record<string, number> = {
  kinder: 875,
  merci: 1125,
  mix: 750,
  premium: 1500,
};

const colorPrices: Record<string, number> = {
  pink: 0,
  gold: 250,
  white: 0,
};

const outerLayerPrices: Record<string, number> = {
  'kinder-sticks': 1125,
  kitkat: 1500,
  'merci-bars': 1875,
  'wafer-rolls': 1375,
};

const wrapperPrices: Record<string, number> = {
  satin: 375,
  lace: 625,
  kraft: 250,
  transparent: 500,
};

const packagingPrices: Record<string, number> = {
  standard: 0,
  window: 875,
  gift: 1250,
  'premium-box': 2125,
};

const decorPrices: Record<string, number> = {
  none: 0,
  flowers: 625,
  bow: 375,
  topper: 500,
};

export function calculateCandyCakePrice(config: CandyCakeConfig) {
  if (config.type !== 'custom_cake') {
    throw new Error('Некорректный тип индивидуального торта');
  }

  const basePrice = basePrices[config.base || ''];
  const sizePrice = sizePrices[config.size || ''];
  const sweetSetPrice = sweetSetPrices[config.sweetSet || ''];
  const colorPrice = colorPrices[config.color || ''];
  const outerLayerPrice = outerLayerPrices[config.outerLayer || ''];
  const wrapperPrice = wrapperPrices[config.wrapper || 'satin'];
  const packagingPrice = packagingPrices[config.packaging || 'standard'];
  const decorPrice = decorPrices[config.decor || ''];

  if (basePrice === undefined) {
    throw new Error('Выберите корректную форму торта');
  }
  if (sizePrice === undefined) {
    throw new Error('Выберите корректный размер торта');
  }
  if (sweetSetPrice === undefined) {
    throw new Error('Выберите корректный набор сладостей');
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
  if (decorPrice === undefined) {
    throw new Error('Выберите корректный декор');
  }

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
