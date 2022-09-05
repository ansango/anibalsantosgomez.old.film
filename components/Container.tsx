import { InferGetStaticPropsType } from "next";
import { getStaticProps } from "pages";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Seo, { Props as SeoProps } from "./Seo";
import { Toaster } from "react-hot-toast";
type Props = {
  children: ReactNode;
  SeoProps?: SeoProps;
} & InferGetStaticPropsType<typeof getStaticProps>;

const Container: FC<Props> = ({ children, SeoProps }) => {
  return (
    <>
      <Seo {...SeoProps} />
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-5 md:px-10 lg:px-20">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
      <Toaster
        toastOptions={{
          position: "bottom-center",
        }}
      />
    </>
  );
};

export default Container;
