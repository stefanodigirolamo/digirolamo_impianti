"use client";

import { useTranslation } from "react-i18next";
import { Box, Row } from "@/presentation/foundations";
import { Heading } from "@/presentation/foundations/Typography";

export type AboutUsProps = {
  "data-test-id"?: string;
  className?: string;
};

export function AboutUs({
  "data-test-id": dataTestId = "about-us",
  className,
}: AboutUsProps) {
  const { t } = useTranslation();
  return (
    <Box
      as="section"
      data-test-id={dataTestId}
      className={`
        relative w-full overflow-hidden py-16 md:py-24
        ${className ?? ""}
      `}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-28 top-20
          h-80 w-80 rounded-full
          bg-cyan-400/10 blur-3xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-28 bottom-16
          h-72 w-72 rounded-full
          bg-blue-500/10 blur-3xl
        "
      />
      <Row
        variant="full"
        column
        className="relative z-10 gap-12"
        classNameOuter="w-full"
      >
        <div className="grid w-full gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
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
                {t("about.eyebrow")}
              </span>
            </div>
            <Heading
              size="xl"
              className="
                max-w-xl font-semibold leading-tight text-white
                md:text-5xl
              "
            >
              {t("about.title")}
            </Heading>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
              {t("about.intro")}
            </p>
          </div>
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/[0.035] p-6
              shadow-2xl backdrop-blur-sm
              md:p-10
            "
          >
            <p className="text-base leading-8 text-white/80 md:text-lg">
              {t("about.paragraph1")}
            </p>
            <p className="mt-6 text-base leading-8 text-white/70">
              {t("about.paragraph2")}
            </p>
            <p className="mt-6 text-base leading-8 text-white/70">
              {t("about.paragraph3")}
            </p>
            <p className="mt-6 text-base leading-8 text-white/70">
              {t("about.paragraph4")}
            </p>
            <p className="mt-6 text-base leading-8 text-white/70">
              {t("about.paragraph5")}
            </p>
          </div>
        </div>
      </Row>
    </Box>
  );
}
