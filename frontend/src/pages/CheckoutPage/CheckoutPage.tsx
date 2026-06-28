// pages/CheckoutPage.tsx
import { useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import {
  Package,
  Sparkles,
  Clock,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { http, ApiError } from "../../api/http";

import { Step1 } from "./Step1";
import { useCheckout } from "../../contexts/CheckoutContext";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { useAuth } from "../../contexts/AuthContext";
import type { OrderCreateResponseV2 } from "../../types/OrderType";
import { useLanguage } from "../../contexts/LanguageContext";

// Типы для оформления заказа
export interface DeliveryOption {
  id: number;
  name: string;
  description: string;
  price: number;
  time: string;
  icon: React.ReactNode;
}

export interface GiftOption {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  available: boolean;
}

export function CheckoutPage() {
  const { t } = useLanguage();
  const { cartCount, refreshCart, clearCart, cartItems } = useCart();

  const [step, setStep] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { selectedDelivery, selectedGift, totalAmount, customerNote } =
    useCheckout();
  const [isAnimating, setIsAnimating] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [createdPublicOrderNumber, setCreatedPublicOrderNumber] = useState<
    string | null
  >(null);
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const orderIdempotencyKeyRef = useRef<string | null>(null);
  const { user } = useAuth();
  const userId = user?.id;

  const { formData } = useCheckout();

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff398b", "#ff6ba9", "#ff9ec0", "#ffcfe0", "#fff"],
    });
  };

  const handlePlaceOrder = async () => {
    setSubmitError("");
    if (!selectedDelivery) {
      setSubmitError(t("checkout.selectDelivery"));
      return;
    }
    if (!userId) {
      setSubmitError(t("checkout.loginRequired"));
      return;
    }
    if (!cartItems.length) {
      setSubmitError(t("checkout.emptyCart"));
      return;
    }
    if (!personalDataConsent) {
      setSubmitError(t("contact.consentRequired"));
      return;
    }

    setIsAnimating(true);
    try {
      if (!orderIdempotencyKeyRef.current) {
        orderIdempotencyKeyRef.current =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `order-${userId}-${Date.now()}`;
      }
      const createdOrder = await http.post<OrderCreateResponseV2>(
        `/orders/${userId}`,
        {
          fullName: formData.name,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          entrance: formData.entrance,
          floor: formData.floor,
          intercom: formData.intercom,
          comment: customerNote.trim() || undefined,
          currency: "RUB",
          deliveryOptionId: selectedDelivery.id,
          giftOptionId: selectedGift?.id,
        },
        {
          headers: {
            "Idempotency-Key": orderIdempotencyKeyRef.current,
          },
        },
      );
      setCreatedOrderId(createdOrder.id);
      setCreatedPublicOrderNumber(createdOrder.publicOrderNumber ?? null);

      const payment = await http.post<{
        confirmationUrl?: string | null;
        status: string;
      }>(`/payments/orders/${createdOrder.id}/yookassa`, undefined, {
        headers: {
          "Idempotency-Key": `order-${createdOrder.id}-yookassa`,
        },
      });

      if (payment.confirmationUrl) {
        window.location.href = payment.confirmationUrl;
        return;
      }

      if (payment.status === "SUCCEEDED") {
        launchConfetti();
        setOrderConfirmed(true);
        clearCart();
        refreshCart();
      } else {
        setSubmitError(t("checkout.paymentLinkMissing"));
      }
    } catch (e) {
      setSubmitError(
        e instanceof ApiError ? e.message : t("checkout.createError"),
      );
    } finally {
      setIsAnimating(false);
    }
  };

  // Проверка готовности к оформлению
  const isFormValid = formData.address;

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
        {t("checkout.successTitle")}
      </h2>
      <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
        {t("checkout.successText")}
      </p>

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="p-6 bg-linear-to-r from-green-50/80 via-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-2xl border-2 border-green-200/50 shadow-xl">
          <div className="font-bold text-2xl text-green-800 mb-3">
            {t("checkout.orderNumber")}{" "}
            {createdPublicOrderNumber ?? `#${createdOrderId ?? "—"}`}
          </div>
          <p className="text-green-700 text-lg">{t("checkout.courierCall")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="font-bold text-gray-900 mb-2">
              {t("checkout.delivery")}
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
              {t("checkout.assembly")}
            </div>
            <div className="text-sm text-gray-600">
              {t("checkout.assemblyNow")}
            </div>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100/50 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="p-3 bg-linear-to-br from-[#ff398b] to-pink-500 rounded-xl w-fit mx-auto mb-4 shadow-md">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div className="font-bold text-gray-900 mb-2">
              {t("checkout.sms")}
            </div>
            <div className="text-sm text-gray-600">
              {t("checkout.sentTo")} {formData.phone}
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-400/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t("checkout.backShop")}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50/30 to-rose-50 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-5 sm:py-8 max-w-6xl relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link
            to="/cart"
            className="group flex items-center gap-2 text-gray-700 hover:text-[#ff398b] transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{t("checkout.backCart")}</span>
          </Link>

          <div className="flex w-full sm:w-auto items-center justify-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-pink-100/50 overflow-x-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex shrink-0 items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    step > s
                      ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white shadow-lg shadow-pink-200 scale-110"
                      : step === s
                        ? "bg-linear-to-br from-[#ff398b] to-pink-500 text-white ring-4 ring-pink-200/50 ring-offset-2 scale-110 shadow-xl shadow-pink-300/50"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-5 sm:w-8 h-1 mx-1 rounded-full transition-all duration-500 ${
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
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#ff398b] via-pink-400 to-purple-400"></div>
            <div className="bg-linear-to-br from-pink-50/80 via-purple-50/50 to-rose-50/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 border-b border-pink-100/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#ff398b] to-pink-600 bg-clip-text text-transparent mb-2">
                    {t("checkout.title")}
                  </h1>
                  <p className="text-gray-600 font-medium">
                    {t("checkout.step")} {step} {t("checkout.of")} 4 •{" "}
                    <span className="text-[#ff398b] font-semibold">
                      {step === 1 && t("checkout.step1")}
                      {step === 2 && t("checkout.step2")}
                      {step === 3 && t("checkout.step3")}
                      {step === 4 && t("checkout.step4")}
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
                      {t("checkout.productsCount")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
            </div>

            <div className="p-4 sm:p-6 md:p-8 border-t border-pink-100/50 bg-linear-to-r from-pink-50/30 via-white/50 to-purple-50/30 backdrop-blur-sm">
              <div className="flex flex-col-reverse min-[420px]:flex-row justify-between min-[420px]:items-center gap-3">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="group w-full min-[420px]:w-auto justify-center px-5 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {t("checkout.back")}
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !isFormValid}
                    className={`group w-full min-[420px]:w-auto justify-center px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center gap-2 ${
                      step === 1 && !isFormValid
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-linear-to-r from-[#ff398b] to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {t("checkout.continue")}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="w-full min-[420px]:w-auto">
                    <label className="mb-3 flex max-w-md items-start gap-3 rounded-xl border border-pink-100 bg-white/80 px-3 py-3 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={personalDataConsent}
                        onChange={(e) => {
                          setPersonalDataConsent(e.target.checked);
                          setSubmitError("");
                        }}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#ff398b]"
                      />
                      <span>
                        {t("checkout.consentStart")}{" "}
                        <Link
                          to="/privacy"
                          className="font-semibold text-[#ff398b] underline"
                        >
                          {t("contact.privacyPolicy")}
                        </Link>
                        .
                      </span>
                    </label>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={
                        isAnimating || !selectedDelivery || !personalDataConsent
                      }
                      className={`group relative w-full px-6 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 overflow-hidden ${
                        isAnimating || !selectedDelivery || !personalDataConsent
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-linear-to-r from-[#ff398b] via-pink-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isAnimating ? (
                        <>
                          <span className="flex items-center gap-3 relative z-10">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            {t("checkout.processing")}
                          </span>
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col items-center gap-1 relative z-10">
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-6 h-6" />
                              {t("checkout.finish")}
                            </span>
                            <span className="text-sm font-normal opacity-90">
                              {t("checkout.total")}{" "}
                              {totalAmount.toLocaleString()} ₽
                            </span>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              {submitError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
