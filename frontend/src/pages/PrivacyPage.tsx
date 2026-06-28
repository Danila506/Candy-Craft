// src/pages/PrivacyPage.tsx
import { Link } from "react-router-dom";

export function PrivacyPage() {
  const lastUpdated = "20 июня 2026";

  return (
    <main className="min-h-[calc(100vh-120px)] bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Вернуться в каталог
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Политика обработки персональных данных
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Дата обновления: {lastUpdated}
          </p>
        </header>

        <article className="prose prose-gray max-w-none">
          <p>
            Настоящая политика описывает, какие персональные данные могут
            обрабатываться на сайте Candy Craft и для каких целей они
            используются.
          </p>

          <h2>1. Какие данные обрабатываются</h2>
          <p>Сайт может обрабатывать следующие данные:</p>
          <ul>
            <li>имя и фамилию;</li>
            <li>email;</li>
            <li>номер телефона;</li>
            <li>адрес доставки;</li>
            <li>состав заказа и комментарии к заказу;</li>
            <li>технические данные, необходимые для работы сайта.</li>
          </ul>

          <h2>2. Цели обработки</h2>
          <p>Данные используются для:</p>
          <ul>
            <li>регистрации и авторизации пользователя;</li>
            <li>оформления и обработки заказов;</li>
            <li>связи с пользователем по заказу или обращению;</li>
            <li>работы корзины и личного кабинета;</li>
            <li>обеспечения безопасности сайта.</li>
          </ul>

          <h2>3. Передача данных третьим лицам</h2>
          <p>
            Данные могут передаваться только в случаях, необходимых для работы
            сайта и исполнения заказа, например платежному провайдеру или службе
            доставки. Данные не продаются и не передаются для сторонней рекламы.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Сайт использует cookies и аналогичные технические механизмы для
            авторизации, поддержания сессии пользователя, работы корзины и
            обеспечения безопасности.
          </p>

          <h2>5. Хранение и защита данных</h2>
          <p>
            Данные хранятся в информационной системе сайта и используются только
            в объеме, необходимом для работы сервиса. Пароли пользователей не
            хранятся в открытом виде.
          </p>

          <h2>6. Права пользователя</h2>
          <p>Пользователь может запросить:</p>
          <ul>
            <li>уточнение своих данных;</li>
            <li>удаление аккаунта или отдельных данных;</li>
            <li>информацию о целях обработки данных.</li>
          </ul>

          <h2>7. Контакты</h2>
          <p>
            По вопросам обработки персональных данных можно написать на email:{" "}
            <a href="mailto:belakdanila9@gmail.com">belakdanila9@gmail.com</a>
          </p>
        </article>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
          >
            Продолжить покупки
          </Link>
          <a
            href="mailto:belakdanila9@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Написать на email
          </a>
        </div>
      </div>
    </main>
  );
}
