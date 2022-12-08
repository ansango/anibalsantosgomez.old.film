import { type SchemaField } from "tinacms";
import { cameras, films } from "../../constant";
import { tags } from "../../constant/tags";

export const meta: SchemaField = {
  type: "object",
  name: "meta",
  label: "Meta",
  fields: [
    {
      label: "Camera",
      name: "camera",
      type: "string",
      required: true,
      options: cameras,
    },
    {
      label: "Film",
      name: "film",
      type: "string",
      required: true,
      options: films,
    },

    {
      type: "object",
      label: "Shot Period",
      name: "shot",
      fields: [
        {
          label: "Start",
          name: "start",
          type: "datetime",
          required: true,
        },
        {
          label: "End",
          name: "end",
          type: "datetime",
          required: true,
        },
      ],
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
      options: tags,
    },
  ],
};
