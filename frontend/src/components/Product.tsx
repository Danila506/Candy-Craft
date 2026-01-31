// components/Product.tsx
import { useCart } from "../contexts/CartContext";
import type { ProductType } from "../types/ProductType";
import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle } from "lucide-react";

export function Product(product: ProductType) {
  const { isItemInCart, addToCart } = useCart();
  const { imageUrl, name, description, price, id } = product;
  const isInCart = isItemInCart(id);

  const handleAddToCart = async () => {
    if (isInCart) return;
    await addToCart(id);
  };

  return (
    <li
      className={`
            
            w-full max-w-xs sm:max-w-sm md:max-w-none
            list-none flex flex-col h-full
        `}
    >
      <div className="group w-full flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300">
        {/* Изображение с адаптивной высотой */}
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="block relative overflow-hidden"
        >
          <div className="relative overflow-hidden bg-rose-50/50">
            <div className="pt-[75%] md:pt-[100%] relative">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={imageUrl}
                alt={name}
                loading="lazy"
              />
            </div>

            {/* Бейдж для товара в корзине */}
            {isInCart && (
              <div className="absolute top-3 right-3 bg-rose-200/90 backdrop-blur-sm text-rose-800 text-xs font-medium px-3 py-1.5 rounded-full border border-rose-300/50 flex items-center gap-1.5 z-10 shadow-sm">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>В корзине</span>
              </div>
            )}
          </div>

          {/* Контентная часть */}
          <div className="bg-white flex flex-col flex-1 p-4 md:p-5">
            <div className="flex flex-col gap-y-2 md:gap-y-3 flex-1">
              <h3 className="text-base md:text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-rose-700 transition-colors duration-200">
                {name}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </Link>

        {/* Нижняя часть с ценой и кнопкой */}
        <div className="border-t border-gray-100 bg-gray-50/30 px-4 md:px-5 py-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold text-gray-800">
                {price}₽
              </span>
              <span className="text-xs text-gray-400 hidden md:block">
                за единицу
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`
                                group/btn
                                flex justify-center items-center 
                                font-medium
                                gap-2
                                px-4 md:px-5 py-2 md:py-2.5
                                rounded-lg
                                text-sm md:text-base
                                transition-all duration-200
                                ${
                                  isInCart
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-rose-200/60 text-rose-800 border border-rose-300/50 hover:bg-rose-300/60 hover:border-rose-400/60 active:scale-95 shadow-sm hover:shadow"
                                }
                            `}
              aria-label={
                isInCart ? "Товар уже в корзине" : `Добавить ${name} в корзину`
              }
            >
              {isInCart ? (
                <>
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">В корзине</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">В корзину</span>
                  <span className="sm:hidden">Купить</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
