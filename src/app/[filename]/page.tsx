import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

import type { PageBlocks, Serie } from ".tina/__generated__/types";
import type { ImageProps } from "@/components";
import { Image } from "@/components";
import type {
  BodySimpleProps,
  ContactFormProps,
  HeroBaseProps,
  MasonryBaseProps,
} from "@/components/cms";
import { BodySimple, ContactForm, Series, HeroBase, MasonryBase } from "@/components/cms";
import { getBlurUrl, getPage, getPageConnection, getSeries } from "@/lib";

type Params = {
  filename: string;
};

type PageTina = {
  _sys: Params;
};

export async function generateStaticParams() {
  const pages = (await getPageConnection()) as Array<PageTina>;
  const map = pages.map((page) => ({
    params: {
      filename: page._sys.filename,
    },
  }));
  return map;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage({ params });
  const url = `${process.env.NEXT_PUBLIC_WEB_URI}${
    params.filename === "index" ? "" : `/${params.filename}`
  }`;
  return {
    title: `${data?.title ?? "Film captures"} | Aníbal Santos Gómez `,
    description: data?.description,
    openGraph: {
      type: "website",
      title: `${data?.title ?? "Film captures"} | Aníbal Santos Gómez `,
      description: data?.description ?? "Film captures",
      url,
    },
    alternates: {
      canonical: url,
      languages: {
        es: url,
      },
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const data = await getPage({ params });
  const blocks = data?.blocks as Array<PageBlocks>;
  if (!data || !data.visible || !blocks) notFound();

  const series = params.filename === "series" ? await getSeries() : null;

  return (
    <>
      {blocks?.map((block, iBlock) => {
        const key = `${block?.__typename}-${iBlock}`;
        switch (block?.__typename) {
          case "PageBlocksHeroBase": {
            if (!block.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }
          case "PageBlocksMasonryBase": {
            if (!block.visible) return null;
            return (
              <MasonryBase key={key} {...(block as MasonryBaseProps)}>
                {block.images?.map((image, iGallery) => (
                  <Image
                    {...(image as ImageProps)}
                    key={iGallery}
                    alt={image?.label ?? "Image"}
                    loading={iBlock < 2 && iGallery < 2 ? "eager" : "lazy"}
                    blurDataURL={getBlurUrl(image as ImageProps)}
                  />
                ))}
              </MasonryBase>
            );
          }
          case "PageBlocksAllSeries": {
            if (!block.visible || !series) return null;
            return <Series key={key} data={series as unknown as Array<Serie>} />;
          }
          case "PageBlocksContactForm": {
            if (!block.visible) return null;
            return <ContactForm key={key} {...(block as ContactFormProps)} />;
          }
          case "PageBlocksBodySimple": {
            const content = block.content as TinaMarkdownContent;
            if (!block.visible || content.children.length === 0) return null;
            return <BodySimple key={key} {...(block as BodySimpleProps)} />;
          }
          default:
            return null;
        }
      })}
    </>
  );
}
