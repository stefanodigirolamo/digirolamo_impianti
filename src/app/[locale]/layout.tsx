import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import cx from "classnames";
import { dir } from "i18next";
import i18nConfig from "../../../i18nConfig";
import { Header } from "@/presentation/blocks";
import { Footer } from "@/presentation/blocks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "digirolamo-impianti",
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
          "h-screen flex flex-col justify-between",
        )}
      >
        <Header data-test-id="header" />
        <div className="overflow-y-auto">
          {children}
          <Footer data-test-id="footer" />
        </div>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({ locale }));
}
