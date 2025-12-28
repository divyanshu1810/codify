"use client";

import { motion } from "framer-motion";
import {
  FaGitAlt,
  FaCodeBranch,
  FaCheckCircle,
  FaCode,
  FaFire,
  FaCalendarAlt,
  FaClock,
  FaRobot,
  FaStar,
  FaEye
} from "react-icons/fa";
import { Slide } from "../Slide";
import { GitHubStats } from "@/lib/github";
import { Nickname } from "@/lib/nicknames";
import * as Icons from "react-icons/fa";
import { IconType } from "react-icons";

interface SummarySlideProps {
  stats: GitHubStats;
  nickname: Nickname;
  username: string;
  year: number;
}

export function SummarySlide({ stats, nickname, username, year }: SummarySlideProps) {
  const NicknameIcon = (Icons as any)[nickname.icon] as IconType || Icons.FaStar;

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  return (
    <Slide className="bg-gradient-to-br from-[#121212] via-black to-[#1a1a1a]">
      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-1 sm:space-y-2 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {username}'s {year} Wrapped
          </h2>
          <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg font-medium">Complete Summary</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Nickname */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-2xl p-4 sm:p-5 md:p-6 text-center sm:col-span-2 lg:col-span-1"
          >
            <NicknameIcon className="text-black text-3xl sm:text-4xl md:text-5xl mx-auto mb-2 sm:mb-3" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">{nickname.title}</h3>
            <p className="text-black/80 text-xs sm:text-sm mt-1 font-mono">{nickname.description}</p>
          </motion.div>

          {/* Commits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center"
          >
            <FaGitAlt className="text-[#1DB954] text-2xl sm:text-3xl md:text-4xl mx-auto mb-1.5 sm:mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1DB954] font-mono">
              {stats.totalCommits.toLocaleString()}
            </div>
            <p className="text-[#B3B3B3] text-xs sm:text-sm mt-1">Commits</p>
          </motion.div>

          {/* PRs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center"
          >
            <FaCodeBranch className="text-[#1DB954] text-4xl mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1DB954] font-mono">
              {stats.totalPRsMerged.toLocaleString()}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Pull Requests</p>
          </motion.div>

          {/* Issues */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center"
          >
            <FaCheckCircle className="text-[#1DB954] text-4xl mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1DB954] font-mono">
              {stats.totalIssuesResolved.toLocaleString()}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Issues Resolved</p>
          </motion.div>

          {/* Lines of Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center"
          >
            <FaCode className="text-[#1DB954] text-4xl mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1DB954] font-mono">
              {stats.linesOfCode.net.toLocaleString()}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Net Lines Added</p>
          </motion.div>

          {/* Code Reviews */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center"
          >
            <FaEye className="text-[#1DB954] text-4xl mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1DB954] font-mono">
              {stats.reviewedLinesOfCode.toLocaleString()}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Lines Reviewed</p>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#1a1a1a] border border-orange-500/20 rounded-2xl p-6 text-center"
          >
            <FaFire className="text-orange-500 text-4xl mx-auto mb-2" />
            <div className="text-4xl font-bold text-orange-500 font-mono">
              {stats.streak}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Day Streak</p>
          </motion.div>

          {/* Most Productive Day */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="bg-[#1a1a1a] border border-purple-500/20 rounded-2xl p-6 text-center"
          >
            <FaCalendarAlt className="text-purple-500 text-4xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-500 font-mono">
              {stats.mostProductiveDay}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Most Productive Day</p>
          </motion.div>

          {/* Peak Hour */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-[#1a1a1a] border border-blue-500/20 rounded-2xl p-6 text-center"
          >
            <FaClock className="text-blue-500 text-4xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-500 font-mono">
              {formatHour(stats.mostProductiveHour)}
            </div>
            <p className="text-[#B3B3B3] text-sm mt-1">Peak Coding Hour</p>
          </motion.div>

          {/* Favorite Repo */}
          {stats.favoriteRepo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="bg-[#1a1a1a] border border-[#1DB954]/20 rounded-2xl p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <FaStar className="text-[#1DB954] text-2xl sm:text-3xl md:text-4xl flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[#B3B3B3] text-xs sm:text-sm">Favorite Repository</p>
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white font-mono break-all">
                      {stats.favoriteRepo.name}
                    </h3>
                  </div>
                </div>
                <div className="text-center sm:text-right flex-shrink-0">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1DB954] font-mono">
                    {stats.favoriteRepo.commits}
                  </div>
                  <p className="text-[#B3B3B3] text-xs sm:text-sm">commits</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Tools */}
          {stats.aiToolsUsed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-3"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <FaRobot className="text-white text-2xl sm:text-3xl md:text-4xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">AI Companions</h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {stats.aiToolsUsed.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2"
                  >
                    <span className="text-white font-bold font-mono text-sm sm:text-base">{tool.name}</span>
                    <span className="text-white/70 ml-1.5 sm:ml-2 text-xs sm:text-sm font-mono">
                      {tool.count}x
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-[#B3B3B3] text-xs sm:text-sm font-mono pt-3 sm:pt-4 px-4"
        >
          Powered by Codify Wrapped
        </motion.div>
      </div>
    </Slide>
  );
}
