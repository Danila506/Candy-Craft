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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Фильтр по категориям */}
            <div className="mb-6 md:mb-8">
                <div className="overflow-x-auto pb-2 md:pb-0">
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
                        {visibleProducts.map((product:ProductType) => (

                                <Product key={product.id} {...product} />

                        ))}
                    </div>

                    {/* Кнопка "Показать еще" */}
                    {visibleProducts.length < filteredProducts.length && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={loadMore}
                                className="font-semibold py-3 px-8 md:py-4 md:px-24 cursor-pointer border border-[#ff398b] rounded-sm 
                                           hover:bg-[#ff398b] hover:text-white transition-all duration-300 text-sm md:text-base"
                            >
                                Показать еще{" "}
                                {Math.min(
                                    filteredProducts.length - visibleProducts.length,
                                    isMobile ? 3 : 6
                                )}
                            </button>
                        </div>
                    )}

                    {/* Сообщение о конце списка */}
                    {visibleProducts.length === filteredProducts.length && filteredProducts.length > 0 && (
                        <div className="text-center text-gray-500 py-4 text-sm md:text-base">
                            Все товары загружены
                        </div>
                    )}
                </>
            )}

            {/* Сообщение если товаров нет */}
            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center text-gray-500 py-12 text-sm md:text-base">
                    {selectedCategory 
                        ? "Товары в этой категории отсутствуют" 
                        : "Товары временно отсутствуют"}
                </div>
            )}
        </div>
    );
}