"use client";

import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaEquals } from "react-icons/fa";
import { Slide } from "../Slide";

interface LinesOfCodeSlideProps {
  added: number;
  deleted: number;
  net: number;
}

export function LinesOfCodeSlide({ added, deleted, net }: LinesOfCodeSlideProps) {
  return (
    <Slide className="bg-gradient-to-br from-[#121212] to-black">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-white tracking-tight"
        >
          Lines of Code
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/50 rounded-2xl p-8 border-l-4 border-[#1DB954]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaPlus className="text-[#1DB954] text-4xl" />
                <span className="text-2xl text-[#B3B3B3]">Added</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                className="text-5xl font-bold text-[#1DB954]"
              >
                {added.toLocaleString()}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/50 rounded-2xl p-8 border-l-4 border-red-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaMinus className="text-red-500 text-4xl" />
                <span className="text-2xl text-[#B3B3B3]">Deleted</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                className="text-5xl font-bold text-red-500"
              >
                {deleted.toLocaleString()}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-2xl p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaEquals className="text-black text-4xl" />
                <span className="text-2xl text-black font-semibold">Net Change</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                className="text-5xl font-bold text-black"
              >
                {net.toLocaleString()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
