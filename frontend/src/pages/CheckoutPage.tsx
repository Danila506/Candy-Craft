// pages/CheckoutPage.tsx
import {  useState } from "react";
import { useCart } from "../contexts/CartContext";
import {
    Package,
    Gift,
    Sparkles,
    Heart,
    Star,
    Clock,
    Truck,
    CreditCard,
    MapPin,
    MessageSquare,
    ChevronRight,
    CheckCircle,
    Zap,
    RefreshCw,
    ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

// Типы для оформления заказа
interface DeliveryOption {
    id: number;
    name: string;
    description: string;
    price: number;
    time: string;
    icon: React.ReactNode;
}

interface GiftOption {
    id: number;
    name: string;
    description: string;
    price: number;
    icon: React.ReactNode;
    available: boolean;
}

export function CheckoutPage() {
    const { cartItems, cartCount, refreshCart } = useCart();

    const [step, setStep] = useState(1);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [selectedDelivery, setSelectedDelivery] =
        useState<DeliveryOption | null>(null);
    const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);
    const [customerNote, setCustomerNote] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    // Данные пользователя
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        apartment: "",
        entrance: "",
        floor: "",
        intercom: "",
    });

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

    // Подарочные опции
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

    // Расчет итоговой суммы
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.inStock,
        0
    );
    const deliveryPrice = selectedDelivery?.price || 0;
    const giftPrice = selectedGift?.price || 0;
    const totalAmount = subtotal + deliveryPrice + giftPrice;

    // Анимация конфетти
    const launchConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff398b", "#ff6ba9", "#ff9ec0", "#ffcfe0", "#fff"],
        });
    };

    const handleInputChange = (field: keyof typeof formData) => 
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        };

    // Обработка оформления заказа
    const handlePlaceOrder = async () => {
        if (!selectedDelivery) {
            alert("Выберите способ доставки");
            return;
        }

        setIsAnimating(true);

        // Имитация обработки заказа
        setTimeout(() => {
            launchConfetti();
            setOrderConfirmed(true);
            setIsAnimating(false);

            // Очистка корзины после оформления
            setTimeout(() => {
                // Здесь должен быть вызов API для очистки корзины
                refreshCart();
            }, 2000);
        }, 1500);
    };

    // Проверка готовности к оформлению
    const isFormValid = formData.name && formData.phone && formData.address;

    // Шаг 1: Контактная информация
    const Step1 = () => (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-2xl mb-4 shadow-lg shadow-pink-200/50">
                    <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Ваши данные
                </h2>
                <p className="text-gray-600 text-lg">
                    Расскажите, куда доставить сладости
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                        <span className="flex items-center gap-2">
                            <div className="p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors">
                                <Sparkles className="w-4 h-4 text-[#ff398b]" />
                            </div>
                            <span>Имя</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        id="name"
                        autoComplete="given-name"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400"
                        placeholder="Как к вам обращаться?"
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <span className="flex items-center gap-2">
                            <div className="p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors">
                                <MessageSquare className="w-4 h-4 text-[#ff398b]" />
                            </div>
                            <span>Телефон</span>
                        </span>
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400"
                        placeholder="+7 (___) ___-__-__"
                    />
                </div>

                <div className="md:col-span-2 group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <span className="flex items-center gap-2">
                            <div className="p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors">
                                <MapPin className="w-4 h-4 text-[#ff398b]" />
                            </div>
                            <span>Адрес доставки</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400"
                        placeholder="Город, улица, дом"
                    />
                </div>
            </div>
        </div>
    );

    // Шаг 2: Доставка
    const Step2 = () => (
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

    // Шаг 3: Дополнительные опции
    const Step3 = () => (
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
                        onClick={() =>
                            option.available && setSelectedGift(option)
                        }
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

    // Шаг 4: Подтверждение
    const Step4 = () => (
        <div className="space-y-8">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-green-200/50">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Проверьте заказ
                </h2>
                <p className="text-gray-600 text-lg">
                    Убедитесь, что всё верно перед оформлением
                </p>
            </div>

            {/* Виртуальная коробка конфет */}
            <div className="relative bg-linear-to-br from-pink-50/80 via-purple-50/30 to-amber-50/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-pink-200/50 shadow-xl overflow-hidden">
                {/* Декоративные элементы */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#ff398b]/5 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-400/5 to-transparent rounded-tr-full"></div>

                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-linear-to-r from-[#ff398b] to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-pink-300/50">
                        🍬 Ваша коробка конфет 🍬
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mt-4">
                    <div>
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                            <div className="p-2 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl shadow-lg shadow-pink-300/50">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-900">
                                Содержимое заказа
                            </span>
                        </h3>
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 hover:shadow-md transition-all"
                                >
                                    <div className="w-14 h-14 bg-linear-to-br from-pink-200 to-rose-200 rounded-xl flex items-center justify-center text-2xl shadow-md">
                                        {index % 3 === 0
                                            ? "🍰"
                                            : index % 3 === 1
                                            ? "🍬"
                                            : "🎂"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900">
                                            {item.name}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {item.inStock} ×{" "}
                                            {item.price.toLocaleString()} ₽
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg text-[#ff398b]">
                                        {(
                                            item.price * item.inStock
                                        ).toLocaleString()}{" "}
                                        ₽
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedGift && (
                            <div className="mt-6 p-5 bg-linear-to-r from-pink-100/70 to-amber-100/70 backdrop-blur-sm rounded-xl border border-pink-200/50 shadow-md">
                                <div className="flex items-center gap-4">
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
                                        +{selectedGift.price} ₽
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-purple-300/50">
                                <Truck className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-900">Доставка</span>
                        </h3>
                        {selectedDelivery && (
                            <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100/50 shadow-md mb-6">
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
                                    {selectedDelivery.price} ₽
                                </div>
                            </div>
                        )}

                        <div className="p-6 bg-linear-to-br from-blue-50/80 via-purple-50/50 to-cyan-50/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/50 shadow-xl">
                            <h4 className="font-bold text-xl mb-5 flex items-center gap-3">
                                <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                                    <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-900">
                                    Итоговая сумма
                                </span>
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Товары:</span>
                                    <span className="font-semibold">
                                        {subtotal.toLocaleString()} ₽
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Доставка:</span>
                                    <span className="font-semibold">
                                        {deliveryPrice.toLocaleString()} ₽
                                    </span>
                                </div>
                                {selectedGift && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Доп. опции:</span>
                                        <span className="font-semibold">
                                            {giftPrice.toLocaleString()} ₽
                                        </span>
                                    </div>
                                )}
                                <div className="border-t-2 border-gray-300 pt-4 mt-4">
                                    <div className="flex justify-between text-2xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent">
                                        <span>Итого:</span>
                                        <span className="text-[#ff398b]">
                                            {totalAmount.toLocaleString()} ₽
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

    // Анимация успешного оформления
    const SuccessAnimation = () => (
        <div className="text-center py-20">
            <div className="relative inline-block mb-10">
                <div className="w-40 h-40 bg-linear-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-green-300/50">
                    <CheckCircle className="w-24 h-24 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 animate-bounce">
                    <Sparkles className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
                </div>
                <div className="absolute -bottom-2 -left-4 animate-bounce delay-300">
                    <Sparkles className="w-10 h-10 text-pink-400 drop-shadow-lg" />
                </div>
            </div>

            <h2 className="text-5xl font-extrabold bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4">
                🎉 Заказ создан!
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
                Ваша волшебная коробка конфет уже собирается нашими кондитерами!
            </p>

            <div className="space-y-8 max-w-2xl mx-auto">
                <div className="p-6 bg-linear-to-r from-green-50/80 via-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 shadow-xl">
                    <div className="font-bold text-2xl text-green-800 mb-3">
                        Номер заказа: #
                        {Math.floor(Math.random() * 10000) + 1000}
                    </div>
                    <p className="text-green-700 text-lg">
                        Ожидайте звонка от нашего курьера в течение 30 минут
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 mb-2">
                            Доставка
                        </div>
                        <div className="text-sm text-gray-600">
                            {selectedDelivery?.time}
                        </div>
                    </div>
                    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 mb-2">
                            Сборка
                        </div>
                        <div className="text-sm text-gray-600">
                            Начинается сейчас
                        </div>
                    </div>
                    <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 mb-2">
                            СМС уведомление
                        </div>
                        <div className="text-sm text-gray-600">
                            Отправили на {formData.phone}
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        Вернуться в магазин
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50/30 to-rose-50 relative overflow-hidden">
            {/* Декоративные элементы фона */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                {/* Хлебные крошки */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to="/cart"
                        className="group flex items-center gap-2 text-gray-700 hover:text-[#ff398b] transition-all duration-300 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Назад к корзине</span>
                    </Link>

                    {/* Современный прогресс-бар */}
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-pink-100/50">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                        step > s
                                            ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-200 scale-110"
                                            : step === s
                                            ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white ring-4 ring-pink-200/50 ring-offset-2 scale-110 shadow-xl shadow-pink-300/50"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                >
                                    {step > s ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        s
                                    )}
                                </div>
                                {s < 4 && (
                                    <div
                                        className={`w-8 h-1 mx-1 rounded-full transition-all duration-500 ${
                                            step > s
                                                ? "bg-linear-to-r from-[#ff398b] to-pink-400"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {orderConfirmed ? (
                    <SuccessAnimation />
                ) : (
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative">
                        {/* Декоративный градиент сверху */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#ff398b] via-pink-400 to-purple-400"></div>

                        {/* Заголовок шага */}
                        <div className="bg-linear-to-br from-pink-50/80 via-purple-50/50 to-rose-50/80 backdrop-blur-sm p-8 border-b border-pink-100/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-4xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent mb-2">
                                        Оформление заказа
                                    </h1>
                                    <p className="text-gray-600 font-medium">
                                        Шаг {step} из 4 •{" "}
                                        <span className="text-[#ff398b] font-semibold">
                                            {step === 1 && "Контактные данные"}
                                            {step === 2 && "Способ доставки"}
                                            {step === 3 &&
                                                "Дополнительные опции"}
                                            {step === 4 && "Подтверждение"}
                                        </span>
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-pink-100/50">
                                        <div className="p-1.5 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-lg">
                                            <Package className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-bold text-lg text-gray-900">
                                            {cartCount}
                                        </span>
                                        <span className="text-gray-600 text-sm">
                                            товаров
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Контент шага */}
                        <div className="p-8">
                            {step === 1 && <Step1 />}
                            {step === 2 && <Step2 />}
                            {step === 3 && <Step3 />}
                            {step === 4 && <Step4 />}
                        </div>

                        {/* Кнопки навигации */}
                        <div className="p-8 border-t border-pink-100/50 bg-linear-to-r from-pink-50/30 via-white/50 to-purple-50/30 backdrop-blur-sm">
                            <div className="flex justify-between items-center">
                                {step > 1 ? (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        Назад
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {step < 4 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        disabled={step === 1 && !isFormValid}
                                        className={`group px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                                            step === 1 && !isFormValid
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-linear-to-r from-[#ff398b] to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105 active:scale-95"
                                        }`}
                                    >
                                        Продолжить
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={
                                            isAnimating || !selectedDelivery
                                        }
                                        className={`group relative px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                                            isAnimating || !selectedDelivery
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 active:scale-95"
                                        }`}
                                    >
                                        {isAnimating ? (
                                            <>
                                                <span className="flex items-center gap-3 relative z-10">
                                                    <RefreshCw className="w-6 h-6 animate-spin" />
                                                    Оформляем...
                                                </span>
                                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-col items-center gap-1 relative z-10">
                                                    <span className="flex items-center gap-2">
                                                        <Sparkles className="w-6 h-6" />
                                                        Завершить заказ
                                                    </span>
                                                    <span className="text-sm font-normal opacity-90">
                                                        Итого:{" "}
                                                        {totalAmount.toLocaleString()}{" "}
                                                        ₽
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Добавляем CSS для анимаций */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
        </div>
    );
}
