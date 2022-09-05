import BlogPost from "components/BlogPost";
import Container from "components/Container";
import Structure from "components/Structure";
import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
const MAX_POSTS = 10;

const Series: NextPage = () => {
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

  const { t } = useTranslation("series");

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
    <Container
      SeoProps={{
        title: `${t("title")}`,
        description: `${t("description")}`,
      }}
    >
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 pb-16">
          <motion.div
            className="flex flex-col py-10 md:pt-[20rem] lg:pt-[30rem] xl:pt-[48rem] w-full lowercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight">
              {t("title")}
            </h1>
            <p className="text-gray-900 text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight">
              {t("description")}
            </p>
          </motion.div>
          {pageNumbers.length !== 1 && (
            <motion.div
              className="w-full mb-4 relative pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>
          )}

          <motion.ul
            key={currentPosts.length}
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!currentPosts.length && (
              <p className="mb-4 text-gray-600">{t("noPosts")}</p>
            )}
            {currentPosts.map((post) => (
              <BlogPost key={post.title} {...post} />
            ))}
          </motion.ul>
          <motion.div
            className="flex w-full justify-center py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
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
          </motion.div>
        </div>
      </Structure>
    </Container>
  );
};

export default Series;
