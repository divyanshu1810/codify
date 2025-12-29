"use client";

import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaUserFriends } from "react-icons/fa";
import { Slide } from "../Slide";

interface Collaborator {
  username: string;
  avatar: string;
  interactions: number;
}

interface CollaborationSlideProps {
  topCollaborators: Collaborator[];
}

export function CollaborationSlide({ topCollaborators }: CollaborationSlideProps) {
  const totalInteractions = topCollaborators.reduce(
    (sum, collab) => sum + collab.interactions,
    0
  );

  const hasCollaborators = topCollaborators.length > 0;

  return (
    <Slide className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="space-y-8 sm:space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white tracking-tight px-4"
        >
          {hasCollaborators ? "Your Collaboration Circle" : "Solo Developer"}
        </motion.h2>

        {hasCollaborators ? (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4"
              >
                <FaUsers className="text-[#1DB954] text-4xl sm:text-5xl md:text-6xl mx-auto" />
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1DB954]">
                    {topCollaborators.length}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mt-2">
                    Top Collaborators
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4"
              >
                <FaHandshake className="text-[#1DB954] text-4xl sm:text-5xl md:text-6xl mx-auto" />
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1DB954]">
                    {totalInteractions}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mt-2">
                    Total Interactions
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Collaborators List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3 sm:space-y-4 px-4"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-4 sm:mb-6">
                Your Top Collaborators
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-2xl mx-auto">
                {topCollaborators.map((collab, index) => (
                  <motion.div
                    key={collab.username}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white/15 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={collab.avatar}
                        alt={collab.username}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-3 border-[#1DB954] object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://github.com/${collab.username}.png`;
                        }}
                      />
                      <div className="absolute -top-1 -right-1 bg-[#1DB954] text-black text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
                        {collab.username}
                      </div>
                      <div className="text-xs sm:text-sm text-white/70">
                        {collab.interactions} interaction{collab.interactions !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <FaHandshake className="text-[#1DB954] text-xl sm:text-2xl md:text-3xl flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-10 md:p-12 text-center space-y-4 sm:space-y-6 mx-4"
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
              <FaUserFriends className="text-white/50 text-6xl sm:text-7xl md:text-8xl mx-auto" />
            </motion.div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Independent Developer
              </div>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mt-4 max-w-md mx-auto">
                You're coding solo this year. Sometimes the best work is done independently!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Slide>
  );
}
