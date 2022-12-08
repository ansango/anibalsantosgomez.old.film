import type { Template } from "tinacms";
import {
  aspectRatioCn,
  columnsOptionsCn,
  objectPositionCn,
  gapOptionsCn,
} from "../../constant";

export const masonry: Template = {
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
        {
          name: "xl",
          label: "Extra Large",
          type: "string",
          options: Object.keys(columnsOptionsCn.xl),
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
        {
          name: "xl",
          label: "Extra Large",
          type: "string",
          options: Object.keys(gapOptionsCn.xl),
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
          url: "https://asg-cms.s3.eu-west-3.amazonaws.com/43-junio-2022-kodak-gold-200-website/11.webp",
          alt: "Image",
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
