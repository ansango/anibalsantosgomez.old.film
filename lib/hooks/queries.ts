import { useEffect, useState } from "react";
import { client } from "../../.tina/__generated__/client";

export const useAllSeriesQuery = () => {
  const [data, setSeries] = useState({
    loading: true,
    series: null,
  });

  useEffect(() => {
    client.queries
      .seriesLatestsQuery()
      .then((res) => {
        setSeries({
          loading: false,
          series: res.data.serieConnection.edges
            .map((edge) => edge.node)
            .sort((a, b) => {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            }),
        });
      })
      .catch((err) => {
        console.error(err);
        setSeries({
          loading: false,
          series: null,
        });
      });
    return () => {
      setSeries({
        loading: false,
        series: null,
      });
    };
  }, []);
  return data;
};

export const useLatestSeriesQuery = ({ init = 0, limit = 6 }) => {
  const [data, setSeries] = useState({
    loading: true,
    series: null,
  });

  useEffect(() => {
    client.queries
      .seriesLatestsQuery()
      .then((res) => {
        setSeries({
          loading: false,
          series: res.data.serieConnection.edges
            .map((edge) => edge.node)
            .sort((a, b) => {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            })
            .slice(init, limit),
        });
      })
      .catch((err) => {
        console.error(err);
        setSeries({
          loading: false,
          series: null,
        });
      });
    return () => {
      setSeries({
        loading: false,
        series: null,
      });
    };
  }, []);
  return data;
};

export const useFeaturedSeriesQuery = ({ init = 0, limit = 6 }) => {
  const [data, setSeries] = useState({
    loading: true,
    series: null,
  });

  useEffect(() => {
    client.queries
      .seriesFeaturedQuery()
      .then((res) => {
        setSeries({
          loading: false,
          series: res.data.serieConnection.edges
            .map((edge) => edge.node)
            .sort((a, b) => {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            })
            .slice(init, limit),
        });
      })
      .catch((err) => {
        console.error(err);
        setSeries({
          loading: false,
          series: null,
        });
      });
    return () => {
      setSeries({
        loading: false,
        series: null,
      });
    };
  }, []);
  return {
    ...data,
    series: data?.series?.map((serie, i) => ({
      ...serie,
      priority: i === 0 ? true : false,
    })),
  };
};
