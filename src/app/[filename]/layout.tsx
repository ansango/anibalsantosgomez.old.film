import type { ReactNode } from "react";

import { Theme, Transition } from "@/components";

import PagesConfig from "../../content/global/pages.json";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { background } = PagesConfig;

  return (
    <div className={`${background.light} ${background.dark}`}>
      <Theme>
        <Transition className="flex flex-col flex-1">{children}</Transition>
      </Theme>
    </div>
  );
}
