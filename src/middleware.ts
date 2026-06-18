import { i18nRouter } from "next-i18n-router";
import acceptLanguage from "accept-language";
import { NextRequest } from "next/server";
import i18nConfig from "../i18nConfig";

acceptLanguage.languages([...i18nConfig.locales]);

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};