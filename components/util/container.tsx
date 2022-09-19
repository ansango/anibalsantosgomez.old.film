import React from "react";

export const Container = ({
  children,
  size = "medium",
  className = "",
  ...props
}) => {
  const verticalPadding = {
    custom: "",
    small: "py-8",
    medium: "py-12",
    large: "py-24",
    default: "py-12",
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto ${verticalPadding[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
