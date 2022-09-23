import { useMemo } from "react";

export type DateTimeProps = {
  format?: string;
};

export const DateTime = (props: DateTimeProps) => {
  const dt = useMemo(() => {
    return new Date();
  }, []);

  switch (props.format) {
    case "iso":
      return <span>{dt.toISOString()}</span>;
    case "utc":
      return <span>{dt.toUTCString()}</span>;
    case "local":
      return <span>{dt.toLocaleDateString()}</span>;
    default:
      return <span>{dt.toLocaleDateString()}</span>;
  }
};
