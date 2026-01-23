import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderStatus } from '@prisma/client';



@Injectable()
export class OrdersService {
    constructor(private prisma:PrismaService,
    ) {}

private readonly statusMap: Record<string, OrderStatus> = {
  "Создан": OrderStatus.PENDING,
  "Оплачен": OrderStatus.PAID,
  "Собирается": OrderStatus.PROCESSING,
  "Отправлен": OrderStatus.SHIPPED,
  "Выполнен": OrderStatus.COMPLETED,
  "Отменён": OrderStatus.CANCELED,
};
async create(dto: CreateOrderDto) {
  // Получаем продукты из БД
  const products = await this.prisma.product.findMany({
    where: { id: { in: dto.items.map(i => i.productId) } },
  });

  // Формируем позиции заказа с productName
  const itemsData = dto.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);

    return {
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
    };
  });

  // Считаем общую сумму
  const totalPrice = itemsData.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Создаём заказ с привязкой к продуктам
  const order = await this.prisma.order.create({
    data: {
      userId: dto.userId,
      status: OrderStatus.PENDING,
      totalPrice,
      items: {
        create: itemsData,
      },
    },
    include: {
      items: {
        select: {
          id: true,
          quantity: true,
          price: true,
          productName: true,
        },
      },
    },
  });

  return order;
}


  async findAll() {
    return await this.prisma.order.findMany({include: { items: true }})
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) throw new NotFoundException(`Order #${id} not found`);

    const data: Prisma.OrderUpdateInput = {};

    if (dto.status) data.status = dto.status;
    if (dto.totalPrice !== undefined) data.totalPrice = dto.totalPrice;

    // Если пришли новые items
    if (dto.items) {
      // Сначала удаляем старые
      await this.prisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      // Потом создаём новые
      data.items = {
        create: await Promise.all(
          dto.items.map(async (i) => {
            const product = await this.prisma.product.findUnique({
              where: { id: i.productId },
            });
            if (!product) throw new NotFoundException(`Product #${i.productId} not found`);

            return {
              product: { connect: { id: i.productId } },
              productName: product.name, 
              quantity: i.quantity,
              price: product.price,
            };
          }),
        ),
      };
    }

    return this.prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    });

}

  async remove(id: number) {
    return await this.prisma.order.delete({where: { id }})
  }
}
