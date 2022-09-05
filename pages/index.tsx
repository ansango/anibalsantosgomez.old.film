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
    .filter(({ lang, featured }) => lang === locale && featured)
    .map((post) =>
      pick(post, [
        "slug",
        "title",
        "summary",
        "publishedAt",
        "cover",
        "featured",
      ])
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
          <div className="flex flex-col py-20 md:py-40 lg:py-60 xl:py-96 w-full">
            <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight  dark:text-gray-300">
              {t("description")}
            </h1>
            <p className="text-gray-900 text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight  dark:text-gray-300">
              {t("timeline")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-10 lg:gap-20 xl:gap-32">
            {posts.map(({ slug, title, lang, cover }, index) => {
              return (
                <Link href={`series/${slug}`} locale={lang} key={index}>
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
              );
            })}
          </div>
        </div>
      </Structure>
    </Container>
  );
};

export default Home;
