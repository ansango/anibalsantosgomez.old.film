import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { components } from "../content";

export const containerSizesCn = {
  tiny: "max-w-xs",
  xs: "max-w-sm",
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  "2xl": "max-w-3xl",
  "3xl": "max-w-4xl",
};

const render = (props) => {
  switch (props.size) {
    case "tiny": {
      return (
        <div className={containerSizesCn.tiny}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "xs": {
      return (
        <div className={containerSizesCn.xs}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "sm": {
      return (
        <div className={containerSizesCn.sm}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "md": {
      return (
        <div className={containerSizesCn.md}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }

    case "lg": {
      return (
        <div className={containerSizesCn.lg}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "xl": {
      return (
        <div className={containerSizesCn.xl}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "2xl": {
      return (
        <div className={containerSizesCn["2xl"]}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    case "3xl": {
      return (
        <div className={containerSizesCn["3xl"]}>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
    default: {
      return (
        <div>
          <TinaMarkdown content={props.children} components={components} />
        </div>
      );
    }
  }
};

export type ContainerTextProps = {
  children: TinaMarkdownContent;
  size: "tiny" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
};

export const ContainerText = (props: ContainerTextProps) => {
  return <>{render(props)}</>;
};
