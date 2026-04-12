CREATE TABLE IF NOT EXISTS "order_status_history" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "from_status" "OrderStatus",
    "to_status" "OrderStatus" NOT NULL,
    "reason" TEXT,
    "changed_by_user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_status_history_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "order_status_history_order_id_idx" ON "order_status_history"("order_id");
CREATE INDEX IF NOT EXISTS "order_status_history_created_at_idx" ON "order_status_history"("created_at");
CREATE INDEX IF NOT EXISTS "order_status_history_changed_by_user_id_idx" ON "order_status_history"("changed_by_user_id");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'order_status_history_order_id_fkey'
  ) THEN
    ALTER TABLE "order_status_history"
    ADD CONSTRAINT "order_status_history_order_id_fkey"
    FOREIGN KEY ("order_id") REFERENCES "orders"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'order_status_history_changed_by_user_id_fkey'
  ) THEN
    ALTER TABLE "order_status_history"
    ADD CONSTRAINT "order_status_history_changed_by_user_id_fkey"
    FOREIGN KEY ("changed_by_user_id") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

INSERT INTO "order_status_history" ("order_id", "from_status", "to_status", "reason", "changed_by_user_id", "created_at")
SELECT
  o."id",
  NULL,
  o."status",
  'Imported existing order status',
  NULL,
  o."created_at"
FROM "orders" o
WHERE NOT EXISTS (
  SELECT 1
  FROM "order_status_history" h
  WHERE h."order_id" = o."id"
);
