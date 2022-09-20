import { useEffect, useState } from "react";
import { TinaTemplate } from "tinacms";
import client from "../../.tina/__generated__/client";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { formatDate, countPhotos } from "../../utils";
import Image from "next/image";
import Link from "next/link";

export const Latests = ({ data, parentField = "" }) => {
  const [series, setSeries] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    client.queries.seriesLatestsQuery().then((res) => {
      setSeries({
        loading: false,
        data: res.data.serieConnection.edges
          .map((edge) => edge.node)
          .sort((a, b) => {
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          })
          .slice(0, 6),
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
  return (
    <>
      {series.data?.length > 0 ? (
        <Section>
          <Container className="py-6 lg:py-12">
            <div className="pb-4 border-b border-gray-600">
              <h3 className="text-xl font-semibold leading-6 text-gray-800">
                {data.title}
              </h3>
            </div>

            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
                {series.data.map((serie, i) => (
                  <Link
                    href={`/serie/${serie._sys.filename}`}
                    passHref
                    key={`serie-${i}`}
                  >
                    <a className="flex flex-col mb-12 overflow-hidden cursor-pointer">
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

                      <div className="flex flex-col justify-between flex-1">
                        <div className="flex-1">
                          <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                            <time dateTime="2020-03-10">
                              {formatDate(serie.publishedAt)}
                            </time>
                            <span aria-hidden="true"> · </span>
                            <span> {countPhotos(serie)}</span>
                          </div>

                          <div className="mt-2 space-y-6">
                            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                              {serie.title}
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
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
};

export const latestsBlockSchema: TinaTemplate = {
  name: "latests",
  label: "Latests",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Latests",
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