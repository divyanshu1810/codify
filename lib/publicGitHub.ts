// Public GitHub API service for unauthenticated access
import { Octokit } from "@octokit/rest";
import { GitHubStats, GitHubUserProfile } from "./github";

export class PublicGitHubService {
  private octokit: Octokit;
  private username: string;

  constructor(username: string) {
    this.username = username;
    this.octokit = new Octokit(); // No auth token - uses public API
  }

  async getUserProfile(): Promise<GitHubUserProfile> {
    try {
      const { data } = await this.octokit.users.getByUsername({
        username: this.username,
      });
      return {
        login: data.login,
        id: data.id,
        node_id: data.node_id,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        name: data.name,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        bio: data.bio,
        twitter_username: data.twitter_username ?? null,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return {
        login: this.username,
        id: 0,
        node_id: "",
        avatar_url: "",
        html_url: `https://github.com/${this.username}`,
        name: this.username,
        company: null,
        blog: null,
        location: null,
        email: null,
        bio: null,
        twitter_username: null,
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: new Date().toISOString(),
      };
    }
  }

  async getYearWrapped(year: number = new Date().getFullYear()): Promise<GitHubStats> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    try {
      // Fetch user profile
      const profile = await this.getUserProfile();

      // Fetch public events (limited to last 300 by GitHub)
      console.log(`Fetching public events for ${this.username}...`);
      const events = await this.fetchPublicEvents();
      console.log(`Fetched ${events.length} events`);

      // If no events found, return minimal stats
      if (events.length === 0) {
        const repos = await this.getPublicRepos();
        const topLanguages = this.calculateTopLanguages(repos);

        const userProfile = await this.getUserProfile();
        return {
          totalCommits: 0,
          totalPRsMerged: 0,
          totalIssuesResolved: 0,
          linesOfCode: { added: 0, deleted: 0, net: 0 },
          reviewedLinesOfCode: 0,
          followersGained: profile.followers || 0,
          favoriteRepo: null,
          topLanguages,
          aiToolsUsed: [],
          streak: 0,
          mostProductiveDay: "Monday",
          mostProductiveHour: 9,
          mostProductiveMonth: "January",
          topCollaborators: [],
          userProfile,
        };
      }

      // Filter events for the year
      const yearEvents = events.filter((event: any) => {
        const eventDate = new Date(event.created_at);
        return eventDate >= startDate && eventDate <= endDate;
      });

      // Calculate stats from events
      const commits = this.countCommits(yearEvents);
      const prs = this.countPullRequests(yearEvents);
      const issues = this.countIssues(yearEvents);
      const repos = await this.getPublicRepos();
      const yearRepos = repos.filter((repo: any) => {
        const created = new Date(repo.created_at);
        const updated = new Date(repo.updated_at);
        return (created >= startDate && created <= endDate) || (updated >= startDate && updated <= endDate);
      });

      const favoriteRepo = this.findFavoriteRepo(yearEvents, yearRepos);
      const topLanguages = this.calculateTopLanguages(yearRepos.length > 0 ? yearRepos : repos);
      const linesOfCode = this.estimateLinesOfCode(commits);
      const productivity = this.analyzeProductivity(yearEvents.length > 0 ? yearEvents : events);
      const aiTools = this.detectAITools(yearEvents.length > 0 ? yearEvents : events);
      const topCollaborators = this.getTopCollaborators(yearEvents.length > 0 ? yearEvents : events);

      const userProfile = await this.getUserProfile();
      return {
        totalCommits: commits,
        totalPRsMerged: prs,
        totalIssuesResolved: issues,
        linesOfCode,
        reviewedLinesOfCode: Math.floor(commits * 150), // Estimate
        followersGained: profile.followers || 0, // Total followers (historical data not available via public API)
        favoriteRepo,
        topLanguages,
        aiToolsUsed: aiTools,
        streak: productivity.streak,
        mostProductiveDay: productivity.mostProductiveDay,
        mostProductiveHour: productivity.mostProductiveHour,
        mostProductiveMonth: productivity.mostProductiveMonth,
        topCollaborators,
        userProfile,
      };
    } catch (error) {
      console.error("Error in getYearWrapped:", error);

      // Return minimal stats on error
      const userProfile = await this.getUserProfile();
      return {
        totalCommits: 0,
        totalPRsMerged: 0,
        totalIssuesResolved: 0,
        linesOfCode: { added: 0, deleted: 0, net: 0 },
        reviewedLinesOfCode: 0,
        followersGained: 0,
        favoriteRepo: null,
        topLanguages: [],
        aiToolsUsed: [],
        streak: 0,
        mostProductiveDay: "Monday",
        mostProductiveHour: 9,
        mostProductiveMonth: "January",
        topCollaborators: [],
        userProfile,
      };
    }
  }

  private async fetchPublicEvents(): Promise<any[]> {
    try {
      const allEvents: any[] = [];
      let page = 1;
      const perPage = 100;
      const maxRetries = 2;

      // Fetch up to 300 events (GitHub limits to last 300 public events)
      while (page <= 3) {
        let retries = 0;
        let success = false;

        while (retries < maxRetries && !success) {
          try {
            // Add timeout wrapper
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const { data } = await this.octokit.activity.listPublicEventsForUser({
              username: this.username,
              per_page: perPage,
              page,
              request: {
                signal: controller.signal,
              },
            });

            clearTimeout(timeoutId);

            if (data.length === 0) return allEvents;
            allEvents.push(...data);
            if (data.length < perPage) return allEvents;

            success = true;
            page++;
          } catch (err: any) {
            retries++;
            console.warn(`Retry ${retries}/${maxRetries} for page ${page}:`, err.message);

            if (retries >= maxRetries) {
              console.error(`Failed to fetch page ${page} after ${maxRetries} retries`);
              return allEvents; // Return what we have so far
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      return allEvents;
    } catch (error) {
      console.error("Error fetching public events:", error);
      return [];
    }
  }

  private async getPublicRepos(): Promise<any[]> {
    try {
      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const { data } = await this.octokit.repos.listForUser({
        username: this.username,
        per_page: 100,
        sort: "updated",
        request: {
          signal: controller.signal,
        },
      });

      clearTimeout(timeoutId);
      return data;
    } catch (error) {
      console.error("Error fetching public repos:", error);
      return [];
    }
  }

  private countCommits(events: any[]): number {
    let count = 0;
    events.forEach((event) => {
      if (event.type === "PushEvent") {
        count += event.payload?.commits?.length || 1;
      }
    });
    return count;
  }

  private countPullRequests(events: any[]): number {
    return events.filter(
      (event) =>
        event.type === "PullRequestEvent" &&
        (event.payload?.action === "opened" || event.payload?.action === "closed")
    ).length;
  }

  private countIssues(events: any[]): number {
    return events.filter(
      (event) =>
        event.type === "IssuesEvent" &&
        (event.payload?.action === "closed" || event.payload?.action === "opened")
    ).length;
  }

  private findFavoriteRepo(events: any[], repos: any[]): { name: string; stars: number; commits: number } | null {
    const repoCommitCount: Record<string, number> = {};

    events.forEach((event) => {
      if (event.type === "PushEvent" && event.repo?.name) {
        repoCommitCount[event.repo.name] = (repoCommitCount[event.repo.name] || 0) + (event.payload?.commits?.length || 1);
      }
    });

    const sortedRepos = Object.entries(repoCommitCount).sort((a, b) => b[1] - a[1]);
    if (sortedRepos.length === 0) return null;

    const [repoName, commitCount] = sortedRepos[0];
    const repoData = repos.find((r) => r.full_name === repoName);

    return {
      name: repoName.split("/").pop() || repoName,
      stars: repoData?.stargazers_count || 0,
      commits: commitCount,
    };
  }

  private calculateTopLanguages(repos: any[]): Array<{ name: string; percentage: number }> {
    const languageCounts: Record<string, number> = {};
    let total = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        total++;
      }
    });

    const languages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    return languages;
  }

  private estimateLinesOfCode(commits: number): { added: number; deleted: number; net: number } {
    // Rough estimate: average 30 lines per commit
    const added = Math.floor(commits * 30);
    const deleted = Math.floor(commits * 15);
    return {
      added,
      deleted,
      net: added - deleted,
    };
  }

  private analyzeProductivity(events: any[]): {
    streak: number;
    mostProductiveDay: string;
    mostProductiveHour: number;
    mostProductiveMonth: string;
  } {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayCounts: Record<string, number> = {};
    const hourCounts: Record<number, number> = {};
    const dateCounts: Record<string, number> = {};
    const monthCounts: Record<string, number> = {};

    events.forEach((event) => {
      const date = new Date(event.created_at);
      const dayName = days[date.getDay()];
      const hour = date.getHours();
      const dateStr = date.toDateString();
      const monthName = months[date.getMonth()];

      dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
      monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });

    // Find most productive day
    const mostProductiveDay =
      Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Monday";

    // Find most productive hour
    const mostProductiveHour =
      parseInt(Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "9");

    // Find most productive month
    const mostProductiveMonth =
      Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "January";

    // Calculate streak (simplified - based on available events)
    const dates = Object.keys(dateCounts).map((d) => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
    let streak = 0;
    for (let i = 0; i < dates.length - 1; i++) {
      const diff = Math.abs(dates[i].getTime() - dates[i + 1].getTime());
      const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (daysDiff <= 1) {
        streak++;
      } else {
        break;
      }
    }

    return {
      streak: Math.max(streak, 1),
      mostProductiveDay,
      mostProductiveHour,
      mostProductiveMonth,
    };
  }

  private getTopCollaborators(events: any[]): Array<{ username: string; avatar: string; interactions: number }> {
    const collaborators = new Map<string, { avatar: string; count: number }>();

    events.forEach((event) => {
      // Track PR review events
      if (event.type === "PullRequestReviewEvent" || event.type === "PullRequestReviewCommentEvent") {
        const actor = event.actor?.login;
        const avatar = event.actor?.avatar_url;
        if (actor && actor !== this.username) {
          const existing = collaborators.get(actor);
          collaborators.set(actor, {
            avatar: avatar || `https://github.com/${actor}.png`,
            count: (existing?.count || 0) + 1,
          });
        }
      }

      // Track issue interactions
      if (event.type === "IssuesEvent" || event.type === "IssueCommentEvent") {
        const actor = event.actor?.login;
        const avatar = event.actor?.avatar_url;
        if (actor && actor !== this.username) {
          const existing = collaborators.get(actor);
          collaborators.set(actor, {
            avatar: avatar || `https://github.com/${actor}.png`,
            count: (existing?.count || 0) + 1,
          });
        }
      }

      // Track PR interactions
      if (event.type === "PullRequestEvent") {
        // Check PR author
        const prAuthor = event.payload?.pull_request?.user?.login;
        const prAuthorAvatar = event.payload?.pull_request?.user?.avatar_url;
        if (prAuthor && prAuthor !== this.username) {
          const existing = collaborators.get(prAuthor);
          collaborators.set(prAuthor, {
            avatar: prAuthorAvatar || `https://github.com/${prAuthor}.png`,
            count: (existing?.count || 0) + 1,
          });
        }
      }
    });

    return Array.from(collaborators.entries())
      .map(([username, data]) => ({
        username,
        avatar: data.avatar,
        interactions: data.count,
      }))
      .sort((a, b) => b.interactions - a.interactions)
      .slice(0, 5);
  }

  private detectAITools(events: any[]): Array<{ name: string; count: number }> {
    const aiToolPatterns: Record<string, RegExp> = {
      "GitHub Copilot": /copilot|co-pilot/i,
      "ChatGPT": /chatgpt|gpt-4|gpt-3/i,
      "Claude": /claude|anthropic/i,
      "Cursor": /cursor|cursor\.ai/i,
      "Tabnine": /tabnine/i,
      "Codeium": /codeium/i,
    };

    const toolCounts: Record<string, number> = {};

    events.forEach((event) => {
      if (event.type === "PushEvent" && event.payload?.commits) {
        event.payload.commits.forEach((commit: any) => {
          const message = commit.message?.toLowerCase() || "";
          Object.entries(aiToolPatterns).forEach(([tool, pattern]) => {
            if (pattern.test(message)) {
              toolCounts[tool] = (toolCounts[tool] || 0) + 1;
            }
          });
        });
      }
    });

    return Object.entries(toolCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
}
