import { Container, Section } from "components";
import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import {
  type PageBlocksMasonry,
  type SerieMasonry,
} from ".tina/__generated__/types";
import { gapOptionsCn, columnsOptionsCn } from "constant/styles";

export const Masonry: FC<{
  data: {
    gap?: PageBlocksMasonry["gap"] | SerieMasonry["gap"];
    columns?: PageBlocksMasonry["columns"] | SerieMasonry["columns"];
  };

  children: ReactNode;
}> = ({ data, children }) => {
  const { gap, columns } = data;
  const gapDefault =
    gapOptionsCn["default"][gap?.default as "3"] ||
    gapOptionsCn["default"]["3"];
  const gapSm = gapOptionsCn["sm"][gap?.sm as "3"] || gapOptionsCn["sm"]["3"];
  const gapMd = gapOptionsCn["md"][gap?.md as "3"] || gapOptionsCn["md"]["3"];
  const gapLg = gapOptionsCn["lg"][gap?.lg as "3"] || gapOptionsCn["lg"]["3"];
  const gapXl = gapOptionsCn["xl"][gap?.xl as "3"] || gapOptionsCn["xl"]["3"];
  const columnsDefault =
    columnsOptionsCn["default"][columns?.default as "2"] ||
    columnsOptionsCn["default"]["2"];
  const columnsSm =
    columnsOptionsCn["sm"][columns?.sm as "2"] || columnsOptionsCn["sm"]["2"];
  const columnsMd =
    columnsOptionsCn["md"][columns?.md as "2"] || columnsOptionsCn["md"]["2"];
  const columnsLg =
    columnsOptionsCn["lg"][columns?.lg as "2"] || columnsOptionsCn["lg"]["2"];
  const columnsXl =
    columnsOptionsCn["xl"][columns?.xl as "2"] || columnsOptionsCn["xl"]["2"];
  const gapClasses = `${gapDefault} ${gapSm} ${gapMd} ${gapLg} ${gapXl}`;
  const columnsClasses = `${columnsDefault} ${columnsSm} ${columnsMd} ${columnsLg} ${columnsXl}`;

  return (
    <Section>
      <Container>
        <motion.div
          initial="hidden"
          className={`${gapClasses} ${columnsClasses}`}
        >
          {children}
        </motion.div>
      </Container>
    </Section>
  );
};
