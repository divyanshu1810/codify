"use client";

import { motion } from "framer-motion";
import { FaCode, FaGithub, FaRocket, FaStar, FaChartLine, FaFire } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { TextGradient } from "../ui/text-gradient";

interface HeroProps {
  currentYear: number;
  isLoading: boolean;
}

export function Hero({ currentYear, isLoading }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 sm:space-y-8 max-w-5xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="inline-block"
        >
          <div className="relative">
            <FaCode className="text-[#1DB954] text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_30px_rgba(29,185,84,0.5)]" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-[#1DB954] blur-3xl opacity-20 -z-10"
            />
          </div>
        </motion.div>

        <TextGradient className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
          Codify Wrapped
        </TextGradient>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl text-[#B3B3B3] font-medium max-w-2xl mx-auto"
        >
          Your GitHub Year in Review
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-[#B3B3B3]/80 max-w-xl mx-auto"
        >
          Discover your coding journey, achievements, and insights from {currentYear} with beautiful Spotify-style animations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn("github", { callbackUrl: "/wrapped" })}
            disabled={isLoading}
            className="group relative bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(29,185,84,0.3)] hover:shadow-[0_0_60px_rgba(29,185,84,0.5)]"
          >
            <FaGithub className="text-2xl sm:text-3xl" />
            <span className="whitespace-nowrap">
              {isLoading ? "Loading..." : "Sign in with GitHub"}
            </span>
            <FaRocket className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8"
        >
          <div className="flex items-center gap-2 text-[#B3B3B3]">
            <FaStar className="text-[#1DB954]" />
            <span className="text-sm sm:text-base">Personalized Insights</span>
          </div>
          <div className="flex items-center gap-2 text-[#B3B3B3]">
            <FaChartLine className="text-[#1DB954]" />
            <span className="text-sm sm:text-base">Beautiful Visuals</span>
          </div>
          <div className="flex items-center gap-2 text-[#B3B3B3]">
            <FaFire className="text-[#1DB954]" />
            <span className="text-sm sm:text-base">Shareable Results</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
