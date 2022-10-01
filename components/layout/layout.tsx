import React from "react";
import NextHead from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";
import { TinaField } from "tinacms";

export const seoConfig = {
  title: "film captures",
  description: "film captures",
  image: "https://anibalsantosgomez.com/avatar.jpeg",
  type: "website",
  author: "Aníbal Santos Gómez",
  uname: "anibalsantos",
  site: "https://anibalsantosgomez.com",
  twitter: "@iamasync_",
  route: "",
  date: undefined,
};

export const Layout = ({
  rawData = {},
  data = layoutData,
  seo = {
    ...seoConfig,
  },
  children,
}) => {
  return (
    <>
      <NextHead>
        <title>{seo.title}</title>
        <meta content={seo.description} name="description" />
        <meta property="og:url" content={`${seo.site}/${seo.route}`} />
        <link rel="canonical" href={`${seo.site}/${seo.route}`} />
        <meta property="og:type" content={seo.type} />
        <meta property="og:site_name" content={seo.author} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:image" content={seo.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seo.twitter} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
        {seo.date && (
          <meta property="article:published_time" content={seo.date} />
        )}
      </NextHead>
      <Theme data={data?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "work-sans" && "font-work-sans"
          } ${
            data.theme.font === "sans" && "font-sans"
          } bg-neutral-50/10 dark:bg-neutral-900`}
        >
          <Header data={data?.header} />
          <main className={`flex-1 flex flex-col`}>{children}</main>
          <Footer rawData={rawData} data={data?.footer} />
        </div>
      </Theme>
    </>
  );
};

export const seoSchema: TinaField = {
  type: "object",
  label: "Seo",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: true,
    },
  ],
};

export const defaultSeo = {
  title: seoConfig.title,
  description: seoConfig.description,
};
