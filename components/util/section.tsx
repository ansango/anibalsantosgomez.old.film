import React from "react";
import { useTheme } from "../layout";

export const Section = ({ children, color = "", className = "" }) => {
  const theme = useTheme();

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
