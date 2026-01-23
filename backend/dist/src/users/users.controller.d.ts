import { UserService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUsersDto): Promise<{
        name: string;
        id: number;
        email: string;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        email: string;
    }[]>;
    findOne(id: number): Promise<({
        cart: ({
            items: ({
                product: {
                    category: {
                        name: string;
                        id: number;
                        description: string;
                        imageUrl: string;
                    };
                } & {
                    name: string;
                    id: number;
                    description: string;
                    price: number;
                    inStock: number;
                    imageUrl: string;
                    categoryId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                productId: number;
                cartId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        name: string;
        id: number;
        email: string;
    }) | {
        cart: {
            totalPrice: number;
            itemsCount: number;
            items: ({
                product: {
                    category: {
                        name: string;
                        id: number;
                        description: string;
                        imageUrl: string;
                    };
                } & {
                    name: string;
                    id: number;
                    description: string;
                    price: number;
                    inStock: number;
                    imageUrl: string;
                    categoryId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                productId: number;
                cartId: number;
                quantity: number;
            })[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        };
        name: string;
        id: number;
        email: string;
    }>;
    findByEmail(email: string): Promise<{
        cart: ({
            items: ({
                product: {
                    name: string;
                    id: number;
                    description: string;
                    price: number;
                    inStock: number;
                    imageUrl: string;
                    categoryId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                productId: number;
                cartId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        name: string;
        id: number;
        email: string;
    }>;
    getUserStats(id: number): Promise<{
        userId: number;
        userName: string;
        cartItemsCount: number;
        totalCartValue: number;
        categories: {
            name: string;
            itemsCount: number;
        }[];
    }>;
    update(id: number, updateUserDto: UpdateUsersDto): Promise<{
        cart: ({
            items: ({
                product: {
                    name: string;
                    id: number;
                    description: string;
                    price: number;
                    inStock: number;
                    imageUrl: string;
                    categoryId: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                productId: number;
                cartId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        name: string;
        id: number;
        email: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
