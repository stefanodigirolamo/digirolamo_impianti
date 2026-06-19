"use client";

import { useParams } from "next/navigation";

type Locale = "it" | "en";

export function Selector() {
  const params = useParams<{ locale?: string }>();
  const currentLocale: Locale = params.locale === "en" ? "en" : "it";

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) {
      return;
    }

    const segments = window.location.pathname
      .split("/")
      .filter(Boolean);

    if (segments[0] === "it" || segments[0] === "en") {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const nextPathname = `/${segments.join("/")}`;
    const currentHash = window.location.hash;

    window.location.assign(`${nextPathname}${currentHash}`);
  };

  return (
    <select
      value={currentLocale}
      onChange={(event) => {
        handleLocaleChange(event.target.value as Locale);
      }}
      aria-label="Seleziona lingua"
      className="bg-transparent text-white"
    >
      <option value="it">IT</option>
      <option value="en">EN</option>
    </select>
  );
}