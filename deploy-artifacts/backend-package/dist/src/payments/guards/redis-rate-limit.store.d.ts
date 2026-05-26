export declare class RedisRateLimitStore {
  private static readonly memoryBuckets;
  private readonly logger;
  incrementWithWindow(
    key: string,
    windowMs: number,
  ): Promise<{
    count: number;
    storage: "redis" | "memory";
  }>;
  clearMemoryBucketsForTests(): void;
  private incrementInMemory;
  private incrementInRedis;
  private parseRedisUrl;
  private openSocket;
  private sendCommand;
  private toResp;
  private parseResp;
}
