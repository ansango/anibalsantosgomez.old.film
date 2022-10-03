/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";
import { Serie } from "../../components/series/serie";
import FourOhFour from "../404";
import { seoConfig } from "../../components/layout/layout";
import { motion } from "framer-motion";
import { Lightbox } from "../../components/layout/lightbox";

const SeriePage = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const { prev, next } = props;

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

    return (
      <Layout
        rawData={data}
        data={data.global as any}
        seo={{
          ...seoConfig,
          title: title,
          description: description,
          route: props.route,
          date: publishedAt,
          image: `https://anibalsantosgomez.com/serie/${serie.sequence}.jpg`,
        }}
      >
        <motion.div
          key={props.route}
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
  ).data.serieConnection.edges.map(({ node }) => node);

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
