"use client";

import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Row } from "@/presentation/foundations";
import { Heading } from "@/presentation/foundations/Typography";

export type ServicesProps = {
  "data-test-id"?: string;
  className?: string;
};

export function Services({
  "data-test-id": dataTestId = "services",
  className,
}: ServicesProps) {
  const { t } = useTranslation();

  const services = [
    {
      number: t("services.items.photovoltaic.number"),
      title: t("services.items.photovoltaic.title"),
      description: t("services.items.photovoltaic.description"),
      highlights: [
        t("services.items.photovoltaic.highlights.modules"),
        t("services.items.photovoltaic.highlights.structures"),
        t("services.items.photovoltaic.highlights.connections"),
        t("services.items.photovoltaic.highlights.civilIndustrial"),
      ],
    },
    {
      number: t("services.items.electrical.number"),
      title: t("services.items.electrical.title"),
      description: t("services.items.electrical.description"),
      highlights: [
        t("services.items.electrical.highlights.newSystems"),
        t("services.items.electrical.highlights.upgrades"),
        t("services.items.electrical.highlights.panels"),
        t("services.items.electrical.highlights.lighting"),
      ],
    },
    {
      number: t("services.items.alarms.number"),
      title: t("services.items.alarms.title"),
      description: t("services.items.alarms.description"),
      highlights: [
        t("services.items.alarms.highlights.intrusion"),
        t("services.items.alarms.highlights.sensors"),
        t("services.items.alarms.highlights.devices"),
        t("services.items.alarms.highlights.custom"),
      ],
    },
    {
      number: t("services.items.vcc.number"),
      title: t("services.items.vcc.title"),
      description: t("services.items.vcc.description"),
      highlights: [
        t("services.items.vcc.highlights.experience"),
        t("services.items.vcc.highlights.installation"),
        t("services.items.vcc.highlights.management"),
        t("services.items.vcc.highlights.quality"),
      ],
    },
  ];

  return (
    <Box
      as="section"
      data-test-id={dataTestId}
      className={cx(
        "relative w-full overflow-hidden py-16 md:py-24",
        className,
      )}
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
        className="relative z-10 w-full gap-12"
        classNameOuter="w-full"
      >
        <div className="w-full">
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
              {t("services.eyebrow")}
            </span>
          </div>
          <div className="grid w-full gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Heading
              size="xl"
              className="max-w-xl font-semibold leading-tight text-white md:text-5xl"
            >
              {t("services.title")}
            </Heading>
            <p className="max-w-3xl text-base leading-8 text-white/65 md:text-lg">
              {t("services.description")}
            </p>
          </div>
        </div>
        <div className="grid w-full gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="
                group relative overflow-hidden rounded-2xl
                border border-white/10
                bg-white/[0.035] p-6
                shadow-xl backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-200/25
                hover:bg-white/[0.055]
                md:p-8
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute inset-x-0 top-0 h-px
                  origin-left scale-x-0
                  bg-gradient-to-r
                  from-transparent via-cyan-200 to-transparent
                  transition-transform duration-500
                  group-hover:scale-x-100
                "
              />
              <div className="flex items-start justify-between gap-5">
                <span className="text-xs font-semibold tracking-[0.25em] text-cyan-200/70">
                  {service.number}
                </span>
                <span
                  aria-hidden="true"
                  className="
                    h-2 w-2 rounded-full
                    bg-cyan-200/60
                    shadow-[0_0_12px_rgba(103,232,249,0.65)]
                  "
                />
              </div>
              <Heading
                size="m"
                className="mt-8 font-semibold text-white md:text-2xl"
              >
                {service.title}
              </Heading>
              <p className="mt-5 text-sm leading-7 text-white/65 md:text-base">
                {service.description}
              </p>
              <ul className="mt-7 space-y-3">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200"
                    />
                    <span className="leading-6">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div
          className="
            relative w-full overflow-hidden rounded-2xl
            border border-white/10
            bg-gradient-to-r
            from-cyan-400/[0.08]
            via-blue-500/[0.04]
            to-transparent
            px-6 py-9 md:px-10 md:py-11
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute bottom-0 left-0 top-0 w-px
              bg-gradient-to-b
              from-transparent via-cyan-200 to-transparent
            "
          />
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-white md:text-2xl">
              {t("services.footerTitle")}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60 md:text-base">
              {t("services.footerDescription")}
            </p>
          </div>
        </div>
      </Row>
    </Box>
  );
}
