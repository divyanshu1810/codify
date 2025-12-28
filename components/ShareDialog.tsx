"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTwitter, FaLinkedin, FaCheckCircle } from "react-icons/fa";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
}

export function ShareDialog({ isOpen, onClose, platform }: ShareDialogProps) {
  const platformIcons = {
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
  };

  const PlatformIcon = platformIcons[platform as keyof typeof platformIcons] || FaTwitter;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border-2 border-[#1DB954] rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#B3B3B3] hover:text-white transition-colors p-2"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-[#1DB954] rounded-full p-4">
                  <FaCheckCircle className="text-black text-4xl" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
              >
                Images Downloaded!
              </motion.h2>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 text-center"
              >
                <p className="text-[#B3B3B3] text-sm sm:text-base">
                  Your wrapped images have been downloaded successfully.
                </p>

                <div className="bg-black/50 rounded-xl p-4 space-y-3 text-left">
                  <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                    <PlatformIcon className="text-[#1DB954]" />
                    Share on {platform}:
                  </p>
                  <ol className="space-y-2 text-[#B3B3B3] text-xs sm:text-sm font-mono">
                    <li className="flex gap-2">
                      <span className="text-[#1DB954] font-bold">1.</span>
                      <span>Open {platform}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#1DB954] font-bold">2.</span>
                      <span>Create a new post</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#1DB954] font-bold">3.</span>
                      <span>Upload the downloaded images</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#1DB954] font-bold">4.</span>
                      <span>Share with your network!</span>
                    </li>
                  </ol>
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="w-full mt-6 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
