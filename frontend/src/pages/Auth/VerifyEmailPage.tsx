import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthShell } from "./AuthShell";
import { http, ApiError } from "../../api/http";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Подтверждаем email...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Ссылка подтверждения некорректна");
      return;
    }

    let cancelled = false;

    http
      .post("/auth/verify-email", { token })
      .then(() => {
        if (cancelled) return;
        setStatus("success");
        setMessage("Email подтверждён. Теперь можно войти в аккаунт.");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("error");
        if (err instanceof ApiError) setMessage(err.message);
        else setMessage("Не удалось подтвердить email");
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <AuthShell
      title={status === "success" ? "Email подтверждён" : "Подтверждение email"}
      subtitle={message}
      bottomText="Вернуться"
      bottomLinkText="к входу"
      bottomLinkTo="/account/login"
    >
      <div className="space-y-5">
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            status === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : status === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-gray-200 bg-gray-50 text-gray-700"
          }`}
        >
          {message}
        </div>

        <Link
          to="/account/login"
          className="block w-full rounded-lg bg-amber-500 px-4 py-2.5 text-center text-white hover:bg-amber-600"
        >
          Перейти ко входу
        </Link>
      </div>
    </AuthShell>
  );
}
