import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

const render = (props) => {
  switch (props.size) {
    case "md": {
      return (
        <div className="max-w-lg">
          <TinaMarkdown content={props.children} />
        </div>
      );
    }

    case "lg": {
      return (
        <div className="max-w-xl">
          <TinaMarkdown content={props.children} />
        </div>
      );
    }
    case "xl": {
      return (
        <div className="max-w-2xl">
          <TinaMarkdown content={props.children} />
        </div>
      );
    }
    case "2xl": {
      return (
        <div className="max-w-3xl">
          <TinaMarkdown content={props.children} />
        </div>
      );
    }
    case "3xl": {
      return (
        <div className="max-w-4xl">
          <TinaMarkdown content={props.children} />
        </div>
      );
    }
    default: {
      return (
        <div>
          <TinaMarkdown content={props.children} />
        </div>
      );
    }
  }
};

export type ContainerTextProps = {
  children: TinaMarkdownContent;
  size: "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
};

export const ContainerText = (props: ContainerTextProps) => {
  return <>{render(props)}</>;
};
