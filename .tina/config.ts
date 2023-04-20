import { defineConfig } from "tinacms";
import { optionsDark, optionsLight } from "../src/components/cms/backgrounds";
import { kebabCase } from "../src/lib";
import { metaSchema, thumbnailsSchemaField } from "./schemas";
import {
  heroBaseTemplate,
  heroSerieTemplate,
  masonryBaseTemplate,
  masonryFSTemplate,
  allSeriesTemplate,
  contactFormTemplate,
  bodySimpleTemplate,
} from "./templates";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID as string,
  token: process.env.TINA_TOKEN as string,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    // @ts-ignore
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore;
    },
  },
  schema: {
    collections: [
      {
        label: "Series",
        name: "serie",
        path: "src/content/series",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: ({ cover }) => {
              const splitter = cover?.split("series/")[1].split("/")[0] || "";
              return splitter && kebabCase(`${splitter}`);
            },
          },
        },

        fields: [
          {
            name: "visible",
            label: "Visible",
            type: "boolean",
          },
          {
            type: "image",
            name: "cover",
            label: "Cover Url",
          },

          { ...metaSchema },
          { ...thumbnailsSchemaField },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Blocks",
            templates: [heroSerieTemplate, bodySimpleTemplate, masonryFSTemplate],
          },
        ],
      },
      {
        label: "Pages",
        name: "page",
        path: "src/content/pages",
        format: "mdx",
        fields: [
          {
            name: "visible",
            label: "Visible",
            type: "boolean",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "description",
            type: "string",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Blocks",
            ui: {
              visualSelector: true,
            },
            templates: [
              heroBaseTemplate,
              masonryBaseTemplate,
              allSeriesTemplate,
              contactFormTemplate,
              bodySimpleTemplate,
            ],
          },
        ],
      },
      {
        label: "Layout",
        name: "global",
        path: "src/content/global",
        format: "json",
        fields: [
          {
            type: "object",
            label: "Navigation",
            name: "navigation",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              },
              defaultItem: {
                href: "home",
                label: "Home",
                visible: false,
              },
            },

            fields: [
              {
                type: "boolean",
                label: "Visible",
                name: "visible",
              },
              {
                type: "string",
                label: "Link",
                name: "href",
              },
              {
                type: "string",
                label: "Label",
                name: "label",
              },
            ],
          },
          {
            type: "object",
            label: "Social Links",
            name: "social",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              },
              defaultItem: {
                href: "home",
                label: "Home",
                visible: false,
              },
            },

            fields: [
              {
                type: "boolean",
                label: "Visible",
                name: "visible",
              },
              {
                type: "string",
                label: "Link",
                name: "href",
              },
              {
                type: "string",
                label: "Label",
                name: "label",
              },
            ],
          },
          {
            type: "object",
            label: "Background",
            name: "background",
            fields: [
              {
                type: "string",
                label: "Light",
                name: "light",
                options: optionsLight,
              },
              {
                type: "string",
                label: "Dark",
                name: "dark",
                options: optionsDark,
              },
            ],
          },
        ],
      },
    ],
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    if (formConfig.id === "src/content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  },
});
