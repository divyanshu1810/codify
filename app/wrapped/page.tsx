"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, type ReactElement } from "react";
import { AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { IntroSlide } from "@/components/slides/IntroSlide";
import { StatsSlide } from "@/components/slides/StatsSlide";
import { LinesOfCodeSlide } from "@/components/slides/LinesOfCodeSlide";
import { NicknameSlide } from "@/components/slides/NicknameSlide";
import { FavoriteRepoSlide } from "@/components/slides/FavoriteRepoSlide";
import { AIToolsSlide } from "@/components/slides/AIToolsSlide";
import { ProductivitySlide } from "@/components/slides/ProductivitySlide";
import { SummarySlide } from "@/components/slides/SummarySlide";
import { OutroSlide } from "@/components/slides/OutroSlide";
import { DownloadButton } from "@/components/DownloadButton";
import { GitHubStats } from "@/lib/github";
import { generateNickname, generateFunFact } from "@/lib/nicknames";
import {
  generateIntroSlideHTML,
  generateStatsSlideHTML,
  generateLinesOfCodeSlideHTML,
  generateNicknameSlideHTML,
  generateFavoriteRepoSlideHTML,
  generateAIToolsSlideHTML,
  generateProductivitySlideHTML,
  generateSummarySlideHTML,
} from "@/lib/slideGenerator";
import { convertHTMLToImage } from "@/lib/htmlToImage";

export default function WrappedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchWrappedData();
    }
  }, [status]);

  const fetchWrappedData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/wrapped?year=${year}`);

      if (!response.ok) {
        throw new Error("Failed to fetch wrapped data");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, stats]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1DB954] mx-auto"></div>
          <p className="text-white text-xl font-mono">Loading your wrapped...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-xl font-mono">
            {error || "Failed to load wrapped data"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#1DB954] text-black px-6 py-3 rounded-full font-bold hover:bg-[#1ed760] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const nickname = generateNickname(stats);
  const funFact = generateFunFact(stats);

  const downloadCurrentSlide = async (format: "phone" | "tab" | "desktop") => {
    if (!stats) return;

    const dimensions = {
      phone: { width: 1170, height: 2532 },
      tab: { width: 1640, height: 2360 },
      desktop: { width: 1920, height: 1080 },
    };

    const config = { format, ...dimensions[format] };
    const username = session?.username || "Developer";
    const slideName = slideConfigs[currentSlide].name;

    let html = "";

    // Generate HTML based on current slide
    switch (slideName) {
      case "intro":
        html = generateIntroSlideHTML(username, year, config);
        break;
      case "stats":
        html = generateStatsSlideHTML(
          stats.totalCommits,
          stats.totalPRsMerged,
          stats.totalIssuesResolved,
          config
        );
        break;
      case "lines-of-code":
        html = generateLinesOfCodeSlideHTML(
          stats.linesOfCode.added,
          stats.linesOfCode.deleted,
          stats.linesOfCode.net,
          config
        );
        break;
      case "nickname":
        html = generateNicknameSlideHTML(nickname.title, nickname.description, config);
        break;
      case "favorite-repo":
        if (stats.favoriteRepo) {
          html = generateFavoriteRepoSlideHTML(
            stats.favoriteRepo.name,
            stats.favoriteRepo.stars,
            stats.favoriteRepo.commits,
            config
          );
        }
        break;
      case "ai-tools":
        html = generateAIToolsSlideHTML(stats.aiToolsUsed, config);
        break;
      case "productivity":
        html = generateProductivitySlideHTML(
          stats.streak,
          stats.mostProductiveDay,
          stats.mostProductiveHour,
          config
        );
        break;
      case "summary":
        html = generateSummarySlideHTML(stats, nickname, username, year, config);
        break;
      default:
        return;
    }

    if (html) {
      await convertHTMLToImage(html, `codify-wrapped-${slideName}-${format}.png`);
    }
  };

  const downloadAllSlides = async (format: "phone" | "tab" | "desktop") => {
    if (!stats) return;

    setIsDownloadingAll(true);

    // Map format to dimensions
    const dimensions = {
      phone: { width: 1170, height: 2532 },
      tab: { width: 1640, height: 2360 },
      desktop: { width: 1920, height: 1080 },
    };

    const config = { format, ...dimensions[format] };
    const username = session?.username || "Developer";
    const nickname = generateNickname(stats);

    try {
      // Generate and download intro slide
      const introHTML = generateIntroSlideHTML(username, year, config);
      await convertHTMLToImage(introHTML, `codify-wrapped-intro-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download stats slide
      const statsHTML = generateStatsSlideHTML(
        stats.totalCommits,
        stats.totalPRsMerged,
        stats.totalIssuesResolved,
        config
      );
      await convertHTMLToImage(statsHTML, `codify-wrapped-stats-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download lines of code slide
      const locHTML = generateLinesOfCodeSlideHTML(
        stats.linesOfCode.added,
        stats.linesOfCode.deleted,
        stats.linesOfCode.net,
        config
      );
      await convertHTMLToImage(locHTML, `codify-wrapped-lines-of-code-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download nickname slide
      const nicknameHTML = generateNicknameSlideHTML(
        nickname.title,
        nickname.description,
        config
      );
      await convertHTMLToImage(nicknameHTML, `codify-wrapped-nickname-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download favorite repo slide (if exists)
      if (stats.favoriteRepo) {
        const repoHTML = generateFavoriteRepoSlideHTML(
          stats.favoriteRepo.name,
          stats.favoriteRepo.stars,
          stats.favoriteRepo.commits,
          config
        );
        await convertHTMLToImage(repoHTML, `codify-wrapped-favorite-repo-${format}.png`);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Generate and download AI tools slide
      const aiHTML = generateAIToolsSlideHTML(stats.aiToolsUsed, config);
      await convertHTMLToImage(aiHTML, `codify-wrapped-ai-tools-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download productivity slide
      const productivityHTML = generateProductivitySlideHTML(
        stats.streak,
        stats.mostProductiveDay,
        stats.mostProductiveHour,
        config
      );
      await convertHTMLToImage(productivityHTML, `codify-wrapped-productivity-${format}.png`);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate and download summary slide
      const summaryHTML = generateSummarySlideHTML(
        stats,
        nickname,
        username,
        year,
        config
      );
      await convertHTMLToImage(summaryHTML, `codify-wrapped-summary-${format}.png`);
    } catch (error) {
      console.error("Error downloading slides:", error);
      alert("Failed to download some slides. Please try again.");
    } finally {
      setIsDownloadingAll(false);
    }
  };

  interface SlideConfig {
    component: ReactElement;
    name: string;
  }

  const slideConfigs: SlideConfig[] = [
    {
      component: (
        <IntroSlide
          key="intro"
          username={session?.username || "Developer"}
          year={year}
        />
      ),
      name: "intro",
    },
    {
      component: (
        <StatsSlide
          key="stats"
          commits={stats.totalCommits}
          prs={stats.totalPRsMerged}
          issues={stats.totalIssuesResolved}
        />
      ),
      name: "stats",
    },
    {
      component: (
        <LinesOfCodeSlide
          key="loc"
          added={stats.linesOfCode.added}
          deleted={stats.linesOfCode.deleted}
          net={stats.linesOfCode.net}
        />
      ),
      name: "lines-of-code",
    },
    {
      component: (
        <NicknameSlide
          key="nickname"
          title={nickname.title}
          description={nickname.description}
          icon={nickname.icon}
        />
      ),
      name: "nickname",
    },
  ];

  if (stats.favoriteRepo) {
    slideConfigs.push({
      component: (
        <FavoriteRepoSlide
          key="favorite"
          name={stats.favoriteRepo.name}
          stars={stats.favoriteRepo.stars}
          commits={stats.favoriteRepo.commits}
        />
      ),
      name: "favorite-repo",
    });
  }

  slideConfigs.push(
    {
      component: <AIToolsSlide key="ai" tools={stats.aiToolsUsed} />,
      name: "ai-tools",
    },
    {
      component: (
        <ProductivitySlide
          key="productivity"
          streak={stats.streak}
          mostProductiveDay={stats.mostProductiveDay}
          mostProductiveHour={stats.mostProductiveHour}
        />
      ),
      name: "productivity",
    },
    {
      component: (
        <SummarySlide
          key="summary"
          stats={stats}
          nickname={nickname}
          username={session?.username || "Developer"}
          year={year}
        />
      ),
      name: "summary",
    },
    {
      component: (
        <OutroSlide
          key="outro"
          username={session?.username || "Developer"}
          year={year}
          funFact={funFact}
          onDownloadAll={downloadAllSlides}
          isDownloading={isDownloadingAll}
        />
      ),
      name: "outro",
    }
  );

  const nextSlide = () => {
    if (currentSlide < slideConfigs.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div ref={slideRef}>
        <AnimatePresence mode="wait">
          {slideConfigs[currentSlide].component}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3 md:gap-4 z-10 px-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 md:p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm shadow-lg"
        >
          <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
        </button>

        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[60vw] sm:max-w-none px-2">
          {slideConfigs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all flex-shrink-0 ${
                index === currentSlide
                  ? "bg-[#1DB954] w-6 sm:w-8"
                  : "bg-white/30 w-1.5 sm:w-2 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slideConfigs.length - 1}
          className="bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 md:p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm shadow-lg"
        >
          <FaChevronRight className="text-base sm:text-lg md:text-xl" />
        </button>
      </div>

      {/* Top Right Controls */}
      <div className="fixed top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-10 flex items-center gap-2 sm:gap-3">
        <DownloadButton
          slideRef={slideRef}
          slideName={slideConfigs[currentSlide].name}
          onDownload={downloadCurrentSlide}
        />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all backdrop-blur-sm shadow-lg text-sm sm:text-base"
        >
          <FaSignOutAlt className="text-sm sm:text-base" />
          <span className="font-semibold hidden sm:inline">Sign Out</span>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 bg-white/10 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm z-10 font-mono shadow-lg text-xs sm:text-sm md:text-base">
        {currentSlide + 1} / {slideConfigs.length}
      </div>
    </div>
  );
}
