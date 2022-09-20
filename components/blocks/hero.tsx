import * as React from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import Image from "next/image";

const renderHero = (data, parentField) => {
  switch (data.type) {
    case "left":
      return (
        <Section color={data.color}>
          <Container>
            <div className="flex flex-wrap items-center mx-auto 2xl:max-w-7xl">
              <div className="flex flex-col items-start mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0">
                {data.tagline && (
                  <span
                    className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase"
                    data-tinafield={`${parentField}.tagline`}
                  >
                    {data.tagline}
                  </span>
                )}
                {data.headline && (
                  <h1
                    className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl"
                    data-tinafield={`${parentField}.headline`}
                  >
                    {data.headline}
                  </h1>
                )}
                {data.text && (
                  <p
                    className="mb-8 text-base leading-relaxed text-left text-gray-500"
                    data-tinafield={`${parentField}.text`}
                  >
                    {data.text}
                  </p>
                )}
              </div>
            </div>
          </Container>
          {data.image?.src && (
            <Container>
              <div
                className="flex flex-col items-center justify-center"
                data-tinafield={`${parentField}.image`}
              >
                <Image
                  className="object-cover object-center w-full"
                  alt={data.image.alt}
                  src={data.image.src ?? ""}
                  width={data.image.type === "portrait" ? 1365 : 2048}
                  height={data.image.type === "portrait" ? 2048 : 1365}
                />
              </div>
            </Container>
          )}
        </Section>
      );
    case "center":
      return (
        <Section color={data.color}>
          <Container>
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
              <div className="flex flex-col w-full mb-12 text-center">
                {data.headline && (
                  <h1
                    className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl"
                    data-tinafield={`${parentField}.headline`}
                  >
                    {data.headline}
                  </h1>
                )}
                {data.text && (
                  <p
                    className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500"
                    data-tinafield={`${parentField}.text`}
                  >
                    {data.text}
                  </p>
                )}
              </div>
            </div>
          </Container>{" "}
          {data.image?.src && (
            <Container>
              <div
                className="flex flex-col items-center justify-center"
                data-tinafield={`${parentField}.image`}
              >
                <Image
                  className="object-cover object-center w-full"
                  alt={data.image.alt}
                  src={data.image.src ?? ""}
                  width={data.image.type === "portrait" ? 1365 : 2048}
                  height={data.image.type === "portrait" ? 2048 : 1365}
                />
              </div>
            </Container>
          )}
        </Section>
      );
    default:
      return null;
  }
};

export const Hero = ({ data, parentField = "" }) => {
  const theme = useTheme();

  return <>{renderHero(data, parentField)}</>;
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
        {
          name: "type",
          label: "Type",
          type: "string",
          options: ["portrait", "landscape"],
        },
      ],
    },
  ],
};
