"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt, FaShare, FaSync, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { IntroSlide } from "@/components/slides/IntroSlide";
import { StatsSlide } from "@/components/slides/StatsSlide";
import { LinesOfCodeSlide } from "@/components/slides/LinesOfCodeSlide";
import { NicknameSlide } from "@/components/slides/NicknameSlide";
import { FavoriteRepoSlide } from "@/components/slides/FavoriteRepoSlide";
import { AIToolsSlide } from "@/components/slides/AIToolsSlide";
import { ProductivitySlide } from "@/components/slides/ProductivitySlide";
import { LanguagesSlide } from "@/components/slides/LanguagesSlide";
import { BadgesSlide } from "@/components/slides/BadgesSlide";
import { SummarySlide } from "@/components/slides/SummarySlide";
import { OutroSlide } from "@/components/slides/OutroSlide";
import { DownloadButton } from "@/components/DownloadButton";
import { ShareDialog } from "@/components/ShareDialog";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { RateLimitError } from "@/components/RateLimitError";
import { StoryProgressBar } from "@/components/StoryProgressBar";
import { GitHubStats } from "@/lib/github";
import { generateNickname, generateFunFact } from "@/lib/nicknames";
import { getEarnedBadges } from "@/lib/badges";
import { getCachedStats, setCachedStats, getCacheAge, formatCacheAge } from "@/lib/cache";
import {
  generateIntroSlideHTML,
  generateStatsSlideHTML,
  generateLinesOfCodeSlideHTML,
  generateNicknameSlideHTML,
  generateFavoriteRepoSlideHTML,
  generateAIToolsSlideHTML,
  generateProductivitySlideHTML,
  generateLanguagesSlideHTML,
  generateSummarySlideHTML,
} from "@/lib/slideGenerator";
import { convertHTMLToImage } from "@/lib/htmlToImage";

const SWIPE_THRESHOLD = 50;
const DOWNLOAD_DELAY = 300;
const DIMENSIONS = {
  phone: { width: 1170, height: 2532 },
  tab: { width: 1640, height: 2360 },
  desktop: { width: 1920, height: 1080 },
};

interface SlideConfig {
  component: ReactElement;
  name: string;
}

type DownloadFormat = "phone" | "tab" | "desktop";

export default function WrappedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const slideRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [cacheAge, setCacheAge] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [accountCreationYear, setAccountCreationYear] = useState<number | null>(null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [guestUsername, setGuestUsername] = useState<string | null>(null);
  const [guestUserImage, setGuestUserImage] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentYear = new Date().getFullYear();
  const yearOptions = accountCreationYear
    ? Array.from({ length: currentYear - accountCreationYear + 1 }, (_, i) => currentYear - i)
    : Array.from({ length: 6 }, (_, i) => currentYear - i);

  useEffect(() => {
    // Check if user is in guest mode
    if (typeof window !== "undefined") {
      const { isGuestMode, getGuestUsername, getGuestUserImage } = require("@/lib/guestMode");
      const guestMode = isGuestMode();
      const username = getGuestUsername();
      const userImage = getGuestUserImage();

      setIsGuestMode(guestMode);
      setGuestUsername(username);
      setGuestUserImage(userImage);

      // If not authenticated and not in guest mode, redirect to home
      if (status === "unauthenticated" && !guestMode) {
        router.push("/");
      }
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" || isGuestMode) {
      fetchWrappedData();
    }
  }, [status, selectedYear, isGuestMode]);

  useEffect(() => {
    if (status === "authenticated" && !accountCreationYear) {
      fetchAccountCreationYear();
    }
  }, [status]);

  const fetchAccountCreationYear = async () => {
    try {
      const response = await fetch("/api/account");
      if (response.ok) {
        const data = await response.json();
        setAccountCreationYear(data.creationYear);
      }
    } catch (error) {
      console.error("Error fetching account creation year:", error);
    }
  };

  const fetchWrappedData = async (forceRefresh = false) => {
    const username = isGuestMode ? guestUsername : session?.username;
    if (!username) return;

    try {
      setLoading(true);
      setError(null);

      if (!forceRefresh) {
        const cachedStats = getCachedStats(username, selectedYear);
        if (cachedStats) {
          setStats(cachedStats);
          setCacheAge(getCacheAge(username, selectedYear));
          setLoading(false);
          return;
        }
      }

      // Guest mode: fetch from public API
      if (isGuestMode) {
        const { PublicGitHubService } = await import("@/lib/publicGitHub");
        const service = new PublicGitHubService(username);
        const data = await service.getYearWrapped(selectedYear);

        // Check if we got valid data
        if (!data || (data.totalCommits === 0 && data.topLanguages.length === 0)) {
          throw new Error("Unable to fetch GitHub data. User may have no public activity or the API may be rate limited.");
        }

        setStats(data);
        setCachedStats(username, selectedYear, data);
        setCacheAge(0);
        setCurrentSlide(0);
      } else {
        // Authenticated mode: fetch from API
        const response = await fetch(`/api/wrapped?year=${selectedYear}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch wrapped data");
        }

        const data = await response.json();
        setStats(data);
        setCachedStats(username, selectedYear, data);
        setCacheAge(0);
        setCurrentSlide(0);
      }
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";

      // Check if it's a rate limit error
      if (errorMessage.includes("rate limit") || errorMessage.includes("429")) {
        setIsRateLimited(true);
        setError("GitHub API rate limit exceeded");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWrappedData(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, stats]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };

    if (showYearDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showYearDropdown]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe) nextSlide();
    else if (isRightSwipe) prevSlide();
  };

  const generateSlideHTML = (slideName: string, config: any, username: string, nickname: any, userImage?: string) => {
    if (!stats) return "";

    const generators: Record<string, () => string> = {
      intro: () => generateIntroSlideHTML(username, selectedYear, config, userImage),
      stats: () => generateStatsSlideHTML(stats.totalCommits, stats.totalPRsMerged, stats.totalIssuesResolved, config),
      "lines-of-code": () => generateLinesOfCodeSlideHTML(stats.linesOfCode.added, stats.linesOfCode.deleted, stats.linesOfCode.net, config),
      nickname: () => generateNicknameSlideHTML(nickname.title, nickname.description, config),
      "favorite-repo": () => stats.favoriteRepo ? generateFavoriteRepoSlideHTML(stats.favoriteRepo.name, stats.favoriteRepo.stars, stats.favoriteRepo.commits, config) : "",
      "ai-tools": () => generateAIToolsSlideHTML(stats.aiToolsUsed, config),
      productivity: () => generateProductivitySlideHTML(stats.streak, stats.mostProductiveDay, stats.mostProductiveHour, config),
      languages: () => generateLanguagesSlideHTML(stats.topLanguages, config),
      summary: () => generateSummarySlideHTML(stats, nickname, username, selectedYear, config, userImage),
    };

    return generators[slideName]?.() || "";
  };

  const downloadCurrentSlide = async (format: DownloadFormat) => {
    if (!stats) return;

    const config = { format, ...DIMENSIONS[format] };
    const username = isGuestMode ? guestUsername || "Developer" : session?.username || "Developer";
    const userImage = isGuestMode ? (guestUserImage || undefined) : session?.userImage;
    const nickname = generateNickname(stats);
    const slideName = slideConfigs[currentSlide].name;

    const html = generateSlideHTML(slideName, config, username, nickname, userImage);
    if (html) await convertHTMLToImage(html, `github-wrapped-${slideName}-${format}.png`);
  };

  const downloadAllSlides = async (format: DownloadFormat) => {
    if (!stats) return;

    setIsDownloadingAll(true);
    const config = { format, ...DIMENSIONS[format] };
    const username = isGuestMode ? guestUsername || "Developer" : session?.username || "Developer";
    const userImage = isGuestMode ? (guestUserImage || undefined) : session?.userImage;
    const nickname = generateNickname(stats);

    const slides = [
      { name: "intro", html: generateIntroSlideHTML(username, selectedYear, config, userImage) },
      { name: "stats", html: generateStatsSlideHTML(stats.totalCommits, stats.totalPRsMerged, stats.totalIssuesResolved, config) },
      { name: "lines-of-code", html: generateLinesOfCodeSlideHTML(stats.linesOfCode.added, stats.linesOfCode.deleted, stats.linesOfCode.net, config) },
      { name: "nickname", html: generateNicknameSlideHTML(nickname.title, nickname.description, config) },
      ...(stats.favoriteRepo ? [{ name: "favorite-repo", html: generateFavoriteRepoSlideHTML(stats.favoriteRepo.name, stats.favoriteRepo.stars, stats.favoriteRepo.commits, config) }] : []),
      { name: "ai-tools", html: generateAIToolsSlideHTML(stats.aiToolsUsed, config) },
      { name: "productivity", html: generateProductivitySlideHTML(stats.streak, stats.mostProductiveDay, stats.mostProductiveHour, config) },
      { name: "languages", html: generateLanguagesSlideHTML(stats.topLanguages, config) },
      { name: "summary", html: generateSummarySlideHTML(stats, nickname, username, selectedYear, config, userImage) },
    ];

    try {
      for (const slide of slides) {
        await convertHTMLToImage(slide.html, `github-wrapped-${slide.name}-${format}.png`);
        await new Promise(resolve => setTimeout(resolve, DOWNLOAD_DELAY));
      }
    } catch (error) {
      console.error("Error downloading slides:", error);
      alert("Failed to download some slides. Please try again.");
    } finally {
      setIsDownloadingAll(false);
    }
  };

  if (status === "loading" || loading) return <LoadingSkeleton />;

  // Show rate limit error UI
  if (isRateLimited) {
    return (
      <RateLimitError
        isGuestMode={isGuestMode}
        onRetry={() => {
          setIsRateLimited(false);
          setError(null);
          handleRefresh();
        }}
        onGoHome={() => {
          if (isGuestMode) {
            const { clearGuestMode } = require("@/lib/guestMode");
            clearGuestMode();
          }
          router.push("/");
        }}
      />
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-lg">
          <p className="text-red-500 text-xl font-mono">{error || "Failed to load wrapped data"}</p>
          <p className="text-[#B3B3B3] text-sm">
            {isGuestMode && "This might be due to rate limits or no public activity. Try signing in with GitHub for better access."}
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
  const earnedBadges = getEarnedBadges(stats);

  const displayUsername = isGuestMode ? guestUsername || "Developer" : session?.username || "Developer";
  const displayUserImage = isGuestMode ? (guestUserImage || undefined) : session?.userImage;

  const slideConfigs: SlideConfig[] = [
    { component: <IntroSlide key="intro" username={displayUsername} year={selectedYear} userImage={displayUserImage} />, name: "intro" },
    { component: <StatsSlide key="stats" commits={stats.totalCommits} prs={stats.totalPRsMerged} issues={stats.totalIssuesResolved} />, name: "stats" },
    { component: <LinesOfCodeSlide key="loc" added={stats.linesOfCode.added} deleted={stats.linesOfCode.deleted} net={stats.linesOfCode.net} />, name: "lines-of-code" },
    { component: <NicknameSlide key="nickname" title={nickname.title} description={nickname.description} icon={nickname.icon} />, name: "nickname" },
    ...(stats.favoriteRepo ? [{ component: <FavoriteRepoSlide key="favorite" name={stats.favoriteRepo.name} stars={stats.favoriteRepo.stars} commits={stats.favoriteRepo.commits} />, name: "favorite-repo" }] : []),
    { component: <AIToolsSlide key="ai" tools={stats.aiToolsUsed} />, name: "ai-tools" },
    { component: <ProductivitySlide key="productivity" streak={stats.streak} mostProductiveDay={stats.mostProductiveDay} mostProductiveHour={stats.mostProductiveHour} />, name: "productivity" },
    { component: <LanguagesSlide key="languages" languages={stats.topLanguages} />, name: "languages" },
    { component: <BadgesSlide key="badges" badges={earnedBadges} />, name: "badges" },
    { component: <SummarySlide key="summary" stats={stats} nickname={nickname} username={displayUsername} year={selectedYear} userImage={displayUserImage} />, name: "summary" },
    { component: <OutroSlide key="outro" username={displayUsername} year={selectedYear} funFact={funFact} onDownloadAll={downloadAllSlides} isDownloading={isDownloadingAll} />, name: "outro" },
  ];

  const nextSlide = () => {
    if (currentSlide < slideConfigs.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsAutoPlaying(false); // Stop auto-play at the end
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setIsAutoPlaying(true); // Resume auto-play when going back
    }
  };

  const handleProgressComplete = () => {
    if (isAutoPlaying && currentSlide < slideConfigs.length - 1) {
      nextSlide();
    }
  };

  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
    >
      <StoryProgressBar
        totalSlides={slideConfigs.length}
        currentSlide={currentSlide}
        duration={5000}
        onComplete={handleProgressComplete}
        isPaused={isPaused || !isAutoPlaying}
      />

      <motion.div
        ref={slideRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => {
          setIsPaused(true);
          setIsAutoPlaying(false);
        }}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = Math.abs(offset.x) * velocity.x;
          if (swipe > 10000) {
            offset.x < 0 ? nextSlide() : prevSlide();
          }
          setIsPaused(false);
        }}
        className="cursor-grab active:cursor-grabbing"
        onTouchStart={(e) => {
          setIsPaused(true);
          onTouchStart(e);
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={() => {
          onTouchEnd();
          setIsPaused(false);
        }}
      >
        <AnimatePresence mode="wait">
          {slideConfigs[currentSlide].component}
        </AnimatePresence>
      </motion.div>

      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3 md:gap-4 z-10 px-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
            setIsAutoPlaying(false);
          }}
          disabled={currentSlide === 0}
          className="bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 md:p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm shadow-lg"
        >
          <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
        </button>

        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[60vw] sm:max-w-none px-2">
          {slideConfigs.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all flex-shrink-0 ${
                index === currentSlide ? "bg-[#1DB954] w-6 sm:w-8" : "bg-white/30 w-1.5 sm:w-2 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
            setIsAutoPlaying(false);
          }}
          disabled={currentSlide === slideConfigs.length - 1}
          className="bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 md:p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm shadow-lg"
        >
          <FaChevronRight className="text-base sm:text-lg md:text-xl" />
        </button>
      </div>

      <div className="fixed top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-6 lg:right-8 z-30 flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowShareDialog(true);
          }}
          className="bg-[#1DB954]/20 hover:bg-[#1DB954]/30 text-[#1DB954] px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all backdrop-blur-sm shadow-lg border border-[#1DB954]/50"
          title="Share your wrapped"
          aria-label="Share your wrapped"
        >
          <FaShare className="text-xs sm:text-sm md:text-base" />
          <span className="font-semibold hidden md:inline text-sm">Share</span>
        </button>
        <DownloadButton slideRef={slideRef} slideName={slideConfigs[currentSlide].name} onDownload={downloadCurrentSlide} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isGuestMode) {
              const { clearGuestMode } = require("@/lib/guestMode");
              clearGuestMode();
              router.push("/");
            } else {
              signOut({ callbackUrl: "/" });
            }
          }}
          className="bg-white/10 hover:bg-white/20 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all backdrop-blur-sm shadow-lg"
          aria-label={isGuestMode ? "Exit guest mode" : "Sign out"}
        >
          <FaSignOutAlt className="text-xs sm:text-sm md:text-base" />
          <span className="font-semibold hidden md:inline text-sm">{isGuestMode ? "Exit" : "Sign Out"}</span>
        </button>
      </div>

      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        stats={{ commits: stats.totalCommits, prs: stats.totalPRsMerged, issues: stats.totalIssuesResolved }}
        year={selectedYear}
        username={displayUsername}
      />

      <div className="fixed top-16 sm:top-20 md:top-24 left-2 sm:left-4 md:left-6 lg:left-8 z-30 flex flex-col gap-2 max-w-[calc(100vw-16rem)] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
          <div className="bg-white/10 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm font-mono shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap">
            {currentSlide + 1} / {slideConfigs.length}
          </div>

          <div className="relative" ref={yearDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowYearDropdown(!showYearDropdown);
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm font-mono shadow-lg text-xs sm:text-sm md:text-base transition-all flex items-center gap-1.5 sm:gap-2"
              aria-label="Select year"
            >
              <FaCalendarAlt className="text-xs sm:text-sm" />
              <span>{selectedYear}</span>
              <FaChevronDown className={`text-xs transition-transform ${showYearDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showYearDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 bg-[#1a1a1a] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[120px]"
                >
                  <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedYear(year);
                          setShowYearDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${
                          year === selectedYear ? "bg-[#1DB954]/20 text-[#1DB954] font-semibold" : "text-white"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRefresh();
            }}
            disabled={isRefreshing}
            className="bg-white/10 hover:bg-white/20 text-white px-2 sm:px-2.5 md:px-3.5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
            title="Refresh data"
            aria-label="Refresh data"
          >
            <FaSync className={`text-xs sm:text-sm md:text-base ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        {cacheAge !== null && cacheAge > 0 && (
          <div className="bg-white/5 text-gray-400 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm text-xs whitespace-nowrap">
            Updated {formatCacheAge(cacheAge)}
          </div>
        )}
      </div>
    </div>
  );
}
