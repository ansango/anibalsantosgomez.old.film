import Container from "components/Container";
import { Blog } from "contentlayer/generated";
import { PropsWithChildren } from "react";
import seoConfig from "lib/seoConfig";
import Structure from "components/Structure";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import formatDate from "lib/formatDate";
import { ImageRender, Meta, Note } from "components/MDXComponents";
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
        image: currentPost.cover,
      }}
    >
      <Structure>
        <article className="flex flex-col items-start justify-center mx-auto mb-16">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-gray-100">
            {currentPost.title}
          </h1>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
            <div className="flex items-center"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300 h-full">
              {formatDate(currentPost.publishedAt, t("date-locale"))}
            </p>
          </div>
          <div className="w-full mt-2 prose dark:prose-dark max-w-none">
            <ImageRender
              src={currentPost.cover}
              alt={currentPost.title}
              priority
            />
            {children}

            <Meta
              locale={t("date-locale")}
              meta={currentPost.meta}
              translations={{
                camera: t("meta.camera"),
                film: t("meta.film"),
                period: t("meta.period"),
                location: t("meta.location"),
              }}
            />
          </div>
        </article>
        <div className="text-sm sm:text-base grid grid-cols-2 gap-5 md:gap-10 lg:gap-20 xl:gap-60 py-5">
          {previousPost ? (
            <Link href={`/${previousPost.slug}`} className="">
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
            <Link href={`/${nextPost.slug}`}>
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
