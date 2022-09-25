import { defineSchema, defineConfig, RouteMappingPlugin } from "tinacms";
import {
  contentBlockSchema,
  contactFormSchema,
  heroBlockSchema,
} from "../components/blocks/";
import { iconSchema } from "../components/util/icon";
import {
  featuredBlockSchema,
  latestsBlockSchema,
  allSeriesSchema,
} from "../components/series";
import { client } from "./__generated__/client";
import { seoSchema } from "../components/layout/layout";
import { metaSchema } from "../components/util/meta";

const schema = defineSchema({
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
      process.env.HEAD!, // Netlify branch env
    token: process.env.TINA_TOKEN!,
    media: {
      // If you wanted cloudinary do this
      // loadCustomStore: async () => {
      //   const pack = await import("next-tinacms-cloudinary");
      //   return pack.TinaCloudCloudinaryMediaStore;
      // },
      // this is the config for the tina cloud media store
      tina: {
        publicFolder: "public",
        mediaRoot: "uploads",
      },
    },
  },
  collections: [
    {
      label: "Series",
      name: "serie",
      path: "content/series",
      format: "mdx",
      fields: [
        { ...seoSchema },
        { ...metaSchema },
        {
          label: "Title",
          name: "title",
          type: "string",
          ui: {
            defaultValue: "This is the title",
          },
        },
        {
          label: "Description",
          name: "description",
          type: "string",
          ui: {
            defaultValue: "This is a short description",
          },
        },
        {
          label: "Summary",
          name: "summary",
          type: "string",
          ui: {
            component: "textarea",
            defaultValue: "This is a long description",
          },
        },
        {
          type: "image",
          name: "cover",
          label: "Cover",
          ui: {
            defaultValue: "/uploads/avatar.jpeg",
          },
        },
        {
          label: "Body Highlight",
          name: "bodyHighlight",
          type: "boolean",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "_body",
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
                  options: ["md", "lg", "xl", "2xl", "3xl", "full"],
                  ui: {
                    defaultValue: "md",
                  },
                },
                {
                  name: "children",
                  label: "Text",
                  type: "rich-text",
                },
              ],
            },
          ],
          isBody: true,
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
        { ...seoSchema },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [
            heroBlockSchema,
            featuredBlockSchema,
            latestsBlockSchema,
            allSeriesSchema,
            contactFormSchema,
            contentBlockSchema,
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

export default schema;
