import { MapPin, MessageSquare, Sparkles } from "lucide-react";
import { useCheckout } from "../../contexts/CheckoutContext";

export const Step1 = () => {
    const { formData, setFormData } = useCheckout();

    return (
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
                        onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        name="name"
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
                            setFormData((p) => ({
                                ...p,
                                phone: e.target.value,
                            }))
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
                            setFormData((p) => ({
                                ...p,
                                address: e.target.value,
                            }))
                        }
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#ff398b] focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-pink-200 text-gray-900 placeholder-gray-400"
                        placeholder="Город, улица, дом"
                    />
                </div>
            </div>
        </div>
    );
};
