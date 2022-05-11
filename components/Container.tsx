import { FC, ReactNode } from "react";
import Nav from "./Nav";
import SEO, { Props as SEOProps } from "./SEO";

type Props = {
  children: ReactNode;
  SEOProps?: SEOProps;
};

const Container: FC<Props> = ({ children, SEOProps }) => {
  return (
    <>
      {/* <SEO {...SEOProps} /> */}
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-between h-screen">
        <Nav />
        <main>{children}</main>
        <footer>hola</footer>
      </div>
    </>
  );
};

export default Container;
