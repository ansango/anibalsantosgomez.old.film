import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type BlockQuoteProps = {
  children: TinaMarkdownContent;
  authorName: string;
};

export const BlockQuote = (props: BlockQuoteProps) => {
  return (
    <span className="block prose-blockquote:text-base prose-p:mb-2 prose-p:font-mono">
      <blockquote>
        <TinaMarkdown content={props.children} />
        <strong>{props.authorName}</strong>
      </blockquote>
    </span>
  );
};
