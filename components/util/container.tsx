import React from "react";

export const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-7xl 2xl:max-w-7xl sm:px-6 md:px-12 lg:px-24  2xl:px-12 px-4 py-12 lg:py-24 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
