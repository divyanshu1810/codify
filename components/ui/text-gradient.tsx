"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "bg-gradient-to-r from-[#1DB954] via-[#1ed760] to-[#1DB954] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
