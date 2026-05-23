// components/ProductInfo.tsx
import { useState } from "react";
import type { ProductType } from "../types/ProductType";
import Cart from "./ui/CartIcon";

interface ProductInfoProps {
  product: ProductType;
  isInCart: boolean;
  onAddToCart: () => void;
  isMobile?: boolean; // Добавляем необязательный пропс
}

export function ProductInfo({
  product,
  isInCart,
  onAddToCart,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < product.inStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      <div className="mb-6">
        <span className="text-2xl font-bold text-[#ff6163]">
          {product.price}₽
        </span>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              product.inStock > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span
            className={product.inStock > 0 ? "text-green-600" : "text-red-600"}
          >
            {product.inStock > 0
              ? `В наличии: ${product.inStock} шт`
              : "Нет в наличии"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decrement}
              disabled={quantity <= 1}
              className="px-4 py-2 text-lg disabled:opacity-50"
            >
              -
            </button>
            <span className="px-4 py-2 text-lg w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={increment}
              disabled={quantity >= product.inStock}
              className="px-4 py-2 text-lg disabled:opacity-50"
            >
              +
            </button>
          </div>

          <div className="text-lg">
            <span className="font-semibold">
              Итого: {(product.price * quantity).toLocaleString()}₽
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={isInCart || product.inStock === 0}
        className={`w-full py-4 rounded-lg font-bold md:text-lg text-sm flex items-center justify-center gap-3 mb-4 transition-colors ${
          isInCart
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : product.inStock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#ff398b] text-white hover:bg-[#e0327a]"
        }`}
      >
        <Cart size={24} />
        {isInCart
          ? "✓ Товар в корзине"
          : product.inStock === 0
            ? "Нет в наличии"
            : "Добавить в корзину"}
      </button>

      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex items-start">
          <span className="w-32 shrink-0">Категория:</span>
          <span>Конфетные торты</span>
        </div>
        <div className="flex items-start">
          <span className="w-32 shrink-0">Вес:</span>
          <span>Индивидуально по составу</span>
        </div>
        <div className="flex items-start">
          <span className="w-32 shrink-0">Состав:</span>
          <span>Конфеты, шоколад, упаковка и декоративная основа</span>
        </div>
      </div>
    </div>
  );
}
