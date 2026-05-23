import { Check } from "lucide-react";
import type { CakeOption } from "./cakeConstructorConfig";

type Props<T extends string> = {
  title: string;
  step: number;
  options: Array<CakeOption<T>>;
  value: T;
  onChange: (value: T) => void;
  disabledOptions?: Partial<Record<T, string>>;
  columns?: "two" | "three" | "four";
};

const gridColumns = {
  two: "sm:grid-cols-2",
  three: "sm:grid-cols-3",
  four: "sm:grid-cols-2 xl:grid-cols-4",
};

export function CakeOptionSelector<T extends string>({
  title,
  step,
  options,
  value,
  onChange,
  disabledOptions = {},
  columns = "three",
}: Props<T>) {
  return (
    <section className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white">
          {step}
        </span>
        <h2 className="text-base font-black text-slate-900">{title}</h2>
      </div>

      <div className={`grid grid-cols-1 gap-2 ${gridColumns[columns]}`}>
        {options.map((option) => {
          const isSelected = option.id === value;
          const disabledReason = disabledOptions[option.id];

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              disabled={Boolean(disabledReason)}
              className={`relative min-h-22 rounded-xl border p-3 text-left transition ${
                isSelected
                  ? "border-[#ff398b] bg-rose-50 text-rose-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"
              } disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400`}
              title={disabledReason}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-black">{option.label}</div>
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </div>
              {option.description && (
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  {disabledReason ?? option.description}
                </div>
              )}
              {option.price > 0 && (
                <div className="mt-2 text-xs font-bold text-slate-500">
                  +{option.price} ₽
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
