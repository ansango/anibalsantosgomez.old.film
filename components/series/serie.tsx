import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, WrapperContent } from "../blocks";
import { formatDate } from "../../lib/utils";

export const Serie = (props) => {
  return (
    <>
      <Section className="flex-1">
        <Container className={`flex-1 max-w-4xl pb-2`} size="large">
          <h2
            data-tinafield="title"
            className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
          >
            <span>{props.title}</span>
          </h2>
          <div
            data-tinafield="author"
            className="flex items-center justify-center mb-16"
          >
            <>
              <div className="flex-shrink-0 mr-4">
                <img className="h-14 w-14 object-cover rounded-full shadow-sm" />
              </div>
              <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                pepe
              </p>
              <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                —
              </span>
            </>

            <p
              data-tinafield="date"
              className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
            >
              {formatDate(props.publishedAt)}
            </p>
          </div>
        </Container>
      </Section>
      <WrapperContent highlight={props.bodyHighlight}>
        <TinaMarkdown components={components} content={props._body} />
      </WrapperContent>
    </>
  );
};
