import { Breadcrumb } from "../components/ui/Breadcrumb";
import { useMemo, useState } from "react";
import { H2 } from "../components/ui/H2";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import type { CartType } from "../types/CartType";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  CreditCard,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

const customShapeLabels = {
  round: "круг",
  square: "квадрат",
  heart: "сердце",
} as const;

const customSizeLabels = {
  small: "малый",
  medium: "средний",
  large: "большой",
  s: "S (14,5см)",
  m: "M (19,5см)",
  l: "L (24,5см)",
  xl: "XL (29,5см)",
} as const;

const customInnerCandyLabels = {
  milka: "Milka",
  raffaello: "Raffaello",
  kinder: "Kinder",
  ferrero: "Ferrero",
  merci: "Merci",
} as const;

const customColorLabels = {
  pink: "розовый",
  gold: "золотой",
  white: "белый",
} as const;

const customDecorLabels = {
  none: "без декора",
  flowers: "цветы",
  bow: "бант",
  topper: "топпер с надписью",
} as const;

const customOuterLayerLabels = {
  "kinder-chocolate": "Kinder Chocolate",
  "kinder-bueno": "Kinder Bueno",
  "milka-baton": "Milka Baton",
  twix: "Twix",
  rittersport: "RitterSport",
  kitkat: "Kitkat",
  snikers: "Snikers",
  milkiway: "MilkiWay",
} as const;

const customPackagingLabels = {
  standard: "фирменная коробка",
  window: "коробка с окном",
  gift: "подарочная упаковка",
  "premium-box": "премиум-бокс",
} as const;

export function Cart() {
  const { cartItems, removeCartEntry, updateCartEntryQuantity } = useCart();
  const [busyItemId, setBusyItemId] = useState<number | null>(null);
  const navigate = useNavigate();

  const incrementQuantity = async (item: CartType) => {
    setBusyItemId(item.id);
    try {
      await updateCartEntryQuantity(item, item.quantity + 1);
    } finally {
      setBusyItemId(null);
    }
  };

  const decrementQuantity = async (item: CartType) => {
    if (item.quantity <= 1) return;
    setBusyItemId(item.id);
    try {
      await updateCartEntryQuantity(item, item.quantity - 1);
    } finally {
      setBusyItemId(null);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const formatInnerLayerSummary = (
    innerLayer:
      | Array<{
          candyId: keyof typeof customInnerCandyLabels;
          percentage: number;
        }>
      | undefined,
  ) => {
    if (!innerLayer?.length) {
      return "внутренний слой не указан";
    }

    const parts = innerLayer
      .filter((part) => part.percentage > 0)
      .map(
        (part) =>
          `${customInnerCandyLabels[part.candyId] ?? part.candyId} ${part.percentage}%`,
      );

    return parts.join(", ") || "внутренний слой не указан";
  };

  const formatDecorSummary = (
    decor:
      | Array<keyof typeof customDecorLabels>
      | keyof typeof customDecorLabels
      | undefined,
  ) => {
    if (!decor) {
      return "без декора";
    }

    if (!Array.isArray(decor)) {
      return customDecorLabels[decor] ?? "без декора";
    }

    if (decor.length === 0) {
      return "без декора";
    }

    const parts = decor.map((item) => customDecorLabels[item] ?? item);

    return parts.join(", ") || "без декора";
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-indigo-200 to-purple-200 rounded-2xl mb-4 shadow-sm">
            <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-indigo-700" />
          </div>
          <H2 text="Корзина покупок" />
          <Breadcrumb
            items={[
              { text: "Главная", path: "/" },
              { text: "Корзина", path: "/cart" },
            ]}
          />
        </div>

        {cartItems.length === 0 ? (
          /* Пустая корзина */
          <div className="max-w-lg mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-10 md:p-12 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                Корзина пуста
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Добавьте товары из каталога, чтобы начать покупки
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-2xl font-medium text-base hover:shadow-lg hover:shadow-indigo-200/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Перейти в каталог
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Список товаров */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const quantity = item.quantity;
                const itemTotal = Number(item.price) * quantity;
                const isBusy = busyItemId === item.id;
                const availableStock = item.isCustom
                  ? 5
                  : Math.max(0, item.inStock - (item.reservedQty ?? 0));
                const customConfig = item.customConfig;
                const isLayerCake = customConfig?.type === "custom_cake";

                return (
                  <div
                    key={item.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 p-4 md:p-6">
                      <div className="relative w-full sm:w-28 h-48 min-[420px]:h-56 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
                        {item.imageUrl ? (
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-rose-100 via-amber-50 to-pink-100">
                            <div className="text-center">
                              <div className="mx-auto mb-2 h-14 w-14 rounded-full border-8 border-rose-200 bg-amber-100 shadow-inner" />
                              <div className="text-xs font-semibold text-rose-700">
                                CandyCraft
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                            <span className="text-xs font-medium text-emerald-700">
                              {item.isCustom
                                ? "Индивидуальная сборка"
                                : `Доступно: ${availableStock} шт`}
                            </span>
                          </div>
                        </div>
                        {customConfig && (
                          <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-xs text-slate-600">
                            {isLayerCake ? (
                              <>
                                {customShapeLabels[customConfig.base]},{" "}
                                {customSizeLabels[customConfig.size]},{" "}
                                {
                                  customOuterLayerLabels[
                                    customConfig.outerLayer
                                  ]
                                }
                                ,{" "}
                                {formatInnerLayerSummary(
                                  customConfig.innerLayer,
                                )}
                                , {customColorLabels[customConfig.color]},{" "}
                                {customPackagingLabels[customConfig.packaging]},{" "}
                                {formatDecorSummary(customConfig.decor)}
                                {customConfig.messageText
                                  ? `, надпись: "${customConfig.messageText}"`
                                  : ""}
                              </>
                            ) : (
                              <>
                                {customShapeLabels[customConfig.shape]},{" "}
                                {customSizeLabels[customConfig.size]}, конфет:{" "}
                                {customConfig.candies.reduce(
                                  (sum, candy) => sum + candy.quantity,
                                  0,
                                )}
                                {customConfig.inscription
                                  ? `, надпись: "${customConfig.inscription}"`
                                  : ""}
                              </>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                          <button
                            onClick={() => decrementQuantity(item)}
                            disabled={quantity <= 1 || isBusy}
                            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            title="Уменьшить"
                          >
                            <Minus className="w-4 h-4 text-slate-600" />
                          </button>
                          <div className="min-w-12 text-center">
                            <span className="text-lg font-semibold text-slate-800">
                              {quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => incrementQuantity(item)}
                            disabled={quantity >= availableStock || isBusy}
                            className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            title="Увеличить"
                          >
                            <Plus className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>

                        {/* Цена */}
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-xl md:text-2xl font-bold text-indigo-600">
                            {itemTotal.toLocaleString("ru-RU")} ₽
                          </span>
                          {quantity > 1 && (
                            <span className="text-sm text-slate-400">
                              {item.price.toLocaleString("ru-RU")} ₽ ×{" "}
                              {quantity}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex w-full sm:w-auto sm:flex-col items-end gap-4">
                        <button
                          onClick={() => removeCartEntry(item)}
                          className="ml-auto p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 border border-rose-100 transition-all duration-200"
                          title="Удалить товар"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:w-100 w-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                <div className="p-4 sm:p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      Итоговая сумма
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-600 font-medium">
                        Товары ({totalItems})
                      </span>
                      <span className="font-semibold text-slate-800">
                        {totalPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Скидка
                      </span>
                      <span className="text-slate-500">0 ₽</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2">
                        <span className="text-lg font-semibold text-slate-800">
                          Итого к оплате
                        </span>
                        <span className="text-2xl font-bold text-indigo-600">
                          {totalPrice.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-xl font-medium text-base hover:shadow-lg hover:shadow-indigo-200/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <span>Оформить заказ</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-5 space-y-3">
                    <div className="p-3.5 bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-700 text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">
                          Бесплатная доставка от 6000 ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
