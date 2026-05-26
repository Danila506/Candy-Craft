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
exports.SuggestService = void 0;
const common_1 = require("@nestjs/common");
let SuggestService = class SuggestService {
  endpoint =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  async suggestAddress(query, count = 8) {
    const apiKey = process.env.DADATA_API_KEY;
    if (!apiKey) {
      throw new common_1.InternalServerErrorException(
        "DADATA_API_KEY is not set",
      );
    }
    const q = (query ?? "").trim();
    if (q.length < 3) return { suggestions: [] };
    const safeCount = Math.min(Math.max(count || 8, 1), 20);
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({ query: q, count: safeCount }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new common_1.InternalServerErrorException(
        `DaData error ${res.status}: ${text || "Unknown error"}`,
      );
    }
    return await res.json();
  }
};
exports.SuggestService = SuggestService;
exports.SuggestService = SuggestService = __decorate(
  [(0, common_1.Injectable)()],
  SuggestService,
);
//# sourceMappingURL=suggest.service.js.map
