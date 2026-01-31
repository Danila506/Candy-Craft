import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Создать пользователя
  async create(createUserDto: CreateUsersDto) {
    const { email, name } = createUserDto;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Создаем пользователя
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }

  // Получить всех пользователей
  async findAll() {
    return this.prisma.user.findMany()
  }

  // Получить пользователя по ID
  async findOne(id: number) {
    const users = await this.prisma.user.findUnique({
      where: { id },
      include: { 
        cart: { 
          include: { 
            items: { 
              include: { 
                product: {
                  include: {
                    category: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!users) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Если у пользователя есть корзина, подсчитываем общую стоимость
    if (users.cart) {
      const totalPrice = users.cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      );

      return {
        ...users,
        cart: {
          ...users.cart,
          totalPrice,
          itemsCount: users.cart.items.length,
        },
      };
    }

    return users;
  }

  // Получить пользователя по email
  async findByEmail(email: string) {
    const users = await this.prisma.user.findUnique({
      where: { email },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!users) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return users;
  }

  // Обновить пользователя
  async update(id: number, updateUserDto: UpdateUsersDto) {
    // Проверяем существование пользователя
    const users = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!users) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Если обновляется email, проверяем его уникальность
    if (updateUserDto.email && updateUserDto.email !== users.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Обновляем пользователя
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  // Удалить пользователя
  async remove(id: number) {
    // Проверяем существование пользователя
    const users = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!users) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Если у пользователя есть корзина, сначала удаляем товары из корзины
    if (users.cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: users.cart.id },
      });

      // Затем удаляем корзину
      await this.prisma.cart.delete({
        where: { id: users.cart.id },
      });
    }

    // Удаляем пользователя
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  // Получить статистику пользователя
  async getUserStats(id: number) {
    const users = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!users) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!users.cart || users.cart.items.length === 0) {
      return {
        userId: users.id,
        userName: users.name,
        cartItemsCount: 0,
        totalCartValue: 0,
        categories: [],
      };
    }

    const totalCartValue = users.cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const categoriesMap = new Map<string, number>();
    users.cart.items.forEach((item) => {
      const categoryName = item.product.category.name;
      categoriesMap.set(
        categoryName,
        (categoriesMap.get(categoryName) || 0) + item.quantity,
      );
    });

    const categories = Array.from(categoriesMap.entries()).map(
      ([name, count]) => ({
        name,
        itemsCount: count,
      }),
    );

    return {
      userId: users.id,
      userName: users.name,
      cartItemsCount: users.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      totalCartValue,
      categories,
    };
  }
}