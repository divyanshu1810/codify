import { GitHubStats } from "./github";

const CACHE_PREFIX = "codify_stats_";
const CACHE_DURATION = 1000 * 60 * 60;

interface CachedData {
  stats: GitHubStats;
  timestamp: number;
  username: string;
  year: number;
}

const getCacheKey = (username: string, year: number) => `${CACHE_PREFIX}${username}_${year}`;

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp <= CACHE_DURATION;
};

export function getCachedStats(username: string, year: number): GitHubStats | null {
  try {
    const cached = localStorage.getItem(getCacheKey(username, year));
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);

    if (!isCacheValid(data.timestamp)) {
      localStorage.removeItem(getCacheKey(username, year));
      return null;
    }

    return data.stats;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

export function setCachedStats(username: string, year: number, stats: GitHubStats): void {
  try {
    const data: CachedData = {
      stats,
      timestamp: Date.now(),
      username,
      year,
    };

    localStorage.setItem(getCacheKey(username, year), JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}

export function clearCache(username?: string, year?: number): void {
  try {
    if (username && year) {
      localStorage.removeItem(getCacheKey(username, year));
    } else {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    }
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}

export function getCacheAge(username: string, year: number): number | null {
  try {
    const cached = localStorage.getItem(getCacheKey(username, year));
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    return Date.now() - data.timestamp;
  } catch (error) {
    console.error("Error getting cache age:", error);
    return null;
  }
}

export function formatCacheAge(ageInMs: number): string {
  const minutes = Math.floor(ageInMs / 1000 / 60);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
}
