import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Шоколадный торт',
        price: 1200,
        description: 'Вкуснейший шоколадный торт',
        imageUrl: 'https://example.com/cake.jpg',
        inStock: 3,
        categoryId: 1,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
