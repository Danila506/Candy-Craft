import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthShell } from "./AuthShell";
import { ApiError } from "../../api/http";
import { API_URL } from "../../api/config";
import { useAuth } from "../../contexts/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof LoginForm, string>>;

function RequiredStar() {
  return <span className="ml-0.5 text-red-600 align-super">*</span>;
}

function validate(form: LoginForm): FieldErrors {
  const errors: FieldErrors = {};
  const email = form.email.trim().toLowerCase();

  if (!email) errors.email = "Введите email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Некорректный email";

  if (!form.password) errors.password = "Введите пароль";
  else if (form.password.length < 6) errors.password = "Минимум 6 символов";

  return errors;
}

export function LoginPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const { login } = useAuth();
  const from = (location.state as { from?: string } | null)?.from;

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleUrl = `${API_URL}/auth/google`;
  const yandexUrl = `${API_URL}/auth/yandex`;
  const vkUrl = `${API_URL}/auth/vk`;

  const canSubmit = useMemo(() => {
    if (loading) return false;
    return form.email.trim() && form.password;
  }, [form, loading]);

  const onChange =
    (key: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setServerError("");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setServerError("");

    try {
      // ✅ токены уйдут в HttpOnly cookies автоматически
      const user = await login(form.email.trim().toLowerCase(), form.password);

      // можно вести в аккаунт или на главную
      if (user.role === "ADMIN") {
        const adminTarget = from?.startsWith("/admin") ? from : "/admin";
        navigate(adminTarget, { replace: true });
      } else {
        navigate("/account", { replace: true });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        // 401 уже пытался refresh, но тут логин — просто покажем ошибку
        setServerError(err.message);
      } else {
        setServerError("Не удалось войти");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="С возвращением 🍫"
      subtitle="Войдите, чтобы быстрее оформлять заказы и отслеживать доставку."
      bottomText="Нет аккаунта?"
      bottomLinkText="Зарегистрироваться"
      bottomLinkTo="/account/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => {
              window.location.href = googleUrl;
            }}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50"
          >
            Войти через Google
          </button>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = yandexUrl;
              }}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50"
            >
              Войти через Яндекс
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = vkUrl;
              }}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 hover:bg-gray-50"
            >
              Войти через VK
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email <RequiredStar />
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="куда отправлять чек 🍫"
            className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:ring-gray-200"
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium" htmlFor="password">
              Пароль <RequiredStar />
            </label>
            <Link
              to="/account/forgot-password"
              className="text-xs text-gray-600 underline"
            >
              Забыли пароль?
            </Link>
          </div>

          <div className="mt-1 flex rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-200">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange("password")}
              placeholder="секретный ингредиент"
              className="w-full rounded-lg px-3 py-2 outline-none"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="px-3 text-sm text-gray-600"
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-rose-500 px-4 py-2.5 text-white hover:bg-rose-600 disabled:opacity-50"
        >
          {loading ? "Вхожу..." : "Войти"}
        </button>
      </form>
    </AuthShell>
  );
}
