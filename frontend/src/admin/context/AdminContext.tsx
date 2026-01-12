// admin/context/AdminContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'moderator';
}

interface AdminContextType {
    user: AdminUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(() => {
        const saved = localStorage.getItem("admin_user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email: string, password: string): Promise<boolean> => {
        // Здесь должна быть реальная аутентификация
        if (email === "admin@candycraft.ru" && password === "admin123") {
            const adminUser = {
                id: 1,
                name: "Администратор",
                email,
                role: 'admin' as const
            };
            setUser(adminUser);
            localStorage.setItem("admin_user", JSON.stringify(adminUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("admin_user");
    };

    return (
        <AdminContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within AdminProvider");
    }
    return context;
};