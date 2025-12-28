"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaCode, FaChartLine, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/wrapped");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 sm:space-y-8"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <FaCode className="text-[#1DB954] text-4xl sm:text-5xl md:text-6xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent tracking-tight px-4">
              Codify Wrapped
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#B3B3B3] font-medium tracking-tight px-4">
              Your GitHub Year in Review
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 px-4"
          >
            <div className="bg-[#121212] rounded-lg p-5 sm:p-6 space-y-3">
              <FaChartLine className="text-[#1DB954] text-2xl sm:text-3xl" />
              <h3 className="text-base sm:text-lg font-semibold">Track Your Stats</h3>
              <p className="text-[#B3B3B3] text-xs sm:text-sm">
                Commits, PRs, issues, and more
              </p>
            </div>
            <div className="bg-[#121212] rounded-lg p-5 sm:p-6 space-y-3">
              <FaTrophy className="text-[#1DB954] text-2xl sm:text-3xl" />
              <h3 className="text-base sm:text-lg font-semibold">Earn Nicknames</h3>
              <p className="text-[#B3B3B3] text-xs sm:text-sm">
                Get cool titles based on your activity
              </p>
            </div>
            <div className="bg-[#121212] rounded-lg p-5 sm:p-6 space-y-3 sm:col-span-2 md:col-span-1">
              <FaCode className="text-[#1DB954] text-2xl sm:text-3xl" />
              <h3 className="text-base sm:text-lg font-semibold">Discover Insights</h3>
              <p className="text-[#B3B3B3] text-xs sm:text-sm">
                Learn about your coding patterns
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-4"
          >
            <button
              onClick={() => signIn("github", { callbackUrl: "/wrapped" })}
              disabled={status === "loading"}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 sm:gap-3 mx-auto"
            >
              <FaGithub className="text-xl sm:text-2xl" />
              <span className="whitespace-nowrap">
                {status === "loading" ? "Loading..." : "Sign in with GitHub"}
              </span>
            </button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#B3B3B3] text-xs sm:text-sm pt-6 sm:pt-8 px-4"
          >
            Discover your coding journey of {currentYear}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
