import type { Template } from "tinacms";

export const allSeries: Template = {
  label: "All series",
  name: "allSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Series",
      noDataMessage: "No hay series",
      search: {
        placeholder: "Buscar",
        active: false,
        maxPosts: 3,
      },
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      type: "string",
      name: "noDataMessage",
      label: "No data message",
    },
    {
      name: "search",
      label: "Search",
      type: "object",
      fields: [
        {
          name: "placeholder",
          label: "Placeholder",
          type: "string",
        },
        {
          name: "active",
          label: "Active",
          type: "boolean",
        },
        {
          name: "maxPosts",
          label: "Max posts",
          type: "number",
        },
      ],
    },
  ],
};
