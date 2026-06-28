// src/pages/PrivacyPage.tsx
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[calc(100vh-120px)] bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            {t("privacy.back")}
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("privacy.title")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("privacy.updated")} {t("privacy.date")}
          </p>
        </header>

        <article className="prose prose-gray max-w-none">
          <p>{t("privacy.intro")}</p>

          <h2>{t("privacy.section1")}</h2>
          <p>{t("privacy.section1Text")}</p>
          <ul>
            <li>{t("privacy.itemName")}</li>
            <li>email;</li>
            <li>{t("privacy.itemPhone")}</li>
            <li>{t("privacy.itemAddress")}</li>
            <li>{t("privacy.itemOrder")}</li>
            <li>{t("privacy.itemTech")}</li>
          </ul>

          <h2>{t("privacy.section2")}</h2>
          <p>{t("privacy.section2Text")}</p>
          <ul>
            <li>{t("privacy.purposeAuth")}</li>
            <li>{t("privacy.purposeOrders")}</li>
            <li>{t("privacy.purposeContact")}</li>
            <li>{t("privacy.purposeCart")}</li>
            <li>{t("privacy.purposeSecurity")}</li>
          </ul>

          <h2>{t("privacy.section3")}</h2>
          <p>{t("privacy.section3Text")}</p>

          <h2>{t("privacy.section4")}</h2>
          <p>{t("privacy.section4Text")}</p>

          <h2>{t("privacy.section5")}</h2>
          <p>{t("privacy.section5Text")}</p>

          <h2>{t("privacy.section6")}</h2>
          <p>{t("privacy.section6Text")}</p>
          <ul>
            <li>{t("privacy.rightsClarify")}</li>
            <li>{t("privacy.rightsDelete")}</li>
            <li>{t("privacy.rightsInfo")}</li>
          </ul>

          <h2>{t("privacy.section7")}</h2>
          <p>
            {t("privacy.section7Text")}{" "}
            <a href="mailto:belakdanila9@gmail.com">belakdanila9@gmail.com</a>
          </p>
        </article>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
          >
            {t("privacy.continue")}
          </Link>
          <a
            href="mailto:belakdanila9@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {t("privacy.emailCta")}
          </a>
        </div>
      </div>
    </main>
  );
}
