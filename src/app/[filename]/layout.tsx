import type { ReactNode } from "react";

import { Theme } from "@/components";

import PagesConfig from "../../content/global/pages.json";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { background } = PagesConfig;

  return (
    <div className={`${background.light} ${background.dark}`}>
      <Theme>
        <main className="flex flex-col flex-1">{children}</main>
      </Theme>
    </div>
  );
}
