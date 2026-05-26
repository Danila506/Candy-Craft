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
var CsrfOriginGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfOriginGuard = void 0;
const common_1 = require("@nestjs/common");
const observability_service_1 = require("../observability/observability.service");
const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "https://candy-craft.ru",
  "https://www.candy-craft.ru",
  "https://candy-craft.vercel.app",
  "https://candy-craft.onrender.com",
];
function parseOrigins(value) {
  return (value || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}
function getAllowedOrigins() {
  return new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...parseOrigins(process.env.FRONTEND_URL),
    ...parseOrigins(process.env.CSRF_ALLOWED_ORIGINS),
  ]);
}
function getHeaderValue(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}
function getOriginFromReferer(referer) {
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}
let CsrfOriginGuard = (CsrfOriginGuard_1 = class CsrfOriginGuard {
  observability;
  logger = new common_1.Logger(CsrfOriginGuard_1.name);
  constructor(observability) {
    this.observability = observability;
  }
  canActivate(context) {
    const req = context.switchToHttp().getRequest();
    if (this.isSafeMethod(req.method)) return true;
    if (!this.requiresCsrfCheck(req)) return true;
    const origin =
      getHeaderValue(req.headers.origin) ??
      getOriginFromReferer(getHeaderValue(req.headers.referer));
    if (origin && getAllowedOrigins().has(origin.replace(/\/+$/, ""))) {
      return true;
    }
    this.observability.incrementCounter("csrf_origin_rejected_total", {
      method: req.method,
      path: req.path,
    });
    this.logger.warn(
      JSON.stringify({
        event: "csrf_origin_rejected",
        requestId: req.requestId ?? null,
        method: req.method,
        path: req.path,
        origin: origin ?? null,
        at: new Date().toISOString(),
      }),
    );
    throw new common_1.ForbiddenException("CSRF origin is not allowed");
  }
  isSafeMethod(method) {
    return method === "GET" || method === "HEAD" || method === "OPTIONS";
  }
  requiresCsrfCheck(req) {
    const path = req.path || req.url || "";
    if (path.startsWith("/payments/webhooks/")) return false;
    if (path.startsWith("/auth/")) return true;
    const cookieHeader = getHeaderValue(req.headers.cookie) ?? "";
    return /(?:^|;\s*)(access_token|refresh_token)=/.test(cookieHeader);
  }
});
exports.CsrfOriginGuard = CsrfOriginGuard;
exports.CsrfOriginGuard =
  CsrfOriginGuard =
  CsrfOriginGuard_1 =
    __decorate(
      [
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [
          observability_service_1.ObservabilityService,
        ]),
      ],
      CsrfOriginGuard,
    );
//# sourceMappingURL=csrf-origin.guard.js.map
