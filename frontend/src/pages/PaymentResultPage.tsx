import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { http, ApiError } from "../api/http";
import { useLanguage } from "../contexts/LanguageContext";

type PaymentStatus =
  | "PENDING"
  | "WAITING_FOR_CAPTURE"
  | "SUCCEEDED"
  | "CANCELED"
  | "FAILED";

type OrderPayment = {
  id: number;
  status: PaymentStatus;
  amountMinor: number;
  currency: string;
  createdAt: string;
};

function statusText(status: PaymentStatus, t: (key: string) => string) {
  return t(`payment.status.${status}`);
}

export function PaymentResultPage() {
  const { formatMoney, t } = useLanguage();
  const [params] = useSearchParams();
  const orderId = Number(params.get("orderId") ?? 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<OrderPayment | null>(null);

  useEffect(() => {
    let isActive = true;

    async function load() {
      if (!orderId || Number.isNaN(orderId)) {
        setError(t("payment.invalidOrder"));
        setLoading(false);
        return;
      }

      try {
        const list = await http.get<OrderPayment[]>(
          `/payments/orders/${orderId}`,
        );
        if (!isActive) return;
        setPayment(list?.[0] ?? null);
      } catch (e) {
        if (!isActive) return;
        setError(e instanceof ApiError ? e.message : t("payment.loadError"));
      } finally {
        if (isActive) setLoading(false);
      }
    }

    load();
    return () => {
      isActive = false;
    };
  }, [orderId, t]);

  const amountLabel = useMemo(() => {
    if (!payment) return null;
    return formatMoney(payment.amountMinor / 100);
  }, [formatMoney, payment]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{t("payment.title")}</h1>

        {loading && (
          <p className="mt-4 text-gray-600">{t("payment.checking")}</p>
        )}

        {!loading && error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && payment && (
          <div className="mt-5 space-y-3">
            <p className="text-lg font-medium">
              {statusText(payment.status, t)}
            </p>
            <p className="text-gray-700">
              {t("payment.order")} #{orderId}
            </p>
            {amountLabel && (
              <p className="text-gray-700">
                {t("payment.amount")} {amountLabel}
              </p>
            )}
            <p className="text-gray-700">
              {t("payment.statusLabel")} {payment.status}
            </p>
          </div>
        )}

        {!loading && !error && !payment && (
          <p className="mt-4 text-gray-700">
            {t("payment.notFound")} #{orderId}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            to="/account"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            {t("payment.account")}
          </Link>
          <Link
            to="/"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            {t("payment.catalog")}
          </Link>
        </div>
      </div>
    </main>
  );
}
