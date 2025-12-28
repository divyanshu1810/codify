"use client";

import { motion } from "framer-motion";
import { FaFire, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Slide } from "../Slide";

interface ProductivitySlideProps {
  streak: number;
  mostProductiveDay: string;
  mostProductiveHour: number;
}

export function ProductivitySlide({
  streak,
  mostProductiveDay,
  mostProductiveHour,
}: ProductivitySlideProps) {
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  return (
    <Slide className="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-white tracking-tight"
        >
          Your Productivity Patterns
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center space-y-6"
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
              <FaFire className="text-[#1DB954] text-7xl mx-auto" />
            </motion.div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                }}
                className="text-7xl font-bold text-[#1DB954]"
              >
                {streak}
              </motion.div>
              <p className="text-2xl text-white mt-2">Day Streak</p>
              <p className="text-lg text-white/70 mt-1">
                {streak > 30 ? "Incredible consistency!" : "Keep it going!"}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4"
            >
              <FaCalendarAlt className="text-[#1DB954] text-5xl mx-auto" />
              <div>
                <div className="text-4xl font-bold text-white">
                  {mostProductiveDay}
                </div>
                <p className="text-lg text-white/70 mt-2">
                  Most Productive Day
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center space-y-4"
            >
              <FaClock className="text-[#1DB954] text-5xl mx-auto" />
              <div>
                <div className="text-4xl font-bold text-white">
                  {formatHour(mostProductiveHour)}
                </div>
                <p className="text-lg text-white/70 mt-2">
                  Peak Coding Hour
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
