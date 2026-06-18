import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../public/locales/en/home.json";
import it from "../../public/locales/it/home.json";

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: "it",
    fallbackLng: "it",
    supportedLngs: ["it", "en"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;