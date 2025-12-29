"use client";

import { motion } from "framer-motion";
import { FaCode, FaUser } from "react-icons/fa";
import { Slide } from "../Slide";

interface IntroSlideProps {
  username: string;
  year: number;
  userImage?: string;
}

export function IntroSlide({ username, year, userImage }: IntroSlideProps) {
  return (
    <Slide className="bg-gradient-to-br from-[#1DB954] to-[#1ed760]">
      <div className="text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="flex justify-center"
        >
          {userImage ? (
            <img
              src={userImage}
              alt={username}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-black shadow-2xl object-cover"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-black shadow-2xl bg-black/20 flex items-center justify-center">
              <FaUser className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-3 sm:space-y-4 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight break-words">
            {username}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black/90 font-semibold tracking-tight">
            Your {year} GitHub Wrapped
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1,
            ease: "easeOut",
          }}
          className="text-black/80 text-base sm:text-lg font-medium px-4"
        >
          Let's see what you've built this year
        </motion.div>
      </div>
    </Slide>
  );
}
