"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRuPhone = normalizeRuPhone;
function normalizeRuPhone(input) {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;
  const digitsOnly = raw.replace(/[^\d+]/g, "");
  let digits = digitsOnly.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.length === 10) digits = "7" + digits;
  digits = digits.slice(0, 11);
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+${digits}`;
  }
  return null;
}
//# sourceMappingURL=phone.js.map
