import Link from "next/link";
import { FC } from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  locale: string;
};

const Pagination: FC<Props> = ({ totalPages, currentPage, locale }) => {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && <a className="cursor-auto opacity-50">Anterior</a>}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/` : `/page/${currentPage - 1}`}
            locale={locale}
          >
            <a>Anterior</a>
          </Link>
        )}
        <span>
          {currentPage} de {totalPages}
        </span>
        {!nextPage && <a className="cursor-auto opacity-50">Siguiente</a>}
        {nextPage && (
          <Link href={`/page/${currentPage + 1}`} locale={locale}>
            <a>Siguiente</a>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
