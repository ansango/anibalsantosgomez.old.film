import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps: GetStaticProps = () => {
  const posts = allBlogs
    .map((post) => pick(post, ["slug", "title", "summary", "publishedAt"]))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
};

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {posts.map(({ slug, title, summary, publishedAt }) => (
        <div key={slug}>
          <h1>{title}</h1>
          <p>{summary}</p>
          <p>{publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
