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
      <Container size="large">
        <div className="pb-24">
          <h1
            className={`text-2xl font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl ${
              titleColors[theme.mono]
            }`}
            data-tinafield={`${parentField}.headline`}
          >
            {data.headline && <>{data.headline}</>}
          </h1>
          <p
            className="max-w-xl mt-8 text-base leading-relaxed text-gray-500"
            data-tinafield={`${parentField}.tagline`}
          >
            {data.tagline && <>{data.tagline}</>}
          </p>
        </div>
        {data.image && (
          <div
            className="flex flex-col items-center justify-center"
            data-tinafield={`${parentField}.image`}
          >
            <Image
              className="object-cover object-center w-full"
              alt={data.image.alt}
              src={data.image.src}
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
    previewSrc: "/blocks/08.webp",
    defaultItem: {
      headline: "This Big Text is Totally Awesome",
      tagline: "Here's some text above the other text",
    },
  },
  fields: [
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/",
        },
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
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
