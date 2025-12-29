"use client";

import { motion } from "framer-motion";
import { FaExclamationTriangle, FaGithub, FaHome, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface RateLimitErrorProps {
  isGuestMode?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export function RateLimitError({ isGuestMode = false, onRetry, onGoHome }: RateLimitErrorProps) {
  const router = useRouter();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-orange-500/20 rounded-full p-6 border-4 border-orange-500/50">
            <FaExclamationTriangle className="text-6xl sm:text-7xl text-orange-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
        >
          Rate Limit Exceeded
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-[#B3B3B3] max-w-lg mx-auto"
        >
          {isGuestMode
            ? "The GitHub public API has reached its rate limit. This happens when too many requests are made without authentication."
            : "GitHub API rate limit has been exceeded. Please try again in a few minutes."}
        </motion.p>

        {isGuestMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-2xl p-6 max-w-lg mx-auto"
          >
            <div className="flex items-start gap-3 text-left">
              <FaGithub className="text-[#1DB954] text-2xl flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-[#1DB954] font-bold text-lg">Pro Tip</h3>
                <p className="text-[#B3B3B3] text-sm">
                  Sign in with GitHub to access authenticated API with much higher rate limits (5,000 requests/hour vs 60 requests/hour).
                  You'll also get access to private repositories and more accurate statistics.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-[#B3B3B3] text-sm"
        >
          <FaClock />
          <span>Rate limits typically reset within an hour</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
            >
              Try Again
            </button>
          )}

          <button
            onClick={handleGoHome}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-2 justify-center shadow-[0_0_40px_rgba(29,185,84,0.3)] hover:shadow-[0_0_60px_rgba(29,185,84,0.5)]"
          >
            <FaHome />
            <span>{isGuestMode ? "Sign In with GitHub" : "Go Home"}</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8"
        >
          <p className="text-[#B3B3B3]/60 text-xs">
            Learn more about{" "}
            <a
              href="https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DB954] hover:underline"
            >
              GitHub API rate limits
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
