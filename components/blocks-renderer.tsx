import React from "react";
import type { Page } from "../.tina/__generated__/types";
import { Hero, Content, Featured, Latests } from "./blocks";

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
              case "PageBlocksFeatured":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Featured data={block} parentField={`blocks.${i}`} />
                  </div>
                );
              case "PageBlocksLatests":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Latests data={block} parentField={`blocks.${i}`} />
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
