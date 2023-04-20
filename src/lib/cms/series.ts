import tinaClient from "../../../.tina/__generated__/client";

export async function getSeries() {
  const {
    data: {
      serieConnection: { edges },
    },
  } = await tinaClient.queries.serieConnection();
  const data =
    edges &&
    edges
      .map((edge) => {
        if (edge) {
          return edge.node;
        }
      })
      .filter((node) => node?.visible)
      .sort(
        (a, b) =>
          new Date(b?.meta?.publishedAt as unknown as Date).getTime() -
          new Date(a?.meta?.publishedAt as unknown as Date).getTime()
      );

  return (
    data &&
    data
      .map((serie) => {
        if (serie) {
          const { id, meta, visible, _sys, thumbnails } = serie;
          return {
            id,
            meta,
            visible,
            thumbnails,
            _sys: { ..._sys, filename: _sys.filename.replace(/\.md$/, "") },
          };
        }
      })
      .filter((serie) => serie?.visible)
  );
}
