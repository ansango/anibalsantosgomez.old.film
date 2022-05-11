import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const SwitchLang = () => {
  const { asPath, locale } = useRouter();
  const { t } = useTranslation();

  const newLocale = locale === "en" ? "es" : "en";

  return (
    <ErrorBoundary>
      <button className="uppercase">
        <Link href={asPath} locale={newLocale}>
          <a>{t(`common:langs.${newLocale}.value`)}</a>
        </Link>
      </button>
    </ErrorBoundary>
  );
};

export default SwitchLang;
