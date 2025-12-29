"use client";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

interface FooterProps {
  currentYear: number;
}

export function Footer({ currentYear }: FooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center py-12 px-4 text-[#B3B3B3] text-sm space-y-2"
    >
      <p className="flex items-center justify-center gap-1">
        Made with <FaHeart className="text-red-500 inline" /> by{" "}
        <a
          href="https://github.com/divyanshu1810"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1DB954] hover:text-[#1ed760] transition-colors font-semibold"
        >
          divyanshu1810
        </a>
      </p>
      <p>Built with Next.js, TypeScript, and Framer Motion</p>
      <p className="mt-2">
        © {currentYear} GitHub Unwrapped. All rights reserved.
      </p>
    </motion.div>
  );
}
