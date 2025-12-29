"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

interface UsernameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
}

export function UsernameDialog({ isOpen, onClose, onSubmit }: UsernameDialogProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    // Basic validation
    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)) {
      setError("Invalid GitHub username format");
      return;
    }

    setIsLoading(true);

    try {
      // Verify the username exists on GitHub with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else if (response.status === 403) {
          throw new Error("Rate limit exceeded");
        }
        throw new Error("Failed to verify user");
      }

      onSubmit(username.trim());
      setUsername("");
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (err.message === "Rate limit exceeded") {
        setError("GitHub API rate limit exceeded. Please sign in with GitHub or try again later.");
      } else if (err.message === "User not found") {
        setError("GitHub user not found. Please check the username.");
      } else {
        setError("Failed to verify GitHub user. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUsername("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121212] border-2 border-[#1DB954] rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#B3B3B3] hover:text-white transition-colors p-2"
              aria-label="Close dialog"
            >
              <FaTimes className="text-xl" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-[#1DB954] rounded-full p-4">
                <FaGithub className="text-4xl text-black" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
            >
              Enter GitHub Username
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#B3B3B3] text-sm sm:text-base text-center mb-6"
            >
              View your GitHub stats without signing in. We'll use public data from the GitHub API.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your GitHub username"
                  className="w-full bg-[#1a1a1a] border border-[#1DB954]/30 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3]/50 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/20 transition-all"
                  disabled={isLoading}
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Checking..."
                ) : (
                  <>
                    <span>View Stats</span>
                    <FaArrowRight />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 pt-6 border-t border-[#1DB954]/20"
            >
              <p className="text-[#B3B3B3] text-xs text-center">
                <strong>Note:</strong> Guest mode uses public GitHub data (last 300 events) and may show limited statistics. For highly active accounts, data fetching may take a moment or timeout.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
