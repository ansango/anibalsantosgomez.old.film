import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  const cn = twMerge(
    "w-full max-w-7xl 2xl:max-w-[90rem] sm:px-6 md:px-12 lg:px-24 2xl:px-12 px-4 py-12 lg:py-24 mx-auto",
    className
  );
  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
