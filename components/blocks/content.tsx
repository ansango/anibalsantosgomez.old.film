import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { useTheme } from "../layout";
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
} from "../styles/prose";

//TODO: ACABAR MERGEO DE COMPONENTES!!!!

export const Content = ({ data, parentField = "", components }) => {
  const { color, mono } = useTheme();
  const classElements = data.highlight
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
        className={`max-w-4xl prose dark:prose-invert prose-code:font-medium
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
        <TinaMarkdown content={data.body} {...{ ...components }} /> 
      </Container>
    </Section>
  );
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
    },
  ],
};
