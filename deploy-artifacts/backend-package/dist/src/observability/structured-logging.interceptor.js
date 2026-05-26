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
var StructuredLoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuredLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let StructuredLoggingInterceptor =
  (StructuredLoggingInterceptor_1 = class StructuredLoggingInterceptor {
    logger = new common_1.Logger(StructuredLoggingInterceptor_1.name);
    intercept(context, next) {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      const startedAt = Date.now();
      return next.handle().pipe(
        (0, operators_1.tap)(() => {
          this.logRequest(req, res.statusCode, Date.now() - startedAt);
        }),
        (0, operators_1.catchError)((error) => {
          this.logRequest(
            req,
            error?.status ?? res.statusCode ?? 500,
            Date.now() - startedAt,
            error,
          );
          return (0, rxjs_1.throwError)(() => error);
        }),
      );
    }
    logRequest(req, statusCode, durationMs, error) {
      const payload = {
        event: "http_request_completed",
        requestId: req.requestId ?? null,
        method: req.method,
        path: req.path,
        statusCode,
        durationMs,
        ip: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorName: error instanceof Error ? error.name : undefined,
        errorMessage: error instanceof Error ? error.message : undefined,
        at: new Date().toISOString(),
      };
      const line = JSON.stringify(payload);
      if (statusCode >= 500) {
        this.logger.error(line);
      } else if (statusCode >= 400) {
        this.logger.warn(line);
      } else {
        this.logger.log(line);
      }
    }
  });
exports.StructuredLoggingInterceptor = StructuredLoggingInterceptor;
exports.StructuredLoggingInterceptor =
  StructuredLoggingInterceptor =
  StructuredLoggingInterceptor_1 =
    __decorate([(0, common_1.Injectable)()], StructuredLoggingInterceptor);
//# sourceMappingURL=structured-logging.interceptor.js.map
