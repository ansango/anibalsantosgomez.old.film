import Container from "components/Container";
import Structure from "components/Structure";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { allBlogs } from "contentlayer/generated";
import { pick } from "contentlayer/client";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const posts = allBlogs
    .filter(({ lang }) => lang === locale)
    .map((post) =>
      pick(post, ["slug", "title", "summary", "publishedAt", "cover"])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts, locale } };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const { t } = useTranslation("home");
  return (
    <Container>
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start pb-10 lg:pb-20">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-gray-900 dark:text-gray-100">
                {t("title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                {t("description")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 xl:gap-10">
            {posts.map(({ slug, title, lang, cover }, index) => (
              <Link href={`/${slug}`} locale={lang} key={index}>
                <a className="w-full flex flex-col">
                  <Image
                    src={cover}
                    alt={title}
                    width={1152}
                    height={768}
                    priority={index === 0 ? true : false}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Structure>
    </Container>
  );
};

export default Home;
