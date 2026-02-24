import { Link } from "react-router-dom";
import {
  Truck,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
  ShieldCheck,
  Package,
  Phone,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const SectionTitle = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-[#ff398b] border border-rose-100">
      {icon}
    </div>
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  </div>
);

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="h-full rounded-2xl border border-rose-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-[#ff398b] border border-rose-100">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="mt-3 text-sm text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-medium text-[#ff398b]">
    {children}
  </span>
);

const FAQItem = ({ q, a }: { q: string; a: React.ReactNode }) => (
  <details className="group rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-[#ff398b]" />
        <span className="text-sm font-semibold text-gray-900">{q}</span>
      </div>
      <span className="text-gray-400 group-open:rotate-180 transition-transform">
        ⌄
      </span>
    </summary>
    <div className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</div>
  </details>
);

export function DeliveryPayment() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-rose-100 bg-linear-to-br from-rose-50 via-pink-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge>Доставка</Badge>
              <Badge>Оплата</Badge>
              <Badge>Возврат</Badge>
            </div>

            <h1 className="mt-4 text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Доставка и оплата
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
              Здесь собрали все важное: сроки, способы доставки, варианты оплаты
              и ответы на частые вопросы. Если нужна помощь — напишите нам,
              подскажем.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition"
              >
                Перейти в каталог
              </Link>
              <a
                href="#faq"
                className="inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition"
              >
                Частые вопросы
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery */}
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<Truck className="h-5 w-5" />}
                title="Доставка"
                subtitle="Доставляем аккуратно, чтобы сладости приехали красивыми и целыми."
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  title="Курьер по городу"
                  icon={<MapPin className="h-4 w-4" />}
                >
                  Доставка курьером по городу и ближайшим районам. Стоимость и
                  время зависят от адреса.
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                      Ориентир:
                    </span>{" "}
                    1–3 часа или в удобный интервал.
                  </div>
                </Card>

                <Card title="Самовывоз" icon={<Package className="h-4 w-4" />}>
                  Можно забрать заказ самостоятельно по предварительной
                  договоренности.
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">Важно:</span>{" "}
                    подтвердим время выдачи в сообщениях.
                  </div>
                </Card>

                <Card title="Сроки" icon={<Clock className="h-4 w-4" />}>
                  Обычно готовим и отправляем в день заказа или на следующий —
                  зависит от загруженности и наличия.
                  <div className="mt-2">
                    Для больших заказов — согласуем заранее.
                  </div>
                </Card>

                <Card
                  title="Упаковка"
                  icon={<ShieldCheck className="h-4 w-4" />}
                >
                  Упаковываем так, чтобы ничего не помялось: фиксация внутри
                  коробки, защитные слои, аккуратная подача.
                  <div className="mt-2">
                    Можно добавить открытку и пожелание.
                  </div>
                </Card>
              </div>

              <div className="mt-5 rounded-2xl bg-rose-50 border border-rose-100 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Совет:</span>{" "}
                  если заказ на подарок к точному времени — оформляйте заранее,
                  чтобы мы закрепили слот доставки.
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<CreditCard className="h-5 w-5" />}
                title="Оплата"
                subtitle="Выберите удобный способ оплаты — быстро и безопасно."
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  title="Картой онлайн"
                  icon={<CreditCard className="h-4 w-4" />}
                >
                  Оплата банковской картой через безопасный платежный сервис
                  (при наличии в проекте).
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">Плюс:</span>{" "}
                    быстрее подтверждение заказа.
                  </div>
                </Card>

                <Card title="Перевод" icon={<Banknote className="h-4 w-4" />}>
                  Перевод на карту/счет. Реквизиты отправим после оформления.
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">Важно:</span>{" "}
                    сохраните чек до получения.
                  </div>
                </Card>
              </div>

              <div className="mt-5 rounded-2xl bg-white border border-rose-100 p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Для некоторых товаров/дат можем попросить{" "}
                  <span className="font-semibold text-gray-900">
                    предоплату
                  </span>{" "}
                  — это фиксирует бронь и время доставки.
                </p>
              </div>
            </div>

            {/* Returns */}
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Возврат и замена"
                subtitle="Сладости — товар деликатный, но мы решаем вопросы по-человечески."
              />

              <div className="mt-4 text-sm text-gray-600 leading-relaxed space-y-2">
                <p>
                  Если вы получили заказ с проблемой (повреждение, ошибка в
                  позиции), напишите нам в течение{" "}
                  <span className="font-semibold text-gray-900">2 часов</span>{" "}
                  после получения и приложите фото.
                </p>
                <p>
                  Мы предложим замену/компенсацию в зависимости от ситуации. Для
                  заказов на самовывоз — проверяйте заказ при получении.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT (sticky summary) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">
                  Как заказать
                </h3>

                <ol className="mt-3 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      1
                    </span>
                    <span>Выберите товары и добавьте в корзину.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      2
                    </span>
                    <span>Оформите заказ и укажите адрес/время.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      3
                    </span>
                    <span>Оплатите удобным способом.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      4
                    </span>
                    <span>Получите заказ — красиво и вовремя.</span>
                  </li>
                </ol>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition"
                  >
                    Перейти в корзину
                  </Link>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition"
                  >
                    Контакты
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">
                  Нужна помощь?
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Напишите нам — ответим быстро и поможем оформить заказ.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-[#ff398b]" />
                    <span>Телефон: +7 (999) 000-00-00</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageCircle className="h-4 w-4 text-[#ff398b]" />
                    <span>WhatsApp/Telegram: @candycraft</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-gray-700">
                  Сроки и стоимость доставки могут меняться в праздничные дни —
                  уточним при оформлении.
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-10 md:mt-12">
          <SectionTitle
            icon={<HelpCircle className="h-5 w-5" />}
            title="Частые вопросы"
            subtitle="Собрали ответы на самые популярные вопросы по доставке и оплате."
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FAQItem
              q="Можно ли доставить в определенное время?"
              a={
                <>
                  Да. Укажите желаемый интервал при оформлении — мы подтвердим,
                  если слот свободен. В праздники лучше оформлять заранее.
                </>
              }
            />
            <FAQItem
              q="Можно ли изменить адрес после оформления?"
              a={
                <>
                  Можно, если заказ ещё не передан курьеру. Напишите нам как
                  можно быстрее — скорректируем.
                </>
              }
            />
            <FAQItem
              q="Есть ли доставка в другие города?"
              a={
                <>
                  Пока работаем в пределах города/районов. Если нужно —
                  напишите, иногда можем согласовать индивидуально.
                </>
              }
            />
            <FAQItem
              q="Как работает предоплата?"
              a={
                <>
                  Предоплата фиксирует заказ и время доставки, особенно на
                  популярные даты. Реквизиты пришлём после оформления.
                </>
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
