import * as React from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import Image from "next/image";

const titleColors = {
  slate: "text-slate-600 dark:text-slate-50",
  gray: "text-gray-600 dark:text-gray-50",
  zinc: "text-zinc-600 dark:text-zinc-50",
  neutral: "text-neutral-600 dark:text-neutral-50",
  stone: "text-stone-600 dark:text-stone-50",
};

export const Hero = ({ data, parentField }) => {
  const theme = useTheme();

  return (
    <Section color={data.color}>
      <Container>
        <div className="flex flex-wrap items-center mx-auto 2xl:max-w-7xl">
          <div className="flex flex-col items-start mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0">
            <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase">
              {" "}
              Your tagline{" "}
            </span>
            <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl">
              {data.headline && <>{data.headline}</>}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-left text-gray-400">
              {data.text && <>{data.text}</>}
            </p>
          </div>
        </div>
        {data.image.src && (
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
        )}
      </Container>
    </Section>
  );
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
