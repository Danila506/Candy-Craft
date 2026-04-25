// admin/components/AdminRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-lg bg-white border border-gray-200 shadow-sm p-6 text-center">
          <div className="mx-auto mb-4 h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#ff398b] animate-spin" />
          <p className="text-sm font-medium text-gray-700">
            Проверяем доступ к админке...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/account/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
