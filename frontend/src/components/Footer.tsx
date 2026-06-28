import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t mt-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Бренд */}
        <div>
          <h3 className="text-lg font-semibold">CandyCraft</h3>
          <p className="text-sm text-gray-500 mt-2">
            {t("footer.description")}
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-medium mb-3">{t("footer.information")}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/privacy" className="hover:text-black">
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-black">
                {t("footer.contacts")}
              </a>
            </li>
            <li>
              <a href="/delivery" className="hover:text-black">
                {t("footer.delivery")}
              </a>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-medium mb-3">{t("footer.contact")}</h4>
          <p className="text-sm text-gray-600">
            {t("footer.email")}: your@email.com
          </p>
          <p className="text-sm text-gray-600">
            {t("footer.phone")}: +7 XXX XXX-XX-XX
          </p>
        </div>
      </div>

      <div className="border-t text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} CandyCraft. {t("footer.rights")}
      </div>
    </footer>
  );
}
