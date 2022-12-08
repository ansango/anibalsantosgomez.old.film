import { type FC } from "react";
import { type SerieProps, Tag } from "components";
import { formatDate } from "lib/utils";

export const Meta: FC<{ meta: SerieProps["meta"] }> = ({ meta }) => {
  return (
    <>
      <p>
        <span>Cámara: </span>
        <span>{meta?.camera}</span>
      </p>
      <p>
        <span>Película: </span>
        <span>{meta?.film}</span>
      </p>
      {meta?.shot && (
        <p>
          <span>Periodo: </span>
          <span>
            <time dateTime={meta.shot.start}>
              {formatDate(meta.shot.start)}
            </time>{" "}
            / <time dateTime={meta.shot.end}>{formatDate(meta.shot.end)}</time>
          </span>
        </p>
      )}
      <div className="mt-6 flex flex-wrap relative z-10">
        {meta?.tags?.map((tag, i) => (
          <Tag key={`${tag}-${i}`} tag={tag} />
        ))}
      </div>
    </>
  );
};
