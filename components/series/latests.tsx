import { TinaTemplate } from "tinacms";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { formatDate, countPhotos } from "../../lib/utils";
import Link from "next/link";
import { monoTextColors, monoBordersColors, monoRestColors } from "../styles";
import { useTheme } from "../layout";
import { useLatestSeriesQuery } from "../../lib/hooks";

export const Latests = ({ data, parentField = "" }) => {
  const { mono } = useTheme();
  const { series, loading } = useLatestSeriesQuery({ init: 0, limit: 6 });
  //TODO:CAMBIAR LOADINGS
  return (
    <Section>
      <Container className="py-6 lg:py-12">
        {loading && <div>Loading...</div>}

        <div className={`pb-4 border-b ${monoBordersColors[600][mono]}`}>
          <h2
            className={`text-2xl font-semibold leading-6 ${monoTextColors[800][mono]}`}
            data-tinafield={`${parentField}.title`}
          >
            {data.title}
          </h2>
        </div>
        {series?.length > 0 ? (
          <div className="relative mx-auto max-w-7xl">
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
                            className={`text-xl font-semibold leading-none tracking-tighter ${monoTextColors[600][mono]} ${monoRestColors.groupTextHover800[mono]}`}
                          >
                            {serie.title}
                          </h3>
                          <p
                            className={`text-base font-normal line-clamp-4 lg:line-clamp-5 ${monoTextColors[500][mono]} ${monoRestColors.groupTextHover700[mono]}`}
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
        ) : null}
      </Container>
    </Section>
  );
};

export const latestsBlockSchema: TinaTemplate = {
  label: "Latests Series",
  name: "latestsSeries",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Latests Series",
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
