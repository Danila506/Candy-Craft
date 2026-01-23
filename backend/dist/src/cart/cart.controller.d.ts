import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: number): Promise<{
        name: string;
        id: number;
        description: string;
        price: number;
        inStock: number;
        imageUrl: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    addToCart(userId: number, createCartDto: CreateCartItemDto): Promise<{
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
