DROP INDEX IF EXISTS "products_sku_key";

ALTER TABLE "products"
  DROP COLUMN IF EXISTS "sku";
