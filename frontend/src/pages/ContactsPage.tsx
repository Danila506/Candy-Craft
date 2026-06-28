import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ContactsPage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("contacts.title")}
        </h1>
        <p className="mt-2 text-gray-600">{t("contacts.description")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Левая колонка: карточки */}
        <section className="grid gap-4 lg:col-span-1">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">{t("footer.phone")}</div>
                <a
                  className="text-base font-medium hover:underline"
                  href="tel:+79990000000"
                >
                  +7 999 000-00-00
                </a>
                <div className="mt-1 text-sm text-gray-500">
                  {t("contacts.phoneNote")}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Mail className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <a
                  className="text-base font-medium hover:underline"
                  href="mailto:hello@candycraft.com"
                >
                  hello@candycraft.com
                </a>
                <div className="mt-1 text-sm text-gray-500">
                  {t("contacts.emailNote")}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">
                  {t("contacts.location")}
                </div>
                <div className="text-base font-medium">
                  {t("contacts.locationValue")}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {t("contacts.pickupNote")}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">
                  {t("contacts.hours")}
                </div>
                <div className="text-base font-medium">
                  {t("contacts.weekdays")}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {t("contacts.weekend")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Правая колонка: текст + карта */}
        <section className="grid gap-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              {t("contacts.howToOrder")}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>{t("contacts.orderStep1")}</li>
              <li>{t("contacts.orderStep2")}</li>
              <li>{t("contacts.orderStep3")}</li>
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1" size={18} />
                <div>
                  <div className="font-medium">{t("contacts.fastContact")}</div>
                  <div className="text-sm text-gray-600">
                    {t("contacts.fastContactText")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href="#"
                      className="rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="#"
                      className="rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{t("contacts.map")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("contacts.mapText")}
            </p>

            <div className="mt-4 flex h-72 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              {t("contacts.route")}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
