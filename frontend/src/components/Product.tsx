// components/Product.tsx
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import type { ProductType } from "../types/ProductType";
import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle, ImageOff } from "lucide-react";

export function Product(product: ProductType) {
  const { isItemInCart, addToCart } = useCart();
  const { imageUrl, name, description, price, id, inStock, category } = product;

  const [imageBroken, setImageBroken] = useState(!imageUrl);
  const isInCart = isItemInCart(id);
  const isOutOfStock = inStock < 1;

  const handleAddToCart = async () => {
    if (isInCart || isOutOfStock) return;
    await addToCart(id);
  };

  return (
    <li className="list-none ">
      <div className="group h-full bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <Link to={`/product/${id}`} className="block">
          {/* IMAGE */}
          <div className="relative max-h-100 overflow-hidden bg-linear-to-br from-rose-100 via-pink-100 to-rose-50 aspect-5/5">
            {imageBroken ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-300 gap-2">
                <ImageOff className="w-8 h-8" />
                <span className="text-xs">Нет фото</span>
              </div>
            ) : (
              <img
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={imageUrl}
                alt={name}
                loading="lazy"
                onError={() => setImageBroken(true)}
              />
            )}

            {/* BADGES */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              <span className="inline-flex items-center rounded-full border border-rose-100 bg-white/85 px-2.5 py-1 text-[11px] font-medium text-gray-700 backdrop-blur">
                {category?.name ?? "Категория"}
              </span>

              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border backdrop-blur ${
                  isOutOfStock
                    ? "bg-white/85 text-red-600 border-red-100"
                    : "bg-white/85 text-emerald-700 border-emerald-100"
                }`}
              >
                {isOutOfStock ? "Нет в наличии" : `В наличии: ${inStock}`}
              </span>
            </div>

            {isInCart && (
              <div className="absolute top-3 right-3 bg-white/90 text-[#ff398b] text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-100 flex items-center gap-1 z-10 shadow-sm backdrop-blur">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>В корзине</span>
              </div>
            )}

            {/* subtle bottom fade for text readability on images */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/70 to-transparent" />
          </div>

          {/* CONTENT */}
          <div className="bg-white p-4">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-[#ff398b] transition-colors">
              {name}
            </h3>
            <p className="mt-2 text-gray-600 text-xs line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </Link>

        {/* FOOTER */}
        <div className="border-t border-rose-100 bg-white px-4 py-3.5">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500">Цена</span>
              <span className="text-lg md:text-xl font-semibold text-gray-900">
                {price}₽
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isInCart || isOutOfStock}
              className={`inline-flex justify-center items-center font-semibold gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b] ${
                isInCart
                  ? "bg-rose-50 text-[#ff398b] border border-rose-100 cursor-not-allowed"
                  : isOutOfStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#ff398b] text-white hover:bg-[#ff2a81] active:scale-95 shadow-sm"
              }`}
              aria-label={
                isInCart
                  ? "Товар уже в корзине"
                  : isOutOfStock
                    ? "Товара нет в наличии"
                    : `Добавить ${name} в корзину`
              }
            >
              {isInCart ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}

              {isInCart
                ? "В корзине"
                : isOutOfStock
                  ? "Нет в наличии"
                  : "В корзину"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
