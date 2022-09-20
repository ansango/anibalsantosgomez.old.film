import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

export type Props = {
  title?: string;
  description?: string;
  image?: string;
  type?: "article" | "website";
  date?: string;
};

const seoConfig = {
  image: "https://anibalsantosgomez.com/static/avatar.jpeg",
  author: "Aníbal Santos Gómez",
  site: "https://anibalsantosgomez.com",
  twitter: "@iamasync_",
};

const Seo: FC<Props> = ({
  title = "film captures",
  description = "film captures",
  image,
  type = "website",
  date,
}) => {
  const { author, site, twitter, image: imageDefault } = seoConfig;
  const { asPath } = useRouter();

  const meta = {
    title: `${author} - ${title}`,
    description: description,
    image: image || imageDefault,
    type,
    author,
    site: `${site}`,
    twitter,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.site}${asPath}`} />
      <link rel="canonical" href={`${meta.site}${asPath}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={meta.author} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={meta.twitter} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
};

export default Seo;
