"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Row } from "@/presentation/foundations/Row";
import { Space } from "@/presentation/foundations/Space";
import { Heading } from "@/presentation/foundations/Typography";
import { spaceUnit } from "@/utils";
import { Children } from "@/presentation/foundations";

type HomepageSectionProps = {
  id: string;
  children: Children;
};

function HomepageSection({ id, children }: HomepageSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Row
        variant="default"
        column
        className="flex py-20"
        vAlignContent="top"
        hAlignContent="center"
      >
        {children}
      </Row>
    </section>
  );
}

export function Hp() {
  const { t } = useTranslation();

  useEffect(() => {
    const sectionId = window.location.hash.replace("#", "");

    if (!sectionId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main>
      <HomepageSection id="home">
        <Heading size="xl" className="font-semibold">
          {t("home.title")}
        </Heading>
        <Space size={spaceUnit * 5} />
      </HomepageSection>
      <HomepageSection id="chi-siamo">
        <Heading size="xl" className="font-semibold">
          Chi siamo
        </Heading>
        <p className="mt-5 max-w-3xl text-white/75 h-40">
          Contenuto della sezione Chi siamo.
        </p>
      </HomepageSection>
      <HomepageSection id="servizi">
        <Heading size="xl" className="font-semibold">
          Servizi
        </Heading>
        <p className="mt-5 max-w-3xl text-white/75 h-40 ">
          Contenuto della sezione Servizi.
        </p>
      </HomepageSection>
      <HomepageSection id="contatti">
        <Heading size="xl" className="font-semibold">
          Contatti
        </Heading>
        <p className="mt-5 max-w-3xl text-white/75 h-40 ">
          Contenuto della sezione Contatti.
        </p>
      </HomepageSection>
    </main>
  );
}
