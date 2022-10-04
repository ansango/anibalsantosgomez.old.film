import { Template } from "../../.tina/schema";
import { Container } from "../util/container";
import { aspectRatioCn, objectPositionCn } from "../util/image";
import { Section } from "../util/section";
import { Image } from "../util/image";
import { FC } from "react";
import { PageBlocksMasonry } from "../../.tina/__generated__/types";

const gapOptionsCn = {
  default: {
    "1": "gap-1 space-y-1",
    "2": "gap-2 space-y-2",
    "3": "gap-3 space-y-3",
    "4": "gap-4 space-y-4",
    "5": "gap-5 space-y-5",
    "6": "gap-6 space-y-6",
    "7": "gap-7 space-y-7",
    "8": "gap-8 space-y-8",
    "9": "gap-9 space-y-9",
    "10": "gap-10 space-y-10",
    "11": "gap-11 space-y-11",
    "12": "gap-12 space-y-12",
    "14": "gap-14 space-y-14",
    "16": "gap-16 space-y-16",
    "20": "gap-20 space-y-20",
  },
  sm: {
    "1": "sm:gap-1 sm:space-y-1",
    "2": "sm:gap-2 sm:space-y-2",
    "3": "sm:gap-3 sm:space-y-3",
    "4": "sm:gap-4 sm:space-y-4",
    "5": "sm:gap-5 sm:space-y-5",
    "6": "sm:gap-6 sm:space-y-6",
    "7": "sm:gap-7 sm:space-y-7",
    "8": "sm:gap-8 sm:space-y-8",
    "9": "sm:gap-9 sm:space-y-9",
    "10": "sm:gap-10 sm:space-y-10",
    "11": "sm:gap-11 sm:space-y-11",
    "12": "sm:gap-12 sm:space-y-12",
    "14": "sm:gap-14 sm:space-y-14",
    "16": "sm:gap-16 sm:space-y-16",
    "20": "sm:gap-20 sm:space-y-20",
  },
  md: {
    "1": "md:gap-1 md:space-y-1",
    "2": "md:gap-2 md:space-y-2",
    "3": "md:gap-3 md:space-y-3",
    "4": "md:gap-4 md:space-y-4",
    "5": "md:gap-5 md:space-y-5",
    "6": "md:gap-6 md:space-y-6",
    "7": "md:gap-7 md:space-y-7",
    "8": "md:gap-8 md:space-y-8",
    "9": "md:gap-9 md:space-y-9",
    "10": "md:gap-10 md:space-y-10",
    "11": "md:gap-11 md:space-y-11",
    "12": "md:gap-12 md:space-y-12",
    "14": "md:gap-14 md:space-y-14",
    "16": "md:gap-16 md:space-y-16",
    "20": "md:gap-20 md:space-y-20",
  },
  lg: {
    "1": "lg:gap-1 lg:space-y-1",
    "2": "lg:gap-2 lg:space-y-2",
    "3": "lg:gap-3 lg:space-y-3",
    "4": "lg:gap-4 lg:space-y-4",
    "5": "lg:gap-5 lg:space-y-5",
    "6": "lg:gap-6 lg:space-y-6",
    "7": "lg:gap-7 lg:space-y-7",
    "8": "lg:gap-8 lg:space-y-8",
    "9": "lg:gap-9 lg:space-y-9",
    "10": "lg:gap-10 lg:space-y-10",
    "11": "lg:gap-11 lg:space-y-11",
    "12": "lg:gap-12 lg:space-y-12",
    "14": "lg:gap-14 lg:space-y-14",
    "16": "lg:gap-16 lg:space-y-16",
    "20": "lg:gap-20 lg:space-y-20",
  },
};
const columnsOptionsCn = {
  default: {
    "1": "columns-1",
    "2": "columns-2",
    "3": "columns-3",
    "4": "columns-4",
    "5": "columns-5",
    "6": "columns-6",
    "7": "columns-7",
    "8": "columns-8",
  },
  sm: {
    "1": "sm:columns-1",
    "2": "sm:columns-2",
    "3": "sm:columns-3",
    "4": "sm:columns-4",
    "5": "sm:columns-5",
    "6": "sm:columns-6",
    "7": "sm:columns-7",
    "8": "sm:columns-8",
  },
  md: {
    "1": "md:columns-1",
    "2": "md:columns-2",
    "3": "md:columns-3",
    "4": "md:columns-4",
    "5": "md:columns-5",
    "6": "md:columns-6",
    "7": "md:columns-7",
    "8": "md:columns-8",
  },
  lg: {
    "1": "lg:columns-1",
    "2": "lg:columns-2",
    "3": "lg:columns-3",
    "4": "lg:columns-4",
    "5": "lg:columns-5",
    "6": "lg:columns-6",
    "7": "lg:columns-7",
    "8": "lg:columns-8",
  },
};

export const Masonry: FC<{
  data: {
    images?: PageBlocksMasonry["images"];
    gap?: PageBlocksMasonry["gap"];
    columns?: PageBlocksMasonry["columns"];
  };
  parentField?: string;
}> = ({ data, parentField = "" }) => {
  const { images, gap, columns } = data;
  const gapDefault =
    gapOptionsCn["default"][gap?.default] || gapOptionsCn["default"]["3"];
  const gapSm = gapOptionsCn["sm"][gap?.sm] || gapOptionsCn["sm"]["3"];
  const gapMd = gapOptionsCn["md"][gap?.md] || gapOptionsCn["md"]["3"];
  const gapLg = gapOptionsCn["lg"][gap?.lg] || gapOptionsCn["lg"]["3"];
  const columnsDefault =
    columnsOptionsCn["default"][columns?.default] ||
    columnsOptionsCn["default"]["2"];
  const columnsSm =
    columnsOptionsCn["sm"][columns?.sm] || columnsOptionsCn["sm"]["2"];
  const columnsMd =
    columnsOptionsCn["md"][columns?.md] || columnsOptionsCn["md"]["2"];
  const columnsLg =
    columnsOptionsCn["lg"][columns?.lg] || columnsOptionsCn["lg"]["2"];

  const gapClasses = `${gapDefault} ${gapSm} ${gapMd} ${gapLg}`;
  const columnsClasses = `${columnsDefault} ${columnsSm} ${columnsMd} ${columnsLg}`;

  return (
    <Section>
      <Container>
        <div className={`${gapClasses} ${columnsClasses}`}>
          {images?.map(({ ...imageProps }, i) => (
            <Image
              key={i}
              {...imageProps}
              parentField={`${parentField}.${i}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const masonryBlockSchema: Template = {
  label: "Masonry",
  name: "masonry",
  ui: {
    previewSrc: "",
  },
  fields: [
    {
      name: "columns",
      label: "Columns",
      type: "object",
      fields: [
        {
          name: "default",
          label: "Default",
          type: "string",
          options: Object.keys(columnsOptionsCn.default),
        },
        {
          name: "sm",
          label: "Small",
          type: "string",
          options: Object.keys(columnsOptionsCn.sm),
        },
        {
          name: "md",
          label: "Medium",
          type: "string",
          options: Object.keys(columnsOptionsCn.md),
        },
        {
          name: "lg",
          label: "Large",
          type: "string",
          options: Object.keys(columnsOptionsCn.lg),
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
          options: Object.keys(gapOptionsCn.default),
        },
        {
          name: "sm",
          label: "Small",
          type: "string",
          options: Object.keys(gapOptionsCn.sm),
        },
        {
          name: "md",
          label: "Medium",
          type: "string",
          options: Object.keys(gapOptionsCn.md),
        },
        {
          name: "lg",
          label: "Large",
          type: "string",
          options: Object.keys(gapOptionsCn.lg),
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
          return { label: item?.alt };
        },
        defaultItem: {
          url: "https://source.unsplash.com/random/1",
          alt: "Image",
          label: "Image",
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
        {
          name: "centerImage",
          label: "Center Image",
          type: "string",
          options: Object.keys(objectPositionCn),
        },
      ],
    },
  ],
};
