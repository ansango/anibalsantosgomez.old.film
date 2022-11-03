import {
  defineSchema,
  defineConfig,
  RouteMappingPlugin,
  TinaField,
} from "tinacms";
import {
  contentBlockSchema,
  contactFormSchema,
  heroBlockSchema,
  masonryBlockSchema,
  columnsOptionsCn,
  gapOptionsCn,
} from "../components/blocks/";
import { iconSchema } from "../components/util/icon";
import {
  featuredBlockSchema,
  latestsBlockSchema,
  allSeriesSchema,
} from "../components/series";

import { client } from "./__generated__/client";
import { defaultMeta, metaSchema } from "../components/util/meta";
import { kebabCase } from "../lib/utils";
import { aspectRatioCn, objectPositionCn } from "../components/util/image";
import { containerSizesCn } from "../components/blocks/content/components";

const schema = defineSchema({
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
      process.env.HEAD!, // Netlify branch env
    token: process.env.TINA_TOKEN!,
    media: {
      loadCustomStore: async () => {
        const pack = await import("next-tinacms-s3");
        return pack.TinaCloudS3MediaStore;
      },
    },
  },
  collections: [
    {
      label: "Series",
      name: "serie",
      path: "content/series",
      format: "mdx",
      ui: {
        filename: {
          disabled: true,
          slugify: ({ title, sequence }) => {
            return title && sequence ? kebabCase(`${sequence}-${title}`) : "";
          },
        },
      },
      defaultItem: () => ({
        meta: defaultMeta,
        sequence: 1,
        title: "Éste es el titulo",
        description: "Ésta es una descripción corta",
        summary: "Ésta es una descripción larga",
        cover: "https://picsum.photos/2048/1365",
        bodyHighlight: true,
        isPublished: false,
        isFeatured: false,
        publishedAt: new Date().toISOString(),
        masonry: {
          columns: { default: "1", sm: "1", md: "2", lg: "3" },
          gap: { default: "3", sm: "5", md: "5", lg: "5" },
        },
      }),
      fields: [
        {
          name: "seo",
          label: "SEO",
          type: "object",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
            },
          ],
        },
        { ...metaSchema },
        {
          label: "Sequence",
          name: "sequence",
          type: "number",
          required: true,
          ui: {
            validate: (value) => {
              if (value < 1) {
                return "Sequence must be greater than 0";
              }
            },
          },
        },
        {
          label: "Title",
          name: "title",
          type: "string",
          required: true,
        },
        {
          label: "Description",
          name: "description",
          type: "string",
          required: true,
        },
        {
          label: "Summary",
          name: "summary",
          type: "string",
          required: true,
          ui: {
            component: "textarea",
          },
        },
        {
          type: "image",
          name: "cover",
          label: "Cover",
          required: true,
        },
        // {
        //   label: "Body Highlight",
        //   name: "bodyHighlight",
        //   type: "boolean",
        // },
        // {
        //   type: "rich-text",
        //   label: "Body",
        //   name: "_body",
        //   templates: [
        //     {
        //       name: "DateTime",
        //       label: "Date & Time",
        //       inline: true,
        //       fields: [
        //         {
        //           name: "format",
        //           label: "Format",
        //           type: "string",
        //           options: ["utc", "iso", "local"],
        //         },
        //       ],
        //     },
        //     {
        //       name: "BlockQuote",
        //       label: "Block Quote",
        //       fields: [
        //         {
        //           name: "children",
        //           label: "Quote",
        //           type: "rich-text",
        //         },
        //         {
        //           name: "authorName",
        //           label: "Author",
        //           type: "string",
        //         },
        //       ],
        //     },
        //     {
        //       name: "ContainerText",
        //       label: "Container Text",
        //       fields: [
        //         {
        //           name: "size",
        //           label: "Size",
        //           type: "string",
        //           options: Object.keys(containerSizesCn),
        //         },
        //         {
        //           name: "children",
        //           label: "Text",
        //           type: "rich-text",
        //           templates: [
        //             {
        //               name: "Image",
        //               label: "Image",
        //               fields: [
        //                 {
        //                   name: "url",
        //                   label: "URL",
        //                   type: "image",
        //                 },
        //                 {
        //                   name: "alt",
        //                   label: "Alt Text",
        //                   type: "string",
        //                 },
        //                 {
        //                   name: "aspectRatio",
        //                   label: "Aspect Ratio",
        //                   type: "string",
        //                   options: Object.keys(aspectRatioCn),
        //                 },
        //                 {
        //                   name: "centerImage",
        //                   label: "Center Image",
        //                   type: "string",
        //                   options: Object.keys(objectPositionCn),
        //                 },
        //               ],
        //             },
        //             {
        //               name: "BlockQuote",
        //               label: "Block Quote",
        //               fields: [
        //                 {
        //                   name: "children",
        //                   label: "Quote",
        //                   type: "rich-text",
        //                 },
        //                 {
        //                   name: "authorName",
        //                   label: "Author",
        //                   type: "string",
        //                 },
        //               ],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //     {
        //       name: "Image",
        //       label: "Image",
        //       fields: [
        //         {
        //           name: "url",
        //           label: "URL",
        //           type: "image",
        //         },
        //         {
        //           name: "alt",
        //           label: "Alt Text",
        //           type: "string",
        //         },
        //         {
        //           name: "aspectRatio",
        //           label: "Aspect Ratio",
        //           type: "string",
        //           options: Object.keys(aspectRatioCn),
        //         },
        //         {
        //           name: "centerImage",
        //           label: "Center Image",
        //           type: "string",
        //           options: Object.keys(objectPositionCn),
        //         },
        //       ],
        //     },
        //   ],
        //   isBody: true,
        // },
        {
          label: "Masonry",
          name: "masonry",
          type: "object",
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
                  required: true,
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string",
                  required: true,
                },
                {
                  name: "aspectRatio",
                  label: "Aspect Ratio",
                  type: "string",
                  options: Object.keys(aspectRatioCn),
                  required: true,
                },
                {
                  name: "centerImage",
                  label: "Center Image",
                  type: "string",
                  options: Object.keys(objectPositionCn),
                  required: true,
                },
              ],
            },
          ],
        },
        {
          type: "datetime",
          label: "Published At",
          name: "publishedAt",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
            defaultValue: new Date().toISOString(),
          },
        },
        {
          type: "boolean",
          label: "Is Featured",
          name: "isFeatured",
        },
        {
          type: "boolean",
          label: "Is Published",
          name: "isPublished",
        },
      ],
    },

    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      format: "mdx",

      fields: [
        {
          name: "seo",
          label: "SEO",
          type: "object",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [
            contentBlockSchema,
            heroBlockSchema,
            featuredBlockSchema,
            latestsBlockSchema,
            allSeriesSchema,
            contactFormSchema,
            masonryBlockSchema,
          ],
        },
      ],
    },

    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      fields: [
        {
          type: "object",
          label: "Header",
          name: "header",
          fields: [
            { ...iconSchema, label: "Icon Menu", name: "iconMenu" },
            { ...iconSchema, label: "Icon Close", name: "iconClose" },
            {
              type: "object",
              label: "Nav Links",
              name: "nav",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "home",
                  label: "Home",
                },
              },
              fields: [
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
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "object",
              label: "Links",
              name: "links",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "",
                  label: "Home",
                },
              },
              fields: [
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
                  href: "/",
                  label: "Twitter",
                },
              },
              fields: [
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
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              type: "string",
              label: "Mono Color",
              name: "mono",
              options: [
                {
                  label: "Slate",
                  value: "slate",
                },
                {
                  label: "Gray",
                  value: "gray",
                },
                {
                  label: "Zinc",
                  value: "zinc",
                },
                {
                  label: "Neutral",
                  value: "neutral",
                },
                {
                  label: "Stone",
                  value: "stone",
                },
              ],
            },
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              options: [
                {
                  label: "Slate",
                  value: "slate",
                },
                {
                  label: "Gray",
                  value: "gray",
                },
                {
                  label: "Zinc",
                  value: "zinc",
                },
                {
                  label: "Neutral",
                  value: "neutral",
                },
                {
                  label: "Stone",
                  value: "stone",
                },
                {
                  label: "Red",
                  value: "red",
                },
                {
                  label: "Orange",
                  value: "orange",
                },
                {
                  label: "Amber",
                  value: "amber",
                },
                {
                  label: "Yellow",
                  value: "yellow",
                },
                {
                  value: "lime",
                  label: "Lime",
                },
                {
                  label: "Green",
                  value: "green",
                },
                {
                  label: "Emerald",
                  value: "emerald",
                },
                {
                  label: "Teal",
                  value: "teal",
                },
                {
                  label: "Cyan",
                  value: "cyan",
                },
                {
                  label: "Sky",
                  value: "sky",
                },
                {
                  label: "Blue",
                  value: "blue",
                },
                {
                  label: "Indigo",
                  value: "indigo",
                },
                {
                  label: "Violet",
                  value: "violet",
                },

                {
                  label: "Purple",
                  value: "purple",
                },
                {
                  label: "Fuchsia",
                  value: "fuchsia",
                },
                {
                  label: "Pink",
                  value: "pink",
                },
                {
                  label: "Rose",
                  value: "rose",
                },
              ],
            },
            {
              type: "string",
              name: "font",
              label: "Font Family",
              options: [
                {
                  label: "System Sans",
                  value: "sans",
                },
                {
                  label: "Nunito",
                  value: "nunito",
                },
                {
                  label: "Lato",
                  value: "lato",
                },
                {
                  label: "Work Sans",
                  value: "work-sans",
                },
              ],
            },
            {
              type: "string",
              name: "icon",
              label: "Icon Set",
              options: [
                {
                  label: "Heroicons",
                  value: "hi",
                },
              ],
            },
            {
              type: "string",
              name: "darkMode",
              label: "Dark Mode",
              options: [
                {
                  label: "System",
                  value: "system",
                },
                {
                  label: "Light",
                  value: "light",
                },
                {
                  label: "Dark",
                  value: "dark",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export const tinaConfig = defineConfig({
  client,
  schema,

  cmsCallback: (cms) => {
    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (["global"].includes(collection.name)) {
        return undefined;
      }
      if (["page"].includes(collection.name)) {
        if (document._sys.filename === "home") {
          return `/`;
        }
        if (document._sys.filename === "about") {
          return `/about`;
        }
        if (document._sys.filename === "series") {
          return `/series`;
        }
        return undefined;
      }

      return `/${collection.name}/${document._sys.filename}`;
    });
    cms.plugins.add(RouteMapping);

    return cms;
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    if (formConfig.id === "content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  },
});

export type Template = {
  label: string;
  name: string;
  ui?: {
    previewSrc?: string;
    defaultItem?: object;
  };
  fields: TinaField[];
};

export default schema;
