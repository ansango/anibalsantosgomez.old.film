"use client";

import type { FC, ReactNode } from "react";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: ReactNode;
};

export const Transition: FC<Props> = ({ children, className }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.main>
  );
};
