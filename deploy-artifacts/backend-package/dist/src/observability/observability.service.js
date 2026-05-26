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
var ObservabilityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservabilityService = void 0;
const common_1 = require("@nestjs/common");
function labelsKey(labels = {}) {
  return Object.entries(labels)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(",");
}
let ObservabilityService =
  (ObservabilityService_1 = class ObservabilityService {
    logger = new common_1.Logger(ObservabilityService_1.name);
    counters = new Map();
    incrementCounter(name, labels = {}) {
      const key = `${name}{${labelsKey(labels)}}`;
      const next = (this.counters.get(key) ?? 0) + 1;
      this.counters.set(key, next);
      this.logger.log(
        JSON.stringify({
          event: "metric_counter_incremented",
          metric: name,
          labels,
          value: next,
          at: new Date().toISOString(),
        }),
      );
    }
    getCounterValue(name, labels = {}) {
      return this.counters.get(`${name}{${labelsKey(labels)}}`) ?? 0;
    }
    snapshotCounters() {
      return Object.fromEntries(this.counters.entries());
    }
    clearForTests() {
      this.counters.clear();
    }
  });
exports.ObservabilityService = ObservabilityService;
exports.ObservabilityService =
  ObservabilityService =
  ObservabilityService_1 =
    __decorate([(0, common_1.Injectable)()], ObservabilityService);
//# sourceMappingURL=observability.service.js.map
