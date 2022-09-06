import { Blog } from "contentlayer/generated";
import formatDate from "lib/utils/formatDate";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const BlogPost = ({
  slug,
  title,
  summary,
  publishedAt,
  lang,
  cover,
}: Pick<
  Blog,
  "slug" | "title" | "summary" | "publishedAt" | "lang" | "cover"
>) => {
  const { t } = useTranslation("common");

  return (
    <Link href={`series/${slug}`} locale={lang}>
      <a className="w-full flex space-y-5 mb-2">
        <li className="w-full mb-2 lowercase">
          <div className="flex justify-between flex-row">
            <h4 className="w-full text-lg font-medium text-gray-900 line-clamp-1">
              {title}
            </h4>
            <p className="mb-4 text-left text-gray-500 flex items-center space-x-1 w-full justify-end">
              {formatDate(publishedAt, t("date-locale"))}
            </p>
          </div>
          <p className="text-gray-600 line-clamp-1">{summary}</p>
        </li>
      </a>
    </Link>
  );
};

export default BlogPost;
