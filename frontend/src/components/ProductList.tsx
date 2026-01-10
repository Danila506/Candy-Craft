import { useState, useEffect, useCallback } from "react";
import type { CategoryType } from "../types/CategoryType";
import type { ProductType } from "../types/ProductType";
import { Product } from "./Product";

export function ProductList() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [visibleCount, setVisibleCount] = useState(6); // Начальное количество товаров
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Загружаем категории при старте
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    // Загружаем товары при выборе категории
    useEffect(() => {
        setIsLoading(true);
        const url = selectedCategory 
            ? `http://localhost:3000/products/category/${selectedCategory}`
            : "http://localhost:3000/products";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setVisibleCount(isMobile ? 3 : 6); // Сбрасываем счетчик с учетом адаптива
            })
            .finally(() => setIsLoading(false));
    }, [selectedCategory, isMobile]);

    // Обработчик "Показать еще"
    const loadMore = useCallback(() => {
        const increment = isMobile ? 3 : 6; // Разный шаг для мобильных и десктопов
        setVisibleCount(prev => Math.min(prev + increment, products.length));
    }, [isMobile, products.length]);

    // Видимые товары
    const visibleProducts = products.slice(0, visibleCount);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Фильтр по категориям */}
            <div className="mb-6 md:mb-8">
                <div className="overflow-x-auto pb-2 md:pb-0"> {/* Горизонтальный скролл на мобилках */}
                    <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                                !selectedCategory
                                    ? "bg-[#ff398b] text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            Все товары
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                                    selectedCategory === cat.id
                                        ? "bg-[#ff398b] text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Лоадер */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff398b]"></div>
                </div>
            ) : (
                <>
                    {/* Список товаров */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
                        {visibleProducts.map((product) => (
                            <Product key={product.id} {...product} />
                        ))}
                    </div>

                    {/* Кнопка "Показать еще" */}
                    {visibleProducts.length < products.length && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={loadMore}
                                className="font-semibold py-3 px-8 md:py-4 md:px-24 cursor-pointer border border-[#ff398b] rounded-sm 
                                           hover:bg-[#ff398b] hover:text-white transition-all duration-300 text-sm md:text-base"
                            >
                                Показать еще {Math.min(products.length - visibleProducts.length, isMobile ? 3 : 6)}
                            </button>
                        </div>
                    )}

                    {/* Сообщение о конце списка */}
                    {visibleProducts.length === products.length && products.length > 0 && (
                        <div className="text-center text-gray-500 py-4 text-sm md:text-base">
                            Все товары загружены
                        </div>
                    )}
                </>
            )}

            {/* Сообщение если товаров нет */}
            {!isLoading && products.length === 0 && (
                <div className="text-center text-gray-500 py-12 text-sm md:text-base">
                    Товары в этой категории отсутствуют
                </div>
            )}
        </div>
    );
}