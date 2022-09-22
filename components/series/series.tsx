import Link from "next/link";
import { formatDate } from "../../lib/utils";
import {
  baseInputStyles,
  monoBordersColors,
  monoTextColors,
  monoRestColors,
  primaryHoverTextColors,
} from "../styles";
import { useTheme } from "../layout";
import { TinaTemplate } from "tinacms";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { useAllSeriesQuery } from "../../lib/hooks";
import { useState } from "react";
import { Icon } from "../util/icon";

const Searcher = ({ onSearch, placeholder }) => {
  const { mono } = useTheme();
  return (
    <div className="relative max-w-lg">
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
    <div className="flex justify-center py-5">
      {pageNumbers.length !== 1 &&
        pageNumbers.map((number) => {
          const cn =
            currentPage === number
              ? `p-5 text-lg font-semibold ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]}`
              : `p-5 text-lg font-semibold ${monoTextColors[500][mono]} ${primaryHoverTextColors[color]}`;

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
    series?.filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
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
        {loading && <div>Loading...</div>}
        {series?.length > 0 ? (
          <div className="space-y-16">
            <Searcher
              onSearch={(e) => setSearchValue(e.target.value)}
              placeholder={configSearch.placeholder}
            />
            <div className="space-y-5 sm:space-y-0">
              <div className="relative">
                <div
                  className={`pb-4 border-b ${monoBordersColors[600][mono]}`}
                >
                  <h2
                    className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
                    data-tinafield={`${parentField}.title`}
                  >
                    {data.title}
                  </h2>
                </div>
              </div>
              <div
                className={`space-y-12 sm:space-y-8 lg:divide-y ${monoRestColors.divide100[mono]} h-full`}
              >
                {currentPosts.map((serie) => {
                  return (
                    <article key={serie._sys.filename}>
                      <Link href={`/serie/` + serie._sys.filename} passHref>
                        <a className="pt-8 sm:flex lg:items-start group">
                          <div className="mb-4 sm:mb-0 sm:mr-4">
                            {serie.meta?.cover && (
                              <div className="w-full relative sm:w-48 md:w-64 lg:w-40">
                                <img
                                  className="object-cover w-full aspect-4/3"
                                  alt=""
                                  src={serie.meta?.cover}
                                  width={2048}
                                  height={1365}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <span
                              className={`text-sm ${monoTextColors[500][mono]}`}
                            >
                              {formatDate(serie.publishedAt)}
                            </span>
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
                        </a>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
            <Pagination
              onPagination={onPagination}
              currentPage={currentPage}
              pageNumbers={pageNumbers}
            />
          </div>
        ) : null}
      </Container>
    </Section>
  );
};

export const allSeriesSchema: TinaTemplate = {
  label: "All series",
  name: "allSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "All Series",
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "search",
      label: "Search",
      type: "object",
      fields: [
        {
          name: "placeholder",
          label: "Placeholder",
          type: "string",
        },
        {
          name: "active",
          label: "Active",
          type: "boolean",
        },
        {
          name: "maxPosts",
          label: "Max posts",
          type: "number",
        },
      ],
    },
  ],
};
