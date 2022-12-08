import { type FC } from "react";
import { type SerieProps, Tag } from "components";
import { formatDate } from "lib/utils";

export const Meta: FC<{ meta: SerieProps["meta"] }> = ({ meta }) => {
  const { camera, film, shot, tags } = meta;
  return (
    <>
      <p>
        <span>Cámara: </span>
        <span>{camera}</span>
      </p>
      <p>
        <span>Película: </span>
        <span>{film}</span>
      </p>
      {shot && (
        <p>
          <span>Periodo: </span>
          <span>
            <time dateTime={shot.start}>{formatDate(shot.start)}</time> /{" "}
            <time dateTime={shot.end}>{formatDate(shot.end)}</time>
          </span>
        </p>
      )}
      <div className="mt-6 flex flex-wrap relative z-10">
        {tags?.map((tag, i) => (
          <Tag key={`${tag}-${i}`} tag={tag} />
        ))}
      </div>
    </>
  );
};
