"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    async create(createUserDto) {
        const { email, name } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return user;
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (users.cart) {
            const totalPrice = users.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
            throw new common_1.NotFoundException(`User with email ${email} not found`);
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
                throw new common_1.ConflictException('User with this email already exists');
            }
        }
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
        return { message: 'User deleted successfully' };
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
                userName: users.name,
                cartItemsCount: 0,
                totalCartValue: 0,
                categories: [],
            };
        }
        const totalCartValue = users.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const categoriesMap = new Map();
        users.cart.items.forEach((item) => {
            const categoryName = item.product.category.name;
            categoriesMap.set(categoryName, (categoriesMap.get(categoryName) || 0) + item.quantity);
        });
        const categories = Array.from(categoriesMap.entries()).map(([name, count]) => ({
            name,
            itemsCount: count,
        }));
        return {
            userId: users.id,
            userName: users.name,
            cartItemsCount: users.cart.items.reduce((sum, item) => sum + item.quantity, 0),
            totalCartValue,
            categories,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=users.service.js.map