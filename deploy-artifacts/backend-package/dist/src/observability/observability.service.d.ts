type MetricLabels = Record<
  string,
  string | number | boolean | null | undefined
>;
export declare class ObservabilityService {
  private readonly logger;
  private readonly counters;
  incrementCounter(name: string, labels?: MetricLabels): void;
  getCounterValue(name: string, labels?: MetricLabels): number;
  snapshotCounters(): {
    [k: string]: number;
  };
  clearForTests(): void;
}
export {};
