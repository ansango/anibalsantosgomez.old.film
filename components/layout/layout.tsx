import React from "react";
import NextHead from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";
import { colorFull } from "../../constants/colors";

const Head = ({ font = layoutData.theme.font }) => {
  return (
    <NextHead>
      <title>Tina</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {font === "nunito" && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
            rel="stylesheet"
          />
        </>
      )}
      {font === "lato" && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </>
      )}
      {font === "work-sans" && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,700;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
        </>
      )}
    </NextHead>
  );
};

export const mainMonoClass = {
  slate: "text-slate-800 dark:text-slate-100 flex-1 flex flex-col",
  gray: "text-gray-800 dark:text-gray-100 flex-1 flex flex-col",
  zinc: "text-zinc-800 dark:text-zinc-100 flex-1 flex flex-col",
  neutral: "text-neutral-800 dark:text-neutral-100 flex-1 flex flex-col",
  stone: "text-stone-800 dark:text-stone-100 flex-1 flex flex-col",
};

export const Layout = ({ rawData = {}, data = layoutData, children }) => {
  const mainClass = mainMonoClass[data.theme.mono];
  return (
    <>
      <Head font={data?.theme.font} />

      <Theme data={data?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "work-sans" && "font-work-sans"
          } ${data.theme.font === "sans" && "font-sans"}`}
        >
          <Header data={data?.header} />
          <main className={mainClass}>{children}</main>
          <Footer
            rawData={rawData}
            data={data?.footer}
            icon={data?.header.icon}
          />
        </div>
      </Theme>
    </>
  );
};
