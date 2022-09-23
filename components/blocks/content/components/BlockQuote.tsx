import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type BlockQuoteProps = {
  children: TinaMarkdownContent;
  authorName: string;
};

export const BlockQuote = (props: BlockQuoteProps) => {
  return (
    <span className="block">
      <blockquote>
        <TinaMarkdown content={props.children} />
        {props.authorName}
      </blockquote>
    </span>
  );
};
