"use client";

import { motion } from "framer-motion";

const pulseAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: [0.3, 0.6, 0.3] },
  transition: { duration: 1.5, repeat: Infinity },
};

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl space-y-8">
        <motion.div {...pulseAnimation} className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1DB954]/30 to-[#1ed760]/30 rounded-full" />
        </motion.div>

        <motion.div {...pulseAnimation} transition={{ ...pulseAnimation.transition, delay: 0.1 }} className="space-y-3">
          <div className="h-12 bg-white/10 rounded-lg w-3/4 mx-auto" />
          <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto" />
        </motion.div>

        <motion.div {...pulseAnimation} transition={{ ...pulseAnimation.transition, delay: 0.2 }} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded-lg" />
            ))}
          </div>
          <div className="h-32 bg-white/5 rounded-lg" />
          <div className="h-32 bg-white/5 rounded-lg" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
          <p className="text-white text-xl font-mono mb-2">Loading your wrapped...</p>
          <p className="text-gray-400 text-sm">Fetching your GitHub stats</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative h-2 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#1DB954] to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
