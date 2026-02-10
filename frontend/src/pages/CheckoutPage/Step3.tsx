import { Gift, Heart, MessageSquare, Sparkles, Star } from "lucide-react";
import type { GiftOption } from "./CheckoutPage";
import { useCheckout } from "../../contexts/CheckoutContext";

const giftOptions: GiftOption[] = [
  {
    id: 1,
    name: "🎀 Подарочная упаковка",
    description: "Премиальная коробка с лентой",
    price: 200,
    icon: <Gift className="w-5 h-5" />,
    available: true,
  },
  {
    id: 2,
    name: "💝 Поздравительная открытка",
    description: "Ручная работа с теплыми пожеланиями",
    price: 150,
    icon: <Heart className="w-5 h-5" />,
    available: true,
  },
  {
    id: 3,
    name: "✨ Волшебная пыль",
    description: "Съедобные блестки для торта",
    price: 100,
    icon: <Sparkles className="w-5 h-5" />,
    available: true,
  },
  {
    id: 4,
    name: "👑 Корона для именинника",
    description: "Золотая картонная корона",
    price: 180,
    icon: <Star className="w-5 h-5" />,
    available: true,
  },
];

export const Step3 = () => {
  const { selectedGift, setSelectedGift, customerNote, setCustomerNote } =
    useCheckout();

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-amber-200/50">
          <Gift className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Дополнительные опции
        </h2>
        <p className="text-gray-600 text-lg">
          Добавьте магии в вашу коробку сладостей
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {giftOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => option.available && setSelectedGift(option)}
            className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
              selectedGift?.id === option.id
                ? "border-[#ff398b] bg-linear-to-br from-pink-50 via-amber-50/30 to-orange-50 shadow-xl shadow-pink-200/50 scale-105"
                : option.available
                  ? "border-gray-200 hover:border-pink-300 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                  : "border-gray-200 opacity-50 cursor-not-allowed bg-gray-50"
            }`}
            disabled={!option.available}
          >
            {selectedGift?.id === option.id && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#ff398b]/10 to-transparent rounded-bl-full"></div>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    selectedGift?.id === option.id
                      ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-300/50"
                      : option.available
                        ? "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-[#ff398b]"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {option.icon}
                </div>
                <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                  {option.name}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {option.description}
              </p>
              <div className="text-right pt-3 border-t border-gray-100">
                <span
                  className={`font-bold text-lg transition-colors ${
                    selectedGift?.id === option.id
                      ? "text-[#ff398b]"
                      : "text-gray-700"
                  }`}
                >
                  +{option.price} ₽
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <div className="p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors">
              <MessageSquare className="w-4 h-4 text-[#ff398b]" />
            </div>
            <span>Ваши пожелания к заказу</span>
          </span>
        </label>
        <textarea
          value={customerNote}
          onChange={(e) => setCustomerNote(e.target.value)}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 h-32 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400 resize-none"
          placeholder="Напишите здесь ваши пожелания, аллергии, особые указания..."
        />
      </div>
    </div>
  );
};
