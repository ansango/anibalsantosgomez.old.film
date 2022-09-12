import Container from "components/Container";
import Structure from "components/Structure";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { allBlogs } from "contentlayer/generated";
import { pick } from "contentlayer/client";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
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
const boxVariant = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};
const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const { t } = useTranslation("home");
  const control = useAnimation();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  return (
    <Container
      SeoProps={{
        title: t("title"),
        description: t("description"),
      }}
    >
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 pb-16">
          <motion.div
            className="flex flex-col py-20 md:py-40 lg:py-60 xl:py-96 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight">
              {t("description")}
            </h1>
            <p className="text-gray-900 text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight">
              {t("timeline")}
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={boxVariant}
            initial="hidden"
            animate={control}
            className="grid grid-cols-1 gap-5 md:gap-10 lg:gap-20 xl:gap-32"
          >
            {posts.map(({ slug, title, lang, cover }, index) => {
              return (
                <Link
                  href={`series/${slug}`}
                  locale={lang}
                  key={index}
                  passHref
                >
                  <motion.a
                    className="w-full flex flex-col"
                    ref={ref}
                    variants={boxVariant}
                    initial="hidden"
                    animate={control}
                  >
                    <Image
                      src={cover}
                      alt={title}
                      width={2048}
                      height={1365}
                      priority={index === 0 ? true : false}
                    />
                  </motion.a>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </Structure>
    </Container>
  );
};

export default Home;
