import type { FC } from "react";

import type { Template } from "tinacms";

import { Container } from "../container";
import type { PaginationProps } from "../pagination";
import { Pagination } from "../pagination";
import { Section } from "../section";

export type PaginationBaseProps = PaginationProps;

export const PaginationBase: FC<PaginationProps> = ({ next, prev }) => {
  return (
    <Section className="flex-none py-20">
      <Container className="grid grid-cols-2 gap-5 py-20">
        <Pagination
          {...{
            next,
            prev,
          }}
        />
      </Container>
    </Section>
  );
};

export const paginationBaseTemplate: Template = {
  label: "Pagination",
  name: "pagination",
  fields: [
    {
      label: "Visible",
      name: "visible",
      type: "boolean",
    },
  ],
};
