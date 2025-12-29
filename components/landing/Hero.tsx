"use client";

import { motion } from "framer-motion";
import { FaCode, FaGithub, FaRocket, FaStar, FaChartLine, FaFire, FaUser, FaInfoCircle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { TextGradient } from "../ui/text-gradient";
import { Tooltip } from "../ui/Tooltip";
import { useState } from "react";
import { UsernameDialog } from "../UsernameDialog";
import { useRouter } from "next/navigation";
import { setGuestUser } from "@/lib/guestMode";

interface HeroProps {
  currentYear: number;
  isLoading: boolean;
}

export function Hero({ currentYear, isLoading }: HeroProps) {
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const router = useRouter();

  const handleGuestMode = async (username: string) => {
    try {
      // Fetch user avatar
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      // Store in localStorage
      setGuestUser(username, data.avatar_url);

      // Close dialog and navigate
      setShowUsernameDialog(false);
      router.push("/wrapped");
    } catch (error) {
      console.error("Error setting up guest mode:", error);
    }
  };
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
          GitHub Unwrapped
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
          className="pt-4 space-y-4"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B3B3B3]/30 to-transparent" />
            <span className="text-[#B3B3B3] text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B3B3B3]/30 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUsernameDialog(true)}
              disabled={isLoading}
              className="group relative bg-white/10 hover:bg-white/20 border-2 border-[#1DB954]/50 hover:border-[#1DB954] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 backdrop-blur-sm"
            >
              <FaUser className="text-xl sm:text-2xl" />
              <span className="whitespace-nowrap">Try without signing in</span>
            </motion.button>

            <Tooltip
              content={
                <div className="space-y-2">
                  <p className="font-semibold text-[#1DB954]">⚠️ Limited Access</p>
                  <p>
                    Guest mode uses GitHub's public API with strict rate limits (60 requests/hour).
                    For the best experience with full stats and no limitations, we recommend signing in with GitHub.
                  </p>
                </div>
              }
              position="bottom"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-[#B3B3B3] hover:text-[#1DB954] transition-colors cursor-help"
              >
                <FaInfoCircle className="text-xl sm:text-2xl" />
              </motion.div>
            </Tooltip>
          </motion.div>
        </motion.div>

        <UsernameDialog
          isOpen={showUsernameDialog}
          onClose={() => setShowUsernameDialog(false)}
          onSubmit={handleGuestMode}
        />

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
