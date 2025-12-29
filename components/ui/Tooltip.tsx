"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export function Tooltip({ content, children, position = "top", delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShouldShow(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (shouldShow && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const tooltipWidth = 256; // 16rem on mobile

      // Calculate available space on left and right
      const spaceOnLeft = rect.left;
      const spaceOnRight = viewportWidth - rect.right;
      const centerOffset = tooltipWidth / 2;

      // Determine best alignment
      if (spaceOnLeft < centerOffset && spaceOnRight > tooltipWidth) {
        // Not enough space on left, align to left
        setAlignment("left");
      } else if (spaceOnRight < centerOffset && spaceOnLeft > tooltipWidth) {
        // Not enough space on right, align to right
        setAlignment("right");
      } else {
        // Enough space on both sides, center it
        setAlignment("center");
      }
    }
  }, [shouldShow]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    const baseArrowClasses = "border-l-transparent border-r-transparent";
    const arrowPositionClasses = alignment === "left"
      ? "left-4"
      : alignment === "right"
      ? "right-4"
      : "left-1/2 -translate-x-1/2";

    switch (position) {
      case "top":
        return `top-full ${arrowPositionClasses} ${baseArrowClasses} border-b-transparent border-t-[#1a1a1a]`;
      case "bottom":
        return `bottom-full ${arrowPositionClasses} ${baseArrowClasses} border-t-transparent border-b-[#1a1a1a]`;
      case "left":
        return "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[#1a1a1a]";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[#1a1a1a]";
      default:
        return `top-full ${arrowPositionClasses} ${baseArrowClasses} border-b-transparent border-t-[#1a1a1a]`;
    }
  };

  const getHorizontalAlignment = () => {
    if (position === "left" || position === "right") {
      return "";
    }

    if (alignment === "left") {
      return "left-0";
    } else if (alignment === "right") {
      return "right-0";
    } else {
      return "left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: position === "top" ? 5 : -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === "top" ? 5 : -5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 pointer-events-none ${getHorizontalAlignment()} ${
              position === "top" ? "bottom-full mb-2" :
              position === "bottom" ? "top-full mt-2" :
              position === "left" ? "right-full top-1/2 -translate-y-1/2 mr-2" :
              "left-full top-1/2 -translate-y-1/2 ml-2"
            }`}
          >
            <div className="bg-[#1a1a1a] border border-[#1DB954]/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl backdrop-blur-xl w-[min(16rem,calc(100vw-2rem))] sm:w-80 md:w-96">
              <div className="text-white text-xs sm:text-sm leading-relaxed whitespace-normal">
                {content}
              </div>
            </div>
            <div className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
