import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
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
} from "../../styles/prose";

import {
  type BlockQuoteProps,
  BlockQuote,
  type DateTimeProps,
  DateTime,
  img,
} from "./components";

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
        ${classElements}
        `}
        data-tinafield={`${parentField}.body`}
      >
        {children}
      </Container>
    </Section>
  );
};

const maxWidth = {
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  "2xl": "max-w-3xl",
  "3xl": "max-w-4xl",
  full: "",
};

const ContainerText = (props: {
  children: TinaMarkdownContent;
  size: "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}) => {
  const render = (size) => {
    switch (size) {
      case "md": {
        return (
          <div className="max-w-lg">
            <TinaMarkdown content={props.children} />
          </div>
        );
      }

      case "lg": {
        return (
          <div className="max-w-xl">
            <TinaMarkdown content={props.children} />
          </div>
        );
      }
      case "xl": {
        return (
          <div className="max-w-2xl">
            <TinaMarkdown content={props.children} />
          </div>
        );
      }
      case "2xl": {
        return (
          <div className="max-w-3xl">
            <TinaMarkdown content={props.children} />
          </div>
        );
      }
      case "3xl": {
        return (
          <div className="max-w-4xl">
            <TinaMarkdown content={props.children} />
          </div>
        );
      }
      default: {
        return (
          <div>
            <TinaMarkdown content={props.children} />
          </div>
        );
      }
    }
  };
  return <>{render(props.size)}</>;
};

export const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
  ContainerText: {
    children: TinaMarkdownContent;
    size: "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  };
}> = {
  BlockQuote,
  DateTime,
  img,
  ContainerText,
};

export const Content: FC<{
  data?: { body: SerieProps["body"] };
  parentField?: string;
}> = ({ data }) => {
  return <TinaMarkdown content={data.body} components={components} />;
};

export const contentBlockSchema: TinaTemplate = {
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
              options: ["md", "lg", "xl", "2xl", "3xl", "full"],
            },
            {
              name: "children",
              label: "Text",
              type: "rich-text",
            },
          ],
        },
      ],
    },
  ],
};
