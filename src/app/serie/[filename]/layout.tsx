import type { ReactNode } from "react";

import { Theme, Transition } from "@/components";
import { PaginationBase } from "@/components/cms";
import { getSeriesPagination } from "@/lib";

import SeriesConfig from "../../../content/global/series.json";
type Params = {
  filename: string;
};

export default async function SerieLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { background } = SeriesConfig;
  const pagination = await getSeriesPagination({ params });
  return (
    <div className={`${background.light} ${background.dark}`}>
      <Theme>
        <Transition>{children}</Transition>
        {pagination && (
          <PaginationBase
            next={{
              title: pagination.next?.title,
              route: pagination.next?.route,
            }}
            prev={{
              title: pagination.prev?.title,
              route: pagination.prev?.route,
            }}
          />
        )}
      </Theme>
    </div>
  );
}
