import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function ContactsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
        <p className="mt-2 text-gray-600">
          Свяжитесь с нами удобным способом. Мы обычно отвечаем быстро.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Левая колонка: карточки */}
        <section className="grid gap-4 lg:col-span-1">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Phone className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <a
                  className="text-base font-medium hover:underline"
                  href="tel:+79990000000"
                >
                  +7 999 000-00-00
                </a>
                <div className="mt-1 text-sm text-gray-500">
                  WhatsApp / Calls
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
                  Для заказов и вопросов
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-base font-medium">Москва, Россия</div>
                <div className="mt-1 text-sm text-gray-500">
                  Самовывоз по договорённости
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="mt-1" size={20} />
              <div>
                <div className="text-sm text-gray-500">Working hours</div>
                <div className="text-base font-medium">Пн–Пт: 10:00–19:00</div>
                <div className="mt-1 text-sm text-gray-500">
                  Сб–Вс: 11:00–16:00
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Правая колонка: текст + карта-заглушка */}
        <section className="grid gap-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">How to order</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>Напишите нам в WhatsApp / Telegram или на email.</li>
              <li>
                Укажите дату, формат набора, бюджет и пожелания по шоколаду.
              </li>
              <li>Подтверждаем детали и время получения/доставки.</li>
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1" size={18} />
                <div>
                  <div className="font-medium">Fast contact</div>
                  <div className="text-sm text-gray-600">
                    Заменишь ссылку на свой WhatsApp/Instagram позже.
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
            <h2 className="text-xl font-semibold">Map</h2>
            <p className="mt-2 text-sm text-gray-600">
              Тут можно вставить Google Maps iframe или картинку. Пока заглушка.
            </p>

            <div className="mt-4 flex h-72 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              Map placeholder
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
