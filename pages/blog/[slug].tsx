import { allBlogs, Blog } from "contentlayer/generated";
import { GetStaticPaths, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = allBlogs.find(({ slug }) => slug === params.slug);
  return {
    props: {
      post,
    },
  };
};

const Post: NextPage = ({ post }: { post: Blog }) => {
  const Component = useMDXComponent(post.body.code);
  return <Component />;
};

export default Post;
