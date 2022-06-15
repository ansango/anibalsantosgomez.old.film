import BlogPost from "components/BlogPost";
import { InferGetStaticPropsType } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { getStaticProps } from "pages";
import { FC, useState } from "react";

type Props = {
  initialGrid?: boolean;
} & InferGetStaticPropsType<typeof getStaticProps>;

const ListLayout: FC<Props> = ({ initialGrid = true, posts }) => {
  const [grid, setGrid] = useState(initialGrid);
  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const { t } = useTranslation("home");
  return (
    <>
      <button onClick={() => setGrid(!grid)} className="py-4 ml-auto">
        {!grid && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        )}
        {grid && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {grid && (
        <div className="grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3">
          {posts.map(({ slug, title, lang, cover }, index) => (
            <Link href={`/${slug}`} locale={lang} key={index}>
              <a className="w-full flex flex-col">
                <Image
                  src={cover}
                  alt={title}
                  className="w-full rounded-sm"
                  width={600}
                  height={400}
                />
              </a>
            </Link>
          ))}
        </div>
      )}
      {!grid && (
        <>
          <div className="relative w-full mb-4">
            <input
              aria-label={t("searcher")}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t("searcher")}
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            {t("allPosts")}
          </h3>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t("noPosts")}
            </p>
          )}
          {filteredBlogPosts.map((post) => (
            <BlogPost key={post.title} {...post} />
          ))}
        </>
      )}
    </>
  );
};

export default ListLayout;
