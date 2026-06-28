import { useEffect, useState } from "react";
import { Clock, Truck, Zap } from "lucide-react";
import { type DeliveryOption } from "./CheckoutPage";
import { useCheckout } from "../../contexts/CheckoutContext";
import { getCheckoutOptions } from "../../api/checkoutOptions";
import { useLanguage } from "../../contexts/LanguageContext";

const deliveryIcons: Record<number, React.ReactNode> = {
  1: <Zap className="w-5 h-5" />,
  2: <Truck className="w-5 h-5" />,
  3: <Clock className="w-5 h-5" />,
};

export const Step2 = () => {
  const { t } = useLanguage();
  const { selectedDelivery, setSelectedDelivery } = useCheckout();
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getCheckoutOptions()
      .then((options) => {
        if (cancelled) return;
        setDeliveryOptions(
          options.delivery
            .filter((option) => option.available !== false)
            .map((option) => ({
              id: option.id,
              name: option.name,
              description: option.description,
              price: option.price,
              time: option.time ?? "",
              icon: deliveryIcons[option.id] ?? <Truck className="w-5 h-5" />,
            })),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(t("checkout.deliveryLoadError"));
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [t]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-purple-200/50">
          <Truck className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {t("checkout.deliveryMethodTitle")}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          {t("checkout.deliveryMethodSubtitle")}
        </p>
      </div>

      {loadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {isLoading &&
          [1, 2, 3].map((id) => (
            <div
              key={id}
              className="h-48 animate-pulse rounded-2xl border-2 border-gray-100 bg-gray-50"
            />
          ))}
        {deliveryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedDelivery(option)}
            className={`group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
              selectedDelivery?.id === option.id
                ? "border-[#ff398b] bg-linear-to-br from-pink-50 via-purple-50/30 to-rose-50 shadow-xl shadow-pink-200/50 scale-105"
                : "border-gray-200 hover:border-pink-300 hover:shadow-lg bg-white/80 backdrop-blur-sm"
            }`}
          >
            {/* Декоративный градиент при выборе */}
            {selectedDelivery?.id === option.id && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#ff398b]/10 to-transparent rounded-bl-full"></div>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    selectedDelivery?.id === option.id
                      ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-300/50"
                      : "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-[#ff398b]"
                  }`}
                >
                  {option.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  {option.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {option.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-700">
                  {option.time}
                </span>
                <span
                  className={`font-bold text-lg transition-colors ${
                    selectedDelivery?.id === option.id
                      ? "text-[#ff398b]"
                      : "text-gray-700"
                  }`}
                >
                  {option.price} ₽
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
