import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import cx from "classnames";
import { dir } from "i18next";
import i18nConfig from "../../../i18nConfig";
import { Space } from "@/presentation/foundations/Space";
import { Header } from "@/presentation/blocks";
import { Footer } from "@/presentation/blocks";
import { spaceUnit } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "test_app",
  description: "nextjs ecommerce template app",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={cx(
          inter.className,
          "h-screen flex flex-col items-between justify-between",
        )}
      >
        <Header data-test-id="header" />
        <div className="overflow-y-auto">{children}</div>
        <Footer data-test-id="footer" />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({ locale }));
}
