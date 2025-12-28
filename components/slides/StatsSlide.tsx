"use client";

import { motion } from "framer-motion";
import { FaCodeBranch, FaCheckCircle, FaGitAlt } from "react-icons/fa";
import { Slide } from "../Slide";

interface StatsSlideProps {
  commits: number;
  prs: number;
  issues: number;
}

export function StatsSlide({ commits, prs, issues }: StatsSlideProps) {
  const stats = [
    { label: "Commits", value: commits.toLocaleString(), icon: FaGitAlt },
    { label: "Pull Requests", value: prs.toLocaleString(), icon: FaCodeBranch },
    { label: "Issues Resolved", value: issues.toLocaleString(), icon: FaCheckCircle },
  ];

  return (
    <Slide className="bg-[#121212]">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white tracking-tight px-4"
        >
          Your Impact
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="bg-black rounded-2xl p-5 sm:p-6 md:p-8 text-center space-y-3 sm:space-y-4 border border-[#1DB954]/20"
            >
              <stat.icon className="text-[#1DB954] text-3xl sm:text-4xl md:text-5xl mx-auto" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.2,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1DB954] font-mono tabular-nums"
              >
                {stat.value}
              </motion.div>
              <div className="text-base sm:text-lg md:text-xl text-[#B3B3B3] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
