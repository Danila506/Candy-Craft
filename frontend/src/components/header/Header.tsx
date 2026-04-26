// components/Header/Header.tsx
import Logo from "../../assets/candyLogo.png";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileLink = user ? "/account" : "/account/login";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? "text-[#ff398b]" : "text-gray-700 hover:text-[#ff398b]"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/85 backdrop-blur">
      {/* top bar */}
      <div className="bg-linear-to-r from-rose-50 via-pink-50 to-rose-50 text-center text-xs text-gray-700 py-2 px-4 border-b border-rose-100">
        Доставка по Биробиджану • Заказы на сегодня до 18:00
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <button
            className="lg:hidden p-2 rounded-xl border border-rose-100 text-gray-700 hover:bg-rose-50"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link
            to="/"
            className="inline-flex items-center"
            aria-label="CandyCraft — на главную"
          >
            <img
              src={Logo}
              alt="CandyCraft"
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[150px] sm:max-w-[190px] object-contain"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <NavLink to="/" className={navClass}>
            Каталог
          </NavLink>
          <NavLink to="/delivery" className={navClass}>
            Доставка и оплата
          </NavLink>
          <NavLink to="/contacts" className={navClass}>
            Контакты
          </NavLink>
        </nav>

        <ul className="flex shrink-0 items-center gap-1 sm:gap-2">
          <li>
            <button
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]"
              aria-label="Поиск"
              type="button"
            >
              <Search size={20} />
            </button>
          </li>
          <li>
            <Link
              to={profileLink}
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 inline-flex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]"
              aria-label="Аккаунт"
            >
              <User size={20} />
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="relative p-2 rounded-xl text-gray-700 hover:bg-rose-50 inline-flex focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#ff398b]"
              aria-label="Корзина"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#ff398b] text-white text-[10px] font-semibold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-rose-100 bg-white px-4 py-3 shadow-sm">
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-700 hover:text-[#ff398b]"
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-[#ff398b]"
                to="/delivery"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Доставка и оплата
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-[#ff398b]"
                to="/contacts"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
