import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { http, ApiError } from "../api/http";

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

function statusText(status: PaymentStatus) {
  switch (status) {
    case "SUCCEEDED":
      return "Оплата прошла успешно";
    case "PENDING":
      return "Платеж создается";
    case "WAITING_FOR_CAPTURE":
      return "Платеж ожидает подтверждения";
    case "CANCELED":
      return "Платеж отменен";
    default:
      return "Ошибка оплаты";
  }
}

export function PaymentResultPage() {
  const [params] = useSearchParams();
  const orderId = Number(params.get("orderId") ?? 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<OrderPayment | null>(null);

  useEffect(() => {
    let isActive = true;

    async function load() {
      if (!orderId || Number.isNaN(orderId)) {
        setError("Некорректный номер заказа");
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
        setError(
          e instanceof ApiError
            ? e.message
            : "Не удалось получить статус оплаты",
        );
      } finally {
        if (isActive) setLoading(false);
      }
    }

    load();
    return () => {
      isActive = false;
    };
  }, [orderId]);

  const amountLabel = useMemo(() => {
    if (!payment) return null;
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: payment.currency || "RUB",
      maximumFractionDigits: 2,
    }).format(payment.amountMinor / 100);
  }, [payment]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Результат оплаты</h1>

        {loading && <p className="mt-4 text-gray-600">Проверяем статус...</p>}

        {!loading && error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && payment && (
          <div className="mt-5 space-y-3">
            <p className="text-lg font-medium">{statusText(payment.status)}</p>
            <p className="text-gray-700">Заказ: #{orderId}</p>
            {amountLabel && (
              <p className="text-gray-700">Сумма: {amountLabel}</p>
            )}
            <p className="text-gray-700">Статус: {payment.status}</p>
          </div>
        )}

        {!loading && !error && !payment && (
          <p className="mt-4 text-gray-700">
            Платеж пока не найден для заказа #{orderId}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            to="/account"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black"
          >
            В личный кабинет
          </Link>
          <Link
            to="/"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            В каталог
          </Link>
        </div>
      </div>
    </main>
  );
}
