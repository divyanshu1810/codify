"use client";

import { motion } from "framer-motion";
import { Slide } from "../Slide";
import { FaCode } from "react-icons/fa";

interface Language {
  name: string;
  percentage: number;
}

interface LanguagesSlideProps {
  languages: Language[];
}

export function LanguagesSlide({ languages }: LanguagesSlideProps) {
  const languageColors: { [key: string]: string } = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#007396",
    Go: "#00add8",
    Rust: "#ce422b",
    Ruby: "#cc342d",
    PHP: "#777bb4",
    "C++": "#00599c",
    C: "#a8b9cc",
    Swift: "#fa7343",
    Kotlin: "#7f52ff",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dart: "#0175c2",
  };

  const getLanguageColor = (name: string) => {
    return languageColors[name] || "#1DB954";
  };

  return (
    <Slide className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-white tracking-tight"
        >
          Your Languages
        </motion.h2>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] p-6 rounded-full">
            <FaCode className="text-5xl text-black" />
          </div>
        </motion.div>

        <div className="w-full max-w-2xl mx-auto space-y-6">
          {languages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-4"
            >
              <p className="text-white/70 text-xl">No language data available</p>
            </motion.div>
          ) : (
            languages.slice(0, 5).map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold text-xl">
                    {language.name}
                  </span>
                  <span className="text-[#1DB954] font-bold text-2xl font-mono">
                    {language.percentage}%
                  </span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${language.percentage}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: getLanguageColor(language.name),
                    }}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Slide>
  );
}
