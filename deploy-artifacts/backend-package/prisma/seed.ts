import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as argon2 from "argon2";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const TEST_USER_EMAIL = "user@candycraft.test";
const TEST_ADMIN_EMAIL = "admin@candycraft.test";
const TEST_USER_PHONE = "+79990000001";
const TEST_ADMIN_PHONE = "+79990000002";

function slugify(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return normalized || "product";
}

async function main() {
  const userPasswordHash = await argon2.hash("TestUser123!");
  const adminPasswordHash = await argon2.hash("TestAdmin123!");

  const chocolate = await prisma.category.upsert({
    where: { name: "Шоколад" },
    update: {
      description: "Шоколадные наборы и сладкие композиции",
      imageUrl: "https://placehold.co/600x400?text=Chocolate",
    },
    create: {
      name: "Шоколад",
      description: "Шоколадные наборы и сладкие композиции",
      imageUrl: "https://placehold.co/600x400?text=Chocolate",
    },
  });

  const gifts = await prisma.category.upsert({
    where: { name: "Подарки" },
    update: {
      description: "Подарочные наборы к праздникам",
      imageUrl: "https://placehold.co/600x400?text=Gifts",
    },
    create: {
      name: "Подарки",
      description: "Подарочные наборы к праздникам",
      imageUrl: "https://placehold.co/600x400?text=Gifts",
    },
  });

  const productFixtures = [
    {
      name: "Kinder Box",
      description: "Набор из Kinder для уютных вечеров",
      price: 120,
      inStock: 10,
      imageUrl: "https://placehold.co/600x400?text=Kinder+Box",
      categoryId: chocolate.id,
    },
    {
      name: "Ferrero Heart",
      description: "Ferrero в форме сердца для подарка",
      price: 180,
      inStock: 5,
      imageUrl: "https://placehold.co/600x400?text=Ferrero+Heart",
      categoryId: gifts.id,
    },
    {
      name: "Choco Mix",
      description: "Ассорти из молочного и тёмного шоколада",
      price: 240,
      inStock: 8,
      imageUrl: "https://placehold.co/600x400?text=Choco+Mix",
      categoryId: chocolate.id,
    },
    {
      name: "Sweet Surprise",
      description: "Подарочный бокс с конфетами и маршмеллоу",
      price: 320,
      inStock: 6,
      imageUrl: "https://placehold.co/600x400?text=Sweet+Surprise",
      categoryId: gifts.id,
    },
  ];

  for (const item of productFixtures) {
    const baseSlug = slugify(item.name);
    const baseSku = `SKU-${baseSlug}`.toUpperCase();

    const existing = await prisma.product.findFirst({
      where: { name: item.name, categoryId: item.categoryId },
      select: { id: true, slug: true, sku: true },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          sku: existing.sku || `${baseSku}-${existing.id}`,
          slug: existing.slug || `${baseSlug}-${existing.id}`,
          description: item.description,
          price: item.price,
          inStock: item.inStock,
          imageUrl: item.imageUrl,
        },
      });
      continue;
    }

    await prisma.product.create({
      data: {
        ...item,
        sku: `${baseSku}-${item.categoryId}`,
        slug: `${baseSlug}-${item.categoryId}`,
      },
    });
  }

  const testUser = await prisma.user.upsert({
    where: { email: TEST_USER_EMAIL },
    update: {
      firstName: "Тест",
      lastName: "Покупатель",
      phone: TEST_USER_PHONE,
      passwordHash: userPasswordHash,
      role: "USER",
    },
    create: {
      firstName: "Тест",
      lastName: "Покупатель",
      email: TEST_USER_EMAIL,
      phone: TEST_USER_PHONE,
      passwordHash: userPasswordHash,
      role: "USER",
    },
  });

  await prisma.user.upsert({
    where: { email: TEST_ADMIN_EMAIL },
    update: {
      firstName: "Тест",
      lastName: "Админ",
      phone: TEST_ADMIN_PHONE,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
    create: {
      firstName: "Тест",
      lastName: "Админ",
      email: TEST_ADMIN_EMAIL,
      phone: TEST_ADMIN_PHONE,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.cart.upsert({
    where: { userId: testUser.id },
    update: {},
    create: { userId: testUser.id },
  });

  const hasOrders = await prisma.order.findFirst({
    where: { userId: testUser.id },
    select: { id: true },
  });

  if (!hasOrders) {
    const sampleProducts = await prisma.product.findMany({
      take: 2,
      orderBy: { id: "asc" },
    });

    if (sampleProducts.length > 0) {
      const totalPrice = sampleProducts.reduce((sum, p) => sum + p.price, 0);
      const subtotalMinor = totalPrice * 100;
      await prisma.order.create({
        data: {
          userId: testUser.id,
          status: "PENDING",
          address: "Тестовый адрес, дом 1",
          totalPrice,
          currency: "RUB",
          subtotalMinor,
          discountTotalMinor: 0,
          taxTotalMinor: 0,
          deliveryFeeMinor: 0,
          finalAmountMinor: subtotalMinor,
          items: {
            create: sampleProducts.map((p) => ({
              productId: p.id,
              productName: p.name,
              quantity: 1,
              price: p.price,
            })),
          },
        },
      });
    }
  }

  console.log("✅ Seed completed");
  console.log(`User: ${TEST_USER_EMAIL} / TestUser123!`);
  console.log(`Admin: ${TEST_ADMIN_EMAIL} / TestAdmin123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
