import { Injectable } from '@nestjs/common';

@Injectable()
export class SimpleRateLimitStore {
  private readonly buckets = new Map<
    string,
    { count: number; windowStart: number }
  >();

  increment(key: string, windowMs: number) {
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || now - bucket.windowStart >= windowMs) {
      const next = { count: 1, windowStart: now };
      this.buckets.set(key, next);
      return next;
    }

    bucket.count += 1;
    return bucket;
  }

  clearForTests() {
    this.buckets.clear();
  }
}
