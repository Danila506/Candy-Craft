import { ShoppingCart } from "lucide-react";
import type { CakeConstructorConfig } from "./cakeConstructorConfig";
import {
  cakeOptions,
  getDecorSummary,
  getInnerLayerSummary,
  getOptionLabel,
} from "./cakeConstructorConfig";

type Props = {
  config: CakeConstructorConfig;
  totalPrice: number;
  quantity: number;
  isSubmitting: boolean;
  submitError: string;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
};

export function CakeSummary({
  config,
  totalPrice,
  quantity,
  isSubmitting,
  submitError,
  onQuantityChange,
  onAddToCart,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-rose-200">
            Шаг 5
          </div>
          <h2 className="mt-1 text-xl font-black">Итог</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-300">Итого</div>
          <div className="text-3xl font-black">{totalPrice * quantity} ₽</div>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm text-slate-200 sm:grid-cols-2">
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Форма</dt>
          <dd className="font-bold">
            {getOptionLabel(cakeOptions.bases, config.base)}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Размер</dt>
          <dd className="font-bold">
            {getOptionLabel(cakeOptions.sizes, config.size)}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Внутренний слой</dt>
          <dd className="font-bold">
            {getInnerLayerSummary(config.innerLayer) || "Не задан"}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Цвет</dt>
          <dd className="font-bold">
            {getOptionLabel(cakeOptions.colors, config.color)}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Наружный ряд</dt>
          <dd className="font-bold">
            {getOptionLabel(cakeOptions.outerLayers, config.outerLayer)}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">Упаковка</dt>
          <dd className="font-bold">
            {getOptionLabel(cakeOptions.packaging, config.packaging)}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2 sm:col-span-2">
          <dt className="text-slate-400">Декор</dt>
          <dd className="font-bold">{getDecorSummary(config.decor)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-200">Количество</span>
        <div className="flex items-center gap-2 rounded-full bg-white/10 p-1">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none"
            aria-label="Уменьшить количество"
          >
            -
          </button>
          <span className="w-8 text-center font-black">{quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(Math.min(quantity + 1, 5))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none"
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={isSubmitting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-5 py-4 font-black text-white transition hover:bg-[#e0327a] disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        <ShoppingCart className="h-5 w-5" />
        {isSubmitting ? "Добавляем..." : "Добавить в корзину"}
      </button>

      {submitError && (
        <div className="mt-3 rounded-xl border border-rose-300/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-50">
          {submitError}
        </div>
      )}
    </section>
  );
}
