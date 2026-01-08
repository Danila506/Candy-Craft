import Cart from "./ui/CartIcon";
import { useCart } from "../contexts/CartContext";
import { useCallback, useState, useEffect } from "react";
import type { ProductType } from "../types/ProductType";

export function Product({ ...product }: ProductType) {
    const { incrementCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false);
    
    // Проверяем наличие товара при загрузке компонента
    useEffect(() => {
        const checkIfProductInCart = async () => {
            try {
                const res = await fetch("http://localhost:3000/cart/1");
                const data: ProductType[] = await res.json();
                const exists = data.some((item: ProductType) => item.id === product.id);
                setIsProductInCart(exists);
            } catch (error) {
                console.error("Ошибка проверки корзины:", error);
            }
        };
        
        checkIfProductInCart();
    }, [product.id]); // Перепроверяем при смене ID

    const handleAddToCart = useCallback(async () => {
        // Проверяем ДО отправки запроса
        if (isProductInCart) {
            console.log("Товар уже в корзине, повторное добавление отменено");
            return; // Просто выходим, не показывая ошибку
        }
        
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/cart/1/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id }),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => "Ошибка сервера");
                throw new Error(`Ошибка ${response.status}: ${errorText}`);
            }
            
            // Обновляем состояние после успешного добавления
            const result = await response.json();
            console.log("Товар добавлен:", result);
            incrementCart();
            setIsProductInCart(true); // Помечаем как добавленный
            
        } catch (error) {
            console.error("Не удалось добавить товар:", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, product.id, incrementCart, isProductInCart]); // Добавили isProductInCart в зависимости
    return (
        <li
            className={`${product.className} max-w-92.5 list-none flex flex-col h-full`}
        >
            <div className="w-full flex flex-col h-full">
                {/* Изображение с фиксированной высотой */}
                <div className="">
                    {" "}
                    {/* Фиксированная высота для изображения */}
                    <img
                        className="w-full h-full object-cover rounded-t-sm"
                        src={`${product.imageUrl}`}
                        alt={`${product.name}`}
                    />
                </div>

                {/* Контентная часть - растягивается */}
                <div className="bg-white rounded-b-lg flex flex-col flex-1 border border-gray-200">
                    {/* Текстовая часть - ограниченная высота с прокруткой */}
                    <div className="flex flex-col gap-y-3 pb-4 border-b border-b-gray-200 pl-5 py-5  flex-1 min-h-0">
                        <span className="text-xl font-medium line-clamp-1">
                            {product.name}
                        </span>
                        <span className="text-gray-600 text-sm line-clamp-2 overflow-hidden">
                            {product.description}
                        </span>
                    </div>
                    <div
                        className="flex justify-between items-center pl-5 py-3 h-14 relative before:absolute before:left-3/5 
                    before:top-0 before:bottom-0 before:w-px before:border before:border-gray-200 before:-translate-x-1/2"
                    >
                        <div className="md:max-w-55">
                            <span className="text-[#ff6163] text-xl font-bold">
                                {product.price}₽
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isLoading || isProductInCart} // Блокируем если уже в корзине
                                className={`flex justify-center items-center font-bold gap-x-2 mx-6 cursor-pointer 
                        ${
                            isProductInCart
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "hover:bg-gray-50"
                        }
                        ${isLoading ? "opacity-50 cursor-wait" : ""}
                    `}
                            >
                                <Cart size={20} />
                                {isProductInCart
                                    ? "✓ В корзине"
                                    : isLoading
                                    ? "Добавление..."
                                    : "В корзину"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
