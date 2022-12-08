import "styles/globals.css";

import { GoogleAnalytics } from "nextjs-google-analytics";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { DefaultSeo, type DefaultSeoProps } from "next-seo";
import { type AppProps } from "next/app";

const defaultSeoProps: DefaultSeoProps = {
  title: "Film Captures",
  titleTemplate: "%s | Aníbal Santos Gómez | 2013 - Presente",
  robotsProps: {
    maxImagePreview: "standard",
    notranslate: true,
    maxSnippet: -1,
  },
  description:
    "Fotografía química desde 2013 hasta hoy. Procrastino fotografía siempre dejo para después un carrete en la nevera y toco instantes lejanos.",
  canonical: `${process.env.NEXT_PUBLIC_WEB_URI}`,
  mobileAlternate: {
    media: "handheld",
    href: `${process.env.NEXT_PUBLIC_WEB_URI}`,
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
    },
    {
      name: "author",
      content: "Aníbal Santos Gómez",
    },
    {
      name: "keywords",
      content:
        "fotografía química, aníbal, santos, gómez, film, captures, 35mm, kodak, fujifilm, portra, ektar, ilford, canon, salamanca, fotografía de película, fotografía analógica",
    },
    {
      name: "publisher",
      content: "Aníbal Santos Gómez",
    },
  ],
  twitter: {
    handle: "@iamasync_",
    site: "@iamasync_",
    cardType: "summary_large_image",
  },
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_WEB_URI}`,
    title: "Anibal Santos",
    type: "website",
    description:
      "Fotografía química desde 2013 hasta hoy. Procrastino fotografía siempre dejo para después un carrete en la nevera y toco instantes lejanos.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_WEB_URI}/avatar.jpeg`,
        width: 400,
        height: 400,
        alt: "Anibal Santos",
      },
    ],
    locale: "es_ES",
    site_name: "Anibal Santos Gómez",
    profile: {
      firstName: "Anibal",
      lastName: "Santos",
      username: "Anibal Santos",
    },
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
      language="es"
    >
      <DefaultSeo {...defaultSeoProps} />
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />

      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
};

export default App;
