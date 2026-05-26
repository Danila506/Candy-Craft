CREATE TABLE IF NOT EXISTS "order_addresses" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Россия',
    "city" TEXT,
    "street" TEXT,
    "house" TEXT,
    "apartment" TEXT,
    "entrance" TEXT,
    "floor" TEXT,
    "intercom" TEXT,
    "postal_code" TEXT,
    "comment" TEXT,
    "recipient_name" TEXT,
    "recipient_phone" TEXT,
    "full_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "order_addresses_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "order_addresses_order_id_key" ON "order_addresses"("order_id");
CREATE INDEX IF NOT EXISTS "order_addresses_city_idx" ON "order_addresses"("city");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'order_addresses_order_id_fkey'
  ) THEN
    ALTER TABLE "order_addresses"
    ADD CONSTRAINT "order_addresses_order_id_fkey"
    FOREIGN KEY ("order_id") REFERENCES "orders"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

INSERT INTO "order_addresses" (
  "order_id",
  "country",
  "full_address",
  "created_at",
  "updated_at"
)
SELECT
  o."id",
  'Россия',
  o."address",
  o."created_at",
  o."updated_at"
FROM "orders" o
WHERE NOT EXISTS (
  SELECT 1 FROM "order_addresses" oa WHERE oa."order_id" = o."id"
);
