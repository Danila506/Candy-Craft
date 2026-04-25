import { Injectable, Logger } from '@nestjs/common';

type MetricLabels = Record<
  string,
  string | number | boolean | null | undefined
>;

function labelsKey(labels: MetricLabels = {}) {
  return Object.entries(labels)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(',');
}

@Injectable()
export class ObservabilityService {
  private readonly logger = new Logger(ObservabilityService.name);
  private readonly counters = new Map<string, number>();

  incrementCounter(name: string, labels: MetricLabels = {}) {
    const key = `${name}{${labelsKey(labels)}}`;
    const next = (this.counters.get(key) ?? 0) + 1;
    this.counters.set(key, next);
    this.logger.log(
      JSON.stringify({
        event: 'metric_counter_incremented',
        metric: name,
        labels,
        value: next,
        at: new Date().toISOString(),
      }),
    );
  }

  getCounterValue(name: string, labels: MetricLabels = {}) {
    return this.counters.get(`${name}{${labelsKey(labels)}}`) ?? 0;
  }

  snapshotCounters() {
    return Object.fromEntries(this.counters.entries());
  }

  clearForTests() {
    this.counters.clear();
  }
}
