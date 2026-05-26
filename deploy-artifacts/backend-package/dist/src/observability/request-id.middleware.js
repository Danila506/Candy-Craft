"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_ID_HEADER = void 0;
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = require("crypto");
exports.REQUEST_ID_HEADER = "x-request-id";
function requestIdMiddleware(req, res, next) {
  const incoming = req.header(exports.REQUEST_ID_HEADER)?.trim();
  const requestId = incoming || (0, crypto_1.randomUUID)();
  req.requestId = requestId;
  res.setHeader(exports.REQUEST_ID_HEADER, requestId);
  next();
}
//# sourceMappingURL=request-id.middleware.js.map
