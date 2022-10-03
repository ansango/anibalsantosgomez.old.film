import { type FC } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";

import { useTheme } from "../layout";
import { monoBgColorsBlur, monoTextColors, primaryTextColors } from "../styles";
import { SerieProps } from "../series/serie";
import { Meta } from "../util/meta";
import {
  aspectRatioResponsiveCn,
  centerMobileCn,
  ImageHero,
  ImageSerie,
  type ImageProps,
} from "../util/image";
import { Template } from "../../.tina/schema";
import { formatDate } from "../../lib/utils";

type HeroData = {
  type?: "left" | "center" | "serie" | string;
  tagline?: string;
  headline?: string;
  text?: string;
  image?: ImageProps;
  meta?: SerieProps["meta"];
  publishedAt?: SerieProps["publishedAt"];
};

const renderHero = (
  { type, headline, image, tagline, text, meta, publishedAt }: HeroData,
  parentField,
  color,
  mono
) => {
  switch (type) {
    case "left": {
      return (
        <>
          <Container>
            <div className="flex flex-wrap items-center mx-auto 5xl:max-w-7xl">
              <div className="flex flex-col items-start mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0">
                {tagline && (
                  <span
                    className={`mb-8 text-xs font-bold tracking-widest uppercase  ${primaryTextColors[color]}`}
                    data-tinafield={`${parentField}.tagline`}
                  >
                    {tagline}
                  </span>
                )}
                {headline && (
                  <h1
                    className={`mb-8 text-5xl font-bold leading-none tracking-tighter ${monoTextColors[700][mono]} md:text-7xl`}
                    data-tinafield={`${parentField}.headline`}
                  >
                    {headline}
                  </h1>
                )}
                {text && (
                  <p
                    className={`mb-8 text-base leading-relaxed text-left ${monoTextColors[500][mono]}`}
                    data-tinafield={`${parentField}.text`}
                  >
                    {text}
                  </p>
                )}
              </div>
            </div>
          </Container>
          {image?.url && (
            <Container>
              <ImageHero
                alt={image.alt}
                url={image.url}
                centerImage={image.centerImage}
                parentField={parentField}
                aspectRatio={image.aspectRatio}
              />
            </Container>
          )}
        </>
      );
    }
    case "center": {
      return (
        <>
          <Container>
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
              <div className="flex flex-col w-full mb-12 text-center">
                {headline && (
                  <h1
                    className={`max-w-5xl text-5xl font-bold leading-none tracking-tighter ${monoTextColors[700][mono]} md:text-7xl lg:max-w-7xl`}
                    data-tinafield={`${parentField}.headline`}
                  >
                    {headline}
                  </h1>
                )}
                {text && (
                  <p
                    className={`max-w-xl mx-auto mt-8 text-base leading-relaxed text-center ${monoTextColors[500][mono]}`}
                    data-tinafield={`${parentField}.text`}
                  >
                    {text}
                  </p>
                )}
              </div>
            </div>
          </Container>
          {image?.url && (
            <Container>
              <ImageHero
                alt={image.alt}
                url={image.url}
                centerImage={image.centerImage}
                parentField={parentField}
                aspectRatio={image.aspectRatio}
              />
            </Container>
          )}
        </>
      );
    }
    case "serie": {
      return (
        <Container>
          <div className="flex flex-wrap items-start mx-auto max-w-7xl pb-12">
            <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
              <div>
                <div className="relative w-full">
                  <div
                    className={`absolute top-0 rounded-full -left-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob ${monoBgColorsBlur[mono]}`}
                  ></div>
                  <div
                    className={`absolute rounded-full -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${monoBgColorsBlur[mono]}`}
                  ></div>
                  <div className="relative">
                    {image?.url && (
                      <ImageSerie alt={image.alt} url={image.url} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
              <span
                className={`mb-8 text-xs font-bold tracking-widest ${primaryTextColors[color]} uppercase`}
              >
                {tagline}
              </span>

              <h1
                className={`mb-8 text-5xl font-bold leading-none tracking-tighter text-neutral-600 md:text-6xl lg:text-5xl ${monoTextColors[700][mono]}`}
              >
                {headline}
              </h1>
              <p
                className={`mb-8 text-base leading-relaxed text-left ${monoTextColors[500][mono]}`}
              >
                {text}
              </p>
              <p
                className={`mb-4 text-sm italic leading-relaxed text-left ${monoTextColors[500][mono]}`}
              >
                Publicado el{" "}
                <time dateTime={publishedAt}>
                  {formatDate(publishedAt, "es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
              {meta && (
                <div
                  className={`mb-8 text-sm leading-relaxed text-left ${monoTextColors[500][mono]} font-medium italic`}
                >
                  <Meta meta={meta} />
                </div>
              )}
            </div>
          </div>
        </Container>
      );
    }
    default: {
      return null;
    }
  }
};

export const Hero: FC<{
  data: HeroData;
  parentField?: string;
}> = ({ data, parentField = "" }) => {
  const { color, mono } = useTheme();
  return <Section>{renderHero(data, parentField, color, mono)}</Section>;
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "",

    defaultItem: {
      tagline: "Your tagline",
      headline: "This Big Text is Totally Awesome",
      text: "Here's some text above the other text",
      type: "left",
    },
  },
  fields: [
    {
      name: "tagline",
      label: "Tagline",
      type: "string",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Type",
      name: "type",
      options: ["left", "center"],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "url",
          label: "URL",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
        {
          name: "aspectRatio",
          label: "Aspect Ratio",
          type: "string",

          options: Object.keys(aspectRatioResponsiveCn),
        },
        {
          name: "centerImage",
          label: "Center Image Mobile",
          type: "string",
          options: Object.keys(centerMobileCn),
        },
      ],
    },
  ],
};
