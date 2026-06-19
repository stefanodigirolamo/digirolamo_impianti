"use client";

import cx from "classnames";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Icon } from "@/presentation/components/Icons/Icon";
import Close from "@/presentation/components/Icons/_markup/Close";

export type DrawerMenuItem = {
  label: string;
  sectionId: string;
};

export type DrawerProps = {
  "data-test-id"?: string;
  id?: string;
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menuItems: readonly DrawerMenuItem[];
  onMenuItemClick: (sectionId: string) => void;
};

export function Drawer({
  "data-test-id": dataTestId = "main-navigation-drawer",
  id = "main-navigation-drawer",
  className,
  open,
  setOpen,
  menuItems,
  onMenuItemClick,
}: DrawerProps) {

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  const handleMenuItemClick = (sectionId: string) => {
    setOpen(false);

    window.setTimeout(() => {
      onMenuItemClick(sectionId);
    }, 150);
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cx(
          "fixed inset-0 z-40 bg-black/45 backdrop-blur-sm",
          "transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />
      <aside
        id={id}
        data-test-id={dataTestId}
        aria-label="Navigazione principale"
        aria-hidden={!open}
        className={cx(
          "fixed left-0 top-0 z-50 h-dvh",
          "w-screen md:w-60 md:max-w-none",
          "border-r border-white/15",
          "bg-[#17212b] shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-end p-4 md:p-5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Chiudi il menu"
            className="
              flex h-10 w-10 cursor-pointer items-center
              justify-center rounded-md border-0
              bg-transparent text-white
              transition-colors hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-white/70
            "
          >
            <Icon children={Close} size="s" />
          </button>
        </div>
        <nav aria-label="Menu principale" className="flex flex-col px-5">
          {menuItems.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleMenuItemClick(item.sectionId)}
              className="
                cursor-pointer border-0 border-b border-white/10
                bg-transparent px-1 py-5 text-left
                text-lg font-semibold text-white
                transition-colors hover:text-cyan-200
                focus-visible:outline-none focus-visible:text-cyan-200
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
