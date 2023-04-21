import type { FC } from "react";

import Balancer from "react-wrap-balancer";
import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { Container } from "../../container";
import { Section } from "../../section";

const sizeOptions = {
  md: "prose-md lg:prose-lg xl:prose-xl",
  lg: "prose-lg lg:prose-xl xl:prose-2xl",
  xl: "prose-xl lg:prose-2xl",
};

const centerOptions = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const alignOptions = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const paddingTopCn = {
  none: "",
  md: "pt-5 md:pt-10 lg:pt-20",
  lg: "pt-10 md:pt-20 lg:pt-36",
  xl: "pt-20 md:pt-36 lg:pt-48",
};

const paddingBottomCn = {
  none: "",
  md: "pb-5 md:pb-10 lg:pb-20",
  lg: "pb-10 md:pb-20 lg:pb-36",
  xl: "pb-20 md:pb-36 lg:pb-48",
};

export type BodySimpleProps = {
  size?: keyof typeof sizeOptions;
  center?: keyof typeof centerOptions;
  align?: keyof typeof alignOptions;
  paddingTop?: keyof typeof paddingTopCn;
  paddingBottom?: keyof typeof paddingBottomCn;
  content: TinaMarkdownContent;
};

export const BodySimple: FC<BodySimpleProps> = ({
  content,
  size,
  center,
  align,
  paddingBottom,
  paddingTop,
}) => {
  const cnSize = sizeOptions[size || "md"];
  const cnCenter = centerOptions[center || "left"];
  const cnAlign = alignOptions[align || "left"];
  const cnPaddingTop = paddingTopCn[paddingTop || "none"];
  const cnPaddingBottom = paddingBottomCn[paddingBottom || "none"];
  const cnPadding = `${cnPaddingTop} ${cnPaddingBottom}`;
  return (
    <Section className={`!flex-none ${cnPadding}`}>
      <Container className={`flex ${cnCenter} ${cnAlign}`}>
        <article className={`prose ${cnSize} dark:prose-invert`}>
          <Balancer>
            <TinaMarkdown content={content} />
          </Balancer>
        </article>
      </Container>
    </Section>
  );
};

export const bodySimpleTemplate: Template = {
  name: "bodySimple",
  label: "Body Simple",
  fields: [
    {
      type: "boolean",
      label: "Visible",
      name: "visible",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "string",
      label: "Size",
      name: "size",
      options: ["md", "lg", "xl"],
    },
    {
      type: "string",
      label: "Center",
      name: "center",
      options: ["left", "center", "right"],
    },
    {
      type: "string",
      label: "Align",
      name: "align",
      options: ["left", "center", "right"],
    },
    {
      type: "string",
      label: "Padding Top",
      name: "paddingTop",
      options: ["none", "md", "lg", "xl"],
    },
    {
      type: "string",
      label: "Padding Bottom",
      name: "paddingBottom",
      options: ["none", "md", "lg", "xl"],
    },
  ],
};
