import { CheckCircle, CreditCard, Package, Truck } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useCheckout } from "../../contexts/CheckoutContext";
import { useLanguage } from "../../contexts/LanguageContext";

export const Step4 = () => {
  const { formatMoney, t } = useLanguage();
  const { cartItems } = useCart();
  const {
    selectedGift,
    selectedDelivery,
    subtotal,
    totalAmount,
    deliveryPrice,
    giftPrice,
  } = useCheckout();

  const innerCandyLabels = {
    milka: "Milka",
    raffaello: "Raffaello",
    kinder: "Kinder",
    ferrero: "Ferrero",
    merci: "Merci",
  } as const;

  const getInnerLayerSummary = (
    innerLayer:
      | Array<{ candyId: keyof typeof innerCandyLabels; percentage: number }>
      | undefined,
  ) => {
    if (!innerLayer?.length) return t("cart.innerMissing");
    const parts = innerLayer
      .filter((part) => part.percentage > 0)
      .map(
        (part) =>
          `${innerCandyLabels[part.candyId] ?? part.candyId} ${part.percentage}%`,
      );
    return parts.join(", ") || t("cart.innerMissing");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-green-200/50">
          <CheckCircle className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {t("checkout.reviewTitle")}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          {t("checkout.reviewSubtitle")}
        </p>
      </div>

      {/* Виртуальная коробка конфет */}
      <div className="relative bg-linear-to-br from-pink-50/80 via-purple-50/30 to-amber-50/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-pink-200/50 shadow-xl overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#ff398b]/5 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-400/5 to-transparent rounded-tr-full"></div>

        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-linear-to-r from-[#ff398b] to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-pink-300/50">
            {t("checkout.yourBox")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 mt-6 sm:mt-4">
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl shadow-lg shadow-pink-300/50">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">
                {t("checkout.orderContents")}
              </span>
            </h3>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-pink-200 to-rose-200 rounded-xl flex shrink-0 items-center justify-center text-xl sm:text-2xl shadow-md">
                    {item.isCustom
                      ? "🎁"
                      : index % 3 === 0
                        ? "🍰"
                        : index % 3 === 1
                          ? "🍬"
                          : "🎂"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.quantity} × {formatMoney(Number(item.price))}
                    </div>
                    {item.customConfig && (
                      <div className="mt-1 text-xs text-[#ff398b]">
                        {item.customConfig.type === "custom_cake"
                          ? `${t("checkout.customCake")}: ${item.customConfig.base}, ${item.customConfig.size.toUpperCase()}, ${getInnerLayerSummary(item.customConfig.innerLayer)}, ${item.customConfig.packaging}`
                          : `${t("checkout.customCandyCake")}: ${item.customConfig.candies.reduce(
                              (sum, candy) => sum + candy.quantity,
                              0,
                            )} ${t("cart.candies")}`}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-base sm:text-lg text-[#ff398b]">
                    {formatMoney(Number(item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {selectedGift && (
              <div className="mt-6 p-4 sm:p-5 bg-linear-to-r from-pink-100/70 to-amber-100/70 backdrop-blur-sm rounded-xl border border-pink-200/50 shadow-md">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-4">
                  <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 text-white rounded-xl shadow-lg">
                    {selectedGift.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {selectedGift.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {selectedGift.description}
                    </div>
                  </div>
                  <div className="font-bold text-lg text-[#ff398b]">
                    +{formatMoney(selectedGift.price)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-purple-300/50">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">{t("checkout.delivery")}</span>
            </h3>
            {selectedDelivery && (
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 shadow-md mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 text-white rounded-xl shadow-lg">
                    {selectedDelivery.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {selectedDelivery.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {selectedDelivery.time}
                    </div>
                  </div>
                </div>
                <div className="text-right font-bold text-xl text-[#ff398b] pt-4 border-t border-gray-200">
                  {formatMoney(selectedDelivery.price)}
                </div>
              </div>
            )}

            <div className="p-4 sm:p-6 bg-linear-to-br from-blue-50/80 via-purple-50/50 to-cyan-50/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 shadow-xl">
              <h4 className="font-bold text-lg sm:text-xl mb-5 flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900">{t("checkout.summary")}</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>{t("checkout.products")}</span>
                  <span className="font-semibold">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t("checkout.delivery")}:</span>
                  <span className="font-semibold">
                    {formatMoney(deliveryPrice)}
                  </span>
                </div>
                {selectedGift && (
                  <div className="flex justify-between text-gray-700">
                    <span>{t("checkout.extraOptions")}</span>
                    <span className="font-semibold">
                      {formatMoney(giftPrice)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-gray-300 pt-4 mt-4">
                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between gap-1 text-xl sm:text-2xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent">
                    <span>{t("checkout.total")}</span>
                    <span className="text-[#ff398b]">
                      {formatMoney(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
