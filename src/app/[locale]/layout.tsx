import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import cx from "classnames";
import { dir } from "i18next";
import "../globals.css";
import i18nConfig from "../../../i18nConfig";
import { Footer, Header } from "@/presentation/blocks";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'digirolamoimpianti',
    template: '%s | digirolamoimpianti',
  },
  description:
    'digirolamoimpianti — installazione e manutenzione di impianti fotovoltaici.',
  applicationName: 'digirolamoimpianti',
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#17212b",
  colorScheme: "dark",
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
    <html
      lang={locale}
      dir={dir(locale)}
      className="min-h-full bg-[#17212b]"
      suppressHydrationWarning
    >
      <body
        className={cx(inter.className, "min-h-dvh bg-[#17212b] text-white")}
      >
        <Header data-test-id="header" />
        <div className="min-h-dvh w-full bg-[#17212b]">{children}</div>
        <Footer data-test-id="footer" />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({
    locale,
  }));
}
