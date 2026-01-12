// admin/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Lock, User } from "lucide-react";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate("/admin");
            } else {
                setError("Неверный email или пароль");
            }
        } catch (err) {
            setError("Ошибка входа. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="text-4xl">🍰</div>
                        <h1 className="text-3xl font-bold">Candy Craft</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Админ-панель</h2>
                    <p className="text-gray-600 mt-2">Войдите для управления магазином</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b] focus:border-transparent"
                                    placeholder="admin@candycraft.ru"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Пароль</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff398b] focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#ff398b] text-white py-3 rounded-lg font-bold hover:bg-[#e0327a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Вход..." : "Войти"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Тестовые данные:</p>
                        <p className="font-mono mt-1">admin@candycraft.ru / admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}