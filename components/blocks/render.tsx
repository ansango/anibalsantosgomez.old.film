import type { Page } from ".tina/__generated__/types";
import {
  Hero,
  Content,
  ContactForm,
  WrapperContent,
  Masonry,
  Series,
  Featured,
  Latests,
  Image,
  HeroData,
  ImageProps,
} from "components";

export const Render = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksContent":
                return (
                  <WrapperContent
                    parentField={`blocks.${i}`}
                    key={i + block.__typename}
                    highlight={block.highlight || false}
                  >
                    <Content body={block.body} />
                  </WrapperContent>
                );
              case "PageBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero
                      data={block as HeroData}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "PageBlocksFeaturedSeries":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Featured
                      data={
                        block as {
                          title: string;
                          noDataMessage: string;
                        }
                      }
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "PageBlocksLatestsSeries":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Latests
                      data={block as { title: string; noDataMessage: string }}
                      parentField={`blocks.${i}`}
                    />
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
              case "PageBlocksMasonry":
                return (
                  <div
                    key={i + block.__typename}
                    data-tinafield={`blocks.${i}`}
                  >
                    <Masonry data={block}>
                      {block.images?.map(({ ...imageProps }, i) => {
                        return (
                          <Image
                            key={i}
                            {...(imageProps as ImageProps)}
                            alt={imageProps.alt || ""}
                          />
                        );
                      })}
                    </Masonry>
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
