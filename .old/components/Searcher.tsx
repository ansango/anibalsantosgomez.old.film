import BlogPost from "components/BlogPost";
import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const MAX_POSTS = 5;

const Searcher: FC = () => {
  const { locale } = useRouter();

  const posts = allBlogs
    .filter(({ lang }) => lang === locale)
    .map((post) =>
      pick(post, ["slug", "title", "summary", "publishedAt", "cover", "lang"])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  const { t } = useTranslation("common");

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onPagination = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastPost = currentPage * MAX_POSTS;
  const indexOfFirstPost = indexOfLastPost - MAX_POSTS;
  const currentPosts = filteredBlogPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredBlogPosts.length / MAX_POSTS); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="w-full mb-4 relative">
        <input
          aria-label={t("searcher")}
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("searcher")}
          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md focus:ring-0 focus:border-gray-900"
        />
        <svg
          className="absolute w-5 h-5 text-gray-400 right-3 top-3"
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

      <h4 className="mt-8 mb-4 text-xl font-bold tracking-tight text-gray-900">
        {t("allPosts")}
      </h4>
      <ul className="max-h-96 overflow-y-auto">
        {!currentPosts.length && (
          <p className="mb-4 text-gray-600">
            {t("noPosts")}
          </p>
        )}
        {currentPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </ul>
      <div className="flex justify-center py-3">
        {pageNumbers.length !== 1 &&
          pageNumbers.map((number) => {
            const cn =
              currentPage === number
                ? "px-3 sm:px-5 text-lg font-semibold"
                : "p-3 sm:p-5 text-lg";

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
    </>
  );
};


