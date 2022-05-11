import Link from "next/link";
import { useRouter } from "next/router";

const SwitchLang = () => {
  const { locales, asPath, locale: currentLocale } = useRouter();

  return (
    <>
      {locales.map((locale) => {
        return (
          <>
            {locale !== currentLocale && (
              <Link href={asPath} key={locale} locale={locale}>
                <a>{locale}</a>
              </Link>
            )}
          </>
        );
      })}
    </>
  );
};

export default SwitchLang;
