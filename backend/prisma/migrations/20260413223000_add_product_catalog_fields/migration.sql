-- Add product business identifiers and soft-delete fields
ALTER TABLE "products"
  ADD COLUMN "sku" TEXT,
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "deleted_at" TIMESTAMP(3);

-- Backfill SKU/slug for existing rows
UPDATE "products"
SET
  "sku" = COALESCE(NULLIF("sku", ''), 'SKU-' || LPAD("id"::text, 6, '0')),
  "slug" = COALESCE(
    NULLIF("slug", ''),
    CASE
      WHEN BTRIM(REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g'), '-') = ''
        THEN 'product-' || "id"::text
      ELSE BTRIM(REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g'), '-') || '-' || "id"::text
    END
  );

ALTER TABLE "products"
  ALTER COLUMN "sku" SET NOT NULL,
  ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_is_active_deleted_at_idx" ON "products"("is_active", "deleted_at");
