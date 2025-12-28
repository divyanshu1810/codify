"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaCode, FaChartLine, FaTrophy, FaFire, FaClock, FaRocket, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGradient } from "@/components/ui/text-gradient";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/wrapped");
    }
  }, [status, router]);

  const features = [
    {
      icon: <FaChartLine className="text-[#1DB954] text-4xl" />,
      title: "Comprehensive Analytics",
      description: "Deep dive into your commits, PRs, issues, and code contributions with beautiful visualizations.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#1DB954]/20 to-transparent border border-[#1DB954]/20" />
      ),
    },
    {
      icon: <FaTrophy className="text-[#1DB954] text-4xl" />,
      title: "Developer Achievements",
      description: "Earn unique nicknames and titles based on your coding patterns and contributions.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/20" />
      ),
    },
    {
      icon: <FaCode className="text-[#1DB954] text-4xl" />,
      title: "AI Tool Detection",
      description: "Discover which AI coding assistants you've been using throughout the year.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20" />
      ),
    },
    {
      icon: <FaFire className="text-[#1DB954] text-4xl" />,
      title: "Streak Tracking",
      description: "Monitor your longest coding streaks and consistency throughout the year.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20" />
      ),
      className: "md:col-span-2",
    },
    {
      icon: <FaClock className="text-[#1DB954] text-4xl" />,
      title: "Productivity Patterns",
      description: "Find out your most productive hours and days of the week.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20" />
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#1DB954" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 sm:space-y-8 max-w-5xl"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-block"
            >
              <div className="relative">
                <FaCode className="text-[#1DB954] text-6xl sm:text-7xl md:text-8xl drop-shadow-[0_0_30px_rgba(29,185,84,0.5)]" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 bg-[#1DB954] blur-3xl opacity-20 -z-10"
                />
              </div>
            </motion.div>

            {/* Title */}
            <TextGradient className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              Codify Wrapped
            </TextGradient>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-[#B3B3B3] font-medium max-w-2xl mx-auto"
            >
              Your GitHub Year in Review
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-[#B3B3B3]/80 max-w-xl mx-auto"
            >
              Discover your coding journey, achievements, and insights from {currentYear} with beautiful Spotify-style animations
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn("github", { callbackUrl: "/wrapped" })}
                disabled={status === "loading"}
                className="group relative bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(29,185,84,0.3)] hover:shadow-[0_0_60px_rgba(29,185,84,0.5)]"
              >
                <FaGithub className="text-2xl sm:text-3xl" />
                <span className="whitespace-nowrap">
                  {status === "loading" ? "Loading..." : "Sign in with GitHub"}
                </span>
                <FaRocket className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8"
            >
              <div className="flex items-center gap-2 text-[#B3B3B3]">
                <FaStar className="text-[#1DB954]" />
                <span className="text-sm sm:text-base">Personalized Insights</span>
              </div>
              <div className="flex items-center gap-2 text-[#B3B3B3]">
                <FaChartLine className="text-[#1DB954]" />
                <span className="text-sm sm:text-base">Beautiful Visuals</span>
              </div>
              <div className="flex items-center gap-2 text-[#B3B3B3]">
                <FaFire className="text-[#1DB954]" />
                <span className="text-sm sm:text-base">Shareable Results</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-2xl mx-auto">
              Get a comprehensive view of your GitHub activity with detailed analytics and insights
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-12 px-4 text-[#B3B3B3] text-sm"
        >
          <p>Made with 💚 using Next.js, TypeScript, and Framer Motion</p>
          <p className="mt-2">© {currentYear} Codify Wrapped. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
