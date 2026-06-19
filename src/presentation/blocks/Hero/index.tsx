"use client";

import cx from "classnames";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type HeroProps = {
  src: string | StaticImageData;
  alt?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  heightClassName?: string;
  priority?: boolean;
  sizes?: ImageProps["sizes"];
  showContent?: boolean;
};

export function Hero({
  src,
  alt = "",
  eyebrow,
  title,
  description,
  className,
  imageClassName,
  contentClassName,
  heightClassName = "h-[650px] md:h-[750px]",
  priority = false,
  sizes = "100vw",
  showContent = true,
}: HeroProps) {
  return (
    <div
      className={cx(
        "group relative w-full overflow-hidden rounded-md",
        heightClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cx(
          `
            object-cover
            animate-[image-viewer-zoom_14s_ease-in-out_infinite_alternate]
            transition-transform duration-700
            group-hover:scale-[1.03]
          `,
          imageClassName,
        )}
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r
          from-[#101820]/85
          via-[#101820]/35
          to-transparent
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          h-2/5
          bg-gradient-to-b
          from-transparent
          to-[#17212b]
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 top-1/3
          h-72 w-72 rounded-full
          bg-cyan-400/15 blur-3xl
          animate-[image-viewer-glow_6s_ease-in-out_infinite]
        "
      />
      {showContent && (
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 md:px-12 lg:px-20">
            <div
              className={cx(
                `
                  max-w-xl rounded-xl
                  border border-white/15
                  bg-black/15 p-6
                  shadow-2xl backdrop-blur-sm
                  md:p-9
                `,
                contentClassName,
              )}
            >
              {eyebrow && (
                <div className="mb-5 flex items-center gap-3">
                  <span className="relative h-px w-12 overflow-hidden bg-white/25">
                    <span
                      className="
                        absolute inset-y-0 left-0 w-5
                        animate-[image-viewer-pulse_2.8s_linear_infinite]
                        bg-gradient-to-r
                        from-transparent
                        via-cyan-200
                        to-transparent
                      "
                    />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                    {eyebrow}
                  </span>
                </div>
              )}
              {title && (
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  {title}
                </h1>
              )}
              {description && (
                <div className="mt-5 max-w-lg text-sm leading-7 text-white/75 md:text-base">
                  {description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
