import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = {
  className?: string;
  children: ReactNode;
};

export const Section: FC<SectionProps> = ({ children, className = "" }) => {
  const cn = twMerge(
    "flex-1 relative transition duration-150 ease-out body-font overflow-hidden",
    className
  );
  return <section className={cn}>{children}</section>;
};
