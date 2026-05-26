export declare class SimpleRateLimitStore {
  private readonly buckets;
  increment(
    key: string,
    windowMs: number,
  ): {
    count: number;
    windowStart: number;
  };
  clearForTests(): void;
}
