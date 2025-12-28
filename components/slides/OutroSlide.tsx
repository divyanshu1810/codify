"use client";

import { motion } from "framer-motion";
import { FaHeart, FaTwitter, FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import { Slide } from "../Slide";
import { useState } from "react";

interface OutroSlideProps {
  username: string;
  year: number;
  funFact: string;
  onDownloadAll?: (format: "phone" | "tab" | "desktop") => Promise<void>;
  isDownloading?: boolean;
}

export function OutroSlide({ username, year, funFact, onDownloadAll, isDownloading = false }: OutroSlideProps) {
  const [showFormatSelector, setShowFormatSelector] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const shareText = `Check out my ${year} GitHub Wrapped! 🎉\n\nDiscover your GitHub stats and coding journey with Codify Wrapped.`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const linkedInText = `🎉 Check out my ${year} GitHub Wrapped!\n\nI just discovered my coding journey and stats from ${year} with Codify Wrapped.\n\n✨ Find out your GitHub stats at: ${shareUrl}\n\n#GitHubWrapped #CodifyWrapped #Coding #GitHub`;

  const handleDownloadWithFormat = async (format: "phone" | "tab" | "desktop") => {
    setShowFormatSelector(false);

    if (onDownloadAll) {
      await onDownloadAll(format);
    }
  };

  const handleLinkedInShare = async () => {
    try {
      await navigator.clipboard.writeText(linkedInText);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 3000);
      // Still open LinkedIn but user will paste the text
      window.open('https://www.linkedin.com/feed/', '_blank');
    } catch (error) {
      // Fallback if clipboard API fails
      window.open('https://www.linkedin.com/feed/', '_blank');
      alert('Copy this text to share:\n\n' + linkedInText);
    }
  };

  return (
    <Slide className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] relative">
      {/* Loading Overlay */}
      {isDownloading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
          <p className="text-black font-bold text-xl mt-4">Generating your slides...</p>
          <p className="text-black/80 text-sm mt-2">Please wait while we create your images</p>
        </motion.div>
      )}

      <div className="text-center space-y-6 sm:space-y-8 md:space-y-12">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 150,
          }}
        >
          <FaHeart className="text-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 sm:space-y-5 md:space-y-6 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
            Amazing Work, {username}!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-black/90 font-medium">
            You made {year} count
          </p>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-black font-medium">
              {funFact}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3 sm:space-y-4 px-4"
        >
          <p className="text-base sm:text-lg text-black/80 font-medium">
            {isDownloading ? "Downloading your wrapped..." : "Download & Share"}
          </p>

          {/* Download All Button */}
          {onDownloadAll && !showFormatSelector && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFormatSelector(true)}
              disabled={isDownloading}
              className="bg-black text-[#1DB954] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 sm:gap-3 mx-auto mb-4"
            >
              <FaDownload className={`text-lg sm:text-xl ${isDownloading ? "animate-bounce" : ""}`} />
              <span>{isDownloading ? "Downloading..." : "Download All Slides"}</span>
            </motion.button>
          )}

          {/* Format Selector */}
          {showFormatSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-4 space-y-3"
            >
              <p className="text-black font-semibold text-sm sm:text-base">Choose format:</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => handleDownloadWithFormat("phone")}
                  disabled={isDownloading}
                  className="bg-black text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 text-xs sm:text-sm font-bold"
                >
                  Phone
                  <div className="text-[#1DB954] text-xs font-mono mt-1">1170×2532</div>
                </button>
                <button
                  onClick={() => handleDownloadWithFormat("tab")}
                  disabled={isDownloading}
                  className="bg-black text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 text-xs sm:text-sm font-bold"
                >
                  Tab
                  <div className="text-[#1DB954] text-xs font-mono mt-1">1640×2360</div>
                </button>
                <button
                  onClick={() => handleDownloadWithFormat("desktop")}
                  disabled={isDownloading}
                  className="bg-black text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 text-xs sm:text-sm font-bold"
                >
                  Desktop
                  <div className="text-[#1DB954] text-xs font-mono mt-1">1920×1080</div>
                </button>
              </div>
              <button
                onClick={() => setShowFormatSelector(false)}
                className="text-black/70 text-xs sm:text-sm underline hover:text-black transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          )}

          <p className="text-sm sm:text-base text-black/70 font-medium">Share on:</p>

          {showCopiedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-black text-[#1DB954] px-4 py-2 rounded-full font-semibold text-sm"
            >
              ✓ Text copied! Paste it on LinkedIn
            </motion.div>
          )}

          <div className="flex justify-center gap-3 sm:gap-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-black/80 transition-colors inline-block"
              title="Share on Twitter"
            >
              <FaTwitter className="text-xl sm:text-2xl" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLinkedInShare}
              className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-black/80 transition-colors"
              title="Copy text and open LinkedIn"
            >
              <FaLinkedin className="text-xl sm:text-2xl" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-black/80 transition-colors inline-block"
              title="Visit GitHub profile"
            >
              <FaGithub className="text-xl sm:text-2xl" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-black/70 text-xs sm:text-sm font-mono px-4"
        >
          Made with Codify Wrapped
        </motion.div>
      </div>
    </Slide>
  );
}
