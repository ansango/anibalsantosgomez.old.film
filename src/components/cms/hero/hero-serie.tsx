import type { FC } from "react";

import Balancer from "react-wrap-balancer";
import { type Template } from "tinacms";

import { formatDate } from "../../../lib";
import { Container } from "../../container";
import { Section } from "../../section";
type Meta = {
  camera?: string;
  film?: string;
  shot?: {
    start?: string;
    end?: string;
  };
  tags?: string[];
  publishedAt?: string;
  description?: string;
};

export type HeroSerieProps = {
  title: string;
  meta: Meta;
};

export const HeroSerie: FC<HeroSerieProps> = ({
  title,
  meta: { camera, film, publishedAt, shot, description, tags },
}) => {
  return (
    <Section className="flex-none py-20">
      <Container className="space-y-5">
        <h1>
          <Balancer>{title}</Balancer>
        </h1>

        {publishedAt && (
          <time className="font-serif text-xs italic">publicado el {formatDate(publishedAt)}</time>
        )}

        <article className="space-y-5 prose prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert">
          {description && (
            <p>
              <Balancer>{description}</Balancer>
            </p>
          )}

          <p>
            {camera && film && (
              <span className="block">
                <Balancer>
                  {camera} - {film}
                </Balancer>
              </span>
            )}
            {shot && shot.start && shot.end && (
              <span>
                <Balancer as={"time"}>
                  {formatDate(shot?.start as string)} / {formatDate(shot?.end as string)}
                </Balancer>
              </span>
            )}
          </p>

          {tags && (
            <p className="flex flex-wrap pb-5">
              {tags.map((tag, i) => (
                <span className="text-sm mr-1.5" key={`${i}-${tag}`}>
                  #{tag}
                </span>
              ))}
            </p>
          )}
        </article>
      </Container>
    </Section>
  );
};

export const heroSerieTemplate: Template = {
  label: "Hero Serie",
  name: "heroSerie",
  fields: [
    {
      label: "Visible",
      name: "visible",
      type: "boolean",
    },
  ],
};
