/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";
import { Serie } from "../../components/series/serie";
import FourOhFour from "../404";
import { seoConfig } from "../../components/layout/layout";

const SeriePage = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
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
    } = serie;

    return (
      <Layout
        rawData={data}
        data={data.global as any}
        seo={{
          ...seoConfig,
          title: serie.seo?.title,
          description: serie.seo?.description,
          route: props.route,
          date: serie.publishedAt,
          image: serie.meta?.cover,
        }}
      >
        <Serie
          {...{
            body: _body,
            bodyHighlight,
            meta,
            publishedAt,
            title,
            description,
            summary,
          }}
        />
      </Layout>
    );
  }
  return <FourOhFour />;
};

export default SeriePage;

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.serieQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
      route: `serie/${params.filename}`,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.serieConnection();
  return {
    paths: postsListData.data.serieConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
