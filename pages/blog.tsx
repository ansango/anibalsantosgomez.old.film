import Container from "components/Container";
import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const posts = allBlogs
    .filter(({ lang }) => lang === locale)
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
    <Container
      SeoProps={{
        title: "Blog - Anibal Santos",
        description: "Blog de Anibal Santos",
      }}
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        {posts.map(({ slug, title, summary, publishedAt, lang }) => {
          return (
            <div key={slug}>
              <h1>{title}</h1>
              <p>{summary}</p>
              <p>{publishedAt}</p>
              <Link href={`/blog/${slug}`} locale={lang}>
                <a>Read more</a>
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Blog;
