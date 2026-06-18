import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthShell } from "./AuthShell";
import { http, ApiError } from "../../api/http";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof RegisterForm, string>>;

function RequiredStar() {
  return <span className="ml-0.5 text-red-600 align-super">*</span>;
}

function validate(form: RegisterForm): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.firstName.trim()) errors.firstName = "Введите имя";
  if (!form.lastName.trim()) errors.lastName = "Введите фамилию";

  const email = form.email.trim().toLowerCase();
  if (!email) errors.email = "Введите email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Некорректный email";

  if (!form.password) errors.password = "Введите пароль";
  else if (form.password.length < 6) errors.password = "Минимум 6 символов";

  if (!form.confirmPassword) errors.confirmPassword = "Повторите пароль";
  else if (form.confirmPassword !== form.password)
    errors.confirmPassword = "Пароли не совпадают";

  return errors;
}

export function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [notice, setNotice] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = useMemo(() => {
    if (loading) return false;
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.email.trim() &&
      form.password &&
      form.confirmPassword
    );
  }, [form, loading]);

  const onChange =
    (key: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setServerError("");
      setNotice("");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setServerError("");

    try {
      await http.post("/auth/register", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone?.trim() || undefined,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setVerificationEmail(form.email.trim().toLowerCase());
      setNotice("Мы отправили код и ссылку подтверждения на вашу почту.");
    } catch (err) {
      if (err instanceof ApiError) setServerError(err.message);
      else setServerError("Не удалось зарегистрироваться");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.trim();
    if (!code) {
      setServerError("Введите код из письма");
      return;
    }

    setLoading(true);
    setServerError("");
    setNotice("");

    try {
      await http.post("/auth/verify-email", {
        email: verificationEmail,
        code,
      });
      navigate("/account/login", {
        replace: true,
        state: { message: "Email подтверждён. Теперь можно войти." },
      });
    } catch (err) {
      if (err instanceof ApiError) setServerError(err.message);
      else setServerError("Не удалось подтвердить email");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!verificationEmail) return;

    setLoading(true);
    setServerError("");
    setNotice("");

    try {
      await http.post("/auth/resend-verification", {
        email: verificationEmail,
      });
      setNotice("Мы отправили новый код подтверждения.");
    } catch (err) {
      if (err instanceof ApiError) setServerError(err.message);
      else setServerError("Не удалось отправить код повторно");
    } finally {
      setLoading(false);
    }
  };

  if (verificationEmail) {
    return (
      <AuthShell
        title="Подтвердите email"
        subtitle={`Код отправлен на ${verificationEmail}`}
        bottomText="Уже подтвердили?"
        bottomLinkText="Войти"
        bottomLinkTo="/account/login"
      >
        <form onSubmit={handleVerify} className="space-y-5">
          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          {notice && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {notice}
            </div>
          )}

          <div>
            <label className="text-sm font-medium" htmlFor="verificationCode">
              Код из письма <RequiredStar />
            </label>
            <input
              id="verificationCode"
              type="text"
              inputMode="numeric"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                );
                setServerError("");
              }}
              placeholder="000000"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-center text-xl font-semibold tracking-[0.35em] outline-none focus:ring-2 focus:ring-gray-200"
              autoComplete="one-time-code"
            />
          </div>

          <button
            type="submit"
            disabled={loading || verificationCode.trim().length !== 6}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {loading ? "Проверяю..." : "Подтвердить email"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Отправить код ещё раз
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Создадим аккаунт 🍰"
      subtitle="Пара секунд — и ваш Candy Craft профиль готов."
      bottomText="Уже есть аккаунт?"
      bottomLinkText="Войти"
      bottomLinkTo="/account/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="firstName">
              Имя <RequiredStar />
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={onChange("firstName")}
              placeholder="как к вам обращаться 🍬"
              className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-gray-200"
              }`}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="lastName">
              Фамилия <RequiredStar />
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={onChange("lastName")}
              placeholder="для доставки 🎁"
              className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-gray-200"
              }`}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
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
          <label className="text-sm font-medium" htmlFor="phone">
            Телефон{" "}
            <span className="text-xs font-normal text-gray-400">
              (необязательно)
            </span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={onChange("phone")}
            placeholder="+7 (999) 999-99-99"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="password">
            Пароль <RequiredStar />
          </label>
          <div className="mt-1 flex rounded-lg border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-gray-200">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange("password")}
              placeholder="секретный ингредиент"
              className="w-full rounded-lg px-3 py-2 outline-none"
              autoComplete="new-password"
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

        <div>
          <label className="text-sm font-medium" htmlFor="confirmPassword">
            Повтор пароля <RequiredStar />
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={onChange("confirmPassword")}
            placeholder="ещё раз, чтобы точно 🍰"
            onPaste={(e) => e.preventDefault()} // ✅ нельзя вставить
            onDrop={(e) => e.preventDefault()}
            className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
              errors.confirmPassword
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:ring-gray-200"
            }`}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-white hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Создаю аккаунт..." : "Зарегистрироваться"}
        </button>
      </form>
    </AuthShell>
  );
}
