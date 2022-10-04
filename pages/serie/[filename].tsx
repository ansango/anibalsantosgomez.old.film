/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";
import { Serie } from "../../components/series/serie";
import FourOhFour from "../404";

import { motion } from "framer-motion";
import { Lightbox } from "../../components/layout/lightbox";
import { NextSeoProps } from "next-seo";

const SeriePage = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const { prev, next, route } = props;

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const { serie } = data;

  if (serie && serie.isPublished) {
    const {
      _body,
      bodyHighlight,
      meta,
      publishedAt,
      title,
      description,
      summary,
      cover,
    } = serie;

    const firstTag =
      serie?.meta?.tags[0].charAt(0).toUpperCase() +
      serie?.meta?.tags[0].slice(1);
    const secondTag =
      serie?.meta?.tags[1].charAt(0).toUpperCase() +
      serie?.meta?.tags[1].slice(1);
    const seoProps: NextSeoProps = {
      title: serie?.seo?.title,
      titleTemplate: `%s | Serie | ${firstTag} ${secondTag}`,
      robotsProps: {
        maxImagePreview: "standard",
        notranslate: true,
        maxSnippet: -1,
      },
      description: serie?.seo?.description,
      canonical: `${process.env.NEXT_PUBLIC_WEB_URI}/${route}`,
      mobileAlternate: {
        media: "handheld",
        href: `${process.env.NEXT_PUBLIC_WEB_URI}/${route}`,
      },
      additionalMetaTags: [
        {
          property: "article:published_time",
          content: serie?.publishedAt,
        },
      ],
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_WEB_URI}/${route}`,
        type: "article",
        title: serie?.seo?.title,
        article: {
          authors: ["Aníbal Santos Gómez"],
          publishedTime: serie?.publishedAt,
          tags: serie?.meta?.tags,
          section: "Series",
        },
        description: serie?.seo?.description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_WEB_URI}/static/series/${serie.sequence}.jpg`,
            width: 400,
            height: 400,
            alt: serie?.seo?.title,
          },
        ],
      },
    };

    return (
      <Layout rawData={data} data={data.global as any} seo={seoProps}>
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lightbox>
            <Serie
              {...{
                body: _body,
                bodyHighlight,
                meta,
                publishedAt,
                title,
                cover,
                description,
                summary,
                url: route,
              }}
              next={next}
              prev={prev}
            />
          </Lightbox>
        </motion.div>
      </Layout>
    );
  }
  return <FourOhFour />;
};

export default SeriePage;

export const getStaticProps = async ({ params }) => {
  const allSeries = await (
    await client.queries.serieConnection()
  ).data.serieConnection.edges
    .map(({ node }) => node)
    .filter((serie) => serie.isPublished);

  const serieIndex = allSeries
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
    .findIndex((serie) => serie._sys.filename === params.filename);

  const prevSerie = allSeries[serieIndex - 1] || null;
  const nextSerie = allSeries[serieIndex + 1] || null;

  const prev =
    (prevSerie && { title: prevSerie.title, route: prevSerie._sys.filename }) ||
    null;
  const next =
    (nextSerie && { title: nextSerie.title, route: nextSerie._sys.filename }) ||
    null;

  const tinaProps = await client.queries.serieQuery({
    relativePath: `${params.filename}.mdx`,
  });

  return {
    props: {
      ...tinaProps,
      route: `serie/${params.filename}`,
      prev,
      next,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.serieConnection();
  return {
    paths: postsListData.data.serieConnection.edges.map((post) => ({
      params: {
        filename: post.node._sys.filename,
      },
    })),
    fallback: "blocking",
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
