import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <div className={`w-full max-w-screen-2xl p-4 sm:p-6 md:p-12 mx-auto ${className}`} {...props}>
      {children}
    </div>
  );
};
