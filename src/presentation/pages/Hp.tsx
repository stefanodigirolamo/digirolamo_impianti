"use client";

import { useTranslation } from "react-i18next";
import { Children } from "@/presentation/foundations";
import { Row } from "@/presentation/foundations/Row";
import hpBackgroundSrc from "../../../public/hp-bg.jpg";
import { Hero } from "../blocks/Hero";
import { AboutUs } from "./AboutUs";
import { Services } from "./Services";
import { ContactUs } from "./ContactUs";

type HomepageSectionProps = {
  id: string;
  children: Children;
};

function HomepageSection({
  id,
  children,
}: HomepageSectionProps) {
  return (
    <section id={id} className="w-full scroll-mt-24">
      <Row
        variant="default"
        column
        className="flex w-full"
        classNameOuter="w-full"
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

  return (
    <main className="w-full">
      <HomepageSection id="home">
        <Hero
          src={hpBackgroundSrc}
          priority
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          description={t("hero.description")}
        />
      </HomepageSection>
      <HomepageSection id="about-us">
        <AboutUs />
      </HomepageSection>
      <HomepageSection id="services">
        <Services />
      </HomepageSection>
      <HomepageSection id="contact-us">
        <ContactUs />
      </HomepageSection>
    </main>
  );
}