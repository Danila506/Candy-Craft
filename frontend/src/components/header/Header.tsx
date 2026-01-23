// components/Header/Header.tsx
import { useState, useEffect } from "react";
import { TopHeader } from "./TopHeader";
import Logo from "../../assets/logo.svg";
import HeaderLink from "../ui/HeaderLink";
import { MenuIcon, XIcon } from "lucide-react";

import HeaderBackground from "../../assets/Torty-od-reki-2-1920x541.png";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
        "ВЕСЬ КАТАЛОГ",
    ];

    return (
        <header className="pt-20 md:pt-24 mb-12 md:mb-16 relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 z-0 ">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-100 "
                    style={{ backgroundImage: `url(${HeaderBackground})` }}
                />

                <div className="absolute inset-0 bg-linear-to-b from-rose-50/60  to-white/20"></div>
            </div>

            <div className="relative z-10">
                <TopHeader />

                <div className="py-12 md:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:hidden flex items-center justify-between mb-8">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 hover:text-rose-600 transition-colors border border-gray-200"
                            aria-label={
                                isMenuOpen ? "Закрыть меню" : "Открыть меню"
                            }
                        >
                            {isMenuOpen ? (
                                <XIcon size={24} />
                            ) : (
                                <MenuIcon size={24} />
                            )}
                        </button>

                        <div className="flex-1 flex justify-center">
                            <a href="/" className="text-2xl">
                                <img
                                    width={isMobile ? 90 : 110}
                                    height={isMobile ? 90 : 110}
                                    src={Logo}
                                    alt="Candy Craft Логотип"
                                    className="drop-shadow-sm"
                                />
                            </a>
                        </div>

                        <div className="w-10"></div>
                    </div>

                    {isMenuOpen && (
                        <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-xl mt-4 py-4 shadow-lg border border-gray-100">
                            <ul className="flex flex-col space-y-2">
                                {navItems.map((text, index) => (
                                    <li key={index} className="px-4">
                                        <HeaderLink
                                            text={text}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-gray-700 hover:text-rose-600 font-medium py-2 block transition-colors"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="hidden lg:block">
                        <ul className="grid grid-cols-7 items-center justify-between bg-white/70 backdrop-blur-md py-4 px-6 rounded-2xl shadow-sm border border-gray-100/50">
                            {navItems.slice(0, 3).map((text, index) => (
                                <HeaderLink
                                    key={index}
                                    text={text}
                                    className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                                />
                            ))}

                            <li className="text-center flex justify-center animate-spin [animation-duration:5s]">
                                <a className="text-2xl" href="/">
                                    <img
                                        width={170}
                                        height={170}
                                        src={Logo}
                                        alt="Candy Craft Логотип"
                                        className="drop-shadow-sm "
                                    />
                                </a>
                            </li>

                            {navItems.slice(3).map((text, index) => (
                                <HeaderLink
                                    key={index + 3}
                                    text={text}
                                    className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                                />
                            ))}
                        </ul>
                    </div>

                    <div className="text-center mt-12 md:mt-16 lg:mt-20">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f3b0c2] mb-4">
                            Candy Craft
                        </h1>
                        <p className="  font-semibold md:text-lg lg:text-xl text-[#3c3c3c] max-w-2xl mx-auto leading-relaxed">
                            Искусство сладких наслаждений. Авторские торты и
                            десерты ручной работы
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
