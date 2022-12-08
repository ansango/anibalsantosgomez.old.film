import { type FC } from "react";

import {
  HeroSerie,
  Masonry,
  Section,
  Container,
  useTheme,
  SocialShare,
  Image,
} from "components";
import { type SerieQuery } from "../../.tina/__generated__/types";
import Link from "next/link";

import { monoRestColors, monoTextColors } from "constant/styles";

type Pagination = {
  title: string;
  route: string;
};

export type SerieProps = {
  meta: SerieQuery["serie"]["meta"];
  publishedAt: SerieQuery["serie"]["publishedAt"];
  title: SerieQuery["serie"]["title"];
  cover: SerieQuery["serie"]["cover"];
  description: SerieQuery["serie"]["description"];
  summary: SerieQuery["serie"]["summary"];
  prev?: Pagination | null;
  next?: Pagination | null;
  url?: string;
  masonry?: any;
};

const Pagination: FC<{
  prev?: Pagination | null;
  next?: Pagination | null;
}> = ({ next, prev }) => {
  const { mono } = useTheme();
  return (
    <Container className="grid grid-cols-2 gap-5">
      <div className="text-left group">
        {prev && (
          <>
            <h4
              className={`text-xs tracking-wide italic ${monoTextColors[500][mono]}`}
            >
              Anterior
            </h4>
            <Link
              href={prev.route}
              passHref
              className={`line-clamp-1 max-w-xs mr-auto ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
            >
              {prev.title}
            </Link>
          </>
        )}
      </div>

      <div className="text-right group">
        {next && (
          <>
            <h4
              className={`text-xs tracking-wide italic ${monoTextColors[500][mono]}`}
            >
              Siguiente
            </h4>

            <Link
              href={`${next.route}`}
              passHref
              className={`line-clamp-1 max-w-xs ml-auto ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
            >
              {next.title}
            </Link>
          </>
        )}
      </div>
    </Container>
  );
};

export const Serie: FC<SerieProps> = ({
  // body,
  // bodyHighlight,
  description,
  meta,
  cover,
  publishedAt,
  summary,
  title,
  next,
  prev,
  url,
  masonry,
}) => {
  const { columns, gap, images } = masonry;

  return (
    <article>
      <Section>
        <HeroSerie
          {...{
            type: "serie",
            headline: title,
            tagline: description,
            image: {
              url: cover,
              alt: title,
            },
            text: summary,
            meta,
            publishedAt,
          }}
        />
      </Section>
      <Masonry
        data={{
          columns,
          gap,
        }}
      >
        {images?.map(({ ...imageProps }, i) => {
          return <Image key={i} {...imageProps} />;
        })}
      </Masonry>
      {/* <WrapperContent highlight={bodyHighlight}>
        <TinaMarkdown components={components} content={content} />
      </WrapperContent> */}
      <SocialShare title={title} url={`https://anibalsantosgomez.com/${url}`} />
      {(next || prev) && <Pagination next={next} prev={prev} />}
    </article>
  );
};
