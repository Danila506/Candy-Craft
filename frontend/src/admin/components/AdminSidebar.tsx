// admin/components/AdminSidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: "/admin", label: "Дашборд", icon: <LayoutDashboard size={20} /> },
  { path: "/admin/products", label: "Товары", icon: <Package size={20} /> },
  { path: "/admin/orders", label: "Заказы", icon: <ShoppingCart size={20} /> },
  { path: "/admin/categories", label: "Категории", icon: <Tag size={20} /> },
  { path: "/admin/settings", label: "Настройки", icon: <Settings size={20} /> },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Оверлей для мобильных */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Сайдбар */}
      <aside
        className={`
                fixed top-0 left-0 h-screen bg-gray-900 text-white 
                w-64 z-50 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🍰 Candy Craft
            <span className="text-xs bg-[#ff398b] px-2 py-1 rounded ml-2">
              Admin
            </span>
          </h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) => `
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        transition-colors ${!isActive ? "hover:bg-gray-800" : ""}
                                        ${
                                          isActive
                                            ? "bg-[#ff398b] text-white"
                                            : "text-gray-300 hover:text-white"
                                        }
                                    `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={() => {
              // Выход из админ-панели
              localStorage.removeItem("admin_token");
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white w-full rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Выйти</span>
          </button>
        </div>
      </aside>
    </>
  );
}
