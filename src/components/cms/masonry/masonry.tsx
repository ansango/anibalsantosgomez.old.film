import type { FC } from "react";

import type { Template } from "tinacms";

import { Container } from "../../container";
import { aspectRatio, centerImage } from "../../image";
import {
  columnsDefault,
  columnsLg,
  columnsMd,
  columnsSm,
  columnsXl,
  gapDefault,
  gapLg,
  gapMd,
  gapSm,
  gapXl,
  Masonry,
  type MasonryProps,
} from "../../masonry";
import { Section } from "../../section";

export type MasonryBaseProps = MasonryProps;

export const MasonryBase: FC<MasonryBaseProps> = ({ children, columns, gap }) => {
  return (
    <Section className="flex-none">
      <Container>
        <Masonry columns={columns} gap={gap}>
          {children}
        </Masonry>
      </Container>
    </Section>
  );
};

export const masonryBaseTemplate: Template = {
  label: "Masonry Base",
  name: "masonryBase",
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      name: "label",
      label: "Label",
      type: "string",
    },
    {
      name: "visible",
      label: "Visible",
      type: "boolean",
    },
    {
      name: "columns",
      label: "Columns",
      type: "object",
      fields: [
        {
          name: "default",
          label: "Default",
          type: "string",
          options: columnsDefault,
        },
        {
          name: "sm",
          label: "Small",
          type: "string",
          options: columnsSm,
        },
        {
          name: "md",
          label: "Medium",
          type: "string",
          options: columnsMd,
        },
        {
          name: "lg",
          label: "Large",
          type: "string",
          options: columnsLg,
        },
        {
          name: "xl",
          label: "Extra Large",
          type: "string",
          options: columnsXl,
        },
      ],
    },
    {
      name: "gap",
      label: "Gap",
      type: "object",
      fields: [
        {
          name: "default",
          label: "Default",
          type: "string",
          options: gapDefault,
        },
        {
          name: "sm",
          label: "Small",
          type: "string",
          options: gapSm,
        },
        {
          name: "md",
          label: "Medium",
          type: "string",
          options: gapMd,
        },
        {
          name: "lg",
          label: "Large",
          type: "string",
          options: gapLg,
        },
        {
          name: "xl",
          label: "Extra Large",
          type: "string",
          options: gapXl,
        },
      ],
    },
    {
      type: "object",
      label: "Images",
      name: "images",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          url: "https://asg-cms.s3.eu-west-3.amazonaws.com/43-junio-2022-kodak-gold-200-website/11.webp",
          label: "Image",
          aspectRatio: "square",
          centerImage: "center",
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          name: "url",
          label: "URL",
          type: "image",
          required: true,
        },
        {
          name: "aspectRatio",
          label: "Aspect Ratio",
          type: "string",
          options: aspectRatio,
          required: true,
        },
        {
          name: "centerImage",
          label: "Center Image",
          type: "string",
          options: centerImage,
          required: true,
        },
      ],
    },
  ],
};
