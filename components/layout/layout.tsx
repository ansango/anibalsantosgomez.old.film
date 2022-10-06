import React, { FC, ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";
import { TinaField } from "tinacms";
import { NextSeo, type NextSeoProps } from "next-seo";

export const Layout: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  seo: NextSeoProps;
  children: ReactNode;
}> = ({ rawData = {}, data = layoutData, seo, children }) => {
  return (
    <>
      <NextSeo {...seo} />
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
