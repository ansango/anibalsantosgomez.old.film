import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import seoConfig from "lib/utils/seoConfig";

export type Props = {
  title?: string;
  description?: string;
  image?: string;
  type?: "article" | "website";
  date?: string;
};

const Seo: FC<Props> = ({
  title,
  description,
  image,
  type = "website",
  date,
}) => {
  const { author, site, twitter, image: imageDefault } = seoConfig;
  const { t } = useTranslation("common");
  const { asPath, locale } = useRouter();
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const meta = {
    title: title || `${author} - ${t(`defaultSeo.title`)}`,
    description: description || t(`defaultSeo.description`),
    image: image || imageDefault,
    type,
    author,
    site: `${site}${localePrefix}`,
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
