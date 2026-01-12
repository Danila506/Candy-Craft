// admin/components/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
    const { isAuthenticated } = useAdmin();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}