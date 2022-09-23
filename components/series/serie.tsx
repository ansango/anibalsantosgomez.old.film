import React, { FC } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, Hero, WrapperContent } from "../blocks";
import { formatDate } from "../../lib/utils";
import { type SerieQuery } from "../../.tina/__generated__/types";

export type SerieProps = {
  body: SerieQuery["serie"]["_body"];
  bodyHighlight: SerieQuery["serie"]["bodyHighlight"];
  meta: SerieQuery["serie"]["meta"];
  publishedAt: SerieQuery["serie"]["publishedAt"];
  title: SerieQuery["serie"]["title"];
  description: SerieQuery["serie"]["description"];
  summary: SerieQuery["serie"]["summary"];
};

export const Serie: FC<SerieProps> = ({
  body,
  bodyHighlight,
  description,
  meta,
  publishedAt,
  summary,
  title,
}) => {
  return (
    <>
      <Section>
        <Hero
          data={{
            type: "serie",
            headline: title,
            tagline: description,
            image: {
              src: meta.cover,
              alt: title,
            },
            text: summary,
            meta,
          }}
        />
      </Section>

      <WrapperContent highlight={bodyHighlight}>
        <TinaMarkdown components={components} content={body} />
      </WrapperContent>
    </>
  );
};
