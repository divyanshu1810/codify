"use client";

import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { Slide } from "../Slide";

interface FavoriteRepoSlideProps {
  name: string;
  stars: number;
  commits: number;
}

export function FavoriteRepoSlide({ name, stars, commits }: FavoriteRepoSlideProps) {
  return (
    <Slide className="bg-[#121212]">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-white tracking-tight"
        >
          Your Favorite Project
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-3xl p-12 text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 150,
            }}
          >
            <FaGithub className="text-black text-8xl mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-4xl font-bold text-black break-words">
              {name}
            </h3>
            <p className="text-xl text-black/80">
              You spent the most time here
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center gap-8 pt-4"
          >
            <div className="flex items-center gap-2">
              <FaCodeBranch className="text-black text-2xl" />
              <span className="text-2xl font-bold text-black">
                {commits} commits
              </span>
            </div>
            {stars > 0 && (
              <div className="flex items-center gap-2">
                <FaStar className="text-black text-2xl" />
                <span className="text-2xl font-bold text-black">
                  {stars} stars
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </Slide>
  );
}
