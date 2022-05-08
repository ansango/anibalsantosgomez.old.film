import "../styles/globals.css";
import type { AppProps } from "next/app";
import { I18nProvider } from "next-localization";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { lngDict, ...rest } = pageProps;
  return (
    <I18nProvider lngDict={lngDict} locale={router?.locale as string}>
      <Component {...rest} />
    </I18nProvider>
  );
}

export default MyApp;
