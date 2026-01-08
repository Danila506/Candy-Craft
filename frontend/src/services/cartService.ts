// services/cartService.ts или в хуке
import type { ProductType } from "../types/ProductType";

export const addToCart = async (product: ProductType): Promise<boolean> => {
    try {
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...product,
                quantity: 1 // начальное количество
            }),
        });
        
        if (!response.ok) {
            throw new Error("Ошибка при добавлении в корзину");
        }
        
        return true;
    } catch (error) {
        console.error("Ошибка:", error);
        return false;
    }
};