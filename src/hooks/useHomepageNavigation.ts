"use client";

import { useParams, usePathname } from "next/navigation";

export function useHomepageNavigation() {
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const locale = params.locale === "it" ? "it" : "en";
  const homePath = locale === "it" ? "/it" : "/";

  const navigateToSection = (sectionId: string) => {
    const normalizedPathname =
      pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

    const normalizedHomePath =
      homePath.length > 1 ? homePath.replace(/\/$/, "") : homePath;

    const isHomepage = normalizedPathname === normalizedHomePath;
    const targetUrl = `${homePath}#${sectionId}`;

    if (!isHomepage) {
      window.location.assign(targetUrl);
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    window.history.pushState(null, "", targetUrl);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return {
    homePath,
    navigateToSection,
  };
}