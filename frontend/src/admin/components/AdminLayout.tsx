// admin/components/AdminLayout.tsx
import { type ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Боковая панель */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Основной контент */}
      <div
        className={`
                transition-all duration-300
                lg:ml-64
            `}
      >
        {/* Хедер */}
        <AdminHeader
          title={title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Контент страницы */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
