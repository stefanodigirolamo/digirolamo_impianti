"use client";

import i18nConfig from "../../../../i18nConfig";
import Cookies from "js-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

export function Selector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();

  const currentLocale =
    typeof params.locale === "string"
      ? params.locale
      : i18nConfig.defaultLocale;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    Cookies.set("NEXT_LOCALE", newLocale, {
      expires: 30,
      path: "/",
      sameSite: "lax",
    });

    const segments = pathname.split("/").filter(Boolean);

    if (i18nConfig.locales.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    router.push(`/${segments.join("/")}`);
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      aria-label="Select language"
      className="!bg-transparent font-semibold outline-none text-white text-xs"
    >
      <option value="it">IT</option>
      <option value="en">EN</option>
    </select>
  );
}
