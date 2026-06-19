"use client";

import cx from "classnames";
import Image from "next/image";
import { Box, Heading, Row } from "@/presentation/foundations";

export type FooterProps = {
  "data-test-id"?: string;
  /**
   * Optional classname.
   * @type string
   */
  className?: string;
};

export function Footer(props: FooterProps) {
  return (
    <Row data-test-id={props["data-test-id"]} column variant="default">
      <Box
        className={cx("py-3 justify-end", props.className)}
        grow
        vAlignContent="center"
      >
        <Box className="flex flex-row gap-2">
          <Heading size="s" className="font-500 text-white">
            powered by
          </Heading>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={80}
            height={20}
            style={{ width: 80, height: 20 }}
            priority
          />
        </Box>
      </Box>
    </Row>
  );
}
