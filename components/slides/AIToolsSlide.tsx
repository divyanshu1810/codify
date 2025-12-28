"use client";

import { motion } from "framer-motion";
import { FaRobot, FaBrain } from "react-icons/fa";
import { Slide } from "../Slide";

interface AIToolsSlideProps {
  tools: { name: string; count: number }[];
}

export function AIToolsSlide({ tools }: AIToolsSlideProps) {
  if (tools.length === 0) {
    return (
      <Slide className="bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <FaBrain className="text-white text-8xl mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-extrabold text-white tracking-tight">
              Pure Human Code
            </h2>
            <p className="text-2xl text-white/90 font-medium">
              No AI tools detected in your commits
            </p>
            <p className="text-lg text-white/60">
              Old school coding at its finest
            </p>
          </motion.div>
        </div>
      </Slide>
    );
  }

  return (
    <Slide className="bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <FaRobot className="text-white text-7xl mx-auto" />
          <h2 className="text-5xl font-extrabold text-white tracking-tight">
            Your AI Companions
          </h2>
          <p className="text-xl text-white/80">
            Tools detected in your commits
          </p>
        </motion.div>

        <div className="space-y-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.2,
              }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.2,
                      type: "spring",
                    }}
                    className="bg-[#1DB954] rounded-full w-16 h-16 flex items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-black">
                      {index + 1}
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      {tool.name}
                    </h3>
                    <p className="text-lg text-white/70">
                      {tool.count} mentions
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.2,
                    type: "spring",
                  }}
                  className="text-4xl font-bold text-[#1DB954]"
                >
                  {tool.count}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
