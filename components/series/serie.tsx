import React, { FC } from "react";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, Hero, WrapperContent } from "../blocks";
import { type SerieQuery } from "../../.tina/__generated__/types";
import Link from "next/link";
import { Container } from "../util/container";
import { useTheme } from "../layout";
import { monoTextColors } from "../styles";

type Pagination = {
  title: string;
  route: string;
};

export type SerieProps = {
  body: SerieQuery["serie"]["_body"];
  bodyHighlight: SerieQuery["serie"]["bodyHighlight"];
  meta: SerieQuery["serie"]["meta"];
  publishedAt: SerieQuery["serie"]["publishedAt"];
  title: SerieQuery["serie"]["title"];
  description: SerieQuery["serie"]["description"];
  summary: SerieQuery["serie"]["summary"];
  prev?: Pagination | null;
  next?: Pagination | null;
};

const Pagination: FC<{
  prev?: Pagination | null;
  next?: Pagination | null;
}> = ({ next, prev }) => {
  const { color, mono } = useTheme();
  return (
    <Container className="grid grid-cols-2 gap-5">
      {prev && (
        <div className="text-left">
          <h4
            className={`text-xs tracking-wide italic ${monoTextColors[500][mono]}`}
          >
            Previous
          </h4>
          <Link href={prev.route} passHref>
            <a className={`line-clamp-1 ${monoTextColors[700][mono]}`}>
              {prev.title}
            </a>
          </Link>
        </div>
      )}
      {next && (
        <div className="text-right">
          <h4
            className={`text-xs tracking-wide italic ${monoTextColors[500][mono]}`}
          >
            Next
          </h4>

          <Link href={`${next.route}`} passHref>
            <a className={`line-clamp-1 ${monoTextColors[700][mono]}`}>
              {next.title}
            </a>
          </Link>
        </div>
      )}
    </Container>
  );
};

export const Serie: FC<SerieProps> = ({
  body,
  bodyHighlight,
  description,
  meta,
  publishedAt,
  summary,
  title,
  next,
  prev,
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
      {(next || prev) && <Pagination next={next} prev={prev} />}
    </>
  );
};
