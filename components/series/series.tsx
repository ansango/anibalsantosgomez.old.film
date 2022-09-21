import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "../../lib/utils";
import { monoBordersColors, monoTextColors, monoRestColors } from "../styles";
import { useTheme } from "../layout";
import { TinaTemplate } from "tinacms";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { client } from "../../.tina/__generated__/client";

export const Series = ({ data, parentField = "" }) => {
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

  const { mono } = useTheme();
  return (
    <>
      {series.data?.length > 0 ? (
        <Section>
          <Container>
            <div className="space-y-5 sm:space-y-0">
              <div className="relative">
                <div
                  className={`pb-4 border-b ${monoBordersColors[600][mono]}`}
                >
                  <h2
                    className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
                    data-tinafield={`${parentField}.title`}
                  >
                    {data.title}
                  </h2>
                </div>
              </div>
              <div
                className={`space-y-12 sm:space-y-8 lg:divide-y ${monoRestColors.divide100[mono]}`}
              >
                {series.data.map((serie) => {
                  return (
                    <article key={serie._sys.filename}>
                      <Link href={`/serie/` + serie._sys.filename} passHref>
                        <a className="pt-8 sm:flex lg:items-start group">
                          <div className="mb-4 sm:mb-0 sm:mr-4">
                            {serie.meta?.cover && (
                              <div className="w-full relative sm:w-48 md:w-64 lg:w-40">
                                <img
                                  className="object-cover w-full aspect-4/3"
                                  alt=""
                                  src={serie.meta?.cover}
                                  width={2048}
                                  height={1365}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <span
                              className={`text-sm ${monoTextColors[500][mono]}`}
                            >
                              {formatDate(serie.publishedAt)}
                            </span>
                            <h3
                              className={`mt-3 text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]}`}
                            >
                              {serie.title}
                            </h3>
                            <p
                              className={`mt-2 text-base ${monoTextColors[500][mono]} line-clamp-2`}
                            >
                              {serie.summary}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
};

export const allSeriesSchema: TinaTemplate = {
  label: "All series",
  name: "allSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "All Series",
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};
