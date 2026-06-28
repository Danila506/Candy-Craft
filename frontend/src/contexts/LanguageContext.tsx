/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "ru" | "he";

type TranslationKey =
  | "header.deliveryNotice"
  | "header.openMenu"
  | "header.closeMenu"
  | "header.homeLabel"
  | "header.catalog"
  | "header.constructor"
  | "header.delivery"
  | "header.contacts"
  | "header.search"
  | "header.account"
  | "header.cart"
  | "header.language"
  | "authWarn.title"
  | "authWarn.description"
  | "authWarn.close"
  | "authWarn.login"
  | "catalog.allProducts"
  | "catalog.searchPlaceholder"
  | "catalog.searchAria"
  | "catalog.sortAria"
  | "catalog.filters"
  | "catalog.reset"
  | "catalog.inStockOnly"
  | "catalog.upTo"
  | "catalog.emptyTitle"
  | "catalog.emptyDescription"
  | "catalog.resetFilters"
  | "catalog.apply"
  | "catalog.sortPopular"
  | "catalog.sortCheap"
  | "catalog.sortExpensive"
  | "catalog.sortNew"
  | "product.noPhoto"
  | "product.category"
  | "product.outOfStock"
  | "product.inStock"
  | "product.inCart"
  | "product.price"
  | "product.alreadyInCartAria"
  | "product.outOfStockAria"
  | "product.addToCartPrefix"
  | "product.addToCartSuffix"
  | "product.addToCart"
  | "contact.title"
  | "contact.badge"
  | "contact.description"
  | "contact.location"
  | "contact.locationValue"
  | "contact.phone"
  | "contact.email"
  | "contact.instagram"
  | "contact.responseTime"
  | "contact.responseTimeDescription"
  | "contact.successTitle"
  | "contact.successDescription"
  | "contact.sendAnother"
  | "contact.nameLabel"
  | "contact.requiredName"
  | "contact.emailLabel"
  | "contact.requiredEmail"
  | "contact.invalidEmail"
  | "contact.phoneLabel"
  | "contact.shortPhone"
  | "contact.messageLabel"
  | "contact.requiredMessage"
  | "contact.messagePlaceholder"
  | "contact.defaultServerError"
  | "contact.consentRequired"
  | "contact.consentStart"
  | "contact.privacyPolicy"
  | "contact.submit"
  | "contact.submitting"
  | "contact.dataNotice";

type Dictionary = Record<TranslationKey, string>;

const dictionaries: Record<Language, Dictionary> = {
  ru: {
    "header.deliveryNotice":
      "Доставка по Биробиджану • Заказы на сегодня до 18:00",
    "header.openMenu": "Открыть меню",
    "header.closeMenu": "Закрыть меню",
    "header.homeLabel": "CandyCraft — на главную",
    "header.catalog": "Каталог",
    "header.constructor": "Конструктор",
    "header.delivery": "Доставка и оплата",
    "header.contacts": "Контакты",
    "header.search": "Поиск",
    "header.account": "Аккаунт",
    "header.cart": "Корзина",
    "header.language": "Переключить язык на иврит",
    "authWarn.title": "Вы не авторизованы",
    "authWarn.description": "Авторизуйтесь, чтобы добавлять товары в корзину",
    "authWarn.close": "Закрыть",
    "authWarn.login": "Войти",
    "catalog.allProducts": "Все товары",
    "catalog.searchPlaceholder": "Поиск по каталогу",
    "catalog.searchAria": "Поиск по товарам",
    "catalog.sortAria": "Сортировка товаров",
    "catalog.filters": "Фильтры",
    "catalog.reset": "Сбросить",
    "catalog.inStockOnly": "Только в наличии",
    "catalog.upTo": "До",
    "catalog.emptyTitle": "Ничего не найдено",
    "catalog.emptyDescription": "Попробуйте изменить фильтры или сбросьте их.",
    "catalog.resetFilters": "Сбросить фильтры",
    "catalog.apply": "Применить",
    "catalog.sortPopular": "Сначала популярные",
    "catalog.sortCheap": "Сначала дешевле",
    "catalog.sortExpensive": "Сначала дороже",
    "catalog.sortNew": "Сначала новые",
    "product.noPhoto": "Нет фото",
    "product.category": "Категория",
    "product.outOfStock": "Нет в наличии",
    "product.inStock": "В наличии",
    "product.inCart": "В корзине",
    "product.price": "Цена",
    "product.alreadyInCartAria": "Товар уже в корзине",
    "product.outOfStockAria": "Товара нет в наличии",
    "product.addToCartPrefix": "Добавить",
    "product.addToCartSuffix": "в корзину",
    "product.addToCart": "В корзину",
    "contact.title": "Свяжитесь с нами",
    "contact.badge": "Candy Craft",
    "contact.description":
      "Вопрос, индивидуальный заказ или сотрудничество — напишите, ответим быстро",
    "contact.location": "Локация",
    "contact.locationValue": "Россия",
    "contact.phone": "Телефон",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "contact.responseTime": "Время ответа",
    "contact.responseTimeDescription": "Обычно отвечаем в течение 24 часов.",
    "contact.successTitle": "Спасибо! Сообщение отправлено",
    "contact.successDescription": "Мы свяжемся с вами как можно скорее.",
    "contact.sendAnother": "Отправить ещё одно",
    "contact.nameLabel": "Ваше имя",
    "contact.requiredName": "Введите имя",
    "contact.emailLabel": "Email",
    "contact.requiredEmail": "Введите email",
    "contact.invalidEmail": "Введите корректный email",
    "contact.phoneLabel": "Телефон (опционально)",
    "contact.shortPhone": "Похоже, телефон слишком короткий",
    "contact.messageLabel": "Сообщение",
    "contact.requiredMessage": "Напишите сообщение",
    "contact.messagePlaceholder":
      "Например: хочу торт на день рождения, 19.5 см, на 25 человек...",
    "contact.defaultServerError":
      "Не удалось отправить сообщение. Попробуйте ещё раз.",
    "contact.consentRequired":
      "Необходимо согласие на обработку персональных данных",
    "contact.consentStart":
      "Я согласен на обработку персональных данных для ответа на запрос и ознакомлен с",
    "contact.privacyPolicy": "политикой конфиденциальности",
    "contact.submit": "Отправить",
    "contact.submitting": "Отправляю...",
    "contact.dataNotice": "Данные используются только для обработки обращения.",
  },
  he: {
    "header.deliveryNotice": "משלוחים בבירוביג'ן • הזמנות להיום עד 18:00",
    "header.openMenu": "פתח תפריט",
    "header.closeMenu": "סגור תפריט",
    "header.homeLabel": "CandyCraft - לעמוד הראשי",
    "header.catalog": "קטלוג",
    "header.constructor": "בונה עוגות",
    "header.delivery": "משלוח ותשלום",
    "header.contacts": "יצירת קשר",
    "header.search": "חיפוש",
    "header.account": "חשבון",
    "header.cart": "עגלה",
    "header.language": "החלף שפה לרוסית",
    "authWarn.title": "אינך מחובר",
    "authWarn.description": "התחבר כדי להוסיף מוצרים לעגלה",
    "authWarn.close": "סגור",
    "authWarn.login": "כניסה",
    "catalog.allProducts": "כל המוצרים",
    "catalog.searchPlaceholder": "חיפוש בקטלוג",
    "catalog.searchAria": "חיפוש מוצרים",
    "catalog.sortAria": "מיון מוצרים",
    "catalog.filters": "מסננים",
    "catalog.reset": "איפוס",
    "catalog.inStockOnly": "רק במלאי",
    "catalog.upTo": "עד",
    "catalog.emptyTitle": "לא נמצאו מוצרים",
    "catalog.emptyDescription": "נסו לשנות את המסננים או לאפס אותם.",
    "catalog.resetFilters": "אפס מסננים",
    "catalog.apply": "החל",
    "catalog.sortPopular": "הפופולריים קודם",
    "catalog.sortCheap": "הזולים קודם",
    "catalog.sortExpensive": "היקרים קודם",
    "catalog.sortNew": "החדשים קודם",
    "product.noPhoto": "אין תמונה",
    "product.category": "קטגוריה",
    "product.outOfStock": "אזל מהמלאי",
    "product.inStock": "במלאי",
    "product.inCart": "בעגלה",
    "product.price": "מחיר",
    "product.alreadyInCartAria": "המוצר כבר בעגלה",
    "product.outOfStockAria": "המוצר אינו במלאי",
    "product.addToCartPrefix": "הוסף את",
    "product.addToCartSuffix": "לעגלה",
    "product.addToCart": "לעגלה",
    "contact.title": "צרו איתנו קשר",
    "contact.badge": "Candy Craft",
    "contact.description":
      "שאלה, הזמנה אישית או שיתוף פעולה? כתבו לנו ונחזור במהירות",
    "contact.location": "מיקום",
    "contact.locationValue": "רוסיה",
    "contact.phone": "טלפון",
    "contact.email": "אימייל",
    "contact.instagram": "אינסטגרם",
    "contact.responseTime": "זמן מענה",
    "contact.responseTimeDescription": "בדרך כלל אנחנו עונים בתוך 24 שעות.",
    "contact.successTitle": "תודה! ההודעה נשלחה",
    "contact.successDescription": "ניצור איתך קשר בהקדם האפשרי.",
    "contact.sendAnother": "שליחת הודעה נוספת",
    "contact.nameLabel": "השם שלך",
    "contact.requiredName": "יש להזין שם",
    "contact.emailLabel": "אימייל",
    "contact.requiredEmail": "יש להזין אימייל",
    "contact.invalidEmail": "יש להזין אימייל תקין",
    "contact.phoneLabel": "טלפון (אופציונלי)",
    "contact.shortPhone": "נראה שמספר הטלפון קצר מדי",
    "contact.messageLabel": "הודעה",
    "contact.requiredMessage": "יש לכתוב הודעה",
    "contact.messagePlaceholder":
      "לדוגמה: אני רוצה עוגת יום הולדת, 19.5 ס״מ, ל-25 אנשים...",
    "contact.defaultServerError": "לא הצלחנו לשלוח את ההודעה. נסו שוב.",
    "contact.consentRequired": "נדרשת הסכמה לעיבוד נתונים אישיים",
    "contact.consentStart":
      "אני מסכים/ה לעיבוד נתונים אישיים לצורך מענה לפנייה וקראתי את",
    "contact.privacyPolicy": "מדיניות הפרטיות",
    "contact.submit": "שליחה",
    "contact.submitting": "שולח...",
    "contact.dataNotice": "הנתונים משמשים רק לטיפול בפנייה.",
  },
};

type LanguageContextValue = {
  language: Language;
  isHebrew: boolean;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ru";
    return window.localStorage.getItem("candycraft-language") === "he"
      ? "he"
      : "ru";
  });

  const isHebrew = language === "he";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isHebrew ? "rtl" : "ltr";
    window.localStorage.setItem("candycraft-language", language);
  }, [isHebrew, language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "ru" ? "he" : "ru"));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dictionaries[language][key],
    [language],
  );

  const value = useMemo(
    () => ({ language, isHebrew, toggleLanguage, t }),
    [isHebrew, language, t, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
