import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { ApiError } from "../../api/http";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { CakeDecorSelector } from "./CakeDecorSelector";
import { CakeInnerLayerSelector } from "./CakeInnerLayerSelector";
import { CakeOptionSelector } from "./CakeOptionSelector";
import { CakeSummary } from "./CakeSummary";
import {
  cakeOptions,
  calculateCakePrice,
  defaultCakeConfig,
  getInnerLayerPercentSum,
  getOuterLayerPrice,
  type CakeBaseId,
  type CakeConstructorConfig,
  type CakeSizeId,
} from "./cakeConstructorConfig";

export function CakeConstructor() {
  const [config, setConfig] =
    useState<CakeConstructorConfig>(defaultCakeConfig);
  const [activeStep, setActiveStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCustomCandyCake } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => calculateCakePrice(config), [config]);
  const outerLayerOptions = useMemo(
    () =>
      cakeOptions.outerLayers.map((option) => ({
        ...option,
        price: getOuterLayerPrice(config.size, option.id),
      })),
    [config.size],
  );
  const innerLayerPercentSum = useMemo(
    () => getInnerLayerPercentSum(config.innerLayer),
    [config.innerLayer],
  );
  const isInnerLayerValid =
    config.innerLayer.length > 0 &&
    Math.abs(innerLayerPercentSum - 100) < 0.001;

  const updateBase = (base: CakeBaseId) => {
    setConfig((prev) => ({ ...prev, base }));
  };

  const updateSize = (size: CakeSizeId) => {
    setConfig((prev) => ({ ...prev, size }));
  };

  const steps = [
    {
      title: "Размер",
      caption: "Форма и габарит торта",
    },
    {
      title: "Наружный ряд",
      caption: "Конфеты по борту и цвет ленты",
    },
    {
      title: "Внутренний слой",
      caption: "Конфеты внутри сборки",
    },
    {
      title: "Декор",
      caption: "Детали и надпись",
    },
    {
      title: "Упаковка",
      caption: "Финальная подача",
    },
  ];
  const isLastStep = activeStep === steps.length - 1;

  const handleAddToCart = async () => {
    setSubmitError("");
    if (!user?.id) {
      setSubmitError("Войдите в аккаунт, чтобы добавить торт в корзину");
      return;
    }

    setIsSubmitting(true);
    try {
      await addCustomCandyCake({
        quantity,
        config: {
          ...config,
          messageText: config.messageText.trim(),
          totalPrice,
        },
      });
      navigate("/cart");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Не удалось добавить торт в корзину",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const goNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    if (activeStep === 0) {
      return (
        <div className="space-y-4">
          <CakeOptionSelector
            step={1}
            title="Выберите размер"
            options={cakeOptions.sizes}
            value={config.size}
            onChange={updateSize}
            columns="two"
          />
          <CakeOptionSelector
            step={1}
            title="Выберите форму"
            options={cakeOptions.bases}
            value={config.base}
            onChange={updateBase}
            columns="three"
          />
        </div>
      );
    }

    if (activeStep === 1) {
      return (
        <div className="space-y-4">
          <CakeOptionSelector
            step={2}
            title="Наружный ряд конфет"
            options={outerLayerOptions}
            value={config.outerLayer}
            onChange={(outerLayer) =>
              setConfig((prev) => ({ ...prev, outerLayer }))
            }
            columns="four"
          />
          <CakeOptionSelector
            step={2}
            title="Цвет ленты и акцентов"
            options={cakeOptions.colors}
            value={config.color}
            onChange={(color) => setConfig((prev) => ({ ...prev, color }))}
            columns="three"
          />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <CakeInnerLayerSelector
          size={config.size}
          value={config.innerLayer}
          onChange={(innerLayer) =>
            setConfig((prev) => ({ ...prev, innerLayer }))
          }
        />
      );
    }

    if (activeStep === 3) {
      return (
        <div className="space-y-4">
          <CakeDecorSelector
            value={config.decor}
            onChange={(decor) =>
              setConfig((prev) => ({
                ...prev,
                decor,
                messageText: decor.includes("topper") ? prev.messageText : "",
              }))
            }
          />

          {config.decor.includes("topper") && (
            <section className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
              <label className="block text-sm font-black text-slate-800">
                Надпись
                <input
                  value={config.messageText}
                  onChange={(event) =>
                    setConfig((prev) => ({
                      ...prev,
                      messageText: event.target.value.slice(0, 40),
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#ff398b]"
                  placeholder="Например: С днём рождения"
                />
              </label>
              <div className="mt-2 text-xs font-medium text-slate-500">
                До 40 символов, надпись попадёт в макет и заказ.
              </div>
            </section>
          )}
        </div>
      );
    }

    return (
      <CakeOptionSelector
        step={5}
        title="Упаковка"
        options={cakeOptions.packaging}
        value={config.packaging}
        onChange={(packaging) => setConfig((prev) => ({ ...prev, packaging }))}
        columns="four"
      />
    );
  };

  const isNextDisabled = activeStep === 2 && !isInnerLayerValid;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        <section className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-rose-500">
                Этап {activeStep + 1} из {steps.length}
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {steps[activeStep].title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {steps[activeStep].caption}
              </p>
            </div>
            <div className="text-sm font-black text-slate-950">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => {
              const isDone = index < activeStep;
              const isActive = index === activeStep;
              const isLockedByInnerLayer = index > 2 && !isInnerLayerValid;

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    if (isLockedByInnerLayer) return;
                    setActiveStep(index);
                  }}
                  disabled={isLockedByInnerLayer}
                  className={`min-h-18 rounded-xl border px-3 py-2 text-left transition ${
                    isActive
                      ? "border-[#ff398b] bg-rose-50 text-rose-700"
                      : isDone
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {isDone && <Check className="h-4 w-4" />}
                  </div>
                  <div className="text-sm font-black">{step.title}</div>
                </button>
              );
            })}
          </div>
        </section>

        {renderStepContent()}

        <div className="flex flex-col gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={activeStep === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:border-rose-200 hover:text-[#ff398b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
            Назад
          </button>

          {isLastStep ? (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              Проверьте итог и количество в блоке справа.
            </div>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={isNextDisabled}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff398b] px-6 py-3 font-black text-white transition hover:bg-[#e0327a] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Далее
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <CakeSummary
          config={config}
          totalPrice={totalPrice}
          quantity={quantity}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </aside>
    </div>
  );
}
