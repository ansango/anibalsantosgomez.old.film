import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { FC, ReactNode } from "react";
import {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  codeColor,
  codeColorDark,
  proseMono,
  codeMonoDark,
  p,
} from "constant/styles/baseProse";

import {
  type BlockQuoteProps,
  type ImageProps,
  type ContainerTextProps,
  type DateTimeProps,
  BlockQuote,
  DateTime,
  img,
  Image,
  ContainerText,
  Section,
  Container,
  useTheme,
} from "components";

export const WrapperContent: FC<{
  children: ReactNode;
  highlight?: boolean;
  parentField?: string;
}> = ({ children, highlight = false, parentField = "" }) => {
  const { color, mono } = useTheme();
  const classElements = highlight
    ? `${h1["colors"][color]}
        ${h2["colors"][color]}
        ${h3["colors"][color]}
        ${h4["colors"][color]}
        ${h5["colors"][color]}
        ${h6["colors"][color]}
        ${a["colors"][color]}
        ${codeColor[color]}
        ${codeColorDark[color][mono]}
        `
    : `${codeMonoDark[mono]}`;

  return (
    <Section>
      <Container
        className={`prose dark:prose-invert prose-code:font-medium pt-0 lg:pt-0
        ${proseMono[mono]} 
        ${h1["sizes"]} 
        ${h2["sizes"]}
        ${h3["sizes"]}
        ${h4["sizes"]}
        ${h5["sizes"]}
        ${h6["sizes"]}
        ${a["sizes"]}
        ${p}
        ${classElements}
        `}
        data-tinafield={`${parentField}.body`}
      >
        {children}
      </Container>
    </Section>
  );
};

export const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
  ContainerText: ContainerTextProps;
  Image: ImageProps;
}> = {
  BlockQuote,
  DateTime,
  img,
  Image: (props) => <Image {...props} alt={props.alt} />,
  ContainerText: (props) => <ContainerText {...props} />,
};

export const Content: FC<{
  body: any;
  parentField?: string;
}> = ({ body }) => {
  return (
    <>
      <TinaMarkdown content={body} components={components} />
    </>
  );
};
