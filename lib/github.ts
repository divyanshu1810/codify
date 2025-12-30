import { Octokit } from "@octokit/rest";

export interface GitHubUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

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
  totalFollowers: number;
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
  mostProductiveMonth: string;
  topCollaborators: {
    username: string;
    avatar: string;
    interactions: number;
  }[];
  userProfile: GitHubUserProfile;
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

  async getUserProfile(): Promise<GitHubUserProfile> {
    try {
      const { data } = await this.octokit.users.getByUsername({ username: this.username });
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

    const [
      commits,
      prs,
      issues,
      repos,
      reviews,
      followersData,
      userProfile,
    ] = await Promise.all([
      this.getCommits(startDate, endDate),
      this.getPullRequests(startDate, endDate),
      this.getIssues(startDate, endDate),
      this.getRepositories(),
      this.getReviews(startDate, endDate),
      this.getTotalFollowers(),
      this.getUserProfile(),
    ]);

    const linesOfCode = await this.calculateLinesOfCode(commits.data);
    const aiToolsUsed = this.detectAITools(commits.data);
    const favoriteRepo = this.findFavoriteRepo(repos, commits.data);
    const topLanguages = await this.getTopLanguages(repos);
    const { streak, mostProductiveDay, mostProductiveHour, mostProductiveMonth } = this.analyzeCommitPatterns(commits.data);
    const topCollaborators = await this.getTopCollaborators();

    return {
      totalCommits: commits.count,
      totalPRsMerged: prs.merged,
      totalIssuesResolved: issues.closed,
      linesOfCode,
      reviewedLinesOfCode: reviews.linesReviewed,
      totalFollowers: followersData,
      favoriteRepo,
      aiToolsUsed,
      topLanguages,
      streak,
      mostProductiveDay,
      mostProductiveHour,
      mostProductiveMonth,
      topCollaborators,
      userProfile,
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private async getCommits(startDate: Date, endDate: Date) {
    let allCommits: any[] = [];
    let page = 1;
    const perPage = 100;
    const MAX_SEARCH_RESULTS = 1000;

    try {
      console.log(`Fetching commits for ${this.username} from ${this.formatDate(startDate)} to ${this.formatDate(endDate)}`);

      while (allCommits.length < MAX_SEARCH_RESULTS) {
        const { data } = await this.octokit.search.commits({
          q: `author:${this.username} committer-date:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
          sort: "committer-date",
          order: "desc",
          per_page: perPage,
          page,
          mediaType: {
            previews: ['cloak'],
          },
        });

        console.log(`Page ${page}: Found ${data.items.length} commits`);

        if (data.items.length === 0) break;
        allCommits = allCommits.concat(data.items);

        if (data.items.length < perPage) break;

        if (allCommits.length >= MAX_SEARCH_RESULTS) {
          allCommits = allCommits.slice(0, MAX_SEARCH_RESULTS);
          break;
        }

        page++;
      }

      console.log(`Total commits found: ${allCommits.length}`);
      return { count: allCommits.length, data: allCommits };
    } catch (error: any) {
      if (error?.status === 422 && error?.message?.includes("1000 search results")) {
        console.warn(`Commit search limited to ${allCommits.length} results due to GitHub API constraints`);
        return { count: allCommits.length, data: allCommits };
      }

      console.error("Error fetching commits:", error?.message || error);
      if (allCommits.length > 0) {
        return { count: allCommits.length, data: allCommits };
      }
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
    try {
      const { data } = await this.octokit.search.issuesAndPullRequests({
        q: `reviewed-by:${this.username} type:pr reviewed:${this.formatDate(startDate)}..${this.formatDate(endDate)}`,
        per_page: 100,
      });

      let totalLinesReviewed = 0;

      for (const pr of data.items.slice(0, 50)) {
        try {
          const [owner, repo] = pr.repository_url.split("/").slice(-2);
          const { data: prData } = await this.octokit.pulls.get({
            owner,
            repo,
            pull_number: pr.number,
          });

          totalLinesReviewed += (prData.additions || 0) + (prData.deletions || 0);
        } catch (error) {
          continue;
        }
      }

      return { linesReviewed: totalLinesReviewed };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return { linesReviewed: 0 };
    }
  }

  private async getTotalFollowers() {
    try {
      const { data: user } = await this.octokit.users.getByUsername({
        username: this.username,
      });

      return user.followers;
    } catch (error) {
      console.error("Error fetching followers:", error);
      return 0;
    }
  }

  private async calculateLinesOfCode(commits: any[]) {
    let totalAdded = 0;
    let totalDeleted = 0;
    let processedCount = 0;
    let failedCount = 0;

    if (commits.length === 0) {
      console.log("No commits to process for lines of code calculation");
      return { added: 0, deleted: 0, net: 0 };
    }

    const commitShas = commits.map((c) => ({
      sha: c.sha,
      repo: c.repository?.full_name,
    }));

    console.log(`Processing ${Math.min(commitShas.length, 200)} commits for line count...`);

    const batchSize = 10;
    const maxCommits = Math.min(commitShas.length, 200);

    for (let i = 0; i < maxCommits; i += batchSize) {
      const batch = commitShas.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async ({ sha, repo }) => {
          if (!repo) return;

          try {
            const [owner, repoName] = repo.split("/");
            const { data } = await this.octokit.repos.getCommit({
              owner,
              repo: repoName,
              ref: sha,
            });

            if (data.stats) {
              totalAdded += data.stats.additions || 0;
              totalDeleted += data.stats.deletions || 0;
              processedCount++;
            }
          } catch (error: any) {
            failedCount++;
          }
        })
      );

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Lines of code: ${totalAdded} added, ${totalDeleted} deleted (processed ${processedCount} commits, ${failedCount} failed)`);

    return {
      added: totalAdded,
      deleted: totalDeleted,
      net: totalAdded - totalDeleted,
    };
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
        if (patterns.some((pattern) => message.includes(pattern))) {
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

    const [favoriteRepoName, commitCount] = Array.from(repoCommits.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const repo = repos.find((r) => r.full_name === favoriteRepoName);

    return {
      name: favoriteRepoName,
      stars: repo?.stargazers_count || 0,
      commits: commitCount,
    };
  }

  private async getTopLanguages(repos: any[]) {
    const languages = new Map<string, number>();

    for (const repo of repos.slice(0, 50)) {
      try {
        const { data } = await this.octokit.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name,
        });

        Object.entries(data).forEach(([lang, bytes]) => {
          languages.set(lang, (languages.get(lang) || 0) + (bytes as number));
        });
      } catch (error) {
        if (repo.language) {
          languages.set(repo.language, (languages.get(repo.language) || 0) + 1000);
        }
      }
    }

    const total = Array.from(languages.values()).reduce((a, b) => a + b, 0);

    if (total === 0) return [];

    return Array.from(languages.entries())
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  }

  private analyzeCommitPatterns(commits: any[]) {
    const commitsByDay = new Map<string, number>();
    const commitsByHour = new Map<number, number>();
    const commitsByMonth = new Map<string, number>();

    commits.forEach((commit) => {
      const date = new Date(commit.commit?.committer?.date || commit.commit?.author?.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const hour = date.getHours();
      const month = date.toLocaleDateString('en-US', { month: 'long' });

      commitsByDay.set(day, (commitsByDay.get(day) || 0) + 1);
      commitsByHour.set(hour, (commitsByHour.get(hour) || 0) + 1);
      commitsByMonth.set(month, (commitsByMonth.get(month) || 0) + 1);
    });

    const getMostFrequent = <T>(map: Map<T, number>, defaultValue: T): T => {
      return Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || defaultValue;
    };

    const calculateStreak = (commits: any[]): number => {
      const commitDates = commits
        .map((c) => new Date(c.commit?.committer?.date || c.commit?.author?.date).toDateString())
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();

      let maxStreak = 0;
      let currentStreak = 1;

      for (let i = 1; i < commitDates.length; i++) {
        const daysDiff = Math.ceil(
          (new Date(commitDates[i]).getTime() - new Date(commitDates[i - 1]).getTime()) /
            (1000 * 60 * 60 * 24)
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
      mostProductiveMonth: getMostFrequent(commitsByMonth, "January"),
    };
  }

  private async getTopCollaborators() {
    const collaborators = new Map<string, { avatar: string; count: number }>();

    try {
      // Get PRs the user has reviewed
      const { data: reviewedPRs } = await this.octokit.search.issuesAndPullRequests({
        q: `reviewed-by:${this.username} type:pr`,
        per_page: 100,
        sort: "updated",
      });

      reviewedPRs.items.forEach((pr: any) => {
        if (pr.user && pr.user.login !== this.username) {
          const existing = collaborators.get(pr.user.login);
          collaborators.set(pr.user.login, {
            avatar: pr.user.avatar_url,
            count: (existing?.count || 0) + 1,
          });
        }
      });

      const repos = await this.getRepositories();
      for (const repo of repos.slice(0, 5)) {
        try {
          const { data: repoPRs } = await this.octokit.pulls.list({
            owner: repo.owner.login,
            repo: repo.name,
            state: "all",
            per_page: 50,
          });

          repoPRs.forEach((pr: any) => {
            if (pr.user && pr.user.login !== this.username) {
              const existing = collaborators.get(pr.user.login);
              collaborators.set(pr.user.login, {
                avatar: pr.user.avatar_url,
                count: (existing?.count || 0) + 1,
              });
            }
          });
        } catch (error) {
          continue;
        }
      }

      return Array.from(collaborators.entries())
        .map(([username, data]) => ({
          username,
          avatar: data.avatar,
          interactions: data.count,
        }))
        .sort((a, b) => b.interactions - a.interactions)
        .slice(0, 5);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      return [];
    }
  }
}
