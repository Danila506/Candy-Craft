import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AuthShell({
  title,
  subtitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkTo: string;
}) {
  return (
    <section className="pt-20 px-4 bg-linear-to-b from-rose-50 via-white to-amber-50 min-h-[calc(100vh-80px)]">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm">
          {/* Brand */}
          <div className="mb-6 flex items-center gap-2">
            <span className="text-lg">🍬</span>
            <span className="text-sm font-semibold tracking-wide uppercase">
              Candy Craft
            </span>
            <span className="text-xs text-gray-400">sweet account</span>
          </div>

          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6 text-sm text-gray-600">
            {bottomText}{" "}
            <Link className="text-gray-900 underline" to={bottomLinkTo}>
              {bottomLinkText}
            </Link>
          </div>

          {/* Benefits */}
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✅ Быстрое оформление заказа</li>
            <li>✅ История “сладких” покупок</li>
            <li>✅ Повтор заказа в 1 клик</li>
          </ul>

          <p className="mt-6 text-[11px] text-gray-500">
            Candy Craft — торты из любимых шоколадок. 🍫🍰
          </p>
        </div>
      </div>
    </section>
  );
}
