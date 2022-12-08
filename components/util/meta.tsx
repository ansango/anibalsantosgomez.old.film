import { FC } from "react";
import { TinaField } from "tinacms";
import { cameras, films, tags } from "../../constants";
import { formatDate } from "../../lib/utils";
import { SerieProps } from "../series/serie";

import { Tag } from "./tag";

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

export const metaSchema: TinaField = {
  type: "object",
  name: "meta",
  label: "Meta",
  fields: [
    {
      label: "Camera",
      name: "camera",
      type: "string",
      required: true,
      options: cameras,
    },
    {
      label: "Film",
      name: "film",
      type: "string",
      required: true,
      options: films,
    },

    {
      type: "object",
      label: "Shot Period",
      name: "shot",
      fields: [
        {
          label: "Start",
          name: "start",
          type: "datetime",
          required: true,
        },
        {
          label: "End",
          name: "end",
          type: "datetime",
          required: true,
        },
      ],
    },
    {
      label: "Tags",
      name: "tags",
      type: "string",
      list: true,
      options: tags,
    },
  ],
};

export const defaultMeta = {
  camera: cameras[1],
  film: films[1],
  shot: {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  },
  tags: [tags[0], tags[6]],
};