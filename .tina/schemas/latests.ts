import type { Template } from "tinacms";

export const latests: Template = {
  label: "Latests Series",
  name: "latestsSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Lo último",
      noDataMessage: "No hay series",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "noDataMessage",
      label: "No data message",
    },
  ],
};
