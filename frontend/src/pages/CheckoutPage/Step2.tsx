import { Clock, Truck, Zap } from "lucide-react";
import { type DeliveryOption } from "./CheckoutPage";
import { useCheckout } from "../../contexts/CheckoutContext";
// Опции доставки
const deliveryOptions: DeliveryOption[] = [
  {
    id: 1,
    name: "🚀 Экспресс доставка",
    description: "Доставим в течение 2 часов",
    price: 500,
    time: "2 часа",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "📦 Стандартная доставка",
    description: "Доставим сегодня до 22:00",
    price: 300,
    time: "4-6 часов",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "📅 Доставка ко времени",
    description: "Выберите удобное время",
    price: 400,
    time: "Ко времени",
    icon: <Clock className="w-5 h-5" />,
  },
];

export const Step2 = () => {
  const { selectedDelivery, setSelectedDelivery } = useCheckout();

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-purple-200/50">
          <Truck className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Способ доставки
        </h2>
        <p className="text-gray-600 text-lg">
          Как быстро хотите получить сладости?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {deliveryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedDelivery(option)}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
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
                <h3 className="font-bold text-lg text-gray-900">
                  {option.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {option.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
