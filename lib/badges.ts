import { GitHubStats } from "./github";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (stats: GitHubStats) => boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const badges: Badge[] = [
  {
    id: "code-machine",
    name: "Code Machine",
    description: "Made 500+ commits in a year",
    icon: "FaCog",
    requirement: (stats) => stats.totalCommits >= 500,
    rarity: "epic",
  },
  {
    id: "commit-champion",
    name: "Commit Champion",
    description: "Made 1000+ commits in a year",
    icon: "FaTrophy",
    requirement: (stats) => stats.totalCommits >= 1000,
    rarity: "legendary",
  },
  {
    id: "pr-master",
    name: "PR Master",
    description: "Merged 50+ pull requests",
    icon: "FaCodeBranch",
    requirement: (stats) => stats.totalPRsMerged >= 50,
    rarity: "rare",
  },
  {
    id: "pr-legend",
    name: "PR Legend",
    description: "Merged 100+ pull requests",
    icon: "FaCrown",
    requirement: (stats) => stats.totalPRsMerged >= 100,
    rarity: "legendary",
  },
  {
    id: "bug-slayer",
    name: "Bug Slayer",
    description: "Resolved 30+ issues",
    icon: "FaBug",
    requirement: (stats) => stats.totalIssuesResolved >= 30,
    rarity: "rare",
  },
  {
    id: "bug-terminator",
    name: "Bug Terminator",
    description: "Resolved 100+ issues",
    icon: "FaFire",
    requirement: (stats) => stats.totalIssuesResolved >= 100,
    rarity: "epic",
  },
  {
    id: "line-warrior",
    name: "Line Warrior",
    description: "Wrote 10k+ lines of code",
    icon: "FaPencilAlt",
    requirement: (stats) => stats.linesOfCode.added >= 10000,
    rarity: "rare",
  },
  {
    id: "code-titan",
    name: "Code Titan",
    description: "Wrote 50k+ lines of code",
    icon: "FaRocket",
    requirement: (stats) => stats.linesOfCode.added >= 50000,
    rarity: "epic",
  },
  {
    id: "delete-master",
    name: "Delete Master",
    description: "Deleted more code than you wrote",
    icon: "FaTrash",
    requirement: (stats) => stats.linesOfCode.deleted > stats.linesOfCode.added,
    rarity: "rare",
  },
  {
    id: "review-king",
    name: "Review King",
    description: "Reviewed 5k+ lines of code",
    icon: "FaEye",
    requirement: (stats) => stats.reviewedLinesOfCode >= 5000,
    rarity: "rare",
  },
  {
    id: "review-legend",
    name: "Review Legend",
    description: "Reviewed 20k+ lines of code",
    icon: "FaSearchPlus",
    requirement: (stats) => stats.reviewedLinesOfCode >= 20000,
    rarity: "epic",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintained a 30+ day commit streak",
    icon: "FaFire",
    requirement: (stats) => stats.streak >= 30,
    rarity: "epic",
  },
  {
    id: "streak-legend",
    name: "Streak Legend",
    description: "Maintained a 100+ day commit streak",
    icon: "FaBolt",
    requirement: (stats) => stats.streak >= 100,
    rarity: "legendary",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Most productive between 10 PM and 4 AM",
    icon: "FaMoon",
    requirement: (stats) => stats.mostProductiveHour >= 22 || stats.mostProductiveHour <= 4,
    rarity: "common",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Most productive between 5 AM and 9 AM",
    icon: "FaSun",
    requirement: (stats) => stats.mostProductiveHour >= 5 && stats.mostProductiveHour <= 9,
    rarity: "common",
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    description: "Most productive on weekends",
    icon: "FaCalendarCheck",
    requirement: (stats) =>
      stats.mostProductiveDay === "Saturday" || stats.mostProductiveDay === "Sunday",
    rarity: "common",
  },
  {
    id: "ai-enthusiast",
    name: "AI Enthusiast",
    description: "Used AI tools in commits",
    icon: "FaRobot",
    requirement: (stats) => stats.aiToolsUsed.length > 0,
    rarity: "common",
  },
  {
    id: "ai-power-user",
    name: "AI Power User",
    description: "Used multiple AI tools extensively",
    icon: "FaRocket",
    requirement: (stats) =>
      stats.aiToolsUsed.length >= 2 &&
      stats.aiToolsUsed.reduce((sum, tool) => sum + tool.count, 0) >= 50,
    rarity: "rare",
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "Coded in 5+ programming languages",
    icon: "FaGlobe",
    requirement: (stats) => stats.topLanguages.length >= 5,
    rarity: "rare",
  },
  {
    id: "language-master",
    name: "Language Master",
    description: "Coded in 10+ programming languages",
    icon: "FaBook",
    requirement: (stats) => stats.topLanguages.length >= 10,
    rarity: "epic",
  },
  {
    id: "star-collector",
    name: "Star Collector",
    description: "Favorite repo has 10+ stars",
    icon: "FaStar",
    requirement: (stats) => stats.favoriteRepo !== null && stats.favoriteRepo.stars >= 10,
    rarity: "common",
  },
  {
    id: "popular-project",
    name: "Popular Project",
    description: "Favorite repo has 100+ stars",
    icon: "FaAward",
    requirement: (stats) => stats.favoriteRepo !== null && stats.favoriteRepo.stars >= 100,
    rarity: "epic",
  },
  {
    id: "consistent-contributor",
    name: "Consistent Contributor",
    description: "Made at least 1 commit",
    icon: "FaCheck",
    requirement: (stats) => stats.totalCommits >= 1,
    rarity: "common",
  },
];

export function getEarnedBadges(stats: GitHubStats): Badge[] {
  return badges.filter((badge) => badge.requirement(stats));
}

export function getBadgesByRarity(earnedBadges: Badge[]) {
  const byRarity: { [key: string]: Badge[] } = {
    legendary: [],
    epic: [],
    rare: [],
    common: [],
  };

  earnedBadges.forEach((badge) => {
    byRarity[badge.rarity].push(badge);
  });

  return byRarity;
}

export function getBadgeCount(stats: GitHubStats): {
  total: number;
  legendary: number;
  epic: number;
  rare: number;
  common: number;
} {
  const earnedBadges = getEarnedBadges(stats);
  const byRarity = getBadgesByRarity(earnedBadges);

  return {
    total: earnedBadges.length,
    legendary: byRarity.legendary.length,
    epic: byRarity.epic.length,
    rare: byRarity.rare.length,
    common: byRarity.common.length,
  };
}
