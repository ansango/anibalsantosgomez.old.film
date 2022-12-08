import type { Template } from "tinacms";
import { containerSizesCn, aspectRatioCn } from "../../constant";

export const content: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      label: "Highlight",
      type: "boolean",
      name: "highlight",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
        {
          name: "ContainerText",
          label: "Container Text",
          fields: [
            {
              name: "size",
              label: "Size",
              type: "string",
              options: Object.keys(containerSizesCn),
            },
            {
              name: "children",
              label: "Text",
              type: "rich-text",
              templates: [
                {
                  name: "Image",
                  label: "Image",
                  fields: [
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
                  ],
                },
                {
                  name: "BlockQuote",
                  label: "Block Quote",
                  fields: [
                    {
                      name: "children",
                      label: "Quote",
                      type: "rich-text",
                    },
                    {
                      name: "authorName",
                      label: "Author",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Image",
          label: "Image",
          fields: [
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
          ],
        },
      ],
    },
  ],
};
