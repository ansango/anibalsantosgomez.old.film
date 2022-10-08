import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { type SerieProps } from "../../series/serie";
import { type FC, type ReactNode } from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { useTheme } from "../../layout";

import {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  codeColor,
  codeColorDark,
  proseMono,
  codeMonoDark,
  p,
} from "../../styles/prose";

import {
  type BlockQuoteProps,
  BlockQuote,
  type DateTimeProps,
  DateTime,
  type ImageProps,
  DefaultImage,
  Image,
  img,
  type ContainerTextProps,
  ContainerText,
  containerSizesCn,
} from "./components";
import { Template } from "../../../.tina/schema";
import { aspectRatioCn } from "../../util/image";

export const WrapperContent: FC<{
  children: ReactNode;
  highlight?: boolean;
  parentField?: string;
}> = ({ children, highlight = false, parentField = "" }) => {
  const { color, mono } = useTheme();
  const classElements = highlight
    ? `${h1["colors"][color]}
        ${h2["colors"][color]}
        ${h3["colors"][color]}
        ${h4["colors"][color]}
        ${h5["colors"][color]}
        ${h6["colors"][color]}
        ${a["colors"][color]}
        ${codeColor[color]}
        ${codeColorDark[color][mono]}
        `
    : `${codeMonoDark[mono]}`;
  return (
    <Section>
      <Container
        className={`prose dark:prose-invert prose-code:font-medium pt-0 lg:pt-0
        ${proseMono[mono]} 
        ${h1["sizes"]} 
        ${h2["sizes"]}
        ${h3["sizes"]}
        ${h4["sizes"]}
        ${h5["sizes"]}
        ${h6["sizes"]}
        ${a["sizes"]}
        ${p}
        ${classElements}
        `}
        data-tinafield={`${parentField}.body`}
      >
        {children}
      </Container>
    </Section>
  );
};

export const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
  ContainerText: ContainerTextProps;
  Image: ImageProps;
  DefaultImage: ImageProps;
}> = {
  BlockQuote,
  DateTime,
  img,
  Image,
  DefaultImage,
  ContainerText,
};

export const Content: FC<{
  body: SerieProps["body"];
  parentField?: string;
}> = ({ body }) => {
  return <TinaMarkdown content={body} components={components} />;
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      label: "Highlight",
      type: "boolean",
      name: "highlight",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
        {
          name: "ContainerText",
          label: "Container Text",
          fields: [
            {
              name: "size",
              label: "Size",
              type: "string",
              options: Object.keys(containerSizesCn),
            },
            {
              name: "children",
              label: "Text",
              type: "rich-text",
              templates: [
                {
                  name: "Image",
                  label: "Image",
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
                      options: Object.keys(aspectRatioCn),
                    },
                  ],
                },
                {
                  name: "BlockQuote",
                  label: "Block Quote",
                  fields: [
                    {
                      name: "children",
                      label: "Quote",
                      type: "rich-text",
                    },
                    {
                      name: "authorName",
                      label: "Author",
                      type: "string",
                    },
                  ],
                },
                {
                  name: "DefaultImage",
                  label: "Default Image",
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
                      options: Object.keys(aspectRatioCn),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Image",
          label: "Image",
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
              options: Object.keys(aspectRatioCn),
            },
          ],
        },
      ],
    },
  ],
};
