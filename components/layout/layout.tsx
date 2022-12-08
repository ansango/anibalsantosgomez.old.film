import type { FC, ReactNode } from "react";
import { Header, Footer, Theme, Policy } from "components";
import layoutData from "content/global/index.json";
import { NextSeo, type NextSeoProps } from "next-seo";

export const Layout: FC<{
  rawData?: any;
  data?: any;
  seo?: NextSeoProps;
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
      <Policy />
    </>
  );
};
