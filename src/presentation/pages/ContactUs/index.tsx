"use client";

import cx from "classnames";
import { type ChangeEvent, type SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Row } from "@/presentation/foundations";
import { Heading } from "@/presentation/foundations/Typography";

export type ContactUsProps = {
  "data-test-id"?: string;
  className?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const fieldClassName = `
  w-full rounded-lg
  border border-white/10
  bg-white/[0.04]
  px-4 py-3
  text-sm text-white
  outline-none
  placeholder:text-white/35
  transition-colors
  hover:border-white/20
  focus:border-cyan-200/50
  focus:ring-2
  focus:ring-cyan-200/10
`;

export function ContactUs({
  "data-test-id": dataTestId = "contact-us",
  className,
}: ContactUsProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFeedback("");
    setHasError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? t("contacts.sendError"));
      }

      setFeedback(t("contacts.success"));
      setFormData(initialFormData);
    } catch (error) {
      setHasError(true);

      setFeedback(
        error instanceof Error ? error.message : t("contacts.genericError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          pointer-events-none absolute -right-32 top-10
          h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl
        "
      />
      <Row
        variant="full"
        column
        className="relative z-10 w-full gap-10"
        classNameOuter="w-full"
      >
        <header className="w-full">
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
              {t("contacts.eyebrow")}
            </span>
          </div>
          <Heading
            size="xl"
            className="max-w-3xl font-semibold leading-tight text-white md:text-5xl"
          >
            {t("contacts.title")}
          </Heading>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
            {t("contacts.description")}
          </p>
        </header>
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="
              grid gap-5 rounded-2xl
              border border-white/10
              bg-white/[0.035] p-6
              shadow-2xl backdrop-blur-sm
              md:p-9
            "
          >
            <Heading size="m" className="font-semibold text-white">
              {t("contacts.formTitle")}
            </Heading>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/75">
                {t("contacts.fields.name")}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contacts.fields.namePlaceholder")}
                  autoComplete="name"
                  required
                  className={fieldClassName}
                />
              </label>
              <label className="grid gap-2 text-sm text-white/75">
                {t("contacts.fields.email")}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contacts.fields.emailPlaceholder")}
                  autoComplete="email"
                  required
                  className={fieldClassName}
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-white/75">
              {t("contacts.fields.phone")}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("contacts.fields.phonePlaceholder")}
                autoComplete="tel"
                className={fieldClassName}
              />
            </label>
            <label className="grid gap-2 text-sm text-white/75">
              {t("contacts.fields.message")}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contacts.fields.messagePlaceholder")}
                rows={6}
                required
                className={cx(fieldClassName, "resize-y")}
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                !h-10 cursor-pointer rounded-lg
                bg-cyan-200 px-6
                text-sm font-semibold text-[#17212b]
                transition-colors hover:bg-cyan-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-200
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? t("contacts.submitting") : t("contacts.submit")}
            </button>
            {feedback && (
              <p
                role={hasError ? "alert" : "status"}
                className={cx(
                  "rounded-lg border px-4 py-3 text-sm",
                  hasError
                    ? "border-red-300/20 bg-red-400/10 text-red-100"
                    : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
                )}
              >
                {feedback}
              </p>
            )}
          </form>
          <div className="grid gap-5">
            <div
              className="
                overflow-hidden rounded-2xl
                border border-white/10
                bg-white/[0.035]
                shadow-2xl
              "
            >
              <iframe
                title={t("contacts.mapTitle")}
                src="https://www.openstreetmap.org/export/embed.html?bbox=14.1661%2C42.4318%2C14.2661%2C42.4918&layer=mapnik&marker=42.4618%2C14.2161"
                loading="lazy"
                className="h-[380px] w-full border-0 md:h-[440px]"
              />
              <div className="border-t border-white/10 p-5">
                <p className="font-semibold text-white">
                  {t("contacts.location")}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {t("contacts.locationDescription")}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${t("contacts.emailValue")}`}
                className="
                  rounded-xl border border-white/10
                  bg-white/[0.035] p-5
                  transition-colors
                  hover:border-cyan-200/25
                "
              >
                <span className="text-xs uppercase tracking-widest text-cyan-200">
                  {t("contacts.emailLabel")}
                </span>
                <span className="mt-2 block break-all text-sm text-white">
                  {t("contacts.emailValue")}
                </span>
              </a>
              <a
                href="tel:+393288292776"
                className="
                  rounded-xl border border-white/10
                  bg-white/[0.035] p-5
                  transition-colors
                  hover:border-cyan-200/25
                "
              >
                <span className="text-xs uppercase tracking-widest text-cyan-200">
                  {t("contacts.phoneLabel")}
                </span>
                <span className="mt-2 block text-sm text-white">
                  {t("contacts.phoneValue")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </Row>
    </Box>
  );
}
