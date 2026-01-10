// components/Product.tsx
import { useCart } from "../contexts/CartContext";
import Cart from "./ui/CartIcon";
import type { ProductType } from "../types/ProductType";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Product(product: ProductType) {
    const { isItemInCart, refreshCart } = useCart();
    const { className, imageUrl, name, description, price, id } = product;
    const [isMobile, setIsMobile] = useState(false);
    const isInCart = isItemInCart(id);

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleAddToCart = async () => {
        if (isInCart) return;

        try {
            const response = await fetch(`http://localhost:3000/cart/1/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id }),
            });

            if (!response.ok) {
                const errorText = await response
                    .text()
                    .catch(() => "Ошибка сервера");
                throw new Error(`Ошибка ${response.status}: ${errorText}`);
            }

            refreshCart();
        } catch (error) {
            console.error("Не удалось добавить товар:", error);
        }
    };

    return (
        <li
            className={`
            ${className} 
            w-full max-w-xs sm:max-w-sm md:max-w-none
            list-none flex flex-col h-full
            transition-transform duration-300 hover:scale-[1.02]
        `}
        >
            <div className="w-full flex flex-col h-full shadow-sm hover:shadow-md rounded-lg overflow-hidden">
                {/* Изображение с адаптивной высотой */}

                <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block hover:scale-[1.02] transition-transform duration-300"
                >
                    <div className="relative overflow-hidden bg-gray-100">
                        <div className="pt-[75%] md:pt-[100%] relative">
                            {" "}
                            {/* 4:3 на мобильных, 1:1 на десктопе */}
                            <img
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src={imageUrl}
                                alt={name}
                                loading="lazy"
                            />
                        </div>

                        {/* Бейдж для товара в корзине */}
                        {isInCart && (
                            <div className="absolute top-2 right-2 bg-[#ff398b] text-white text-xs px-2 py-1 rounded-full">
                                В корзине
                            </div>
                        )}
                    </div>
                    {/* Контентная часть */}
                    <div className="bg-white flex flex-col flex-1">
                        <div className="flex flex-col gap-y-2 md:gap-y-3 p-3 md:p-4 md:pl-5 flex-1">
                            <span className="text-base md:text-xl font-medium line-clamp-1 md:line-clamp-2">
                                {name}
                            </span>
                            <span className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                                {description}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Нижняя часть с ценой и кнопкой */}
                <div className="border-t border-gray-200 px-3 md:px-0">
                    <div className="flex justify-between items-center py-2 md:py-3">
                        <div className="md:max-w-55 pl-1 md:pl-5">
                            <span className="text-[#ff6163] text-lg md:text-xl font-bold">
                                {price}₽
                            </span>
                        </div>
                        <div className="pr-1 md:pr-0">
                            <button
                                onClick={handleAddToCart}
                                disabled={isInCart}
                                className={`
                                        flex justify-center items-center 
                                        font-semibold md:font-bold 
                                        gap-x-1 md:gap-x-2 
                                        px-3 md:px-6 py-1.5 md:py-2
                                        rounded-lg md:rounded-none
                                        text-sm md:text-base
                                        transition-all duration-200
                                        ${
                                            isInCart
                                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                : "bg-[#ff398b] text-white hover:bg-[#e0327a] active:scale-95"
                                        }
                                    `}
                                aria-label={
                                    isInCart
                                        ? "Товар уже в корзине"
                                        : `Добавить ${name} в корзину`
                                }
                            >
                                <Cart size={isMobile ? 16 : 20} />
                                <span className="hidden xs:inline">
                                    {isInCart ? "✓ В корзине" : "В корзину"}
                                </span>
                                <span className="xs:hidden">
                                    {isInCart ? "✓" : "Купить"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
