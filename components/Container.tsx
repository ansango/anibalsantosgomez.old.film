import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Seo, { Props as SeoProps } from "./Seo";

type Props = {
  children: ReactNode;
  SeoProps?: SeoProps;
};

const Container: FC<Props> = ({ children, SeoProps }) => {
  return (
    <>
      <Seo {...SeoProps} />
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-8 max-w-7xl w-full mx-auto">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Container;
