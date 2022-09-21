import "../styles.css";
import TinaProvider from "../.tina/components/TinaDynamicProvider";
import NextHead from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
      <TinaProvider>
        <Component {...pageProps} />
      </TinaProvider>
    </>
  );
};

export default App;
