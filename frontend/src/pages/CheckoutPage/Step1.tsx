import { MapPin, Sparkles } from "lucide-react";
import { useCheckout } from "../../contexts/CheckoutContext";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { API_URL } from "../../api/config";

export const Step1 = () => {
  const { formData, setFormData } = useCheckout();

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-2xl mb-4 shadow-lg shadow-pink-200/50">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Адрес доставки
        </h2>
        <p className="text-gray-600 text-lg">
          Расскажите, куда доставить сладости
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="flex items-center gap-2">
              <div className="p-1.5 bg-pink-100 rounded-lg group-focus-within:bg-pink-200 transition-colors">
                <MapPin className="w-4 h-4 text-[#ff398b]" />
              </div>
              <span>Адрес доставки</span>
            </span>
          </label>
          <AddressAutocomplete
            apiUrl={API_URL}
            value={formData.address}
            onChange={(val) => setFormData((p) => ({ ...p, address: val }))}
          />
        </div>
      </div>
    </div>
  );
};
