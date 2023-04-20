import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

import type { SerieBlocks } from ".tina/__generated__/types";
import { Container, Section } from "@/components";
import type { MasonryWithLightBoxProps } from "@/components";
import type { BodySimpleProps, HeroSerieProps } from "@/components/cms";
import { BodySimple, HeroSerie } from "@/components/cms";
import { formatDate, getSerie, getSerieConnection } from "@/lib";

import MasonryWithLightBox from "../../../components/lightbox";

type Params = {
  filename: string;
};

type SerieTina = {
  _sys: Params;
  publishedAt: string;
  title: string;
};

export async function generateStaticParams() {
  const series = (await getSerieConnection()) as unknown as Array<SerieTina>;

  return series.map((serie) => ({
    params: {
      filename: serie._sys.filename,
    },
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getSerie({ params });
  const serie = `${data?._sys.filename.replaceAll("-", " ")} |`;
  const url = `${process.env.NEXT_PUBLIC_WEB_URI}/serie/${params.filename}`;
  const tags = (data?.meta?.tags as unknown as Array<string>)
    ?.join(", ")
    ?.replaceAll("-", " ")
    ?.split(", ");

  const title = `Serie | ${serie} Aníbal Santos Gómez`;
  const description = ` Serie ${serie} producida con ${data?.meta?.camera} durante el ${formatDate(
    data?.meta?.shot?.start as string
  )} y el ${formatDate(data?.meta?.shot?.end as string)} y publicada el ${formatDate(
    data?.meta?.publishedAt as string
  )}`;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEB_URI}/covers/${params.filename}.jpg`,
          width: 400,
          height: 400,
          alt: title,
        },
      ],
      tags,
      publishedTime: (data && data?.meta?.publishedAt) || undefined,
      section: "series",
    },
    alternates: {
      canonical: url,
      languages: {
        es: url,
      },
    },
  };
}

const getBlocks = async ({ params }: { params: Params }) => {
  const data = await getSerie({ params });
  const title = data?._sys.filename.replaceAll("-", " ");
  const blocks = data?.blocks as Array<SerieBlocks>;

  return {
    data,
    blocks,
    title,
  };
};

export default async function Page({ params }: { params: Params }) {
  const { data, blocks, title } = await getBlocks({ params });
  if (!data || !data.visible || !blocks) notFound();
  return (
    <>
      {blocks.map((block, iBlock) => {
        const key = `${block?.__typename}-${iBlock}`;
        switch (block?.__typename) {
          case "SerieBlocksMasonryFS": {
            if (!block.images) return <></>;
            return (
              <Section key={key}>
                <Container className="flex items-end justify-center">
                  <MasonryWithLightBox
                    {...{
                      columns: block.columns as unknown as MasonryWithLightBoxProps["columns"],
                      gap: block.gap as unknown as MasonryWithLightBoxProps["gap"],
                      images: block.images as unknown as MasonryWithLightBoxProps["images"],
                    }}
                  />
                </Container>
              </Section>
            );
          }
          case "SerieBlocksBodySimple": {
            const content = block.content as TinaMarkdownContent;
            if (!block.visible || content.children.length === 0) return <></>;
            return <BodySimple key={key} {...(block as BodySimpleProps)} />;
          }
          case "SerieBlocksHeroSerie": {
            if (!block.visible) return <></>;
            return (
              <HeroSerie
                key={key}
                {...{
                  meta: (data?.meta as unknown as HeroSerieProps["meta"]) || {},
                  title: (title as unknown as HeroSerieProps["title"]) || "",
                }}
              />
            );
          }

          default: {
            return null;
          }
        }
      })}
    </>
  );
}
