export * from "./queries";

import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export const useAutoClose = ({ setIsOpen, menu }) => {
  const { asPath } = useRouter();
  useEffect(() => setIsOpen(false), [asPath]);

  const handleClosure = useCallback(
    (event) => !menu.current.contains(event.target) && setIsOpen(false),
    [setIsOpen, menu]
  );

  useEffect(() => {
    window.addEventListener("click", handleClosure);
    window.addEventListener("focusin", handleClosure);

    return () => {
      window.removeEventListener("click", handleClosure);
      window.removeEventListener("focusin", handleClosure);
    };
  }, [handleClosure, menu]);
};
