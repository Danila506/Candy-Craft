import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit';

export type RateLimitOptions = {
  keyPrefix: string;
  maxEnv: string;
  windowMsEnv: string;
  defaultMax: number;
  defaultWindowMs: number;
};

export const RateLimit = (options: RateLimitOptions) =>
  SetMetadata(RATE_LIMIT_KEY, options);
