import { ArrowLeft, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { CakeConstructor } from "./CakeConstructor";

export function CakeConstructorPage() {
  return (
    <main className="min-h-screen bg-[#fff8ef]">
      <section className="border-b border-amber-100 bg-[linear-gradient(135deg,#fff8ef,#fffafb)]">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#ff398b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться в каталог
          </Link>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
              <Layers3 className="h-4 w-4" />
              Пошаговый конструктор
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Соберите торт по этапам
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Сначала задайте размер и форму, затем наружный ряд конфет,
              внутренний слой, декор и упаковку. Итоговая стоимость обновляется
              на каждом шаге.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <CakeConstructor />
      </section>
    </main>
  );
}
