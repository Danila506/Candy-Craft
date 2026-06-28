import { ShoppingCart } from "lucide-react";
import type { CakeConstructorConfig } from "./cakeConstructorConfig";
import { cakeOptions, getInnerLayerSummary } from "./cakeConstructorConfig";
import { useLanguage } from "../../contexts/LanguageContext";

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
  const { t } = useLanguage();
  const optionLabel = (group: string, id: string, fallback: string) => {
    const translated = t(`cake.option.${group}.${id}.label`);
    return translated === `cake.option.${group}.${id}.label`
      ? fallback
      : translated;
  };
  const decorSummary =
    config.decor.length === 0
      ? t("cake.noDecor")
      : config.decor
          .map((decorId) =>
            optionLabel(
              "decor",
              decorId,
              cakeOptions.decor.find((option) => option.id === decorId)
                ?.label ?? decorId,
            ),
          )
          .join(", ");

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-rose-200">
            {t("cake.summaryStep")}
          </div>
          <h2 className="mt-1 text-xl font-black">{t("cake.summaryTitle")}</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-300">{t("checkout.total")}</div>
          <div className="text-3xl font-black">{totalPrice * quantity} ₽</div>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm text-slate-200 sm:grid-cols-2">
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.shape")}</dt>
          <dd className="font-bold">
            {optionLabel(
              "base",
              config.base,
              cakeOptions.bases.find((option) => option.id === config.base)
                ?.label ?? config.base,
            )}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.stepSize")}</dt>
          <dd className="font-bold">
            {cakeOptions.sizes.find((option) => option.id === config.size)
              ?.label ?? config.size}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.stepInner")}</dt>
          <dd className="font-bold">
            {getInnerLayerSummary(config.innerLayer) || t("cake.notSet")}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.color")}</dt>
          <dd className="font-bold">
            {optionLabel(
              "color",
              config.color,
              cakeOptions.colors.find((option) => option.id === config.color)
                ?.label ?? config.color,
            )}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.stepOuter")}</dt>
          <dd className="font-bold">
            {cakeOptions.outerLayers.find(
              (option) => option.id === config.outerLayer,
            )?.label ?? config.outerLayer}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2">
          <dt className="text-slate-400">{t("cake.stepPackaging")}</dt>
          <dd className="font-bold">
            {optionLabel(
              "packaging",
              config.packaging,
              cakeOptions.packaging.find(
                (option) => option.id === config.packaging,
              )?.label ?? config.packaging,
            )}
          </dd>
        </div>
        <div className="rounded-xl bg-white/8 px-3 py-2 sm:col-span-2">
          <dt className="text-slate-400">{t("cake.stepDecor")}</dt>
          <dd className="font-bold">{decorSummary}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-200">
          {t("cake.quantity")}
        </span>
        <div className="flex items-center gap-2 rounded-full bg-white/10 p-1">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none"
            aria-label={t("cart.decrease")}
          >
            -
          </button>
          <span className="w-8 text-center font-black">{quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(Math.min(quantity + 1, 5))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl leading-none"
            aria-label={t("cart.increase")}
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
        {isSubmitting ? t("cake.adding") : t("cake.addToCart")}
      </button>

      {submitError && (
        <div className="mt-3 rounded-xl border border-rose-300/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-50">
          {submitError}
        </div>
      )}
    </section>
  );
}
