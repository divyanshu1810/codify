"use client";

import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  ({ children, className = "" }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ${className}`}
      >
        <div className="max-w-4xl w-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

Slide.displayName = "Slide";
