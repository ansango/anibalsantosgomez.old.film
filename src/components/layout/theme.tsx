"use client";

import type { FC, ReactNode } from "react";

import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

import GlobalData from "../../content/global/index.json";

import { Footer } from "./footer";
import { Header } from "./header";

export const Theme: FC<Props> = ({ children }) => {
  const { navigation, social } = GlobalData;
  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]} enableSystem={false}>
      <Header {...{ navigation }} />
      {children}
      <Footer {...{ navigation, social }} />
    </ThemeProvider>
  );
};
