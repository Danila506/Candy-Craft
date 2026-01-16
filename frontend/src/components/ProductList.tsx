// components/ProductList.tsx
import { useState, useCallback, useEffect } from "react";
import { Product } from "./Product";
import { useProducts } from "../contexts/ProductContext";
import type { CategoryType } from "../types/CategoryType";
import type { ProductType } from "../types/ProductType";

export function ProductList() {
    const { 
        products, 
        loading: productsLoading, 
        getProductsByCategory 
    } = useProducts();
    
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [isMobile, setIsMobile] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Загружаем только категории (товары уже в контексте)
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setCategoriesLoading(false);
            })
            .catch(() => setCategoriesLoading(false));
    }, []);

    // Фильтрация товаров по выбранной категории
    const filteredProducts = selectedCategory 
        ? getProductsByCategory(selectedCategory)
        : products;

    // Обработчик "Показать еще"
    const loadMore = useCallback(() => {
        const increment = isMobile ? 3 : 6;
        setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length));
    }, [isMobile, filteredProducts.length]);

    // Видимые товары
    const visibleProducts = filteredProducts.slice(0, visibleCount);
    
    const isLoading = productsLoading || categoriesLoading;

    // Сброс счетчика при смене категории
    useEffect(() => {
        setVisibleCount(isMobile ? 3 : 6);
    }, [selectedCategory, isMobile]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Заголовок секции */}
            <div className="mb-8 md:mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
                    Каталог товаров
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Выберите категорию или просмотрите все товары
                </p>
            </div>

            {/* Фильтр по категориям - минималистичный стиль */}
            <div className="mb-8 md:mb-12">
                <div className="overflow-x-auto pb-2 md:pb-0">
                    <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-5 py-2.5 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                                !selectedCategory
                                    ? "bg-rose-200/60 text-rose-800 border border-rose-300/50 shadow-sm"
                                    : "bg-white/80 text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        >
                            Все товары
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                                    selectedCategory === cat.id
                                        ? "bg-rose-200/60 text-rose-800 border border-rose-300/50 shadow-sm"
                                        : "bg-white/80 text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
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
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-rose-200 border-t-rose-400"></div>
                </div>
            ) : (
                <>
                    {/* Список товаров */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-8 md:mb-12">
                        {visibleProducts.map((product: ProductType) => (
                            <Product key={product.id} {...product} />
                        ))}
                    </div>

                    {/* Кнопка "Показать еще" - минималистичная */}
                    {visibleProducts.length < filteredProducts.length && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={loadMore}
                                className="px-8 py-3 md:px-12 md:py-3.5 text-sm md:text-base font-medium text-gray-700 bg-white/80 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
                            >
                                Показать еще{" "}
                                {Math.min(
                                    filteredProducts.length -
                                        visibleProducts.length,
                                    isMobile ? 3 : 6
                                )}
                            </button>
                        </div>
                    )}

                    {/* Сообщение о конце списка */}
                    {visibleProducts.length ===
                        filteredProducts.length &&
                        filteredProducts.length > 0 && (
                            <div className="text-center text-gray-400 py-6 text-sm md:text-base">
                                Все товары загружены
                            </div>
                        )}
                </>
            )}

            {/* Сообщение если товаров нет */}
            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center text-gray-400 py-16 text-sm md:text-base">
                    {selectedCategory
                        ? "Товары в этой категории отсутствуют"
                        : "Товары временно отсутствуют"}
                </div>
            )}
        </div>
    );
}