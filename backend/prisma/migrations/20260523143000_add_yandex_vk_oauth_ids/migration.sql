ALTER TABLE "users" ADD COLUMN "yandexId" TEXT;
ALTER TABLE "users" ADD COLUMN "vkId" TEXT;

CREATE UNIQUE INDEX "users_yandexId_key" ON "users"("yandexId");
CREATE UNIQUE INDEX "users_vkId_key" ON "users"("vkId");
