import { createContext, useContext, useState } from "react";
import type {
  DeliveryOption,
  GiftOption,
} from "../pages/CheckoutPage/CheckoutPage";
import { useCart } from "./CartContext";

export type CheckoutFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
};

type CheckoutContextType = {
  step: number;
  setStep: (s: number) => void;

  formData: CheckoutFormData;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;

  selectedDelivery: DeliveryOption | null;
  setSelectedDelivery: (d: DeliveryOption) => void;

  selectedGift: GiftOption | null;
  setSelectedGift: (g: GiftOption) => void;

  customerNote: string;
  setCustomerNote: (n: string) => void;

  subtotal: number;
  totalAmount: number;
  deliveryPrice: number;
  giftPrice: number;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    entrance: "",
    floor: "",
    intercom: "",
  });

  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);
  const [customerNote, setCustomerNote] = useState("");

  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryPrice = selectedDelivery?.price || 0;
  const giftPrice = selectedGift?.price || 0;
  const totalAmount = subtotal + deliveryPrice + giftPrice;

  return (
    <CheckoutContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData,
        selectedDelivery,
        setSelectedDelivery,
        selectedGift,
        setSelectedGift,
        customerNote,
        setCustomerNote,
        subtotal,
        totalAmount,
        deliveryPrice,
        giftPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }
  return ctx;
}
