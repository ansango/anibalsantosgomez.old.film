import Container from "components/Container";
import { Blog } from "contentlayer/generated";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { parseISO, format } from "date-fns";
import seoConfig from "lib/seoConfig";
import Structure from "components/Structure";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import formatDate from "lib/formatDate";
const BlogLayout = ({
  children,
  currentPost,
  previousPost,
  nextPost,
}: PropsWithChildren<{
  currentPost: Blog;
  nextPost: Blog;
  previousPost: Blog;
}>) => {
  const { t } = useTranslation("common");

  return (
    <Container
      SeoProps={{
        type: "article",
        title: `${currentPost.title} - ${seoConfig.author}`,
        date: `${new Date(currentPost.publishedAt).toISOString()}`,
        description: currentPost.summary,
        image: currentPost.image,
      }}
    >
      <Structure>
        <article className="flex flex-col items-start justify-center mx-auto mb-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {currentPost.title}
          </h1>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
            <div className="flex items-center">
              <Image
                alt={seoConfig.author}
                height={24}
                width={24}
                src="/avatar.jpeg"
                className="rounded-full"
              />
              <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {seoConfig.author} /
                {formatDate(currentPost.publishedAt, t("date-locale"))}
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {currentPost.readingTime.text}
            </p>
          </div>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
        </article>
        <div className="text-sm sm:text-base grid grid-cols-2 gap-5 md:gap-10 lg:gap-20 xl:gap-60 py-5">
          {previousPost ? (
            <Link href={`/blog/${previousPost.slug}`} className="">
              <a className="flex justify-start items-center space-x-1 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="line-clamp-1 w-full">
                  {previousPost.title}
                </span>
              </a>
            </Link>
          ) : (
            <div></div>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`}>
              <a className="flex justify-end items-center space-x-1 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                <span className="line-clamp-1 w-full text-right">
                  {nextPost.title}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Link>
          )}
        </div>
      </Structure>
    </Container>
  );
};

export default BlogLayout;
