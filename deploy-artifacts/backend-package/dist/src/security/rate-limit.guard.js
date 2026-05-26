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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var RateLimitGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rate_limit_decorator_1 = require("./rate-limit.decorator");
const simple_rate_limit_store_1 = require("./simple-rate-limit.store");
const observability_service_1 = require("../observability/observability.service");
function getHeaderValue(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}
function normalizeIp(ip) {
  if (!ip) return "unknown";
  if (ip.startsWith("::ffff:")) return ip.slice("::ffff:".length);
  if (ip === "::1") return "127.0.0.1";
  return ip;
}
let RateLimitGuard = (RateLimitGuard_1 = class RateLimitGuard {
  reflector;
  store;
  observability;
  logger = new common_1.Logger(RateLimitGuard_1.name);
  constructor(reflector, store, observability) {
    this.reflector = reflector;
    this.store = store;
    this.observability = observability;
  }
  canActivate(context) {
    const options = this.reflector.getAllAndOverride(
      rate_limit_decorator_1.RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;
    const req = context.switchToHttp().getRequest();
    const max = Number(process.env[options.maxEnv]) || options.defaultMax;
    const windowMs =
      Number(process.env[options.windowMsEnv]) || options.defaultWindowMs;
    const ip = normalizeIp(req.ip || req.socket?.remoteAddress);
    const identity = this.getIdentity(req);
    const key = `${options.keyPrefix}:${ip}:${identity}`;
    const bucket = this.store.increment(key, windowMs);
    if (bucket.count > max) {
      this.observability.incrementCounter("rate_limit_rejected_total", {
        keyPrefix: options.keyPrefix,
        path: req.path,
      });
      this.logger.warn(
        JSON.stringify({
          event: "rate_limit_exceeded",
          requestId: req.requestId ?? null,
          keyPrefix: options.keyPrefix,
          ip,
          path: req.path,
          max,
          windowMs,
          at: new Date().toISOString(),
        }),
      );
      throw new common_1.HttpException(
        "Too many requests",
        common_1.HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return true;
  }
  getIdentity(req) {
    const email = req.body?.email;
    if (typeof email === "string" && email.trim()) {
      return email.trim().toLowerCase();
    }
    const forwardedUserAgent = getHeaderValue(req.headers["user-agent"]);
    return forwardedUserAgent?.slice(0, 80) || "anonymous";
  }
});
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard =
  RateLimitGuard =
  RateLimitGuard_1 =
    __decorate(
      [
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [
          core_1.Reflector,
          simple_rate_limit_store_1.SimpleRateLimitStore,
          observability_service_1.ObservabilityService,
        ]),
      ],
      RateLimitGuard,
    );
//# sourceMappingURL=rate-limit.guard.js.map
