import { BadRequestException } from '@nestjs/common';
import { OrderOptionsService } from './order-options.service';

function createService(env: Record<string, string | undefined> = {}) {
  return new OrderOptionsService({
    get: jest.fn((key: string) => env[key]),
  } as any);
}

describe('OrderOptionsService', () => {
  it('returns default checkout options with ruble and minor prices', () => {
    const service = createService();

    expect(service.getPublicOptions()).toMatchObject({
      delivery: [
        { id: 1, price: 500, priceMinor: 50_000 },
        { id: 2, price: 300, priceMinor: 30_000 },
        { id: 3, price: 400, priceMinor: 40_000 },
      ],
      gifts: [
        { id: 1, price: 200, priceMinor: 20_000 },
        { id: 2, price: 150, priceMinor: 15_000 },
        { id: 3, price: 100, priceMinor: 10_000 },
        { id: 4, price: 180, priceMinor: 18_000 },
      ],
    });
  });

  it('uses configured delivery and gift prices', () => {
    const service = createService({
      ORDER_DELIVERY_OPTIONS_JSON: JSON.stringify([
        { id: 7, name: 'Pickup', description: 'Store pickup', priceMinor: 0 },
      ]),
      ORDER_GIFT_OPTIONS_JSON: JSON.stringify([
        {
          id: 8,
          name: 'Ribbon',
          description: 'Gift ribbon',
          priceMinor: 12_300,
        },
      ]),
    });

    expect(service.getDeliveryFeeMinor(7)).toBe(0);
    expect(service.getGiftTotalMinor(8)).toBe(12_300);
    expect(service.getPublicOptions()).toMatchObject({
      delivery: [{ id: 7, price: 0, priceMinor: 0 }],
      gifts: [{ id: 8, price: 123, priceMinor: 12_300 }],
    });
  });

  it('rejects unavailable configured options', () => {
    const service = createService({
      ORDER_GIFT_OPTIONS_JSON: JSON.stringify([
        {
          id: 4,
          name: 'Unavailable',
          description: 'Unavailable gift',
          priceMinor: 1_000,
          available: false,
        },
      ]),
    });

    expect(() => service.getGiftTotalMinor(4)).toThrow(BadRequestException);
  });
});
