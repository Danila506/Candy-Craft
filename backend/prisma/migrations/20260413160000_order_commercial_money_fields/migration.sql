-- Keep historical schema fixes in source control (safe for repeated environments)
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "address" TEXT;
UPDATE "orders" SET "address" = 'Тестовый адрес' WHERE "address" IS NULL;
ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL;

ALTER TABLE "order_items" ALTER COLUMN "product_id" DROP NOT NULL;

-- Commercial money fields (minor units)
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'RUB';
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "subtotal_minor" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "discount_total_minor" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "tax_total_minor" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "delivery_fee_minor" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "final_amount_minor" INTEGER NOT NULL DEFAULT 0;

-- Backfill existing rows from legacy total_price (assumed major units, e.g. RUB)
UPDATE "orders"
SET
  "currency" = COALESCE("currency", 'RUB'),
  "subtotal_minor" = CASE WHEN "subtotal_minor" = 0 THEN "total_price" * 100 ELSE "subtotal_minor" END,
  "final_amount_minor" = CASE WHEN "final_amount_minor" = 0 THEN "total_price" * 100 ELSE "final_amount_minor" END;
