"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Row } from "@/presentation/foundations";
import { Selector } from "@/presentation/blocks";
import { useResponsive } from "@/hooks/useResponsive";

export type HeaderProps = {
  "data-test-id"?: string;
  className?: string;
  ref?: unknown;
};

const menuItems = [
  {
    label: "Home",
    sectionId: "home",
  },
  {
    label: "Chi siamo",
    sectionId: "chi-siamo",
  },
  {
    label: "Servizi",
    sectionId: "servizi",
  },
  {
    label: "Contatti",
    sectionId: "contatti",
  },
] as const;

export function Header(props: HeaderProps) {
  const { isMd } = useResponsive();

  return isMd ? (
    <HeaderDefaultDesktop {...props} />
  ) : (
    <HeaderDefaultMobile {...props} />
  );
}

function useHomepageNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();

  const locale = typeof params.locale === "string" ? params.locale : "it";

  const homePath = `/${locale}`;

  const navigateToSection = (sectionId: string) => {
    const normalizedPathname =
      pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

    const normalizedHomePath =
      homePath.length > 1 ? homePath.replace(/\/$/, "") : homePath;

    const isHomepage = normalizedPathname === normalizedHomePath;

    if (isHomepage) {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.replaceState(null, "", `${homePath}#${sectionId}`);
      }

      return;
    }

    router.push(`${homePath}#${sectionId}`);
  };

  return {
    homePath,
    navigateToSection,
  };
}

function HeaderDefaultDesktop(props: HeaderProps) {
  const { homePath, navigateToSection } = useHomepageNavigation();

  return (
    <Row
      data-test-id={`${props["data-test-id"] ?? "header"}-desktop`}
      variant="default"
      vAlignContent="center"
      className={cx(
        "justify-between border-b border-white/30 py-3",
        props.className,
      )}
      classNameOuter="w-full"
    >
      <Link
        data-test-id="header-default-logo-desktop"
        prefetch={false}
        href={homePath}
        aria-label="Vai alla homepage"
      >
        <Image
          className="relative"
          src="/digirolamoimpianti.svg"
          alt="Digirolamo Impianti"
          priority
          width={240}
          height={40}
          style={{
            width: 240,
            height: 40,
          }}
        />
      </Link>

      <nav
        aria-label="Navigazione principale"
        className="flex items-center gap-8"
      >
        {menuItems.map((item) => (
          <button
            key={item.sectionId}
            type="button"
            onClick={() => navigateToSection(item.sectionId)}
            className="
              relative cursor-pointer border-0 bg-transparent
              px-0 py-2 text-sm font-semibold text-white
              transition-colors duration-200
              hover:text-blue-200
              after:absolute after:bottom-0 after:left-0
              after:h-px after:w-0 after:bg-white
              after:transition-all after:duration-200
              hover:after:w-full
            "
          >
            {item.label}
          </button>
        ))}
      </nav>

      <Selector />
    </Row>
  );
}

function HeaderDefaultMobile(props: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { homePath, navigateToSection } = useHomepageNavigation();

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const handleMenuClick = (sectionId: string) => {
    setIsDrawerOpen(false);

    window.setTimeout(() => {
      navigateToSection(sectionId);
    }, 150);
  };

  return (
    <>
      <Row
        data-test-id={`${props["data-test-id"] ?? "header"}-mobile`}
        variant="default"
        vAlignContent="center"
        className={cx(
          "justify-between border-b border-white/30 py-2",
          props.className,
        )}
        classNameOuter="w-full"
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Apri il menu"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-navigation"
          className="
            flex h-10 w-10 cursor-pointer items-center
            justify-center rounded-md border-0
            bg-transparent text-white
            transition-colors hover:bg-white/10
          "
        >
          <BurgerIcon />
        </button>

        <Link
          data-test-id="header-default-logo-mobile"
          href={homePath}
          aria-label="Vai alla homepage"
        >
          <Image
            src="/digirolamoimpianti.svg"
            alt="Digirolamo Impianti"
            priority
            width={160}
            height={30}
            style={{
              width: 160,
              height: 30,
            }}
          />
        </Link>

        <Selector />
      </Row>

      <div
        className={cx(
          "fixed inset-0 z-40 bg-black/45 backdrop-blur-sm",
          "transition-opacity duration-300",
          isDrawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        aria-label="Navigazione mobile"
        className={cx(
          "fixed left-0 top-0 z-50 h-dvh w-[82%] max-w-80",
          "border-r border-white/15",
          "bg-[#17212b] shadow-2xl",
          "transition-transform duration-300 ease-out",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/15 p-5">
          <Image
            src="/digirolamoimpianti.svg"
            alt="Digirolamo Impianti"
            width={180}
            height={34}
          />

          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Chiudi il menu"
            className="
              flex h-10 w-10 cursor-pointer items-center
              justify-center rounded-md border-0
              bg-transparent text-white
              transition-colors hover:bg-white/10
            "
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-8">
          {menuItems.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleMenuClick(item.sectionId)}
              className="
                cursor-pointer border-0 border-b border-white/10
                bg-transparent px-1 py-5 text-left
                text-lg font-semibold text-white
                transition-colors hover:text-blue-200
              "
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

function BurgerIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
