import { Render, Layout } from "components";
import { useTina } from "tinacms/dist/react";
import { client } from ".tina/__generated__/client";
import { motion } from "framer-motion";
import type { NextSeoProps } from "next-seo";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { page } = data;
  const url = props.route === "/home" ? "" : props.route.replace("/", "");

  const seoProps: NextSeoProps = {
    title: page?.seo?.title || "",
    description: page?.seo?.description || "",
    robotsProps: {
      maxImagePreview: "standard",
      notranslate: true,
      maxSnippet: -1,
    },
    canonical: `${process.env.NEXT_PUBLIC_WEB_URI}/${url}`,
    mobileAlternate: {
      media: "handheld",
      href: `${process.env.NEXT_PUBLIC_WEB_URI}/${url}`,
    },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEB_URI}/${url}`,
      title: page?.seo?.title || "",
      description: page?.seo?.description || "",
    },
  };

  return (
    <Layout rawData={data} data={data.global} seo={seoProps}>
      <motion.article
        key={props.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Render {...data.page} />
      </motion.article>
    </Layout>
  );
}

export const getStaticProps = async ({ params }: { params: any }) => {
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
    paths: pagesListData.data.pageConnection.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
