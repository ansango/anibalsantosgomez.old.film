import Container from "components/Container";
import { allBlogs, Blog } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import components from "components/MDXComponents";
import BlogLayout from "layouts/blog";

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
  const postIndex = allBlogs.findIndex(
    ({ slug, lang }) => slug !== params.slug && locale === lang
  );
  const prev = allBlogs[postIndex + 1] || null;
  const next = allBlogs[postIndex - 1] || null;

  const post = allBlogs.find(
    ({ slug, lang }) => slug === params.slug && locale === lang
  );
  return {
    props: {
      post,
      prev,
      next,
    },
  };
};

const Post: NextPage = ({
  post,
  prev,
  next,
}: {
  post: Blog;
  prev: Blog;
  next: Blog;
}) => {
  console.log(next);
  const Component = useMDXComponent(post.body.code);
  return (
    <BlogLayout post={post} next={next} prev={prev}>
      <Component components={{ ...components }} />
    </BlogLayout>
  );
};

export default Post;
