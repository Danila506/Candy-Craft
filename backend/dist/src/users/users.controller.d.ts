import { UserService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUsersDto): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
    findOne(id: number): Promise<({
        cart: ({
            items: ({
                product: {
                    category: {
                        id: number;
                        name: string;
                        description: string;
                        imageUrl: string;
                    };
                } & {
                    id: number;
                    name: string;
                    description: string;
                    imageUrl: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    inStock: number;
                    categoryId: number;
                };
            } & {
                id: number;
                cartId: number;
                productId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        id: number;
        name: string;
        email: string;
    }) | {
        cart: {
            totalPrice: number;
            itemsCount: number;
            items: ({
                product: {
                    category: {
                        id: number;
                        name: string;
                        description: string;
                        imageUrl: string;
                    };
                } & {
                    id: number;
                    name: string;
                    description: string;
                    imageUrl: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    inStock: number;
                    categoryId: number;
                };
            } & {
                id: number;
                cartId: number;
                productId: number;
                quantity: number;
            })[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        };
        id: number;
        name: string;
        email: string;
    }>;
    findByEmail(email: string): Promise<{
        cart: ({
            items: ({
                product: {
                    id: number;
                    name: string;
                    description: string;
                    imageUrl: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    inStock: number;
                    categoryId: number;
                };
            } & {
                id: number;
                cartId: number;
                productId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        id: number;
        name: string;
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
                    id: number;
                    name: string;
                    description: string;
                    imageUrl: string;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    inStock: number;
                    categoryId: number;
                };
            } & {
                id: number;
                cartId: number;
                productId: number;
                quantity: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
        }) | null;
    } & {
        id: number;
        name: string;
        email: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
