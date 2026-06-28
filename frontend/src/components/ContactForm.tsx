import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { http, ApiError } from "../api/http";
import { useLanguage } from "../contexts/LanguageContext";

type ContactDto = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactDto, string>>
  >({});

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [serverError, setServerError] = useState<string>("");
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  const setField =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((p) => ({ ...p, [key]: value }));
      setServerError("");
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

  const validate = () => {
    const e: Partial<Record<keyof ContactDto, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const phone = form.phone.trim();

    if (!name) e.name = t("contact.requiredName");
    if (!email) e.email = t("contact.requiredEmail");
    else if (!isValidEmail(email)) e.email = t("contact.invalidEmail");
    if (!message) e.message = t("contact.requiredMessage");

    // телефон опциональный — но если ввели, делаем мягкую проверку на длину
    if (phone && phone.replace(/[^\d]/g, "").length < 7) {
      e.phone = t("contact.shortPhone");
    }

    setErrors(e);
    if (!personalDataConsent) {
      setConsentError(t("contact.consentRequired"));
    }
    return Object.keys(e).length === 0 && personalDataConsent;
  };

  const canSubmit = useMemo(() => {
    if (status === "loading") return false;
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return false;
    if (!isValidEmail(email)) return false;
    return personalDataConsent;
  }, [form, status, personalDataConsent]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerError("");

    try {
      const payload: ContactDto = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      };

      await http.post<void>("/contact", payload);

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setPersonalDataConsent(false);
      setErrors({});
    } catch (err) {
      setStatus("idle");
      setServerError(
        err instanceof ApiError ? err.message : t("contact.defaultServerError"),
      );
    }
  };

  return (
    <section className="pt-24 mx-auto max-w-5xl px-4">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: info */}
          <div className="relative p-6 sm:p-8">
            {/* soft gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-rose-50 via-white to-amber-50" />

            <div className="relative">
              <div className="inline-flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  {t("contact.title")}
                </h1>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700">
                  {t("contact.badge")}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {t("contact.description")}
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3">
                  <span className="mt-0.5">📍</span>
                  <div>
                    <div className="text-gray-500">{t("contact.location")}</div>
                    <div className="font-medium">
                      {t("contact.locationValue")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3">
                  <span className="mt-0.5">📞</span>
                  <div>
                    <div className="text-gray-500">{t("contact.phone")}</div>
                    <div className="font-medium">+7 999 123-45-67</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3">
                  <span className="mt-0.5">✉️</span>
                  <div>
                    <div className="text-gray-500">{t("contact.email")}</div>
                    <div className="font-medium">hello@candycraft.ru</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white/70 border border-gray-100 p-3">
                  <span className="mt-0.5">📷</span>
                  <div>
                    <div className="text-gray-500">
                      {t("contact.instagram")}
                    </div>
                    <div className="font-medium">@candycraft</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white/70 border border-gray-100 p-4">
                <div className="text-sm font-medium">
                  {t("contact.responseTime")}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {t("contact.responseTimeDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-100">
            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <div className="text-lg font-semibold text-emerald-800">
                  {t("contact.successTitle")}
                </div>
                <p className="mt-2 text-sm text-emerald-800/80">
                  {t("contact.successDescription")}
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm text-white hover:bg-black"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="name">
                    {t("contact.nameLabel")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={setField("name")}
                    onBlur={() => {
                      if (!form.name.trim()) {
                        setErrors((p) => ({
                          ...p,
                          name: t("contact.requiredName"),
                        }));
                      }
                    }}
                    className={cn(
                      "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                      errors.name
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 focus:ring-rose-100",
                    )}
                    placeholder={t("contact.namePlaceholder")}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="email">
                    {t("contact.emailLabel")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    onBlur={() => {
                      const v = form.email.trim();
                      if (!v)
                        setErrors((p) => ({
                          ...p,
                          email: t("contact.requiredEmail"),
                        }));
                      else if (!isValidEmail(v))
                        setErrors((p) => ({
                          ...p,
                          email: t("contact.invalidEmail"),
                        }));
                    }}
                    className={cn(
                      "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                      errors.email
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 focus:ring-rose-100",
                    )}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="phone">
                    {t("contact.phoneLabel")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={setField("phone")}
                    onBlur={() => {
                      const digits = form.phone.replace(/[^\d]/g, "");
                      if (form.phone.trim() && digits.length < 7) {
                        setErrors((p) => ({
                          ...p,
                          phone: t("contact.shortPhone"),
                        }));
                      }
                    }}
                    className={cn(
                      "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2",
                      errors.phone
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 focus:ring-rose-100",
                    )}
                    placeholder="+7 (999) 123-45-67"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="message">
                    {t("contact.messageLabel")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={setField("message")}
                    onBlur={() => {
                      if (!form.message.trim()) {
                        setErrors((p) => ({
                          ...p,
                          message: t("contact.requiredMessage"),
                        }));
                      }
                    }}
                    className={cn(
                      "mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 resize-none",
                      errors.message
                        ? "border-red-300 focus:ring-red-100"
                        : "border-gray-200 focus:ring-rose-100",
                    )}
                    placeholder={t("contact.messagePlaceholder")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {serverError}
                  </div>
                )}

                <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={personalDataConsent}
                    onChange={(e) => {
                      setPersonalDataConsent(e.target.checked);
                      setConsentError("");
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-rose-500"
                  />
                  <span>
                    {t("contact.consentStart")}{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-rose-700 underline"
                    >
                      {t("contact.privacyPolicy")}
                    </Link>
                    .
                    {consentError && (
                      <span className="mt-1 block text-xs text-red-600">
                        {consentError}
                      </span>
                    )}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-lg bg-rose-500 px-4 py-3 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
                >
                  {status === "loading"
                    ? t("contact.submitting")
                    : t("contact.submit")}
                </button>

                <p className="text-xs text-gray-500">
                  {t("contact.dataNotice")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
