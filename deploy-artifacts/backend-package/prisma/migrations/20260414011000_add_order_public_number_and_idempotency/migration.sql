ALTER TABLE "orders"
  ADD COLUMN "public_order_number" TEXT,
  ADD COLUMN "idempotency_key" TEXT;

UPDATE "orders"
SET "public_order_number" =
  'ORD-' || TO_CHAR("created_at", 'YYYY') || '-' || LPAD("id"::text, 6, '0')
WHERE "public_order_number" IS NULL;

CREATE UNIQUE INDEX "orders_public_order_number_key" ON "orders"("public_order_number");
CREATE UNIQUE INDEX "orders_user_id_idempotency_key_key" ON "orders"("user_id", "idempotency_key");
