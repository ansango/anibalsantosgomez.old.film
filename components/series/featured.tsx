import { Container, Section, useTheme, Image } from "components";

import Link from "next/link";
import { formatDate } from "lib/utils";

import {
  monoTextColors,
  monoBordersColors,
  monoRestColors,
} from "constant/styles";
import { useFeaturedSeriesQuery } from "lib/hooks";

import { motion } from "framer-motion";

const Loader = ({ items = 2 }) => {
  const { mono } = useTheme();
  const bgColor = monoRestColors.monoBgSkeleton[mono];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      className={`relative mx-auto animate-pulse`}
    >
      <div className="grid gap-8 grid-cols-12 mx-auto mt-12 ">
        <div className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6 group">
          <div className="flex-shrink-0">
            <div className={`object-cover w-full aspect-4/3 ${bgColor}`} />
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div className="flex-1">
              <div className="mt-5 space-y-6">
                <div className="space-y-3">
                  <div className={`py-2 px-20 max-w-[1rem] ${bgColor}`} />
                  <div className={`py-2 px-28 max-w-[1rem] ${bgColor}`} />
                </div>
                <div className="space-y-3">
                  <div className={`py-2 px-28 w-full ${bgColor}`} />
                  <div className={`py-2 px-28 w-full ${bgColor}`} />
                  <div className={`py-2 px-28 w-full ${bgColor}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 grid gap-8 grid-cols-12">
          {[...Array(items)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6 group"
            >
              <div className="flex-shrink-0">
                <div className={`object-cover w-full aspect-4/3 ${bgColor}`} />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div className="flex-1">
                  <div className="mt-5 space-y-6">
                    <div className="space-y-3">
                      <div className={`py-2 px-20 max-w-[1rem] ${bgColor}`} />
                      <div className={`py-2 px-28 max-w-[1rem] ${bgColor}`} />
                    </div>
                    <div className="space-y-3">
                      <div className={`py-2 px-28 w-full ${bgColor}`} />
                      <div className={`py-2 px-28 w-full ${bgColor}`} />
                      <div className={`py-2 px-28 w-full ${bgColor}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Featured = ({
  data = {
    title: "Featured Series",
    noDataMessage: "No series found",
  },
  parentField = "",
}) => {
  const { mono } = useTheme();
  const { series, loading } = useFeaturedSeriesQuery({ init: 0, limit: 3 });
  const lastSerie = series?.filter((serie: any) => serie.priority === true)[0];
  const restSeries = series?.filter((serie: any) => serie.priority === false);

  return (
    <Section>
      <Container className="py-6 lg:py-12">
        <>
          <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
            <h2
              className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
              data-tinafield={`${parentField}.title`}
            >
              {data.title}
            </h2>
          </div>
          {loading && <Loader />}
          {!loading && series?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
              className="relative mx-auto"
            >
              <div className="grid gap-8 grid-cols-12 mx-auto mt-12">
                {lastSerie && (
                  <Link
                    href={`/serie/${lastSerie._sys.filename}`}
                    passHref
                    className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6 group"
                  >
                    <div className="flex-shrink-0">
                      {lastSerie?.cover && (
                        <Image
                          alt={lastSerie.title}
                          url={lastSerie.cover}
                          onClick={() => ""}
                        />
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex-1">
                        <div
                          className={`flex pt-6 space-x-1 text-sm ${monoTextColors[500][mono]}`}
                        >
                          <time dateTime={lastSerie.publishedAt}>
                            {formatDate(lastSerie.publishedAt)}
                          </time>
                        </div>

                        <div className="mt-2 space-y-6">
                          <h3
                            className={`text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
                          >
                            {lastSerie.title}
                          </h3>
                          <p
                            className={`text-base font-normal line-clamp-4 ${monoTextColors[500][mono]} ${monoRestColors.groupTextHover800[mono]}`}
                          >
                            {lastSerie.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="col-span-12 lg:col-span-6 grid gap-8 grid-cols-12">
                  {restSeries &&
                    restSeries.map((serie: any, i: number) => (
                      <Link
                        href={`/serie/${serie._sys.filename}`}
                        passHref
                        key={`serie-${i}`}
                        className="flex flex-col mb-12 overflow-hidden cursor-pointer col-span-12 lg:col-span-6 group"
                      >
                        <div className="flex-shrink-0">
                          {serie?.cover && (
                            <Image
                              alt={serie.title}
                              url={serie.cover}
                              onClick={() => ""}
                            />
                          )}
                        </div>

                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex-1">
                            <div
                              className={`flex pt-6 space-x-1 text-sm ${monoTextColors[500][mono]}`}
                            >
                              <time dateTime={serie.publishedAt}>
                                {formatDate(serie.publishedAt)}
                              </time>
                            </div>

                            <div className="mt-2 space-y-6">
                              <h3
                                className={`text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
                              >
                                {serie.title}
                              </h3>
                              <p
                                className={`text-base font-normal line-clamp-4 ${monoTextColors[500][mono]} ${monoRestColors.groupTextHover700[mono]}`}
                              >
                                {serie.summary}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
          {!loading && series?.length === 0 && (
            <div
              className="py-10"
              data-tinafield={`${parentField}.noDataMessage`}
            >
              {data.noDataMessage}
            </div>
          )}
        </>
      </Container>
    </Section>
  );
};
