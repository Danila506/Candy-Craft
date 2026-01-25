import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Категории
  const chocolate = await prisma.category.create({
    data: {
      name: 'Шоколад',
      description: 'Шоколадные наборы',
      imageUrl: 'https://placehold.co/300x200?text=Chocolate',
    },
  });

  const gifts = await prisma.category.create({
    data: {
      name: 'Подарки',
      description: 'Подарочные наборы',
      imageUrl: 'https://placehold.co/300x200?text=Gifts',
    },
  });

  // Продукты
  await prisma.product.createMany({
    data: [
      {
        name: 'Kinder Box',
        description: 'Набор из Kinder',
        price: 120,
        inStock: 10,
        imageUrl: 'https://placehold.co/300x200?text=Kinder',
        categoryId: chocolate.id,
      },
      {
        name: 'Ferrero Heart',
        description: 'Ferrero в форме сердца',
        price: 180,
        inStock: 5,
        imageUrl: 'https://placehold.co/300x200?text=Ferrero',
        categoryId: gifts.id,
      },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
