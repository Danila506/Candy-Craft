import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Product } from "./Product";
import { useProducts } from "../contexts/ProductContext";
import type { CategoryType } from "../types/CategoryType";
import { API_URL } from "../api/config";

const sortOptions = [
  { value: "popular", label: "Сначала популярные" },
  { value: "cheap", label: "Сначала дешевле" },
  { value: "expensive", label: "Сначала дороже" },
  { value: "new", label: "Сначала новые" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-rose-100 overflow-hidden bg-white shadow-sm">
      <div className="aspect-4/5 bg-linear-to-br from-rose-100 via-pink-100 to-rose-50 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-rose-100 rounded animate-pulse" />
        <div className="h-3 w-full bg-rose-50 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-rose-50 rounded animate-pulse" />
      </div>
      <div className="border-t border-rose-100 p-4 flex justify-between items-center">
        <div className="h-6 w-20 bg-rose-100 rounded animate-pulse" />
        <div className="h-9 w-28 bg-rose-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function ProductList() {
  const { products, loading: productsLoading } = useProducts();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortValue>("popular");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data: CategoryType[]) => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch(() => setCategoriesLoading(false));
  }, []);

  const highestPrice = useMemo(() => {
    if (!products.length) return 0;
    return Math.max(...products.map((product) => product.price));
  }, [products]);

  useEffect(() => {
    if (!maxPrice && highestPrice > 0) {
      setMaxPrice(highestPrice);
    }
  }, [highestPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    const byCategory = selectedCategory
      ? products.filter((product) => product.categoryId === selectedCategory)
      : products;

    const bySearch = byCategory.filter((product) => {
      const query = searchTerm.trim().toLowerCase();
      if (!query) return true;
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    const byStock = inStockOnly
      ? bySearch.filter((product) => product.inStock > 0)
      : bySearch;

    const byPrice = byStock.filter((product) =>
      maxPrice ? product.price <= maxPrice : true,
    );

    const sorted = [...byPrice];
    if (sortBy === "cheap") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "expensive") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "new") sorted.sort((a, b) => b.id - a.id);

    return sorted;
  }, [products, selectedCategory, searchTerm, inStockOnly, maxPrice, sortBy]);
  const resetFilters = () => {
    setSelectedCategory(null);
    setSortBy("popular");
    setSearchTerm("");
    setInStockOnly(false);
    setMaxPrice(highestPrice || null);
  };

  const isLoading = productsLoading || categoriesLoading;

  return (
    <section className="space-y-6 md:space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Categories */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  selectedCategory === null
                    ? "bg-[#ff398b] text-white border-[#ff398b] shadow-sm"
                    : "bg-white text-gray-700 border-rose-100 hover:border-[#ff398b]/40 hover:text-[#ff398b]"
                }`}
              >
                Все товары
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm border whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[#ff398b] text-white border-[#ff398b] shadow-sm"
                      : "bg-white text-gray-700 border-rose-100 hover:border-[#ff398b]/40 hover:text-[#ff398b]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search / Sort */}
          <div className="lg:ml-auto flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по каталогу"
              className="h-10 w-full sm:w-72 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40"
              aria-label="Поиск по товарам"
            />
            <select
              className="h-10 rounded-xl border border-rose-100 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#ff398b]/15 focus:border-[#ff398b]/40"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortValue)}
              aria-label="Сортировка товаров"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden h-10 px-4 rounded-xl border border-rose-100 bg-white text-sm inline-flex items-center justify-center gap-2 hover:border-[#ff398b]/40 hover:text-[#ff398b] transition-colors"
            >
              <SlidersHorizontal size={16} /> Фильтры
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar filters */}
        <aside className="hidden lg:block rounded-2xl border border-rose-100 bg-white p-4 h-fit space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Фильтры</h2>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#ff398b] hover:underline"
            >
              Сбросить
            </button>
          </div>

          <label className="flex items-center justify-between gap-2 text-sm text-gray-700">
            Только в наличии
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-[#ff398b]"
            />
          </label>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              До{" "}
              <span className="font-medium text-gray-900">
                {maxPrice ?? highestPrice} ₽
              </span>
            </p>
            <input
              type="range"
              min={0}
              max={highestPrice || 0}
              value={maxPrice ?? highestPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#ff398b]"
            />
          </div>
        </aside>

        {/* Grid */}
        <div className="rounded-2xl bg-rose-50/60 p-3 md:p-4 border border-rose-100">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-rose-200 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ничего не найдено
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                Попробуйте изменить фильтры или сбросьте их.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#ff398b] text-white text-sm font-medium hover:bg-[#ff2a81] transition-colors shadow-sm"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
              {filteredProducts.map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  imageUrl={`https://img.gs/wgbfglmcbt/full/${product.imageUrl}`}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile filters modal */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/40"
          onClick={() => setIsFiltersOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 space-y-4 border-t border-rose-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-10 bg-rose-200 rounded-full mx-auto" />
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Фильтры</h3>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm text-[#ff398b] hover:underline"
              >
                Сбросить
              </button>
            </div>

            <label className="flex items-center justify-between text-sm text-gray-700">
              Только в наличии
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 accent-[#ff398b]"
              />
            </label>

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                До{" "}
                <span className="font-medium text-gray-900">
                  {maxPrice ?? highestPrice} ₽
                </span>
              </p>
              <input
                type="range"
                min={0}
                max={highestPrice || 0}
                value={maxPrice ?? highestPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ff398b]"
              />
            </div>

            <button
              className="w-full rounded-xl bg-[#ff398b] text-white py-2.5 text-sm font-medium hover:bg-[#ff2a81] transition-colors shadow-sm"
              onClick={() => setIsFiltersOpen(false)}
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
