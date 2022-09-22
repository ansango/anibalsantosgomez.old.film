import React from "react";
import type { Page } from "../.tina/__generated__/types";
import { Hero, Content, ContactForm } from "./blocks";
import { Series, Featured, Latests } from "./series";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PageBlocksContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Content data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksFeaturedSeries":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Featured data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksLatestsSeries":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Latests data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksAllSeries":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Series data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksContactForm":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <ContactForm data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
