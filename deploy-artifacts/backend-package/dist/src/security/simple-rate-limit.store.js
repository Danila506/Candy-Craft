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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRateLimitStore = void 0;
const common_1 = require("@nestjs/common");
let SimpleRateLimitStore = class SimpleRateLimitStore {
  buckets = new Map();
  increment(key, windowMs) {
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
};
exports.SimpleRateLimitStore = SimpleRateLimitStore;
exports.SimpleRateLimitStore = SimpleRateLimitStore = __decorate(
  [(0, common_1.Injectable)()],
  SimpleRateLimitStore,
);
//# sourceMappingURL=simple-rate-limit.store.js.map
