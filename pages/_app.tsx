import "../styles.css";
import TinaProvider from "../.tina/components/TinaDynamicProvider";
import NextHead from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const App = ({ Component, pageProps }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <NextHead>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />
      <TinaProvider>
        <Component {...pageProps} />
      </TinaProvider>
    </GoogleReCaptchaProvider>
  );
};

export default App;
