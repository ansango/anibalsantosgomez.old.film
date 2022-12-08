import Link from "next/link";
import { formatDate } from "lib/utils";
import {
  baseInputStyles,
  monoBordersColors,
  monoTextColors,
  monoRestColors,
  primaryHoverTextColors,
} from "constant/styles";

import { useTheme, Section, Container, Image, Icon } from "components";
import { useAllSeriesQuery } from "lib/hooks";
import { useState } from "react";
import { motion } from "framer-motion";

const Searcher = ({ onSearch, placeholder, parentField = "" }) => {
  const { mono } = useTheme();
  return (
    <div className="relative max-w-lg" data-tinafield={`${parentField}.search`}>
      <input
        aria-label="Search"
        type="text"
        onChange={onSearch}
        placeholder={placeholder}
        className={`${baseInputStyles} ${monoTextColors[600][mono]} ${monoRestColors.inputBg[mono]}`}
      />

      <span className="absolute top-0 right-0 translate-y-2/3 -translate-x-3">
        <Icon
          data={{
            name: "search",
            size: "sm",
          }}
        />
      </span>
    </div>
  );
};

const Pagination = ({ pageNumbers = [], onPagination, currentPage = 0 }) => {
  const { mono, color } = useTheme();
  return (
    <div className="flex justify-center py-5 space-x-5">
      {pageNumbers.length !== 1 &&
        pageNumbers.map((number) => {
          const cn =
            currentPage === number
              ? `text-lg font-medium ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]}`
              : `text-lg ${monoTextColors[500][mono]} ${primaryHoverTextColors[color]}`;

          return (
            <button
              className={cn}
              key={number}
              id={number}
              onClick={onPagination}
            >
              {number}
            </button>
          );
        })}
    </div>
  );
};

const Loader = ({ items = 3 }) => {
  const { mono } = useTheme();
  const bgColor = monoRestColors.monoBgSkeleton[mono];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      className={`space-y-12 sm:space-y-8 lg:divide-y ${monoRestColors.divide100[mono]} h-full`}
    >
      {[...Array(items)].map((_, i) => (
        <div key={i} className="pt-8 sm:flex lg:items-start animate-pulse">
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <div className="w-full relative sm:w-48 md:w-64 lg:w-40">
              <div className={`object-cover w-full aspect-4/3 ${bgColor}`} />
            </div>
          </div>
          <div className="w-full">
            <div className={`py-2 px-20 max-w-[1rem] ${bgColor}`} />
            <div className={`mt-4 py-2 px-28 max-w-[1rem] ${bgColor}`} />
            <div className="mt-4 space-y-3">
              <div className={`py-2 px-28 w-full ${bgColor}`} />
              <div className={`py-2 px-28 w-full ${bgColor}`} />
              <div className={`py-2 px-28 w-full ${bgColor}`} />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export const Series = ({ data, parentField = "" }) => {
  const { search } = data;

  const configSearch = {
    placeholder: search.placeholder || "Search",
    active: search.active || false,
    maxPosts: search.maxPosts || 3,
  };

  const { loading, series } = useAllSeriesQuery();
  const { mono } = useTheme();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSeries =
    series?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.meta?.tags?.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase())
        )
    ) || [];

  const onPagination = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastPost = currentPage * configSearch.maxPosts;
  const indexOfFirstPost = indexOfLastPost - configSearch.maxPosts;
  const currentPosts = filteredSeries.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredSeries.length / configSearch.maxPosts);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Section>
      <Container>
        <div className="space-y-16">
          {data.search.active && (
            <Searcher
              onSearch={(e) => setSearchValue(e.target.value)}
              placeholder={configSearch.placeholder}
              parentField={parentField}
            />
          )}
          <div className="space-y-5 sm:space-y-0">
            <div className="relative">
              <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
                <h2
                  className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
                  data-tinafield={`${parentField}.title`}
                >
                  {data.title}
                </h2>
              </div>
            </div>
            {loading && <Loader items={search.maxPosts} />}
            {!loading && series?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                className={`space-y-12 sm:space-y-8 lg:divide-y ${monoRestColors.divide100[mono]} h-full`}
              >
                {currentPosts.map((serie) => {
                  return (
                    <article key={serie._sys.filename}>
                      <Link
                        href={`/serie/` + serie._sys.filename}
                        passHref
                        className="pt-8 sm:flex lg:items-start group"
                      >
                        <div className="mb-4 sm:mb-0 sm:mr-4">
                          {serie?.cover && (
                            <div className="w-full relative sm:w-48 md:w-64 lg:w-40">
                              <Image
                                alt={serie.title}
                                url={serie.cover}
                                onClick={() => ""}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <time
                            dateTime={serie.publishedAt}
                            className={`text-sm md:hidden ${monoTextColors[500][mono]}`}
                          >
                            {formatDate(serie.publishedAt)}
                          </time>
                          <time
                            dateTime={serie.publishedAt}
                            className={`hidden md:block text-sm ${monoTextColors[500][mono]}`}
                          >
                            {formatDate(serie.publishedAt, "es-ES", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                          <h3
                            className={`mt-3 text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
                          >
                            {serie.title}
                          </h3>
                          <p
                            className={`mt-2 text-base ${monoTextColors[500][mono]} line-clamp-4 lg:line-clamp-3 ${monoRestColors.groupTextHover700[mono]}`}
                          >
                            {serie.summary}
                          </p>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </motion.div>
            )}
            {!loading && series?.length === 0 && (
              <div
                className="py-10"
                data-tinafield={`${parentField}.noDataMessage`}
              >
                {data.noDataMessage}
              </div>
            )}
          </div>
          {data.search.active && (
            <Pagination
              onPagination={onPagination}
              currentPage={currentPage}
              pageNumbers={pageNumbers}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};
