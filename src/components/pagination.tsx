import type { FC } from "react";

import Link from "next/link";

type Pagination = {
  title: string;
  route: string;
};

export type PaginationProps = {
  prev?: Pagination | null;
  next?: Pagination | null;
};

export const Pagination: FC<PaginationProps> = ({ next, prev }) => {
  return (
    <>
      <div className="text-left group">
        {prev?.route && (
          <>
            <h4 className="italic tracking-wide">
              <span className="text-xs">Anterior</span>
            </h4>
            <Link href={prev.route} className={`line-clamp-1 max-w-xs mr-auto`}>
              {prev.title}
            </Link>
          </>
        )}
      </div>

      <div className="text-right group">
        {next?.route && (
          <>
            <h4 className="italic tracking-wide">
              <span className="text-xs ">Siguiente</span>
            </h4>

            <Link href={next.route} className="max-w-xs ml-auto line-clamp-1">
              {next.title}
            </Link>
          </>
        )}
      </div>
    </>
  );
};
