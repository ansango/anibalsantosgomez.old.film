import { TinaTemplate } from "tinacms";
import { Container } from "../util/container";
import { Section } from "../util/section";

import { client } from "../../.tina/__generated__/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import formatDate from "../../utils";

const countPhotos = (serie: any) => {
  const photosLength = serie._body.children
    .filter((child) => child.type === "p")
    .map((child) => child.children)
    .filter((child) => child[0].type === "img").length;
  const result =
    photosLength > 1
      ? `${photosLength} photos`
      : photosLength === 1
      ? `${photosLength} photo`
      : "";
  return result;
};

export const Featured = ({ data, parentField = "" }) => {
  const [series, setSeries] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    client.queries.seriesPublishedQuery().then((res) => {
      setSeries({
        loading: false,
        data: res.data.serieConnection.edges
          .map((edge) => edge.node)
          .sort((a, b) => {
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          }),
      });
    });
    return () => {
      setSeries({
        loading: false,
        data: null,
      });
    };
  }, []);

  console.log(series.data);

  const lastSerie = series.data && series.data[0];
  const restSeries = series.data && series.data.slice(1, 3);

  return (
    <Section>
      <Container>
        <div className="pb-4 border-b border-gray-600">
          <h3 className="text-xl font-semibold leading-6 text-gray-800">
            {data.title}
          </h3>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-12 mx-auto mt-12">
            {lastSerie && (
              <Link href={`/serie/${lastSerie._sys.filename}`} passHref>
                <a className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6">
                  <div className="flex-shrink-0">
                    {lastSerie.cover && (
                      <Image
                        className="object-cover w-full"
                        alt=""
                        src={lastSerie.cover}
                        width={2048}
                        height={1365}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex-1">
                      <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                        <time dateTime="2020-03-10">
                          {formatDate(lastSerie.publishedAt)}
                        </time>
                        <span aria-hidden="true"> · </span>
                        <span>{countPhotos(lastSerie)}</span>
                      </div>

                      <div className="mt-2 space-y-6">
                        <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                          {lastSerie.title}
                        </h3>
                        <p className="text-lg font-normal text-gray-500">
                          Filling text so you can see how it looks like with
                          text. Did I said text?
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )}

            <div className="col-span-12 lg:col-span-6 grid gap-8 grid-cols-12">
              {restSeries &&
                restSeries.map((serie, i) => (
                  <div
                    key={`serie-${i}`}
                    className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6"
                  >
                    <a href="/blog-post">
                      <div className="flex-shrink-0">
                        {serie.cover && (
                          <Image
                            className="object-cover w-full"
                            alt=""
                            src={serie.cover}
                            width={2048}
                            height={1365}
                          />
                        )}
                      </div>
                    </a>
                    <div className="flex flex-col justify-between flex-1">
                      <a href="/blog-post"></a>
                      <div className="flex-1">
                        <a href="/blog-post">
                          <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-10">
                              {formatDate(serie.publishedAt)}
                            </time>
                            <span aria-hidden="true"> · </span>
                            <span> {countPhotos(serie)}</span>
                          </div>
                        </a>
                        <a href="#" className="block mt-2 space-y-6">
                          <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                            {serie.title}
                          </h3>
                          <p className="text-lg font-normal text-gray-500">
                            Filling text so you can see how it looks like with
                            text. Did I said text?
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const featuredBlockSchema: TinaTemplate = {
  name: "featured",
  label: "Featured",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Featured",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
  ],
};
