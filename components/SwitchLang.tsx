import Link from "next/link";
import { useRouter } from "next/router";

const SwitchLang = () => {
  const { locales, asPath, locale: currentLocale } = useRouter();

  return (
    <>
      {locales.map((locale, index) => {
        if (locale === currentLocale) {
          <Link href={asPath} key={index} locale={locale}>
            <a>{locale}</a>
          </Link>;
        }
      })}
    </>
  );
};

export default SwitchLang;
