"use client";

import { useState } from "react";
import { FaDownload, FaMobileAlt, FaTabletAlt, FaDesktop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface DownloadSize {
  name: string;
  width: number;
  height: number;
  icon: typeof FaMobileAlt;
  format: "phone" | "tab" | "desktop";
}

const DOWNLOAD_SIZES: DownloadSize[] = [
  { name: "Phone", width: 1170, height: 2532, icon: FaMobileAlt, format: "phone" },
  { name: "Tab", width: 1640, height: 2360, icon: FaTabletAlt, format: "tab" },
  { name: "Desktop", width: 1920, height: 1080, icon: FaDesktop, format: "desktop" },
];

interface DownloadButtonProps {
  slideRef: React.RefObject<HTMLDivElement | null>;
  slideName: string;
  onDownload?: (format: "phone" | "tab" | "desktop") => Promise<void>;
}

export function DownloadButton({ slideRef, slideName, onDownload }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (size: DownloadSize) => {
    setIsDownloading(true);
    setIsOpen(false);

    try {
      if (onDownload) {
        // Use the new HTML generator approach
        await onDownload(size.format);
      }
    } catch (error) {
      console.error("Error downloading slide:", error);
      alert("Failed to download slide. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
      >
        <FaDownload className={`text-sm sm:text-base ${isDownloading ? "animate-bounce" : ""}`} />
        <span className="hidden sm:inline">
          {isDownloading ? "Downloading..." : "Download"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden border border-[#1DB954]/20 min-w-[200px] z-50"
          >
            <div className="p-2">
              <p className="text-[#B3B3B3] text-xs font-mono px-3 py-2">
                Choose size:
              </p>
              {DOWNLOAD_SIZES.map((size) => (
                <button
                  key={size.name}
                  onClick={() => handleDownload(size)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1DB954]/10 rounded-lg transition-colors text-left"
                >
                  <size.icon className="text-[#1DB954] text-xl" />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {size.name}
                    </div>
                    <div className="text-[#B3B3B3] text-xs font-mono">
                      {size.width} × {size.height}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
