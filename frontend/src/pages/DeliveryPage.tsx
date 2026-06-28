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
import { useLanguage } from "../contexts/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-rose-100 bg-linear-to-br from-rose-50 via-pink-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge>{t("delivery.badgeDelivery")}</Badge>
              <Badge>{t("delivery.badgePayment")}</Badge>
              <Badge>{t("delivery.badgeReturns")}</Badge>
            </div>

            <h1 className="mt-4 text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {t("delivery.title")}
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
              {t("delivery.description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition"
              >
                {t("delivery.catalogCta")}
              </Link>
              <a
                href="#faq"
                className="inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition"
              >
                {t("delivery.faqCta")}
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
                title={t("delivery.deliveryTitle")}
                subtitle={t("delivery.deliverySubtitle")}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  title={t("delivery.cityCourier")}
                  icon={<MapPin className="h-4 w-4" />}
                >
                  {t("delivery.cityCourierText")}
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                      {t("delivery.landmark")}
                    </span>{" "}
                    {t("delivery.cityCourierHint")}
                  </div>
                </Card>

                <Card
                  title={t("delivery.pickup")}
                  icon={<Package className="h-4 w-4" />}
                >
                  {t("delivery.pickupText")}
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                      {t("delivery.important")}
                    </span>{" "}
                    {t("delivery.pickupHint")}
                  </div>
                </Card>

                <Card
                  title={t("delivery.timing")}
                  icon={<Clock className="h-4 w-4" />}
                >
                  {t("delivery.timingText")}
                  <div className="mt-2">{t("delivery.timingHint")}</div>
                </Card>

                <Card
                  title={t("delivery.packaging")}
                  icon={<ShieldCheck className="h-4 w-4" />}
                >
                  {t("delivery.packagingText")}
                  <div className="mt-2">{t("delivery.packagingHint")}</div>
                </Card>
              </div>

              <div className="mt-5 rounded-2xl bg-rose-50 border border-rose-100 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {t("delivery.tip")}
                  </span>{" "}
                  {t("delivery.tipText")}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<CreditCard className="h-5 w-5" />}
                title={t("delivery.paymentTitle")}
                subtitle={t("delivery.paymentSubtitle")}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  title={t("delivery.cardOnline")}
                  icon={<CreditCard className="h-4 w-4" />}
                >
                  {t("delivery.cardOnlineText")}
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                      {t("delivery.plus")}
                    </span>{" "}
                    {t("delivery.cardOnlineHint")}
                  </div>
                </Card>

                <Card
                  title={t("delivery.transfer")}
                  icon={<Banknote className="h-4 w-4" />}
                >
                  {t("delivery.transferText")}
                  <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                      {t("delivery.important")}
                    </span>{" "}
                    {t("delivery.transferHint")}
                  </div>
                </Card>
              </div>

              <div className="mt-5 rounded-2xl bg-white border border-rose-100 p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("delivery.prepaymentText")}
                </p>
              </div>
            </div>

            {/* Returns */}
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t("delivery.returnsTitle")}
                subtitle={t("delivery.returnsSubtitle")}
              />

              <div className="mt-4 text-sm text-gray-600 leading-relaxed space-y-2">
                <p>{t("delivery.returnsText1")}</p>
                <p>{t("delivery.returnsText2")}</p>
              </div>
            </div>
          </div>

          {/* RIGHT (sticky summary) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">
                  {t("delivery.howToOrder")}
                </h3>

                <ol className="mt-3 space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      1
                    </span>
                    <span>{t("delivery.step1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      2
                    </span>
                    <span>{t("delivery.step2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      3
                    </span>
                    <span>{t("delivery.step3")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-[#ff398b] text-xs font-bold">
                      4
                    </span>
                    <span>{t("delivery.step4")}</span>
                  </li>
                </ol>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff398b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff2a81] active:scale-95 transition"
                  >
                    {t("delivery.cartCta")}
                  </Link>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 transition"
                  >
                    {t("header.contacts")}
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">
                  {t("delivery.helpTitle")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t("delivery.helpText")}
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-[#ff398b]" />
                    <span>{t("delivery.phoneLine")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageCircle className="h-4 w-4 text-[#ff398b]" />
                    <span>{t("delivery.messengerLine")}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-gray-700">
                  {t("delivery.holidayNote")}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-10 md:mt-12">
          <SectionTitle
            icon={<HelpCircle className="h-5 w-5" />}
            title={t("delivery.faqTitle")}
            subtitle={t("delivery.faqSubtitle")}
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FAQItem q={t("delivery.faq1q")} a={t("delivery.faq1a")} />
            <FAQItem q={t("delivery.faq2q")} a={t("delivery.faq2a")} />
            <FAQItem q={t("delivery.faq3q")} a={t("delivery.faq3a")} />
            <FAQItem q={t("delivery.faq4q")} a={t("delivery.faq4a")} />
          </div>
        </div>
      </section>
    </main>
  );
}
