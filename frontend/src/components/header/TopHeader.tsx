// components/Header/TopHeader.tsx
import { useState, useEffect } from "react";
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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#f7ebe5] py-3 md:py-4">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center">
                    {/* Мобильное меню для TopHeader */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-1"
                            aria-label="Информационное меню"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Информационные ссылки */}
                    <div className="hidden md:block">
                        <ul className="flex flex-wrap gap-x-3.5 gap-y-1">
                            {headerItems.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href="/" 
                                        className="text-xs md:text-sm hover:text-[#ff398b] transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Мобильное информационное меню */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-[#f7ebe5] py-3 px-4 md:hidden shadow-md">
                            <ul className="space-y-2">
                                {headerItems.map((item, index) => (
                                    <li key={index}>
                                        <a 
                                            href="/" 
                                            className="text-sm hover:text-[#ff398b] transition-colors block py-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Правый блок с иконками */}
                    <ul className="flex items-center gap-x-4 md:gap-x-7">
                        <li className="hidden sm:block">
                            <MapPin size={isMobile ? 16 : 18} className="inline mr-1" />
                            <span className="text-xs md:text-sm">СПб</span>
                        </li>
                        
                        <li className="flex items-center">
                            <Phone size={isMobile ? 18 : 20} className="mr-2" />
                            <a 
                                href="tel:88123098288" 
                                className="text-xs md:text-sm whitespace-nowrap hover:text-[#ff398b] transition-colors"
                            >
                                8 812 309-82-88
                            </a>
                        </li>
                        
                        <li className="relative">
                            <Link to="/cart" className="relative flex items-center">
                                <ShoppingCart size={isMobile ? 22 : 24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white rounded-full 
                                                     w-5 h-5 flex items-center justify-center text-xs font-semibold 
                                                     animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        
                        <li className="hidden sm:block">
                            <ul className="flex gap-x-2.5">
                                <li>
                                    <a href="https://t.me/INikl24l" target="_blank" rel="noreferrer">
                                        <svg width={isMobile ? 22 : 24} height={isMobile ? 22 : 24} viewBox="0 0 24 24">
                                            {/* SVG телеграм */}
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://vk.com/niki_07_09" target="_blank" rel="noreferrer">
                                        <svg width={isMobile ? 22 : 24} height={isMobile ? 22 : 24} viewBox="0 0 24 24">
                                            {/* SVG вконтакте */}
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}