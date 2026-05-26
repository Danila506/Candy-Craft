"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOptionsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const DEFAULT_DELIVERY_OPTIONS = [
  {
    id: 1,
    name: "Экспресс доставка",
    description: "Доставим в течение 2 часов",
    priceMinor: 50_000,
    time: "2 часа",
    available: true,
  },
  {
    id: 2,
    name: "Стандартная доставка",
    description: "Доставим сегодня до 22:00",
    priceMinor: 30_000,
    time: "4-6 часов",
    available: true,
  },
  {
    id: 3,
    name: "Доставка ко времени",
    description: "Выберите удобное время",
    priceMinor: 40_000,
    time: "Ко времени",
    available: true,
  },
];
const DEFAULT_GIFT_OPTIONS = [
  {
    id: 1,
    name: "Подарочная упаковка",
    description: "Премиальная коробка с лентой",
    priceMinor: 20_000,
    available: true,
  },
  {
    id: 2,
    name: "Поздравительная открытка",
    description: "Ручная работа с теплыми пожеланиями",
    priceMinor: 15_000,
    available: true,
  },
  {
    id: 3,
    name: "Волшебная пыль",
    description: "Съедобные блестки для торта",
    priceMinor: 10_000,
    available: true,
  },
  {
    id: 4,
    name: "Корона для именинника",
    description: "Золотая картонная корона",
    priceMinor: 18_000,
    available: true,
  },
];
function normalizeOptions(rawValue, defaults, envName) {
  if (!rawValue?.trim()) return defaults;
  let parsed;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    throw new Error(`${envName} must be valid JSON`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${envName} must be a JSON array`);
  }
  const ids = new Set();
  return parsed.map((item, index) => {
    const option = item;
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
      description: option.description?.trim() || fallback?.description || "",
      priceMinor,
      time: option.time?.trim() || fallback?.time,
      available: option.available ?? fallback?.available ?? true,
    };
  });
}
function toPublicOption(option) {
  return {
    ...option,
    price: option.priceMinor / 100,
  };
}
let OrderOptionsService = class OrderOptionsService {
  config;
  constructor(config) {
    this.config = config;
  }
  getDeliveryOptions() {
    return normalizeOptions(
      this.config.get("ORDER_DELIVERY_OPTIONS_JSON"),
      DEFAULT_DELIVERY_OPTIONS,
      "ORDER_DELIVERY_OPTIONS_JSON",
    );
  }
  getGiftOptions() {
    return normalizeOptions(
      this.config.get("ORDER_GIFT_OPTIONS_JSON"),
      DEFAULT_GIFT_OPTIONS,
      "ORDER_GIFT_OPTIONS_JSON",
    );
  }
  getPublicOptions() {
    return {
      delivery: this.getDeliveryOptions().map(toPublicOption),
      gifts: this.getGiftOptions().map(toPublicOption),
    };
  }
  getDeliveryFeeMinor(deliveryOptionId) {
    if (!deliveryOptionId) return 0;
    const option = this.getDeliveryOptions().find(
      (candidate) => candidate.id === deliveryOptionId,
    );
    if (!option || option.available === false) {
      throw new common_1.BadRequestException("Некорректный способ доставки");
    }
    return option.priceMinor;
  }
  getGiftTotalMinor(giftOptionId) {
    if (!giftOptionId) return 0;
    const option = this.getGiftOptions().find(
      (candidate) => candidate.id === giftOptionId,
    );
    if (!option || option.available === false) {
      throw new common_1.BadRequestException("Некорректная подарочная опция");
    }
    return option.priceMinor;
  }
};
exports.OrderOptionsService = OrderOptionsService;
exports.OrderOptionsService = OrderOptionsService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService]),
  ],
  OrderOptionsService,
);
//# sourceMappingURL=order-options.service.js.map
