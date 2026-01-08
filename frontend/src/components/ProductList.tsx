import { useState, useEffect } from "react";
import type { CategoryType } from "../types/CategoryType";
import type { ProductType } from "../types/ProductType";
import { Product } from "./Product";

export function ProductList() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<
        number | undefined | null
    >(null);
    const [products, setProducts] = useState<ProductType[]>([]);

    // Загружаем категории при старте
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    // Загружаем товары при выборе категории
    useEffect(() => {
        let url = "http://localhost:3000/products";

        if (selectedCategory) {
            url = `http://localhost:3000/products/category/${selectedCategory}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [selectedCategory]);

    return (
        <div className="container flex flex-col">
            {/* Фильтр по категориям */}
            <div className="flex flex-wrap gap-2 mb-8">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-lg ${
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
                        className={`px-4 py-2 rounded-lg ${
                            selectedCategory === cat.id
                                ? "bg-[#ff398b] text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Список товаров */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {products.map((product) => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
            <div className="border border-[#ff398b] rounded-sm max-w-95 mx-auto">
                <button className="font-semibold py-4 px-24 cursor-pointer">
                    Показать еще
                </button>
            </div>
        </div>
    );
}
