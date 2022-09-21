import { TinaTemplate } from "tinacms";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { client } from "../../.tina/__generated__/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate, countPhotos } from "../../lib/utils";
import { useTheme } from "../layout";
import { monoTextColors, monoBordersColors } from "../styles";

export const Featured = ({ data, parentField = "" }) => {
  const { mono } = useTheme();
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

  const lastSerie = series.data && series.data[0];
  const restSeries = series.data && series.data.slice(1, 3);

  return (
    <>
      {series.data?.length > 0 ? (
        <Section>
          <Container className="py-6 lg:py-12">
            <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
              <h3
                className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
                data-tinafield={`${parentField}.title`}
              >
                {data.title}
              </h3>
            </div>

            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-8 grid-cols-12 mx-auto mt-12">
                {lastSerie && (
                  <Link href={`/serie/${lastSerie._sys.filename}`} passHref>
                    <a className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6">
                      <div className="flex-shrink-0">
                        {lastSerie.meta.cover && (
                          <img
                            className="object-cover w-full aspect-4/3"
                            alt=""
                            src={lastSerie.meta.cover}
                            width={2048}
                            height={1365}
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <div className="flex-1">
                          <div
                            className={`flex pt-6 space-x-1 text-sm ${monoTextColors[500][mono]}`}
                          >
                            <time dateTime="2020-03-10">
                              {formatDate(lastSerie.publishedAt)}
                            </time>
                            <span aria-hidden="true"> · </span>
                            <span>{countPhotos(lastSerie)}</span>
                          </div>

                          <div className="mt-2 space-y-6">
                            <h3
                              className={`text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]}`}
                            >
                              {lastSerie.title}
                            </h3>
                            <p
                              className={`text-base font-normal ${monoTextColors[500][mono]}`}
                            >
                              {lastSerie.summary}
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
                      <Link
                        href={`/serie/${serie._sys.filename}`}
                        passHref
                        key={`serie-${i}`}
                      >
                        <a className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6">
                          <div className="flex-shrink-0">
                            {serie.meta?.cover && (
                              <img
                                className="object-cover w-full aspect-4/3"
                                alt=""
                                src={serie.meta.cover}
                                width={2048}
                                height={1365}
                              />
                            )}
                          </div>

                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex-1">
                              <div
                                className={`flex pt-6 space-x-1 text-sm ${monoTextColors[500][mono]}`}
                              >
                                <time dateTime="2020-03-10">
                                  {formatDate(serie.publishedAt)}
                                </time>
                                <span aria-hidden="true"> · </span>
                                <span> {countPhotos(serie)}</span>
                              </div>

                              <div className="mt-2 space-y-6">
                                <h3
                                  className={`text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]}`}
                                >
                                  {serie.title}
                                </h3>
                                <p
                                  className={`text-base font-normal ${monoTextColors[500][mono]}`}
                                >
                                  {serie.summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
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
