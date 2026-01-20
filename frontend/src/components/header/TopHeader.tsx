// components/Header/TopHeader.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { MapPin, Phone, ShoppingCart, Menu, X } from "lucide-react";

const headerItems = [
    "Гарантия свежести",
    "Доставка и оплата",
    "Оптовые поставки",
    "Контакты",
];

export function TopHeader() {
    const { cartCount } = useCart();
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Для контроля анимации
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Эффект для отслеживания прокрутки
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Если прокрутка больше 100px и скроллим вниз - скрываем
            if (currentScrollY > 90 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            }
            // Если скроллим вверх - показываем
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            // Всегда показываем, если вверху страницы
            if (currentScrollY < 50) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out py-3 md:py-4 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center">
                        {/* Мобильное меню для TopHeader */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-600 hover:text-rose-600 transition-colors"
                                aria-label="Информационное меню"
                            >
                                {isMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>

                        {/* Информационные ссылки */}
                        <div className="hidden md:block">
                            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                                {headerItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href="/"
                                            className="text-xs md:text-sm text-gray-600 hover:text-rose-600 transition-colors font-medium"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Мобильное информационное меню */}
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 right-0 md:hidden bg-white/95 backdrop-blur    -md border-b border-gray-100 shadow-md">
                                <ul className="space-y-1 p-4">
                                    {headerItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href="/"
                                                className="text-sm text-gray-600 hover:text-rose-600 transition-colors block py-2 font-medium"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Правый блок с иконками */}
                        <ul className="flex items-center gap-x-4 md:gap-x-6">
                            <li className="hidden sm:flex items-center gap-1.5 text-gray-600">
                                <MapPin size={isMobile ? 16 : 18} />
                                <span className="text-xs md:text-sm font-medium">
                                    СПб
                                </span>
                            </li>

                            <li className="flex items-center gap-1.5 text-gray-600">
                                <Phone size={isMobile ? 16 : 18} />
                                <a
                                    href="tel:88123098288"
                                    className="text-xs md:text-sm whitespace-nowrap hover:text-rose-600 transition-colors font-medium"
                                >
                                    8 812 309-82-88
                                </a>
                            </li>

                            <li>
                                <Link
                                    to="/cart"
                                    className="relative flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors"
                                >
                                    <ShoppingCart size={isMobile ? 20 : 22} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-4 bg-rose-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                                            {cartCount}
                                        </span>
                                    )}
                                    {cartCount > 0 && (
                                        <span className="hidden sm:inline text-xs md:text-sm font-medium">
                                            {cartCount > 1
                                                ? `${cartCount} товара`
                                                : `${cartCount} товар`}
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <li className="hidden sm:block">
                                <ul className="flex gap-x-3">
                                    <li>
                                        <a
                                            href="https://t.me/INikl24l"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block p-1.5 text-gray-600 hover:text-rose-600 transition-colors"
                                        >
                                            <svg
                                                width={isMobile ? 20 : 22}
                                                height={isMobile ? 20 : 22}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M17.9732 6.04684L3.33988 11.1234C2.8659 11.2878 2.89462 11.8933 3.38252 12.0216L7.10099 12.9991L8.48873 16.9192C8.63369 17.3287 9.21657 17.4529 9.55399 17.1461L11.4765 15.3986L15.2487 17.8636C15.7104 18.1652 16.3678 17.9411 16.485 17.4421L18.9834 6.80846C19.1057 6.28759 18.5301 5.85363 17.9732 6.04684ZM16.1385 8.40672L9.34146 13.7577C9.27371 13.811 9.23059 13.8848 9.22051 13.9649L8.95882 16.0358C8.95027 16.1034 8.8441 16.1123 8.82144 16.0474L7.74476 12.9589C7.69544 12.8174 7.75974 12.6642 7.90105 12.5862L15.9277 8.15443C16.1123 8.05243 16.3013 8.27865 16.1385 8.40672Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vk.com/niki_07_09"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block p-1.5 text-gray-600 hover:text-rose-600 transition-colors"
                                        >
                                            <svg
                                                width={isMobile ? 20 : 22}
                                                height={isMobile ? 20 : 22}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.3425 17.4535H12.3493C12.3493 17.4535 12.6534 17.4202 12.8087 17.2528C12.9516 17.0991 12.947 16.8105 12.947 16.8105C12.947 16.8105 12.9273 15.4596 13.5543 15.2607C14.1724 15.0647 14.9661 16.5663 15.8074 17.1437C16.4435 17.5807 16.9269 17.4849 16.9269 17.4849L19.1763 17.4535C19.1763 17.4535 20.353 17.3811 19.795 16.4559C19.7493 16.3802 19.4701 15.7715 18.1226 14.5207C16.7122 13.2116 16.9011 13.4234 18.6 11.1589C19.6347 9.77983 20.0484 8.93789 19.9192 8.57728C19.7959 8.23383 19.035 8.32461 19.035 8.32461L16.5023 8.34039C16.5023 8.34039 16.3145 8.31478 16.1753 8.39801C16.0392 8.47964 15.9516 8.66989 15.9516 8.66989C15.9516 8.66989 15.5508 9.73707 15.0162 10.6446C13.8884 12.5597 13.4375 12.6608 13.2532 12.5419C12.8244 12.2647 12.9315 11.4285 12.9315 10.8344C12.9315 8.97859 13.2129 8.20479 12.3834 8.00448C12.108 7.93794 11.9054 7.89404 11.2014 7.88695C10.2977 7.87757 9.53283 7.88969 9.09974 8.10189C8.81163 8.24298 8.58937 8.55739 8.72474 8.57546C8.89212 8.59786 9.27124 8.67767 9.47224 8.95138C9.73177 9.30443 9.72262 10.0974 9.72262 10.0974C9.72262 10.0974 9.87171 12.2821 9.37437 12.5535C9.03297 12.7396 8.56467 12.3596 7.55924 10.6222C7.04406 9.73226 6.6551 8.74855 6.6551 8.74855C6.6551 8.74855 6.5801 8.56471 6.44633 8.46638C6.28398 8.34725 6.05715 8.30929 6.05715 8.30929L3.65046 8.32507C3.65046 8.32507 3.28917 8.33513 3.15655 8.49222C3.03856 8.63194 3.14717 8.92097 3.14717 8.92097C3.14717 8.92097 5.03136 13.3291 7.16479 15.5506C9.12101 17.5873 11.3425 17.4535 11.3425 17.4535Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
