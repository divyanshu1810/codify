"use client";

import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaBuilding, FaGlobe, FaUsers, FaCodeBranch, FaCalendar } from "react-icons/fa";
import { Slide } from "../Slide";
import { GitHubUserProfile } from "@/lib/github";

interface IntroSlideProps {
  username: string;
  year: number;
  userImage?: string;
  userProfile?: GitHubUserProfile;
}

export function IntroSlide({ username, year, userImage, userProfile }: IntroSlideProps) {
  const joinedYear = userProfile?.created_at ? new Date(userProfile.created_at).getFullYear() : null;

  return (
    <Slide className="bg-gradient-to-br from-[#1DB954] to-[#1ed760]">
      <div className="text-center space-y-4 sm:space-y-6">
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
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-black shadow-2xl object-cover"
            />
          ) : (
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-black shadow-2xl bg-black/20 flex items-center justify-center">
              <FaUser className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
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
          className="space-y-2 sm:space-y-3 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight break-words">
            {userProfile?.name || username}
          </h1>
          <p className="text-base sm:text-lg text-black/80 font-mono">@{username}</p>
          {userProfile?.bio && (
            <p className="text-sm sm:text-base md:text-lg text-black/80 max-w-xl mx-auto italic">
              "{userProfile.bio}"
            </p>
          )}
          <p className="text-lg sm:text-xl md:text-2xl text-black/90 font-semibold tracking-tight pt-2">
            Your {year} GitHub Unwrapped
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: "easeOut",
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto px-4"
        >
          {userProfile?.location && (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 flex items-center gap-1.5 sm:gap-2 justify-center">
              <FaMapMarkerAlt className="text-black text-xs sm:text-sm flex-shrink-0" />
              <span className="text-black text-xs sm:text-sm font-medium truncate">{userProfile.location}</span>
            </div>
          )}
          {userProfile?.company && (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 flex items-center gap-1.5 sm:gap-2 justify-center">
              <FaBuilding className="text-black text-xs sm:text-sm flex-shrink-0" />
              <span className="text-black text-xs sm:text-sm font-medium truncate">{userProfile.company}</span>
            </div>
          )}
          {userProfile && (
            <>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 flex items-center gap-1.5 sm:gap-2 justify-center">
                <FaUsers className="text-black text-xs sm:text-sm flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm font-medium">{userProfile.followers} followers</span>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 flex items-center gap-1.5 sm:gap-2 justify-center">
                <FaCodeBranch className="text-black text-xs sm:text-sm flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm font-medium">{userProfile.public_repos} repos</span>
              </div>
            </>
          )}
          {joinedYear && (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 flex items-center gap-1.5 sm:gap-2 justify-center col-span-2 sm:col-span-4">
              <FaCalendar className="text-black text-xs sm:text-sm flex-shrink-0" />
              <span className="text-black text-xs sm:text-sm font-medium">Joined GitHub in {joinedYear}</span>
            </div>
          )}
        </motion.div>
      </div>
    </Slide>
  );
}
