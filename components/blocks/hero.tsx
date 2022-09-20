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
        <div className="h-[60vh]  flex flex-col justify-end pb-28">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight ${
              titleColors[theme.mono]
            }`}
            data-tinafield={`${parentField}.headline`}
          >
            {data.headline && <>{data.headline}</>}
          </h1>
          <p
            className={`text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight ${
              titleColors[theme.mono]
            }`}
            data-tinafield={`${parentField}.text`}
          >
            {data.text && <>{data.text}</>}
          </p>
        </div>
        {data.image.src && (
          <div
            className="flex flex-col items-center justify-center pb-24"
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
      headline: "This Big Text is Totally Awesome",
      text: "Here's some text above the other text",
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
