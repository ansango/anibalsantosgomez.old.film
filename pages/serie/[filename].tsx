import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/edit-state";
import { Layout } from "../../components/layout";
import { Post } from "../../components/posts/post";

const SeriePage = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.serie && data.serie.isPublished) {
    return (
      <Layout rawData={data} data={data.global as any}>
        <Post {...data.serie} />;
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
};

export default SeriePage;

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.serieQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
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
