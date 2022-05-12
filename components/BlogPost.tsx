import { Blog } from "contentlayer/generated";
import formatDate from "lib/formatDate";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const BlogPost = ({
  slug,
  title,
  summary,
  publishedAt,
  lang,
}: Pick<Blog, "slug" | "title" | "summary" | "publishedAt" | "lang">) => {
  const { t } = useTranslation("common");

  return (
    <Link href={`/blog/${slug}`} locale={lang}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h4>
            <p className="mb-4 text-left text-gray-500 flex items-center space-x-1 w-full md:justify-end">
              {formatDate(publishedAt, t("date-locale"))}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
