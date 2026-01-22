import { CheckCircle, CreditCard, Package, Truck } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useCheckout } from "../../contexts/CheckoutContext";

export const Step4 = () => {

    const { cartItems } = useCart();
    const {selectedGift, selectedDelivery, subtotal, totalAmount, deliveryPrice, giftPrice} = useCheckout()

    return (
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
};
