import type { Template } from "tinacms";

export const hero: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "",

    defaultItem: {
      tagline: "Your tagline",
      headline: "This Big Text is Totally Awesome",
      text: "Here's some text above the other text",
      type: "left",
    },
  },
  fields: [
    {
      name: "tagline",
      label: "Tagline",
      type: "string",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Type",
      name: "type",
      options: ["left", "center"],
    },
  ],
};
