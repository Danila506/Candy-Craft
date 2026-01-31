export function normalizeRuPhone(input?: string | null): string | null {
  if (!input) return null;

  const raw = input.trim();
  if (!raw) return null;

  // оставляем только цифры и +
  const digitsOnly = raw.replace(/[^\d+]/g, '');

  // вытащим цифры без +
  let digits = digitsOnly.replace(/\D/g, '');

  // 8XXXXXXXXXX => 7XXXXXXXXXX
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);

  // если вообще без 7 — считаем, что это локальные 10 цифр и добавляем 7
  if (digits.length === 10) digits = '7' + digits;

  // оставляем максимум 11 цифр (7 + 10)
  digits = digits.slice(0, 11);

  // финальный вид: +7XXXXXXXXXX
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+${digits}`;
  }

  // если не получилось — вернём null (или можешь кинуть ошибку)
  return null;
}
