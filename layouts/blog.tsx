import Container from "components/Container";
import { Blog } from "contentlayer/generated";
import { PropsWithChildren } from "react";
import seoConfig from "lib/utils/seoConfig";
import Structure from "components/Structure";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import formatDate from "lib/utils/formatDate";
import { ImageRender, Meta } from "components/MDXComponents";
import { motion } from "framer-motion";
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
          <motion.div
            className="flex flex-col py-20 md:pt-[20rem] lg:pt-[30rem] xl:pt-[48rem] w-full lowercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight">
              {currentPost.title}
            </h1>
            <p className="text-gray-900 text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight">
              {formatDate(currentPost.publishedAt, t("date-locale"))}
            </p>
          </motion.div>
          <motion.div
            className="w-full mt-2 prose max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
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
            <ImageRender
              src={currentPost.cover}
              alt={currentPost.title}
              priority
            />
            {children}
          </motion.div>
        </article>
        <div className="text-sm sm:text-base grid grid-cols-2 gap-5 md:gap-10 lg:gap-20 xl:gap-60 py-5 lowercase">
          {previousPost ? (
            <Link href={`/series/${previousPost.slug}`} className="">
              <a className="flex justify-start items-center space-x-1 text-gray-500 hover:text-gray-600">
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
            <Link href={`/series/${nextPost.slug}`}>
              <a className="flex justify-end items-center space-x-1 text-gray-500 hover:text-gray-600">
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
