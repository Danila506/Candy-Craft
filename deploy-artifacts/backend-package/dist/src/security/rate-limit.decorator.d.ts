export declare const RATE_LIMIT_KEY = "rate_limit";
export type RateLimitOptions = {
  keyPrefix: string;
  maxEnv: string;
  windowMsEnv: string;
  defaultMax: number;
  defaultWindowMs: number;
};
export declare const RateLimit: (
  options: RateLimitOptions,
) => import("@nestjs/common").CustomDecorator<string>;
