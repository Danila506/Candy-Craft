import { useEffect, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { useCheckout } from "../../contexts/CheckoutContext";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { API_URL } from "../../api/config";
import { useAuth } from "../../contexts/AuthContext";
import { http } from "../../api/http";

type UserAddress = {
  id: number;
  label?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  entrance?: string | null;
  floor?: string | null;
  intercom?: string | null;
  recipientName?: string | null;
  recipientPhone?: string | null;
  fullAddress: string;
  isDefault: boolean;
};

export const Step1 = () => {
  const { formData, setFormData } = useCheckout();
  const { user } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  useEffect(() => {
    let isActive = true;
    const loadAddresses = async () => {
      if (!user?.id) {
        setSavedAddresses([]);
        return;
      }
      try {
        const data = await http.get<UserAddress[]>("/auth/me/addresses");
        if (!isActive) return;
        setSavedAddresses(data ?? []);
      } catch {
        if (!isActive) return;
        setSavedAddresses([]);
      }
    };
    loadAddresses();
    return () => {
      isActive = false;
    };
  }, [user?.id]);

  const handleSelectSavedAddress = (id: string) => {
    setSelectedAddressId(id);
    const found = savedAddresses.find((a) => String(a.id) === id);
    if (!found) return;
    setFormData((prev) => ({
      ...prev,
      name: found.recipientName || prev.name,
      phone: found.recipientPhone || prev.phone,
      address: found.fullAddress || prev.address,
      apartment: found.apartment || "",
      entrance: found.entrance || "",
      floor: found.floor || "",
      intercom: found.intercom || "",
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-2xl mb-4 shadow-lg shadow-pink-200/50">
          <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Адрес доставки
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Расскажите, куда доставить сладости
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {savedAddresses.length > 0 && (
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Сохранённые адреса
            </label>
            <select
              value={selectedAddressId}
              onChange={(e) => handleSelectSavedAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Выберите адрес</option>
              {savedAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {(address.label || "Адрес") + ": " + address.fullAddress}
                </option>
              ))}
            </select>
          </div>
        )}

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
