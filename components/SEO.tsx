import useTranslation from "next-translate/useTranslation";
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

const SEO: FC<Props> = ({ title, description, image, type, date }) => {
  const { t } = useTranslation();
  const meta = {
    title: title || t(`common:defaultSeo.title`),
    description: description || t(`common:defaultSeo.description`),
    image: image || t(`common:defaultSeo.image`),
    type: type || t(`common:defaultSeo.type`),
    author: t(`common:defaultSeo.author`),
    site: t(`common:defaultSeo.site`),
    twitter: t(`common:defaultSeo.twitter`),
  };

  const { asPath } = useRouter();

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

export default SEO;
