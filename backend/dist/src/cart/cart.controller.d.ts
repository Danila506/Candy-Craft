import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: number): Promise<{
        id: number;
        name: string;
        description: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        inStock: number;
        categoryId: number;
    }[]>;
    addToCart(userId: number, createCartDto: CreateCartItemDto): Promise<{
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
    }>;
    updateCartItem(userId: number, productId: number): Promise<{
        message: string;
    }>;
    removeFromCart(userId: number, productId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
    getCartItemsCount(userId: number): Promise<{
        count: number;
    }>;
}
