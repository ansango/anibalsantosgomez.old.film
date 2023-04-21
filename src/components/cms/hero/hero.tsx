import type { FC } from "react";

import Balancer from "react-wrap-balancer";
import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

import { Container } from "../../container";
import { Section } from "../../section";
import { optionsDark, optionsLight } from "../backgrounds";

export type HeroBaseProps = {
  headline: string;
  tagline?: string;
  text?: string;
  align: "left" | "center" | "right" | null;
  rotationTitle: "left" | "center" | "right" | null;
  parragraph?: TinaMarkdownContent;
  backgroundLight?: string;
  backgroundDark?: string;
};

const algignCnText = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const alignCnContainer = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const rotationTitleCn = {
  left: "-rotate-[1.5deg]",
  center: "",
  right: "rotate-[1.5deg]",
};

export const HeroBase: FC<HeroBaseProps> = ({
  headline,
  tagline,
  text,
  align = "center",
  rotationTitle = "center",
  backgroundLight,
  backgroundDark,
}) => {
  const cnContainer = align && alignCnContainer[align];
  const cnText = align && algignCnText[align];
  const cnRotationTitle = rotationTitle && rotationTitleCn[rotationTitle];

  return (
    <Section className={`${backgroundLight} ${backgroundDark}`}>
      <Container className={`h-[65vh] flex items-center ${cnContainer}`}>
        <div className={`space-y-5 ${cnText}`}>
          {tagline && (
            <span className="font-sans font-medium tracking-widest text-primary">
              <Balancer>{tagline}</Balancer>
            </span>
          )}
          <h1 className={`${cnRotationTitle} max-w-screen-lg`}>{headline}</h1>
          {text && (
            <span>
              <Balancer>{text}</Balancer>
            </span>
          )}
        </div>
      </Container>
    </Section>
  );
};

export const heroBaseTemplate: Template = {
  name: "heroBase",
  label: "Hero Base",
  fields: [
    {
      type: "boolean",
      label: "Visible",
      name: "visible",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
      required: true,
    },
    {
      type: "string",
      label: "Text",
      name: "text",
    },
    {
      type: "string",
      label: "Align",
      name: "align",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Center",
          value: "center",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
    {
      type: "string",
      label: "Rotation Title",
      name: "rotationTitle",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Center",
          value: "center",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
    {
      type: "string",
      label: "Background Light",
      name: "backgroundLight",
      options: optionsLight,
    },
    {
      type: "string",
      label: "Background Dark",
      name: "backgroundDark",
      options: optionsDark,
    },
  ],
};
