"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  safeUserWithCartSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    cart: {
      select: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        items: {
          select: {
            id: true,
            cartId: true,
            productId: true,
            quantity: true,
            customPrice: true,
            product: {
              select: {
                id: true,
                sku: true,
                slug: true,
                name: true,
                description: true,
                price: true,
                isActive: true,
                deletedAt: true,
                inStock: true,
                reservedQty: true,
                imageUrl: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
                category: true,
              },
            },
          },
        },
      },
    },
  };
  async findAll(page = 1, limit = 50) {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const safePage = Math.max(page, 1);
    return this.prisma.user.findMany({
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      orderBy: { id: "desc" },
      select: {
        id: true,
        firstName: true,
        email: true,
      },
    });
  }
  async findOne(id) {
    const users = await this.prisma.user.findUnique({
      where: { id },
      select: this.safeUserWithCartSelect,
    });
    if (!users) {
      throw new common_1.NotFoundException(`User with ID ${id} not found`);
    }
    if (users.cart) {
      const totalPrice = users.cart.items.reduce(
        (sum, item) =>
          sum + (item.product?.price ?? item.customPrice ?? 0) * item.quantity,
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
  async findByEmail(email) {
    const users = await this.prisma.user.findUnique({
      where: { email },
      select: this.safeUserWithCartSelect,
    });
    if (!users) {
      throw new common_1.NotFoundException(
        `User with email ${email} not found`,
      );
    }
    return users;
  }
  async update(id, updateUserDto) {
    const users = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!users) {
      throw new common_1.NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.email && updateUserDto.email !== users.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new common_1.ConflictException(
          "User with this email already exists",
        );
      }
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: this.safeUserWithCartSelect,
    });
  }
  async remove(id) {
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
      throw new common_1.NotFoundException(`User with ID ${id} not found`);
    }
    if (users.cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: users.cart.id },
      });
      await this.prisma.cart.delete({
        where: { id: users.cart.id },
      });
    }
    await this.prisma.user.delete({
      where: { id },
    });
    return { message: "User deleted successfully" };
  }
  async getUserStats(id) {
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
      throw new common_1.NotFoundException(`User with ID ${id} not found`);
    }
    if (!users.cart || users.cart.items.length === 0) {
      return {
        userId: users.id,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        cartItemsCount: 0,
        totalCartValue: 0,
        categories: [],
      };
    }
    const totalCartValue = users.cart.items.reduce(
      (sum, item) =>
        sum + (item.product?.price ?? item.customPrice ?? 0) * item.quantity,
      0,
    );
    const categoriesMap = new Map();
    users.cart.items.forEach((item) => {
      const categoryName =
        item.product?.category.name ?? "Индивидуальные конфетные торты";
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
      userFirstName: users.firstName,
      userLastName: users.lastName,
      cartItemsCount: users.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),
      totalCartValue,
      categories,
    };
  }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService]),
  ],
  UserService,
);
//# sourceMappingURL=users.service.js.map
