"use client";

import { motion } from "framer-motion";
import { FaChartLine, FaTrophy, FaCode, FaFire, FaClock, FaUsers, FaGlobe } from "react-icons/fa";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export function FeatureCards() {
  const features = [
    {
      icon: <FaChartLine className="text-[#1DB954] text-4xl" />,
      title: "Comprehensive Analytics",
      description: "Track commits, PRs, issues, code reviews, and lines of code with stunning visualizations and detailed breakdowns.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#1DB954]/20 to-transparent border border-[#1DB954]/20 items-center justify-center p-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-3xl font-bold text-[#1DB954]"
              >
                1.2K
              </motion.div>
              <div className="text-xs text-[#B3B3B3] mt-1">Commits</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                className="text-3xl font-bold text-[#1DB954]"
              >
                89
              </motion.div>
              <div className="text-xs text-[#B3B3B3] mt-1">PRs</div>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-2",
    },
    {
      icon: <FaTrophy className="text-[#1DB954] text-4xl" />,
      title: "Badges & Achievements",
      description: "Unlock special badges and earn personalized developer titles based on your unique coding style and milestones.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/20 items-center justify-center p-4">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
              className="text-3xl font-bold text-yellow-400"
            >
              Code Machine
            </motion.div>
            <div className="text-xs text-[#B3B3B3] mt-1">Your Developer Title</div>
          </div>
        </div>
      ),
    },
    {
      icon: <FaUsers className="text-[#1DB954] text-4xl" />,
      title: "Collaboration Circle",
      description: "See your top collaborators, interaction counts, and discover your coding community throughout the year.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500/20 to-transparent border border-indigo-500/20 items-center justify-center p-4">
          <div className="flex -space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center text-white font-bold text-sm"
            >
              A
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-black flex items-center justify-center text-white font-bold text-sm"
            >
              B
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-black flex items-center justify-center text-white font-bold text-sm"
            >
              +3
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      icon: <FaGlobe className="text-[#1DB954] text-4xl" />,
      title: "Language Breakdown",
      description: "Visualize your programming language usage with detailed percentages and beautiful color-coded charts.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20 items-center justify-center p-4">
          <div className="space-y-2 w-full px-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
        </div>
      ),
    },
    {
      icon: <FaCode className="text-[#1DB954] text-4xl" />,
      title: "AI Tool Detection",
      description: "Discover which AI coding assistants powered your development and track your AI-assisted contributions.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20 items-center justify-center p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-300 font-semibold"
            >
              Copilot
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-300 font-semibold"
            >
              Claude
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      icon: <FaFire className="text-[#1DB954] text-4xl" />,
      title: "Streak & Consistency",
      description: "Track your coding streaks, most productive days, months, and discover when you're at your coding peak.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20 items-center justify-center p-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                className="text-4xl font-bold text-orange-400"
              >
                45
              </motion.div>
              <div className="text-xs text-[#B3B3B3] mt-1">Day Streak</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.3 }}
                className="text-2xl font-bold text-orange-400"
              >
                Wed
              </motion.div>
              <div className="text-xs text-[#B3B3B3] mt-1">Best Day</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
                className="text-2xl font-bold text-orange-400"
              >
                Oct
              </motion.div>
              <div className="text-xs text-[#B3B3B3] mt-1">Peak Month</div>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-2",
    },
    {
      icon: <FaClock className="text-[#1DB954] text-4xl" />,
      title: "Productivity Insights",
      description: "Analyze your coding patterns to find your most productive hours and optimize your workflow.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20 items-center justify-center p-4">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
              className="text-4xl font-bold text-blue-400"
            >
              11 PM
            </motion.div>
            <div className="text-xs text-[#B3B3B3] mt-1">Peak Coding Hour</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
          Your Complete GitHub Story
        </h2>
        <p className="text-lg text-[#B3B3B3] max-w-3xl mx-auto">
          Discover your coding journey with in-depth analytics, achievements, collaboration insights, and personalized metrics that celebrate your unique developer identity
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <BentoGrid className="px-4">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </div>
  );
}
