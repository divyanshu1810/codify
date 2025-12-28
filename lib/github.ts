import { Octokit } from "@octokit/rest";

export interface GitHubStats {
  totalCommits: number;
  totalPRsMerged: number;
  totalIssuesResolved: number;
  linesOfCode: {
    added: number;
    deleted: number;
    net: number;
  };
  reviewedLinesOfCode: number;
  followersGained: number;
  favoriteRepo: {
    name: string;
    stars: number;
    commits: number;
  } | null;
  aiToolsUsed: {
    name: string;
    count: number;
  }[];
  topLanguages: {
    name: string;
    percentage: number;
  }[];
  streak: number;
  mostProductiveDay: string;
  mostProductiveHour: number;
}

export class GitHubService {
  private octokit: Octokit;
  private username: string;

  constructor(accessToken: string, username: string) {
    this.octokit = new Octokit({ auth: accessToken });
    this.username = username;
  }

  async getAccountCreationYear(): Promise<number> {
    try {
      const { data } = await this.octokit.users.getByUsername({ username: this.username });
      return new Date(data.created_at).getFullYear();
    } catch (error) {
      console.error("Error fetching account creation date:", error);
      return new Date().getFullYear() - 5;
    }
  }

  async getYearWrapped(year: number = new Date().getFullYear()): Promise<GitHubStats> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const [
      commits,
      prs,
      issues,
      repos,
      reviews,
      followersData,
    ] = await Promise.all([
      this.getCommits(startDate, endDate),
      this.getPullRequests(startDate, endDate),
      this.getIssues(startDate, endDate),
      this.getRepositories(),
      this.getReviews(startDate, endDate),
      this.getFollowersGained(startDate, endDate),
    ]);

    const linesOfCode = this.calculateLinesOfCode(commits.data);
    const aiToolsUsed = this.detectAITools(commits.data);
    const favoriteRepo = this.findFavoriteRepo(repos, commits.data);
    const topLanguages = await this.getTopLanguages(repos);
    const { streak, mostProductiveDay, mostProductiveHour } = this.analyzeCommitPatterns(commits.data);

    return {
      totalCommits: commits.count,
      totalPRsMerged: prs.merged,
      totalIssuesResolved: issues.closed,
      linesOfCode,
      reviewedLinesOfCode: reviews.linesReviewed,
      followersGained: followersData,
      favoriteRepo,
      aiToolsUsed,
      topLanguages,
      streak,
      mostProductiveDay,
      mostProductiveHour,
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private async getCommits(startDate: Date, endDate: Date) {
    let allCommits: any[] = [];
    let page = 1;
    const perPage = 100;

    try {
      while (true) {
        const { data } = await this.octokit.search.commits({
          q: `author:${this.username} committer-date:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
          sort: "committer-date",
          order: "desc",
          per_page: perPage,
          page,
        });

        if (data.items.length === 0) break;
        allCommits = allCommits.concat(data.items);
        if (data.items.length < perPage) break;
        page++;
      }

      return { count: allCommits.length, data: allCommits };
    } catch (error) {
      console.error("Error fetching commits:", error);
      return { count: 0, data: [] };
    }
  }

  private async getPullRequests(startDate: Date, endDate: Date) {
    try {
      const { data } = await this.octokit.search.issuesAndPullRequests({
        q: `author:${this.username} type:pr is:merged merged:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
        per_page: 100,
      });

      return { merged: data.total_count };
    } catch (error) {
      console.error("Error fetching PRs:", error);
      return { merged: 0 };
    }
  }

  private async getIssues(startDate: Date, endDate: Date) {
    try {
      const { data } = await this.octokit.search.issuesAndPullRequests({
        q: `author:${this.username} type:issue is:closed closed:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
        per_page: 100,
      });

      return { closed: data.total_count };
    } catch (error) {
      console.error("Error fetching issues:", error);
      return { closed: 0 };
    }
  }

  private async getRepositories() {
    try {
      const { data } = await this.octokit.repos.listForAuthenticatedUser({
        per_page: 100,
        sort: "updated",
        affiliation: "owner,collaborator,organization_member",
      });

      return data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return [];
    }
  }

  private async getReviews(startDate: Date, endDate: Date) {
    const ESTIMATED_LINES_PER_REVIEW = 200;

    try {
      const { data } = await this.octokit.search.issuesAndPullRequests({
        q: `reviewed-by:${this.username} type:pr reviewed:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
        per_page: 100,
      });

      return { linesReviewed: data.total_count * ESTIMATED_LINES_PER_REVIEW };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return { linesReviewed: 0 };
    }
  }

  private async getFollowersGained(startDate: Date, endDate: Date) {
    try {
      const { data: currentFollowers } = await this.octokit.users.listFollowersForUser({
        username: this.username,
        per_page: 100,
      });

      return currentFollowers.length;
    } catch (error) {
      console.error("Error fetching followers:", error);
      return 0;
    }
  }

  private calculateLinesOfCode(commits: any[]) {
    const ESTIMATED_LINES_ADDED_PER_COMMIT = 50;
    const ESTIMATED_LINES_DELETED_PER_COMMIT = 20;

    const added = commits.length * ESTIMATED_LINES_ADDED_PER_COMMIT;
    const deleted = commits.length * ESTIMATED_LINES_DELETED_PER_COMMIT;

    return { added, deleted, net: added - deleted };
  }

  private detectAITools(commits: any[]) {
    const aiTools = new Map<string, number>();
    const aiPatterns = [
      { name: "GitHub Copilot", patterns: ["copilot", "co-pilot"] },
      { name: "ChatGPT", patterns: ["chatgpt", "gpt", "openai"] },
      { name: "Claude", patterns: ["claude", "anthropic"] },
      { name: "Cursor", patterns: ["cursor"] },
      { name: "Tabnine", patterns: ["tabnine"] },
      { name: "Codeium", patterns: ["codeium"] },
    ];

    commits.forEach((commit) => {
      const message = commit.commit?.message?.toLowerCase() || "";

      aiPatterns.forEach(({ name, patterns }) => {
        if (patterns.some(pattern => message.includes(pattern))) {
          aiTools.set(name, (aiTools.get(name) || 0) + 1);
        }
      });
    });

    return Array.from(aiTools.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }

  private findFavoriteRepo(repos: any[], commits: any[]) {
    const repoCommits = new Map<string, number>();

    commits.forEach((commit) => {
      const repoUrl = commit.repository?.full_name;
      if (repoUrl) {
        repoCommits.set(repoUrl, (repoCommits.get(repoUrl) || 0) + 1);
      }
    });

    if (repoCommits.size === 0) return null;

    const [favoriteRepoName, commitCount] = Array.from(repoCommits.entries())
      .sort((a, b) => b[1] - a[1])[0];

    const repo = repos.find(r => r.full_name === favoriteRepoName);

    return {
      name: favoriteRepoName,
      stars: repo?.stargazers_count || 0,
      commits: commitCount,
    };
  }

  private async getTopLanguages(repos: any[]) {
    const languages = new Map<string, number>();

    repos.forEach((repo) => {
      if (repo.language) {
        languages.set(repo.language, (languages.get(repo.language) || 0) + 1);
      }
    });

    const total = Array.from(languages.values()).reduce((a, b) => a + b, 0);

    return Array.from(languages.entries())
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  }

  private analyzeCommitPatterns(commits: any[]) {
    const commitsByDay = new Map<string, number>();
    const commitsByHour = new Map<number, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit?.committer?.date || commit.commit?.author?.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const hour = date.getHours();

      commitsByDay.set(day, (commitsByDay.get(day) || 0) + 1);
      commitsByHour.set(hour, (commitsByHour.get(hour) || 0) + 1);
    });

    const getMostFrequent = <T>(map: Map<T, number>, defaultValue: T): T => {
      return Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || defaultValue;
    };

    const calculateStreak = (commits: any[]): number => {
      const commitDates = commits
        .map(c => new Date(c.commit?.committer?.date || c.commit?.author?.date).toDateString())
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();

      let maxStreak = 0;
      let currentStreak = 1;

      for (let i = 1; i < commitDates.length; i++) {
        const daysDiff = Math.ceil(
          (new Date(commitDates[i]).getTime() - new Date(commitDates[i - 1]).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff === 1) {
          currentStreak++;
        } else {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 1;
        }
      }

      return Math.max(maxStreak, currentStreak);
    };

    return {
      streak: calculateStreak(commits),
      mostProductiveDay: getMostFrequent(commitsByDay, "Monday"),
      mostProductiveHour: getMostFrequent(commitsByHour, 14),
    };
  }
}
