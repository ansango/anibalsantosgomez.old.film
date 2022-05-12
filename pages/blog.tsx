import Container from "components/Container";
import Structure from "components/Structure";
import { pick } from "contentlayer/client";
import { allBlogs, Blog } from "contentlayer/generated";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";
import seoConfig from "lib/seoConfig";
import useTranslation from "next-translate/useTranslation";
import BlogPost from "components/BlogPost";

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const posts = allBlogs
    .filter(({ lang }) => lang === locale)
    .map((post) => pick(post, ["slug", "title", "summary", "publishedAt"]))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts, locale } };
};



const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const { t } = useTranslation("blog");

  return (
    <Container
      SeoProps={{
        title: `${t("title")} - ${seoConfig.author}`,
        description: `${t("description", { posts: posts.length })}`,
      }}
    >
      <Structure>
        <div className="flex flex-col items-start justify-center mb-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {t("title")}
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {t("description", { posts: posts.length })}
          </p>
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
        </div>
      </Structure>
    </Container>
  );
};

export default Blog;
