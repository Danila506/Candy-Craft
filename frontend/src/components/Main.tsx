import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { ProductList } from "./ProductList";
import ContactForm from "./ContactForm";

export function Main() {
  const { showAuthWarn, setShowAuthWarn } = useCart();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white relative">
      {/* MODAL */}
      {showAuthWarn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-scaleIn">
            {/* Close button */}
            <button
              onClick={() => setShowAuthWarn(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <XCircle className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <XCircle className="w-7 h-7 text-[#ff398b]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Вы не авторизованы
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Авторизуйтесь, чтобы добавлять товары в корзину
              </p>

              <div className="mt-6 flex gap-3 w-full">
                <button
                  onClick={() => setShowAuthWarn(false)}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  Закрыть
                </button>

                <button
                  onClick={() => {
                    setShowAuthWarn(false);
                    navigate("/account/login");
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#ff398b] text-white font-semibold hover:bg-[#ff2a81] transition active:scale-95"
                >
                  Войти
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
        <ProductList />
      </div>
      <ContactForm />
    </main>
  );
}
