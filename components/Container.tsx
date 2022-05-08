import { FC, ReactNode } from "react";
import Nav from "./Nav";
import SEO, { Props as SEOProps } from "./SEO";

type Props = {
  children: ReactNode;
  SEOProps?: SEOProps;
};

const Container: FC<Props> = ({ children, SEOProps }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <SEO {...SEOProps} />
      <Nav />
      {children}
    </div>
  );
};

export default Container;
