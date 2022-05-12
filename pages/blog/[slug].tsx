import Container from "components/Container";
import { allBlogs, Blog } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import components from "components/MDXComponents";
import BlogLayout from "layouts/blog";
import { pick } from "contentlayer/client";

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
  const sortedPostsByDate = allBlogs
    .filter(({ lang }) => lang === locale)
    .map((post) => post)
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  const postIndex = sortedPostsByDate.findIndex(
    ({ slug }) => slug === params.slug
  );
  const nextPost = sortedPostsByDate[postIndex + 1] || null;
  const currentPost = sortedPostsByDate[postIndex] 
  const previousPost = sortedPostsByDate[postIndex - 1] || null;
  console.log(currentPost);
  console.log(previousPost);
  console.log(nextPost);
  const post = allBlogs.find(
    ({ slug, lang }) => slug === params.slug && locale === lang
  );
  return {
    props: {
      currentPost,
      nextPost,
      previousPost,
    },
  };
};

const Post: NextPage = ({
  currentPost,
  nextPost,
  previousPost,
}: {
  currentPost: Blog;
  previousPost: Blog;
  nextPost: Blog;
}) => {
  const props = { currentPost, nextPost, previousPost };
  const Component = useMDXComponent(currentPost.body.code);
  return (
    <BlogLayout {...props}>
      <Component components={{ ...components }} />
    </BlogLayout>
  );
};

export default Post;
