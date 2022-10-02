export * from "./queries";

import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

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

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};
