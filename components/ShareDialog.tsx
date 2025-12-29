"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTwitter, FaLinkedin, FaLink, FaFacebook, FaReddit, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stats?: {
    commits: number;
    prs: number;
    issues: number;
  };
  year?: number;
  username?: string;
}

export function ShareDialog({ isOpen, onClose, stats, year, username }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://git-unwrapped.vercel.app";

  const shareText = stats && year
    ? `Check out my GitHub Year Wrapped ${year}! 🎉\n\n📊 ${stats.commits} commits\n🔀 ${stats.prs} PRs merged\n🐛 ${stats.issues} issues resolved\n\nCreate yours at ${appUrl}`
    : `Check out GitHub Wrapped - Your GitHub Year Wrapped! Create your personalized coding stats at ${appUrl}`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(appUrl);

    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=600");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareButtons = [
    { name: "Twitter", icon: FaTwitter, color: "hover:bg-blue-400", platform: "twitter" },
    { name: "LinkedIn", icon: FaLinkedin, color: "hover:bg-blue-600", platform: "linkedin" },
    { name: "Facebook", icon: FaFacebook, color: "hover:bg-blue-700", platform: "facebook" },
    { name: "Reddit", icon: FaReddit, color: "hover:bg-orange-600", platform: "reddit" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 text-[#B3B3B3] hover:text-white transition-colors p-2"
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
                <FaShareAlt className="text-4xl text-black" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
            >
              Share Your Wrapped!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-[#B3B3B3] text-sm sm:text-base text-center">
                Share your coding achievements with the world!
              </p>

              <div className="grid grid-cols-2 gap-3">
                {shareButtons.map((button, index) => (
                  <motion.button
                    key={button.platform}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => handleShare(button.platform)}
                    className={`bg-white/10 ${button.color} text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105`}
                  >
                    <button.icon className="text-lg" />
                    <span className="text-sm">{button.name}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onClick={handleCopyLink}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
              >
                <FaLink className="text-lg" />
                <span className="text-sm">{copied ? "Copied!" : "Copy Share Text"}</span>
              </motion.button>

              <div className="bg-black/50 rounded-lg p-3 text-xs text-gray-400 font-mono max-h-24 overflow-y-auto">
                {shareText}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="w-full mt-4 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
