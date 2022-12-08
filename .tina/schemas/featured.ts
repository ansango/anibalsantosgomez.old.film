import type { Template } from "tinacms";

export const featured: Template = {
  name: "featuredSeries",
  label: "Featured Series",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Destacadas",
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
      label: "No Data Message",
    },
  ],
};
