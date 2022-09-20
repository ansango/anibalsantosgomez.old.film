import React from "react";
import NextHead from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";
import { Toaster } from "react-hot-toast";
import { TinaField } from "tinacms";

export const mainMonoClass = {
  slate: "text-slate-800 dark:text-slate-100 flex-1 flex flex-col",
  gray: "text-gray-800 dark:text-gray-100 flex-1 flex flex-col",
  zinc: "text-zinc-800 dark:text-zinc-100 flex-1 flex flex-col",
  neutral: "text-neutral-800 dark:text-neutral-100 flex-1 flex flex-col",
  stone: "text-stone-800 dark:text-stone-100 flex-1 flex flex-col",
};

export const tx = {
  slate: "text-slate-800 dark:text-slate-100",
  gray: "text-gray-800 dark:text-gray-100",
  zinc: "text-zinc-800 dark:text-zinc-100",
  neutral: "text-neutral-800 dark:text-neutral-100",
  stone: "text-stone-800 dark:text-stone-100",
};

const bg = {
  slate: "bg-slate-50 dark:bg-slate-900",
  gray: "bg-gray-50 dark:bg-gray-900",
  zinc: "bg-zinc-50 dark:bg-zinc-900",
  neutral: "bg-neutral-50 dark:bg-neutral-900",
  stone: "bg-stone-50 dark:bg-stone-900",
};

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
        <title>
          {seo.title} - {seo.uname}
        </title>
        <meta name="robots" content="follow, index" />
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

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {data?.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "work-sans" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,700;1,500;1,600;1,700&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        <link href="/site.webmanifest" rel="manifest" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link color="#4a9885" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="/browserconfig.xml" name="msapplication-config" />
      </NextHead>
      <Theme data={data?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "work-sans" && "font-work-sans"
          } ${data.theme.font === "sans" && "font-sans"} ${
            bg[data.theme.mono]
          } ${tx[data.theme.mono]}`}
        >
          <Header data={data?.header} />
          <main className={`${tx[data.theme.mono]} flex-1 flex flex-col`}>
            {children}
          </main>
          <Footer rawData={rawData} data={data?.footer} />
        </div>
      </Theme>
      <Toaster
        toastOptions={{
          position: "bottom-center",
        }}
      />
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
