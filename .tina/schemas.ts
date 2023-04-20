import { cameras, films, tags } from "../src/constants";
import { centerImage } from "../src/components/image";
import { TinaField } from "tinacms";

export const metaSchema: TinaField = {
  type: "object",
  name: "meta",
  label: "Meta",

  fields: [
    {
      type: "datetime",
      label: "Published At",
      name: "publishedAt",
    },
    {
      label: "Camera",
      name: "camera",
      type: "string",
      options: cameras,
    },
    {
      label: "Film",
      name: "film",
      type: "string",
      options: films,
    },

    {
      type: "object",
      label: "Shot period",
      name: "shot",
      fields: [
        {
          label: "Start",
          name: "start",
          type: "datetime",
        },
        {
          label: "End",
          name: "end",
          type: "datetime",
        },
      ],
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      options: tags,
      list: true,
    },
  ],
};

export const thumbnailsSchemaField: TinaField = {
  label: "Thumbnails",
  name: "thumbnails",
  type: "object",
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    {
      type: "object",
      label: "First Thumbnail",
      name: "firstThumbnail",
      fields: [
        {
          name: "url",
          label: "URL",
          type: "image",
        },
        {
          name: "centerImage",
          label: "Center Image",
          type: "string",
          options: centerImage,
        },
      ],
    },
    {
      type: "object",
      label: "Second Thumbnail",
      name: "secondThumbnail",
      fields: [
        {
          name: "url",
          label: "URL",
          type: "image",
        },
        {
          name: "centerImage",
          label: "Center Image",
          type: "string",
          options: centerImage,
        },
      ],
    },
    {
      type: "object",
      label: "Third Thumbnail",
      name: "thirdThumbnail",
      fields: [
        {
          name: "url",
          label: "URL",
          type: "image",
        },
        {
          name: "centerImage",
          label: "Center Image",
          type: "string",
          options: centerImage,
        },
      ],
    },
  ],
};
