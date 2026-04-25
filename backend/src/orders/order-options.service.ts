import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type OrderOptionConfig = {
  id: number;
  name: string;
  description: string;
  priceMinor: number;
  time?: string;
  available?: boolean;
};

const DEFAULT_DELIVERY_OPTIONS: OrderOptionConfig[] = [
  {
    id: 1,
    name: 'Экспресс доставка',
    description: 'Доставим в течение 2 часов',
    priceMinor: 50_000,
    time: '2 часа',
    available: true,
  },
  {
    id: 2,
    name: 'Стандартная доставка',
    description: 'Доставим сегодня до 22:00',
    priceMinor: 30_000,
    time: '4-6 часов',
    available: true,
  },
  {
    id: 3,
    name: 'Доставка ко времени',
    description: 'Выберите удобное время',
    priceMinor: 40_000,
    time: 'Ко времени',
    available: true,
  },
];

const DEFAULT_GIFT_OPTIONS: OrderOptionConfig[] = [
  {
    id: 1,
    name: 'Подарочная упаковка',
    description: 'Премиальная коробка с лентой',
    priceMinor: 20_000,
    available: true,
  },
  {
    id: 2,
    name: 'Поздравительная открытка',
    description: 'Ручная работа с теплыми пожеланиями',
    priceMinor: 15_000,
    available: true,
  },
  {
    id: 3,
    name: 'Волшебная пыль',
    description: 'Съедобные блестки для торта',
    priceMinor: 10_000,
    available: true,
  },
  {
    id: 4,
    name: 'Корона для именинника',
    description: 'Золотая картонная корона',
    priceMinor: 18_000,
    available: true,
  },
];

function normalizeOptions(
  rawValue: string | undefined,
  defaults: OrderOptionConfig[],
  envName: string,
): OrderOptionConfig[] {
  if (!rawValue?.trim()) return defaults;

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    throw new Error(`${envName} must be valid JSON`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${envName} must be a JSON array`);
  }

  const ids = new Set<number>();
  return parsed.map((item, index) => {
    const option = item as Partial<OrderOptionConfig>;
    const id = option.id;
    const priceMinor = option.priceMinor;

    if (!Number.isInteger(id) || id === undefined || id <= 0) {
      throw new Error(`${envName}[${index}].id must be a positive integer`);
    }
    if (ids.has(id)) {
      throw new Error(`${envName} contains duplicate option id ${id}`);
    }
    ids.add(id);
    if (
      !Number.isInteger(priceMinor) ||
      priceMinor === undefined ||
      priceMinor < 0
    ) {
      throw new Error(
        `${envName}[${index}].priceMinor must be a non-negative integer`,
      );
    }

    const fallback = defaults.find((defaultOption) => defaultOption.id === id);
    return {
      id,
      name: option.name?.trim() || fallback?.name || `Option ${id}`,
      description: option.description?.trim() || fallback?.description || '',
      priceMinor,
      time: option.time?.trim() || fallback?.time,
      available: option.available ?? fallback?.available ?? true,
    };
  });
}

function toPublicOption(option: OrderOptionConfig) {
  return {
    ...option,
    price: option.priceMinor / 100,
  };
}

@Injectable()
export class OrderOptionsService {
  constructor(private readonly config: ConfigService) {}

  getDeliveryOptions() {
    return normalizeOptions(
      this.config.get<string>('ORDER_DELIVERY_OPTIONS_JSON'),
      DEFAULT_DELIVERY_OPTIONS,
      'ORDER_DELIVERY_OPTIONS_JSON',
    );
  }

  getGiftOptions() {
    return normalizeOptions(
      this.config.get<string>('ORDER_GIFT_OPTIONS_JSON'),
      DEFAULT_GIFT_OPTIONS,
      'ORDER_GIFT_OPTIONS_JSON',
    );
  }

  getPublicOptions() {
    return {
      delivery: this.getDeliveryOptions().map(toPublicOption),
      gifts: this.getGiftOptions().map(toPublicOption),
    };
  }

  getDeliveryFeeMinor(deliveryOptionId?: number): number {
    if (!deliveryOptionId) return 0;
    const option = this.getDeliveryOptions().find(
      (candidate) => candidate.id === deliveryOptionId,
    );
    if (!option || option.available === false) {
      throw new BadRequestException('Некорректный способ доставки');
    }
    return option.priceMinor;
  }

  getGiftTotalMinor(giftOptionId?: number): number {
    if (!giftOptionId) return 0;
    const option = this.getGiftOptions().find(
      (candidate) => candidate.id === giftOptionId,
    );
    if (!option || option.available === false) {
      throw new BadRequestException('Некорректная подарочная опция');
    }
    return option.priceMinor;
  }
}
