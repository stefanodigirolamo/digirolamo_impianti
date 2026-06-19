"use client";

import { useEffect, useState } from "react";
import { createInstance, type i18n } from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import en from "../../../public/locales/en/home.json";
import it from "../../../public/locales/it/home.json";

type I18nProviderProps = {
  children: React.ReactNode;
  locale: string;
};

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
} as const;

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const [instance, setInstance] = useState<i18n | null>(null);
  const normalizedLocale = locale === "en" ? "en" : "it";

  useEffect(() => {
    let active = true;

    const initializeI18n = async () => {
      const newInstance = createInstance();

      await newInstance.use(initReactI18next).init({
        resources,
        lng: normalizedLocale,
        fallbackLng: "it",
        supportedLngs: ["it", "en"],
        defaultNS: "translation",
        ns: ["translation"],
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });

      if (active) {
        setInstance(newInstance);
      }
    };

    void initializeI18n();

    return () => {
      active = false;
    };
  }, [normalizedLocale]);

  if (!instance) {
    return null;
  }

  return (
    <I18nextProvider
      key={normalizedLocale}
      i18n={instance}
      defaultNS="translation"
    >
      {children}
    </I18nextProvider>
  );
}
