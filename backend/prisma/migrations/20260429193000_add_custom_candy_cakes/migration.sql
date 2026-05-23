ALTER TABLE "cart_items"
  ALTER COLUMN "product_id" DROP NOT NULL,
  ADD COLUMN "custom_name" TEXT,
  ADD COLUMN "custom_config" JSONB,
  ADD COLUMN "custom_preview_url" TEXT,
  ADD COLUMN "custom_price" INTEGER;

ALTER TABLE "order_items"
  ALTER COLUMN "product_id" DROP NOT NULL,
  ADD COLUMN "custom_config" JSONB,
  ADD COLUMN "custom_preview_url" TEXT;
