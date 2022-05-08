import Container from "components/Container";
import { allBlogs, Blog } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogs.map(({ slug, lang }) => ({
      params: { slug },
      locale: lang,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const post = allBlogs.find(
    ({ slug, lang }) => slug === params.slug && locale === lang
  );
  return {
    props: {
      post,
    },
  };
};

const Post: NextPage = ({ post }: { post: Blog }) => {
  const Component = useMDXComponent(post.body.code);
  return (
    <Container>
      <Component />
    </Container>
  );
};

export default Post;
