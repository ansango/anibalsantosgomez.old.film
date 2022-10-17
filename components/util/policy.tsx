import { useTheme } from "../layout";
import { useEffect, useState } from "react";
import { setCookie, hasCookie } from "cookies-next";

import {
  baseButtonStyles,
  buttonPrimaryColors,
  monoTextColors,
} from "../styles";

import { Icon } from "./icon";

export const Policy = () => {
  const [consent, setConsent] = useState(true);
  useEffect(() => {
    setConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setConsent(true);
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 365 });
  };

  const { color, mono } = useTheme();

  if (consent === true) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto xl:max-w-5xl ">
      <div className="fixed bottom-0 md:bottom-4 max-w-3xl mx-auto xl:max-w-5xl z-10 w-full">
        <div className="w-full shadow-xl">
          <div className="grid gap-5 grid-cols-12 py-4 px-6 bg-neutral-50 dark:bg-neutral-900 border-[2px] rounded-lg">
            <Icon
              data={{
                name: "cookie",
                size: "md",
              }}
              className="col-span-2 md:col-span-1 m-auto"
            />
            <p
              className={`col-span-10 md:col-span-8 text-sm tracking-wider ${monoTextColors[600][mono]}`}
            >
              Utilizo cookies para mejorar mi contenido. Al continuar utilizando
              este sitio, estás aceptando el uso que hago de las cookies.
            </p>

            <button
              onClick={acceptCookie}
              className={`col-span-12 md:col-span-3 ${baseButtonStyles} ${buttonPrimaryColors[color]}`}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
