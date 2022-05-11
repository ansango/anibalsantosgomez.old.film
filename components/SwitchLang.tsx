import Link from "next/link";
import { useRouter } from "next/router";

const SwitchLang = () => {
  const { locales, asPath, locale: currentLocale } = useRouter();

  return (
    <>
      {locales.map((locale) => {
        const cn = locale === currentLocale ? "text-blue-600 dark:text-blue-500" : "";

        return (
          <Link href={asPath} key={locale} locale={locale}>
            <a className={cn}>{locale}</a>
          </Link>
        );
      })}
    </>
  );
};

export default SwitchLang;
