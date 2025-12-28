"use client";

import { motion } from "framer-motion";
import { Slide } from "../Slide";
import * as Icons from "react-icons/fa";
import { IconType } from "react-icons";

interface NicknameSlideProps {
  title: string;
  description: string;
  icon: string;
}

export function NicknameSlide({ title, description, icon }: NicknameSlideProps) {
  const IconComponent = (Icons as any)[icon] as IconType || Icons.FaStar;

  return (
    <Slide className="bg-gradient-to-br from-purple-900 via-[#1DB954] to-[#1ed760]">
      <div className="text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-black/80 font-semibold"
        >
          You earned a title
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="bg-black/20 backdrop-blur-sm rounded-full w-48 h-48 mx-auto flex items-center justify-center"
        >
          <IconComponent className="text-black text-8xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-7xl font-extrabold text-black tracking-tight">
            {title}
          </h2>
          <p className="text-2xl text-black/90 font-medium">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.8 + i * 0.1,
                type: "spring",
              }}
              className="w-3 h-3 bg-black rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}
