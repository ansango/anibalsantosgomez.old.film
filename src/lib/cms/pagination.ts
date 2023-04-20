import { getSeries } from "./series";

type Params = {
  filename: string;
};

type SerieTina = {
  _sys: Params;
  meta: { publishedAt: string };
  title: string;
};

export const getSeriesPagination = async ({ params }: { params: Params }) => {
  try {
    const series = (await getSeries()) as unknown as Array<SerieTina>;

    const index = series
      .sort((a, b) => (a.meta.publishedAt > b.meta.publishedAt ? -1 : 1))
      .findIndex((serie) => serie?._sys.filename === params.filename);

    const prevSerie = series[index - 1] || null;
    const nextSerie = series[index + 1] || null;
    const prev =
      (prevSerie && {
        title: prevSerie._sys.filename.replaceAll("-", " "),
        route: `/serie/${prevSerie._sys.filename}`,
      }) ||
      null;
    const next =
      (nextSerie && {
        title: nextSerie._sys.filename.replaceAll("-", " "),
        route: `/serie/${nextSerie._sys.filename}`,
      }) ||
      null;
    return { prev, next };
  } catch (error) {
    console.error("Error while getting pagination", error);
    return null;
  }
};
