import {
  cakeOptions,
  estimateInnerLayer,
  getInnerLayerPercentSum,
  type CakeInnerCandyId,
  type CakeInnerLayerPart,
  type CakeSizeId,
} from "./cakeConstructorConfig";

type Props = {
  size: CakeSizeId;
  value: Array<CakeInnerLayerPart>;
  onChange: (value: Array<CakeInnerLayerPart>) => void;
};

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function CakeInnerLayerSelector({ size, value, onChange }: Props) {
  const selectedIds = new Set(value.map((part) => part.candyId));
  const percentSum = getInnerLayerPercentSum(value);
  const estimation = estimateInnerLayer(size, value);
  const isValidSum = Math.abs(percentSum - 100) < 0.001;

  const toggleCandy = (candyId: CakeInnerCandyId) => {
    if (selectedIds.has(candyId)) {
      onChange(value.filter((part) => part.candyId !== candyId));
      return;
    }

    const remaining = Math.max(0, 100 - percentSum);
    onChange([...value, { candyId, percentage: remaining }]);
  };

  const updatePercentage = (candyId: CakeInnerCandyId, percentage: number) => {
    onChange(
      value.map((part) =>
        part.candyId === candyId
          ? { ...part, percentage: clampPercent(percentage) }
          : part,
      ),
    );
  };

  return (
    <section className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff398b] text-sm font-black text-white">
          3
        </span>
        <h2 className="text-base font-black text-slate-900">Внутренний слой</h2>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {cakeOptions.innerCandies.map((candy) => {
          const selected = selectedIds.has(candy.id);
          return (
            <button
              key={candy.id}
              type="button"
              onClick={() => toggleCandy(candy.id)}
              className={`rounded-xl border px-3 py-2 text-left transition ${
                selected
                  ? "border-[#ff398b] bg-rose-50 text-rose-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-rose-200"
              }`}
            >
              <div className="font-black">{candy.label}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 text-sm font-black text-slate-900">
          Выбранные конфеты и проценты
        </div>
        {value.length === 0 ? (
          <div className="text-sm text-slate-500">
            Выберите хотя бы одну конфету.
          </div>
        ) : (
          <div className="space-y-2">
            {value.map((part) => {
              const candy = cakeOptions.innerCandies.find(
                (option) => option.id === part.candyId,
              );
              return (
                <div
                  key={part.candyId}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                >
                  <div className="font-bold text-slate-800">
                    {candy?.label ?? part.candyId}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={part.percentage}
                      onChange={(event) =>
                        updatePercentage(
                          part.candyId,
                          Number(event.target.value || 0),
                        )
                      }
                      className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm font-bold text-slate-900 outline-none focus:border-[#ff398b]"
                    />
                    <span className="text-sm font-bold text-slate-700">%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-3 py-2">
        <span className="text-sm font-black text-slate-800">
          Сумма процентов
        </span>
        <span
          className={`text-sm font-black ${
            isValidSum ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {percentSum}%
        </span>
      </div>

      {!isValidSum && (
        <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
          Сумма процентов должна быть ровно 100%. Иначе перейти дальше нельзя.
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
        <div className="mb-2 text-sm font-black text-slate-900">
          Стоимость внутреннего слоя
        </div>
        {estimation.items.length === 0 ? (
          <div className="text-sm text-slate-500">Состав пока не задан.</div>
        ) : (
          <div className="space-y-1 text-sm text-slate-700">
            {estimation.items.map((item) => (
              <div key={item.candyId} className="flex justify-between gap-2">
                <span>{item.label}</span>
                <span className="font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 border-t border-slate-200 pt-2 text-right text-sm font-black text-slate-900">
          {estimation.totalPrice.toLocaleString("ru-RU")} ₽
        </div>
        <div className="mt-1 text-xs text-slate-500">
          Стоимость рассчитана по выбранным процентам и размеру торта.
        </div>
      </div>
    </section>
  );
}
