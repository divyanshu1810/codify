"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StoryProgressBarProps {
  totalSlides: number;
  currentSlide: number;
  duration?: number; // Duration in milliseconds for each slide
  onComplete?: () => void;
  isPaused?: boolean;
}

export function StoryProgressBar({
  totalSlides,
  currentSlide,
  duration = 5000,
  onComplete,
  isPaused = false,
}: StoryProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when slide changes
    setProgress(0);
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration / 50);
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          // Defer the callback to avoid setState during render
          if (onComplete) {
            setTimeout(() => onComplete(), 0);
          }
          return 100;
        }

        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentSlide, duration, onComplete, isPaused]);

  // Don't show progress bar if there's only one slide
  if (totalSlides <= 1) return null;

  return (
    <div className="fixed top-4 sm:top-6 md:top-8 left-0 right-0 z-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-[#1DB954] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: progress === 0 ? 0 : 0.3,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
