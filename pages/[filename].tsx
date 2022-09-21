/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
import { client } from "../.tina/__generated__/client";
import { seoConfig } from "../components/layout/layout";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { page } = data;

  return (
    <Layout
      rawData={data}
      data={data.global as any}
      seo={{
        ...seoConfig,
        title: page.seo?.title,
        description: page.seo?.description,
        route: props.route,
      }}
    >
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      route: `/${params.filename}`,
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
