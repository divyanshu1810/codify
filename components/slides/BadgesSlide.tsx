"use client";

import { motion } from "framer-motion";
import { Slide } from "../Slide";
import { Badge } from "@/lib/badges";
import {
  FaCog,
  FaTrophy,
  FaCodeBranch,
  FaCrown,
  FaBug,
  FaFire,
  FaPencilAlt,
  FaRocket,
  FaTrash,
  FaEye,
  FaSearchPlus,
  FaBolt,
  FaMoon,
  FaSun,
  FaCalendarCheck,
  FaRobot,
  FaGlobe,
  FaBook,
  FaStar,
  FaAward,
  FaCheck,
} from "react-icons/fa";

interface BadgesSlideProps {
  badges: Badge[];
}

const rarityColors = {
  legendary: {
    bg: "from-yellow-400 to-orange-500",
    text: "text-yellow-400",
    border: "border-yellow-400",
    glow: "shadow-yellow-400/50",
  },
  epic: {
    bg: "from-purple-400 to-pink-500",
    text: "text-purple-400",
    border: "border-purple-400",
    glow: "shadow-purple-400/50",
  },
  rare: {
    bg: "from-blue-400 to-cyan-500",
    text: "text-blue-400",
    border: "border-blue-400",
    glow: "shadow-blue-400/50",
  },
  common: {
    bg: "from-gray-400 to-gray-500",
    text: "text-gray-400",
    border: "border-gray-400",
    glow: "shadow-gray-400/50",
  },
};

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaCog,
  FaTrophy,
  FaCodeBranch,
  FaCrown,
  FaBug,
  FaFire,
  FaPencilAlt,
  FaRocket,
  FaTrash,
  FaEye,
  FaSearchPlus,
  FaBolt,
  FaMoon,
  FaSun,
  FaCalendarCheck,
  FaRobot,
  FaGlobe,
  FaBook,
  FaStar,
  FaAward,
  FaCheck,
};

export function BadgesSlide({ badges }: BadgesSlideProps) {
  const badgesByRarity = {
    legendary: badges.filter((b) => b.rarity === "legendary"),
    epic: badges.filter((b) => b.rarity === "epic"),
    rare: badges.filter((b) => b.rarity === "rare"),
    common: badges.filter((b) => b.rarity === "common"),
  };

  return (
    <Slide className="bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-white tracking-tight"
        >
          Your Achievements
        </motion.h2>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] p-6 rounded-full">
            <FaTrophy className="text-5xl text-black" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/80 text-center"
        >
          {badges.length} badge{badges.length !== 1 ? "s" : ""} earned
        </motion.p>

        <div className="space-y-6">
          {badges.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-white/70 text-xl">Keep coding to earn achievements!</p>
            </motion.div>
          ) : (
            badges.slice(0, 6).map((badge, index) => {
              const IconComponent = iconMap[badge.icon] || FaCheck;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`bg-white/10 backdrop-blur-sm border-2 ${rarityColors[badge.rarity].border} rounded-2xl p-6 shadow-lg ${rarityColors[badge.rarity].glow}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                        }}
                        className={`${rarityColors[badge.rarity].text}`}
                      >
                        <IconComponent className="text-5xl" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {badge.name}
                        </h3>
                        <p className="text-lg text-white/70">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm font-bold uppercase px-3 py-1 rounded-full ${rarityColors[badge.rarity].text} bg-white/10`}>
                      {badge.rarity}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </Slide>
  );
}
