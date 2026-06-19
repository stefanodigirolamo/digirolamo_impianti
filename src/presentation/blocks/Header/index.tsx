"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Row } from "@/presentation/foundations";
import { Selector } from "@/presentation/blocks";
import { Drawer } from "@/presentation/blocks/Drawer";
import { Icon } from "@/presentation/components/Icons/Icon";
import Menu from "@/presentation/components/Icons/_markup/Menu";
import { useHomepageNavigation } from "@/hooks/useHomepageNavigation";
import { useTranslation } from "react-i18next";

export type HeaderProps = {
  "data-test-id"?: string;
  className?: string;
  ref?: unknown;
};

export function Header(props: HeaderProps) {
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { homePath, navigateToSection } = useHomepageNavigation();

  const menuItems = [
    {
      label: t("header.home"),
      sectionId: "home",
    },
    {
      label: t("header.about"),
      sectionId: "about-us",
    },
    {
      label: t("header.services"),
      sectionId: "services",
    },
    {
      label: t("header.contacts"),
      sectionId: "contact-us",
    },
  ] as const;

  return (
    <>
      <Row
        data-test-id={`${props["data-test-id"] ?? "header"}-default`}
        variant="default"
        vAlignContent="center"
        className={cx(
          "grid grid-cols-3 py-2 md:py-3 justify-between",
          props.className,
        )}
        classNameOuter="w-full"
      >
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Apri il menu"
            aria-expanded={isDrawerOpen}
            aria-controls="main-navigation-drawer"
            className="
              flex h-10 w-10 cursor-pointer items-center
              justify-center rounded-md border-0
              bg-transparent text-white
              transition-colors hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white/70
            "
          >
            <Icon children={Menu} size="m" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link
            data-test-id="header-default-logo"
            href={homePath}
            prefetch={false}
            aria-label="Vai alla homepage"
            className="block"
          >
            <Image
              src="/digirolamoimpianti.svg"
              alt="digirolamoimpianti"
              priority
              width={240}
              height={40}
              className="
                h-auto w-[160px]
                md:w-[200px]
                lg:w-[240px]
              "
            />
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Selector />
        </div>
      </Row>
      <Drawer
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        menuItems={menuItems}
        onMenuItemClick={navigateToSection}
      />
    </>
  );
}
