// components/Header/Header.tsx
import { useState, useEffect } from "react";
import { TopHeader } from "./TopHeader";
import Logo from "../../assets/logo.svg";
import HeaderLink from "../ui/HeaderLink";
import { MenuIcon, XIcon } from "lucide-react"; // Или установите через npm install lucide-react

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setIsMenuOpen(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const navItems = [
        "СЛАДКИЕ ДНИ",
        "ПОДАРОЧНЫЕ НАБОРЫ",
        "СОБРАТЬ НАБОР",
        "СОЗДАТЬ ДИЗАЙН",
        "КОМПАНИЯМ",
        "ВЕСЬ КАТАЛОГ"
    ];

    return (
        <header className="pt-14.75 mb-9 bg-white">
            <TopHeader />
            
            <div className="py-5 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Мобильный хедер */}
                <div className="lg:hidden flex items-center justify-between">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2"
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    >
                        {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                    </button>
                    
                    <div className="flex-1 flex justify-center">
                        <a href="/" className="text-2xl">
                            <img 
                                width={isMobile ? 90 : 110} 
                                height={isMobile ? 90 : 110} 
                                src={Logo} 
                                alt="Candy Craft Логотип" 
                            />
                        </a>
                    </div>
                    
                    {/* Заглушка для выравнивания */}
                    <div className="w-10"></div>
                </div>

                {/* Мобильное меню */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t mt-4 py-4 animate-fadeIn">
                        <ul className="flex flex-col space-y-3">
                            {navItems.map((text, index) => (
                                <li key={index} className="px-2">
                                    <HeaderLink 
                                        text={text} 
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Десктопный хедер */}
                <ul className="hidden lg:grid lg:grid-cols-7 items-center justify-between">
                    {navItems.slice(0, 3).map((text, index) => (
                        <HeaderLink key={index} text={text} />
                    ))}
                    
                    <li className="text-center flex justify-center">
                        <a className="text-2xl" href="/">
                            <img 
                                width={110} 
                                height={110} 
                                src={Logo} 
                                alt="Candy Craft Логотип" 
                            />
                        </a>
                    </li>
                    
                    {navItems.slice(3).map((text, index) => (
                        <HeaderLink key={index + 3} text={text} />
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;