import { Container } from "../util/container";
import { Section } from "../util/section";
import { formatDate } from "../../lib/utils";
import Link from "next/link";
import { monoTextColors, monoBordersColors, monoRestColors } from "../styles";
import { useTheme } from "../layout";
import { useLatestSeriesQuery } from "../../lib/hooks";
import { Template } from "../../.tina/schema";
import { motion } from "framer-motion";
import { Image } from "../util/image";

const Loader = ({ items = 3 }) => {
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
      <div className="grid gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
        {[...Array(items)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col mb-12 overflow-hidden cursor-pointer group"
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
    </motion.div>
  );
};

export const Latests = ({ data, parentField = "" }) => {
  const { mono } = useTheme();
  const { series, loading } = useLatestSeriesQuery({ init: 0, limit: 6 });

  return (
    <Section>
      <Container className="py-6 lg:py-12">
        <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
          <h2
            className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
            data-tinafield={`${parentField}.title`}
          >
            {data.title}
          </h2>
        </div>
        {loading && <Loader items={6} />}
        {!loading && series?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto"
          >
            <div className="grid gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {series.map((serie, i) => (
                <Link
                  href={`/serie/${serie._sys.filename}`}
                  passHref
                  key={`serie-${i}`}
                >
                  <a className="flex flex-col mb-12 overflow-hidden cursor-pointer group">
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
                  </a>
                </Link>
              ))}
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
      </Container>
    </Section>
  );
};

export const latestsBlockSchema: Template = {
  label: "Latests Series",
  name: "latestsSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Lo último",
      noDataMessage: "No hay series",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "noDataMessage",
      label: "No data message",
    },
  ],
};
