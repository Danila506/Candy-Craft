import { Check } from "lucide-react";
import { cakeOptions, type CakeDecorId } from "./cakeConstructorConfig";

type Props = {
  value: Array<CakeDecorId>;
  onChange: (value: Array<CakeDecorId>) => void;
};

export function CakeDecorSelector({ value, onChange }: Props) {
  const toggleDecor = (decorId: CakeDecorId) => {
    if (value.includes(decorId)) {
      onChange(value.filter((item) => item !== decorId));
      return;
    }

    onChange([...value, decorId]);
  };

  return (
    <section className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white">
          4
        </span>
        <h2 className="text-base font-black text-slate-900">Декор</h2>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {cakeOptions.decor.map((option) => {
          const selected = value.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleDecor(option.id)}
              className={`relative min-h-22 rounded-xl border p-3 text-left transition ${
                selected
                  ? "border-[#ff398b] bg-rose-50 text-rose-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-black">{option.label}</div>
                {selected && <Check className="h-4 w-4 shrink-0" />}
              </div>
              {option.description && (
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  {option.description}
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
