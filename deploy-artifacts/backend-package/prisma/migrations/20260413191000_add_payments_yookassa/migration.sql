DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentProvider') THEN
    CREATE TYPE "PaymentProvider" AS ENUM ('YOOKASSA');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
    CREATE TYPE "PaymentStatus" AS ENUM (
      'PENDING',
      'WAITING_FOR_CAPTURE',
      'SUCCEEDED',
      'CANCELED',
      'FAILED'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "payments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount_minor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "provider_payment_id" TEXT,
    "idempotency_key" TEXT,
    "confirmation_url" TEXT,
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "payment_attempts" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "request_payload" JSONB,
    "response_payload" JSONB,
    "http_status" INTEGER,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_attempts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "payment_webhook_events" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER,
    "provider" "PaymentProvider" NOT NULL,
    "event_type" TEXT NOT NULL,
    "provider_event_id" TEXT,
    "payload" JSONB NOT NULL,
    "is_processed" BOOLEAN NOT NULL DEFAULT false,
    "processing_error" TEXT,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),

    CONSTRAINT "payment_webhook_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "payments_provider_payment_id_key" ON "payments"("provider_payment_id");
CREATE UNIQUE INDEX IF NOT EXISTS "payments_idempotency_key_key" ON "payments"("idempotency_key");
CREATE INDEX IF NOT EXISTS "payments_order_id_idx" ON "payments"("order_id");
CREATE INDEX IF NOT EXISTS "payments_status_idx" ON "payments"("status");

CREATE INDEX IF NOT EXISTS "payment_attempts_payment_id_idx" ON "payment_attempts"("payment_id");

CREATE UNIQUE INDEX IF NOT EXISTS "payment_webhook_events_provider_event_id_key" ON "payment_webhook_events"("provider_event_id");
CREATE INDEX IF NOT EXISTS "payment_webhook_events_payment_id_idx" ON "payment_webhook_events"("payment_id");
CREATE INDEX IF NOT EXISTS "payment_webhook_events_event_type_idx" ON "payment_webhook_events"("event_type");
CREATE INDEX IF NOT EXISTS "payment_webhook_events_received_at_idx" ON "payment_webhook_events"("received_at");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'payments_order_id_fkey'
  ) THEN
    ALTER TABLE "payments"
    ADD CONSTRAINT "payments_order_id_fkey"
    FOREIGN KEY ("order_id") REFERENCES "orders"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'payment_attempts_payment_id_fkey'
  ) THEN
    ALTER TABLE "payment_attempts"
    ADD CONSTRAINT "payment_attempts_payment_id_fkey"
    FOREIGN KEY ("payment_id") REFERENCES "payments"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'payment_webhook_events_payment_id_fkey'
  ) THEN
    ALTER TABLE "payment_webhook_events"
    ADD CONSTRAINT "payment_webhook_events_payment_id_fkey"
    FOREIGN KEY ("payment_id") REFERENCES "payments"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
