import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http, ApiError } from "../../api/http";
import { useAuth, type Role } from "../../contexts/AuthContext";

type MeDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: Role;
  createdAt?: string;
};

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELED";

type MyOrderDto = {
  id: number;
  status: OrderStatus;
  currency?: string;
  finalAmountMinor?: number;
  createdAt: string;
};

type Tab = "profile" | "orders";

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

function formatOrderAmount(order: MyOrderDto) {
  if (typeof order.finalAmountMinor !== "number") return "—";
  const currency = order.currency || "RUB";
  const amountMinor = order.finalAmountMinor;

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountMinor / 100);
}

function formatRuPhoneInput(input: string) {
  const digits = input.replace(/\D/g, "");
  let local = digits;

  if (local.startsWith("7") || local.startsWith("8")) {
    local = local.slice(1);
  }
  local = local.slice(0, 10);

  if (!local) return "";

  let formatted = "+7";
  if (local.length > 0) formatted += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) formatted += ")";
  if (local.length > 3) formatted += ` ${local.slice(3, 6)}`;
  if (local.length > 6) formatted += `-${local.slice(6, 8)}`;
  if (local.length > 8) formatted += `-${local.slice(8, 10)}`;

  return formatted;
}

function normalizeRuPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");

  if (digits.length === 10) digits = `7${digits}`;
  if (digits.length === 11 && digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.length === 11 && digits.startsWith("7")) {
    return `+${digits}`;
  }

  return null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

function isValidEmail(email: string) {
  // Достаточно строгая, но без “перелома” UX.
  // + не даём пробелы и запрещаем двойные @
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function statusLabel(s: OrderStatus) {
  switch (s) {
    case "PENDING":
      return "Создан";
    case "PAID":
      return "Оплачен";
    case "PROCESSING":
      return "Готовим";
    case "SHIPPED":
      return "Отправлен";
    case "COMPLETED":
      return "Выполнен";
    case "CANCELED":
      return "Отменён";
    default:
      return s;
  }
}

function RequiredStar() {
  return <span className="ml-0.5 text-red-600 align-super">*</span>;
}

export default function AccountPage() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");

  const [tab, setTab] = useState<Tab>("profile");

  const [me, setMe] = useState<MeDto | null>(null);
  const [orders, setOrders] = useState<MyOrderDto[]>([]);

  const [loadingMe, setLoadingMe] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [error, setError] = useState<string>("");

  // форма профиля
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string>("");

  const canSave = useMemo(() => {
    if (!me) return false;
    const fn = profile.firstName.trim();
    const ln = profile.lastName.trim();
    const email = profile.email.trim();

    if (!fn || !ln || !email) return false;
    if (!isValidEmail(email)) return false;

    return !saving;
  }, [profile, saving, me]);

  useEffect(() => {
    let alive = true;

    async function loadMe() {
      setLoadingMe(true);
      setError("");

      try {
        // 🔁 ВАЖНО: endpoint подстрой под твой backend
        // обычно делают /auth/me
        const data = await http.get<MeDto>("/auth/me");

        if (!alive) return;
        setMe(data);
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: formatRuPhoneInput(data.phone || ""),
        });
      } catch (e) {
        if (!alive) return;

        // Если не авторизован — на логин
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          navigate("/account/login", { replace: true });
          return;
        }
        setError(
          e instanceof ApiError ? e.message : "Не удалось загрузить профиль",
        );
      } finally {
        if (alive) setLoadingMe(false);
      }
    }

    loadMe();
    return () => {
      alive = false;
    };
  }, [navigate]);

  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      if (tab !== "orders") return;
      setLoadingOrders(true);
      setError("");

      try {
        const data = await http.get<MyOrderDto[]>("/orders/me");
        if (!alive) return;
        setOrders(data);
      } catch (e) {
        if (!alive) return;

        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          navigate("/account/login", { replace: true });
          return;
        }
        setError(
          e instanceof ApiError ? e.message : "Не удалось загрузить заказы",
        );
      } finally {
        if (alive) setLoadingOrders(false);
      }
    }

    loadOrders();
    return () => {
      alive = false;
    };
  }, [tab, navigate]);

  const onProfileChange =
    (key: "firstName" | "lastName" | "phone" | "email") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        key === "phone" ? formatRuPhoneInput(e.target.value) : e.target.value;
      setProfile((p) => ({ ...p, [key]: nextValue }));
      setSaveMsg("");
      if (key === "email") setEmailError("");
    };

  const saveProfile = async () => {
    if (!me) return;

    const firstName = profile.firstName.trim();
    const lastName = profile.lastName.trim();
    const email = profile.email.trim();
    const rawPhone = profile.phone.trim();
    const phone = rawPhone ? normalizeRuPhone(rawPhone) : undefined;

    if (!firstName || !lastName || !email) {
      setSaveMsg("Заполните имя, фамилию и email");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Введите корректный email");
      setSaveMsg("Проверьте email");
      return;
    }
    if (rawPhone && !phone) {
      setSaveMsg("Введите телефон в формате +7 (999) 999-99-99");
      return;
    }

    setSaving(true);
    setSaveMsg("");

    try {
      // PATCH профиль текущего пользователя
      const updated = await http.patch<MeDto>("/auth/me", {
        firstName,
        lastName,
        email,
        phone,
      });

      setMe(updated);
      setProfile({
        firstName: updated.firstName || "",
        lastName: updated.lastName || "",
        email: updated.email || "",
        phone: updated.phone || "",
      });
      setSaveMsg("Сохранено ✅");
    } catch (e) {
      setSaveMsg(e instanceof ApiError ? e.message : "Не удалось сохранить");
    } finally {
      setSaving(false);
    }
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // даже если упало — всё равно выкидываем на логин
    } finally {
      navigate("/account/login", { replace: true });
    }
  };

  if (loadingMe) {
    return (
      <section className="pt-24 mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-44 rounded bg-gray-100" />
          <div className="mt-4 h-4 w-72 rounded bg-gray-100" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-10 rounded bg-gray-100" />
            <div className="h-10 rounded bg-gray-100" />
            <div className="h-10 rounded bg-gray-100 sm:col-span-2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 mx-auto max-w-5xl px-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="text-xl font-semibold">Личный кабинет</span>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700">
                Candy Craft 🍰
              </span>
              {me?.role === "ADMIN" && (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                  ADMIN
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-600">
              Привет, {me?.firstName} 👋 Здесь — профиль и ваши заказы.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {me?.role === "ADMIN" && (
              <Link
                to="/admin"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
              >
                В админку
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setTab("profile")}
            className={cn(
              "rounded-full px-4 py-2 text-sm border",
              tab === "profile"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-gray-200 hover:bg-gray-50",
            )}
          >
            Профиль
          </button>
          <button
            onClick={() => {
              setTab("orders");
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm border",
              tab === "orders"
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-gray-200 hover:bg-gray-50",
            )}
          >
            Заказы
          </button>
        </div>

        {/* Errors */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Content */}
        {tab === "profile" && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card: profile */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Данные профиля</h3>
                <span className="text-xs text-gray-500">
                  Обновите контакты для уведомлений по заказам
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="firstName">
                    Имя <RequiredStar />
                  </label>
                  <input
                    id="firstName"
                    value={profile.firstName}
                    onChange={onProfileChange("firstName")}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100"
                    placeholder="Никита"
                    autoComplete="given-name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="lastName">
                    Фамилия <RequiredStar />
                  </label>
                  <input
                    id="lastName"
                    value={profile.lastName}
                    onChange={onProfileChange("lastName")}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100"
                    placeholder="Беляк"
                    autoComplete="family-name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email <RequiredStar />
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={onProfileChange("email")}
                    onBlur={() => {
                      const v = profile.email.trim();
                      if (!v) {
                        setEmailError("Введите email");
                      } else if (!isValidEmail(v)) {
                        setEmailError("Введите корректный email");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={cn(
                      "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                      emailError
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 focus:ring-rose-100",
                    )}
                    autoComplete="email"
                    placeholder="name@example.com"
                  />

                  {emailError && (
                    <p className="mt-1 text-xs text-red-600">{emailError}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="phone">
                    Телефон (РФ)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={profile.phone}
                    onChange={onProfileChange("phone")}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100"
                    placeholder="+7 (999) 999-99-99"
                    autoComplete="tel"
                    maxLength={18}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Можно оставить пустым — будем связываться по email.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={saveProfile}
                  disabled={!canSave}
                  className="rounded-lg bg-rose-500 px-4 py-2.5 text-sm text-white hover:bg-rose-600 disabled:opacity-50"
                >
                  {saving ? "Сохраняю..." : "Сохранить"}
                </button>

                {saveMsg && (
                  <div className="text-sm text-gray-700">{saveMsg}</div>
                )}
              </div>
            </div>

            {/* Card: quick info */}
            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold">Быстро</h3>

              <div className="mt-3 space-y-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Роль</div>
                  <div className="font-medium">{me?.role}</div>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Готовы выбрать торт?</div>
                  <Link to="/" className="font-medium text-rose-600 underline">
                    Перейти в каталог 🍫
                  </Link>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Нужна помощь?</div>
                  <div className="font-medium">
                    Напишите нам — быстро ответим 💬
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-6 rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Мои заказы</h3>
              <Link
                to="/"
                className="text-sm text-amber-700 underline hover:text-amber-800"
              >
                Сделать новый заказ 🍬
              </Link>
            </div>

            {loadingOrders ? (
              <div className="mt-4 space-y-3">
                <div className="h-12 rounded bg-gray-100" />
                <div className="h-12 rounded bg-gray-100" />
                <div className="h-12 rounded bg-gray-100" />
              </div>
            ) : orders.length === 0 ? (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                Пока нет заказов. Самое время собрать сладкий шедевр 🍰
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-140 text-left text-sm">
                  <thead className="text-gray-500">
                    <tr>
                      <th className="py-2">№</th>
                      <th className="py-2">Дата</th>
                      <th className="py-2">Статус</th>
                      <th className="py-2">Сумма</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 font-medium">#{o.id}</td>
                        <td className="py-3">{formatDate(o.createdAt)}</td>
                        <td className="py-3">
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {statusLabel(o.status)}
                          </span>
                        </td>
                        <td className="py-3 font-semibold">
                          {formatOrderAmount(o)}
                        </td>
                        <td className="py-3 text-right">
                          {/* если будет страница заказа — включишь */}
                          {/* <Link to={`/account/orders/${o.id}`} className="text-rose-600 underline">Открыть</Link> */}
                          <span className="text-xs text-gray-400">
                            скоро “детали”
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="mt-3 text-xs text-gray-500">
                  Статусы обновляются автоматически, когда заказ меняет этап.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
