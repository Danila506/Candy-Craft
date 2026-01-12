// admin/components/AdminHeader.tsx
import {  Bell, Search, User } from "lucide-react";
import { useState, useEffect } from "react";

interface AdminHeaderProps {
    title: string;
    onMenuClick: () => void;
    sidebarOpen: boolean;
}

export function AdminHeader({
    title,
    sidebarOpen,
}: AdminHeaderProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
                <div className="flex items-center gap-4">


                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            {title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Поиск - адаптивная логика */}
                    <div
                        className={`
                        transition-all duration-300
                        ${
                            sidebarOpen && isMobile
                                ? "opacity-0 w-0 overflow-hidden"
                                : "opacity-100 w-40 md:w-64"
                        }
                    `}
                    >
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b] focus:border-transparent"
                                disabled={sidebarOpen && isMobile}
                            />
                        </div>
                    </div>

                    {/* Уведомления */}
                    <div className="relative">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Уведомления"
                        >
                            <Bell size={22} className="text-gray-700" />
                        </button>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>

                    {/* Профиль */}
                    <button
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Профиль администратора"
                    >
                        <div className="w-8 h-8 bg-linear-to-r from-[#ff398b] to-[#ff6163] rounded-full flex items-center justify-center">
                            <User size={18} className="text-white" />
                        </div>
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            Администратор
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
