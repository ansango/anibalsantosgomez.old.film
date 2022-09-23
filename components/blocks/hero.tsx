import { FC } from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { useTheme } from "../layout";
import {
  monoBgColorsBlur,
  monoTextColors,
  primaryHoverBorderColors,
  primaryHoverTextColors,
  primaryTextColors,
} from "../styles";
import { SerieProps } from "../series/serie";
import { formatDate } from "../../lib/utils";

type HeroImage = {
  src: string;
  alt: string;
  parentField?: string;
};

type HeroData = {
  type: "left" | "center" | "serie";
  tagline?: string;
  headline?: string;
  text?: string;
  image?: HeroImage;
  meta?: SerieProps["meta"];
};

const Meta: FC<{ meta: SerieProps["meta"] }> = ({ meta }) => {
  const { color } = useTheme();
  const { camera, film, shot, tags } = meta;
  return (
    <>
      <p>
        <span>Camera: </span>
        <span>{camera}</span>
      </p>
      <p>
        <span>Film: </span>
        <span>{film}</span>
      </p>
      {shot && (
        <p>
          <span>Period: </span>
          <span>
            {formatDate(shot.start)} / {formatDate(shot.start)}
          </span>
        </p>
      )}
      <div className="mt-6 flex flex-wrap relative z-10">
        {tags?.map((tag, i) => (
          <a
            key={`${tag}-${i}`}
            className={`cursor-pointer mr-1.5 py-1.5 text-sm md:mt-0 focus:outline-none focus:shadow-outline leading-none border-b-2 border-transparent ${primaryTextColors[color]} opacity-70 hover:opacity-100 ${primaryHoverTextColors[color]} ${primaryHoverBorderColors[color]}`}
          >
            #{tag}
          </a>
        ))}
      </div>
    </>
  );
};

const Image = ({ image, parentField = "" }) => (
  <div
    className="flex flex-col items-center justify-center"
    data-tinafield={`${parentField}.image`}
  >
    <img
      className="object-cover w-full aspect-4/3"
      alt={image.alt}
      src={image.src}
      width={image.type === "portrait" ? 1365 : 2048}
      height={image.type === "portrait" ? 2048 : 1365}
    />
  </div>
);

const renderHero = (
  { type, headline, image, tagline, text, meta }: HeroData,
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
          {image?.src && (
            <Container>
              <Image image={image} parentField={parentField} />
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
          {image?.src && (
            <Container>
              <Image image={image} parentField={parentField} />
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
                    <img
                      className="object-cover object-center mx-auto shadow-2xl dark:shadow-black aspect-square"
                      alt="hero"
                      src={image.src}
                    />
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
    default:
      return null;
  }
};

export const Hero: FC<{
  data: HeroData;
  parentField?: string;
}> = ({ data, parentField = "" }) => {
  const { color, mono } = useTheme();
  return <Section>{renderHero(data, parentField, color, mono)}</Section>;
};

export const heroBlockSchema: TinaTemplate = {
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
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
  ],
};
