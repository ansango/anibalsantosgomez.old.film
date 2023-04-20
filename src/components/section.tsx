import type { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Section: FC<Props> = ({ children, className = "" }) => {
  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
