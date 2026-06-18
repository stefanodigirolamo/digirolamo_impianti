"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/client";

type I18nProviderProps = {
  children: React.ReactNode;
  locale: string;
};

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
