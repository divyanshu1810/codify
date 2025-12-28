import { GitHubStats } from "./github";

export interface Nickname {
  title: string;
  description: string;
  icon: string;
}

export function generateNickname(stats: GitHubStats): Nickname {
  const {
    totalCommits,
    totalPRsMerged,
    totalIssuesResolved,
    linesOfCode,
    reviewedLinesOfCode,
    streak,
    mostProductiveHour,
  } = stats;

  // Night Owl - commits mostly at night (10 PM - 4 AM)
  if (mostProductiveHour >= 22 || mostProductiveHour <= 4) {
    return {
      title: "Night Owl",
      description: "You code best when the world sleeps",
      icon: "FaMoon",
    };
  }

  // Early Bird - commits mostly in early morning (5 AM - 8 AM)
  if (mostProductiveHour >= 5 && mostProductiveHour <= 8) {
    return {
      title: "Early Bird",
      description: "First one to push, last one to sleep",
      icon: "FaSun",
    };
  }

  // Code Machine - tons of commits (500+)
  if (totalCommits >= 500) {
    return {
      title: "Code Machine",
      description: "Your keyboard must be on fire",
      icon: "FaRobot",
    };
  }

  // PR Champion - lots of PRs merged (50+)
  if (totalPRsMerged >= 50) {
    return {
      title: "PR Champion",
      description: "Merging PRs like a boss",
      icon: "FaTrophy",
    };
  }

  // Bug Slayer - lots of issues resolved (30+)
  if (totalIssuesResolved >= 30) {
    return {
      title: "Bug Slayer",
      description: "No bug stands a chance against you",
      icon: "FaBug",
    };
  }

  // Line Warrior - massive lines of code (10k+)
  if (linesOfCode.added >= 10000) {
    return {
      title: "Line Warrior",
      description: "You write code like you breathe air",
      icon: "FaCode",
    };
  }

  // Delete Master - deletes more than writes
  if (linesOfCode.deleted > linesOfCode.added) {
    return {
      title: "Delete Master",
      description: "Less is more, and you prove it",
      icon: "FaTrash",
    };
  }

  // Review King - lots of code reviewed (5k+ lines)
  if (reviewedLinesOfCode >= 5000) {
    return {
      title: "Review King",
      description: "The guardian of code quality",
      icon: "FaEye",
    };
  }

  // Streak Master - long commit streak (30+ days)
  if (streak >= 30) {
    return {
      title: "Streak Master",
      description: "Consistency is your superpower",
      icon: "FaFire",
    };
  }

  // Balanced Coder - good mix of everything
  if (totalCommits >= 100 && totalPRsMerged >= 10 && totalIssuesResolved >= 5) {
    return {
      title: "Balanced Coder",
      description: "Master of all trades",
      icon: "FaStar",
    };
  }

  // Weekend Warrior - most commits on weekends
  if (stats.mostProductiveDay === "Saturday" || stats.mostProductiveDay === "Sunday") {
    return {
      title: "Weekend Warrior",
      description: "Weekends are for coding",
      icon: "FaCalendarAlt",
    };
  }

  // Rising Star - good activity for a beginner
  if (totalCommits >= 50) {
    return {
      title: "Rising Star",
      description: "Your journey has just begun",
      icon: "FaRocket",
    };
  }

  // Code Explorer - just getting started
  return {
    title: "Code Explorer",
    description: "Every expert was once a beginner",
    icon: "FaCompass",
  };
}

export function generateFunFact(stats: GitHubStats): string {
  const facts = [];

  if (stats.totalCommits > 0) {
    const avgCommitsPerDay = Math.round(stats.totalCommits / 365);
    facts.push(`You averaged ${avgCommitsPerDay} commits per day`);
  }

  if (stats.linesOfCode.added > 0) {
    const avgLinesPerCommit = Math.round(stats.linesOfCode.added / stats.totalCommits);
    facts.push(`Each commit averaged ${avgLinesPerCommit} lines of code`);
  }

  if (stats.mostProductiveHour >= 0) {
    const hourStr = stats.mostProductiveHour > 12
      ? `${stats.mostProductiveHour - 12} PM`
      : stats.mostProductiveHour === 0
      ? "12 AM"
      : stats.mostProductiveHour === 12
      ? "12 PM"
      : `${stats.mostProductiveHour} AM`;
    facts.push(`Your most productive hour is ${hourStr}`);
  }

  if (stats.streak > 0) {
    facts.push(`Your longest streak was ${stats.streak} days`);
  }

  if (stats.favoriteRepo) {
    facts.push(`You committed to ${stats.favoriteRepo.name} ${stats.favoriteRepo.commits} times`);
  }

  return facts[Math.floor(Math.random() * facts.length)] || "You're awesome!";
}
