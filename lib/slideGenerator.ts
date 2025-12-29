import { GitHubStats, GitHubUserProfile } from "./github";

interface SlideGeneratorConfig {
  format: "phone" | "tab" | "desktop";
  width: number;
  height: number;
}

const getResponsiveStyles = (format: "phone" | "tab" | "desktop") => {
  const baseStyles = {
    phone: {
      fontSize: "14px",
      titleSize: "32px",
      subtitleSize: "18px",
      iconSize: "48px",
      padding: "24px",
      spacing: "16px",
    },
    tab: {
      fontSize: "16px",
      titleSize: "48px",
      subtitleSize: "24px",
      iconSize: "64px",
      padding: "32px",
      spacing: "24px",
    },
    desktop: {
      fontSize: "18px",
      titleSize: "64px",
      subtitleSize: "32px",
      iconSize: "80px",
      padding: "48px",
      spacing: "32px",
    },
  };
  return baseStyles[format];
};

export function generateIntroSlideHTML(
  username: string,
  year: number,
  config: SlideGeneratorConfig,
  userImage?: string,
  userProfile?: GitHubUserProfile
): string {
  const styles = getResponsiveStyles(config.format);

  const avatarSize = config.format === 'phone' ? '120px' : config.format === 'tab' ? '160px' : '192px';

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      ${userImage ? `
        <div style="margin-bottom: ${styles.spacing};">
          <img
            src="${userImage}"
            alt="${username}"
            style="
              width: ${avatarSize};
              height: ${avatarSize};
              border-radius: 50%;
              border: 4px solid #000000;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
              object-fit: cover;
            "
          />
        </div>
      ` : `
        <div style="
          width: ${avatarSize};
          height: ${avatarSize};
          border-radius: 50%;
          border: 4px solid #000000;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: ${styles.spacing};
        ">
          <svg width="${parseInt(avatarSize) * 0.5}" height="${parseInt(avatarSize) * 0.5}" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      `}
      <h1 style="
        font-size: ${styles.titleSize};
        font-weight: 800;
        color: #000000;
        margin: ${styles.spacing} 0;
        text-align: center;
      ">${userProfile?.name || username}</h1>
      <p style="font-size: ${styles.fontSize}; color: rgba(0, 0, 0, 0.8); font-family: monospace; text-align: center;">@${username}</p>
      ${userProfile?.bio ? `<p style="font-size: ${parseInt(styles.fontSize) - 2}px; color: rgba(0, 0, 0, 0.8); margin: ${styles.spacing} 0; text-align: center; font-style: italic; max-width: 500px;">"${userProfile.bio}"</p>` : ''}
      <p style="font-size: ${styles.subtitleSize}; color: rgba(0, 0, 0, 0.9); margin: ${styles.spacing} 0; text-align: center; font-weight: 600;">
        Your ${year} GitHub Unwrapped
      </p>
      ${userProfile ? `
        <div style="display: grid; grid-template-columns: repeat(${config.format === 'phone' ? '2' : '4'}, 1fr); gap: 8px; margin-top: ${styles.spacing};">
          ${userProfile.location ? `
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 8px; font-size: ${parseInt(styles.fontSize) - 2}px; color: #000; text-align: center;">
              ${userProfile.location}
            </div>
          ` : ''}
          ${userProfile.company ? `
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 8px; font-size: ${parseInt(styles.fontSize) - 2}px; color: #000; text-align: center;">
              ${userProfile.company}
            </div>
          ` : ''}
          <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 8px; font-size: ${parseInt(styles.fontSize) - 2}px; color: #000; text-align: center;">
            ${userProfile.followers} followers
          </div>
          <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; padding: 8px; font-size: ${parseInt(styles.fontSize) - 2}px; color: #000; text-align: center;">
            ${userProfile.public_repos} repos
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function generateStatsSlideHTML(
  commits: number,
  prs: number,
  issues: number,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #0F0F0F 0%, #1a1a1a 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">Your Year in Numbers</h2>
      <div style="display: grid; grid-template-columns: repeat(${config.format === 'phone' ? '1' : '3'}, 1fr); gap: ${styles.spacing}; width: 100%; max-width: 900px;">
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 16px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${commits.toLocaleString()}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Commits</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 16px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${prs.toLocaleString()}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Pull Requests</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 16px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${issues.toLocaleString()}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Issues Resolved</div>
        </div>
      </div>
    </div>
  `;
}

export function generateLinesOfCodeSlideHTML(
  added: number,
  deleted: number,
  net: number,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #1a0a2e 0%, #0f0f0f 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">Lines of Code</h2>
      <div style="display: flex; flex-direction: column; gap: ${styles.spacing}; width: 100%; max-width: 600px;">
        <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 12px; padding: ${styles.spacing}; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: ${styles.subtitleSize}; color: #22c55e;">++</span>
          <span style="font-size: ${styles.titleSize}; font-weight: 800; color: #22c55e;">${added.toLocaleString()}</span>
        </div>
        <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: ${styles.spacing}; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: ${styles.subtitleSize}; color: #ef4444;">--</span>
          <span style="font-size: ${styles.titleSize}; font-weight: 800; color: #ef4444;">${deleted.toLocaleString()}</span>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing}; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: ${styles.subtitleSize}; color: #1DB954;">Net</span>
          <span style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${net.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

export function generateNicknameSlideHTML(
  title: string,
  description: string,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <div style="margin-bottom: ${styles.spacing};">
        <svg width="${styles.iconSize}" height="${styles.iconSize}" viewBox="0 0 24 24" fill="#FFD700" style="display: inline-block;">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
        </svg>
      </div>
      <h2 style="font-size: ${styles.subtitleSize}; color: #B3B3B3; margin-bottom: ${styles.spacing}; text-align: center;">Your Developer Title</h2>
      <h1 style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954; margin-bottom: ${styles.spacing}; text-align: center;">${title}</h1>
      <p style="font-size: ${styles.fontSize}; color: #B3B3B3; max-width: 600px; text-align: center; line-height: 1.6;">
        ${description}
      </p>
    </div>
  `;
}

export function generateFavoriteRepoSlideHTML(
  name: string,
  stars: number,
  commits: number,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #2d1b69 0%, #0f0f0f 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.subtitleSize}; color: #B3B3B3; margin-bottom: ${styles.spacing}; text-align: center;">Your Favorite Project</h2>
      <h1 style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954; margin-bottom: ${styles.spacing}; text-align: center;">${name}</h1>
      <div style="display: flex; gap: ${styles.spacing}; margin-top: ${styles.spacing};">
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${stars}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Stars</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${commits}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Commits</div>
        </div>
      </div>
    </div>
  `;
}

export function generateAIToolsSlideHTML(
  tools: { name: string; count: number }[],
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #0a192f 0%, #0f0f0f 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">
        ${tools.length > 0 ? 'AI Tools Detected' : 'Pure Human Code'}
      </h2>
      ${tools.length > 0 ? `
        <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 600px;">
          ${tools.map(tool => `
            <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 24px; padding: 12px 24px;">
              <span style="font-size: ${styles.fontSize}; color: #1DB954; font-weight: 600;">${tool.name}</span>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="font-size: ${styles.iconSize}; margin-top: ${styles.spacing}; text-align: center;">
          <svg width="${parseInt(styles.iconSize)}" height="${parseInt(styles.iconSize)}" viewBox="0 0 24 24" fill="#1DB954" style="display: inline-block;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <p style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: ${styles.spacing}; text-align: center;">
          No AI assistants detected. All code crafted by human hands!
        </p>
      `}
    </div>
  `;
}

export function generateProductivitySlideHTML(
  streak: number,
  mostProductiveDay: string,
  mostProductiveHour: number,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">Productivity Patterns</h2>
      <div style="display: flex; flex-direction: column; gap: ${styles.spacing}; width: 100%; max-width: 600px;">
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing};">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">Longest Streak</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${streak} days</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing};">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">Most Productive Day</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${mostProductiveDay}</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing};">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">Peak Coding Hour</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${mostProductiveHour}:00</div>
        </div>
      </div>
    </div>
  `;
}

export function generateSummarySlideHTML(
  stats: GitHubStats,
  nickname: { title: string; description: string },
  username: string,
  year: number,
  config: SlideGeneratorConfig,
  userImage?: string
): string {
  const styles = getResponsiveStyles(config.format);

  const avatarSize = config.format === 'phone' ? '80px' : config.format === 'tab' ? '96px' : '120px';

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #0f0f0f 0%, #000000 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
      overflow-y: auto;
    ">
      <div style="display: flex; justify-content: center; margin-bottom: ${styles.spacing};">
        ${userImage ? `
          <img
            src="${userImage}"
            alt="${username}"
            style="
              width: ${avatarSize};
              height: ${avatarSize};
              border-radius: 50%;
              border: 4px solid #1DB954;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
              object-fit: cover;
            "
          />
        ` : `
          <div style="
            width: ${avatarSize};
            height: ${avatarSize};
            border-radius: 50%;
            border: 4px solid #1DB954;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            background: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="${parseInt(avatarSize) * 0.5}" height="${parseInt(avatarSize) * 0.5}" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        `}
      </div>
      <h1 style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954; margin-bottom: ${styles.spacing}; text-align: center;">
        ${stats.userProfile?.name || username}'s ${year} Unwrapped
      </h1>
      <p style="font-size: ${styles.fontSize}; color: #1DB954; font-family: monospace; text-align: center; margin-bottom: 8px;">@${username}</p>
      ${stats.userProfile?.bio ? `<p style="font-size: ${parseInt(styles.fontSize) - 2}px; color: #B3B3B3; margin-bottom: ${styles.spacing}; text-align: center; font-style: italic; max-width: 400px;">"${stats.userProfile.bio}"</p>` : ''}

      ${stats.userProfile ? `
        <div style="display: grid; grid-template-columns: repeat(${config.format === 'phone' ? '2' : '4'}, 1fr); gap: 8px; margin-bottom: ${styles.spacing}; width: 100%; max-width: 600px;">
          <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #3b82f6;">${stats.userProfile.followers}</div>
            <div style="font-size: ${parseInt(styles.fontSize) - 2}px; color: #B3B3B3;">Followers</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #3b82f6;">${stats.userProfile.following}</div>
            <div style="font-size: ${parseInt(styles.fontSize) - 2}px; color: #B3B3B3;">Following</div>
          </div>
          <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #a855f7;">${stats.userProfile.public_repos}</div>
            <div style="font-size: ${parseInt(styles.fontSize) - 2}px; color: #B3B3B3;">Repos</div>
          </div>
          <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
            <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #a855f7;">${stats.userProfile.public_gists}</div>
            <div style="font-size: ${parseInt(styles.fontSize) - 2}px; color: #B3B3B3;">Gists</div>
          </div>
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: repeat(${config.format === 'phone' ? '1' : '2'}, 1fr); gap: 12px; width: 100%; max-width: 800px;">
        <div style="background: rgba(29, 185, 84, 0.05); border: 1px solid #1DB954; border-radius: 8px; padding: 16px;">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3;">Total Commits</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${stats.totalCommits.toLocaleString()}</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.05); border: 1px solid #1DB954; border-radius: 8px; padding: 16px;">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3;">Pull Requests</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${stats.totalPRsMerged.toLocaleString()}</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.05); border: 1px solid #1DB954; border-radius: 8px; padding: 16px;">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3;">Issues Resolved</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${stats.totalIssuesResolved.toLocaleString()}</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.05); border: 1px solid #1DB954; border-radius: 8px; padding: 16px;">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3;">Longest Streak</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${stats.streak} days</div>
        </div>
      </div>
      <div style="margin-top: ${styles.spacing}; background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing}; max-width: 600px;">
        <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954; text-align: center; margin-bottom: 8px;">
          ${nickname.title}
        </div>
        <div style="font-size: ${styles.fontSize}; color: #B3B3B3; text-align: center;">
          ${nickname.description}
        </div>
      </div>
    </div>
  `;
}

export function generateLanguagesSlideHTML(
  languages: { name: string; percentage: number }[],
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

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

  const languageBars = languages
    .slice(0, 5)
    .map(
      (lang) => `
    <div style="margin-bottom: ${styles.spacing};">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: white; font-weight: 600; font-size: ${styles.fontSize};">${lang.name}</span>
        <span style="color: #1DB954; font-weight: 700; font-size: ${styles.fontSize};">${lang.percentage}%</span>
      </div>
      <div style="width: 100%; height: 16px; background: rgba(255, 255, 255, 0.1); border-radius: 999px; overflow: hidden;">
        <div style="width: ${lang.percentage}%; height: 100%; background: ${getLanguageColor(lang.name)}; border-radius: 999px;"></div>
      </div>
    </div>
  `
    )
    .join("");

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #000000 0%, #121212 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: ${styles.padding};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    ">
      <div style="text-align: center; max-width: 800px; width: 100%;">
        <div style="
          width: ${styles.iconSize};
          height: ${styles.iconSize};
          background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto ${styles.spacing};
        ">
          <svg width="${parseInt(styles.iconSize) * 0.5}" height="${parseInt(styles.iconSize) * 0.5}" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <div style="font-size: ${styles.titleSize}; font-weight: 700; color: white; margin-bottom: ${styles.spacing};">
          Your Languages
        </div>
        <div style="font-size: ${styles.subtitleSize}; color: #B3B3B3; margin-bottom: calc(${styles.spacing} * 2);">
          Most used programming languages
        </div>
        <div style="width: 100%;">
          ${languageBars}
        </div>
      </div>
    </div>
  `;
}

export function generateCollaborationSlideHTML(
  collaborators: Array<{ username: string; avatar: string; interactions: number }>,
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);
  const hasCollaborators = collaborators.length > 0;
  const totalInteractions = collaborators.reduce((sum, collab) => sum + collab.interactions, 0);

  const avatarSize = config.format === 'phone' ? '48px' : config.format === 'tab' ? '56px' : '64px';

  if (!hasCollaborators) {
    return `
      <div style="
        width: ${config.width}px;
        height: ${config.height}px;
        background: linear-gradient(135deg, #6B46C1 0%, #553C9A 50%, #2563EB 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', 'SF Mono', monospace;
        color: white;
        padding: ${styles.padding};
      ">
        <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">
          Solo Developer
        </h2>
        <div style="margin-top: ${styles.spacing}; text-align: center;">
          <svg width="${styles.iconSize}" height="${styles.iconSize}" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.6)" style="display: inline-block;">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <p style="font-size: ${styles.fontSize}; color: rgba(255, 255, 255, 0.8); margin-top: ${styles.spacing}; text-align: center; max-width: 500px;">
          You're coding solo this year. Sometimes the best work is done independently!
        </p>
      </div>
    `;
  }

  const collaboratorItems = collaborators.slice(0, 5).map((collab, index) => `
    <div style="
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: ${styles.spacing};
      display: flex;
      align-items: center;
      gap: ${styles.spacing};
      margin-bottom: 12px;
    ">
      <div style="position: relative;">
        <img
          src="${collab.avatar}"
          alt="${collab.username}"
          style="
            width: ${avatarSize};
            height: ${avatarSize};
            border-radius: 50%;
            border: 3px solid #1DB954;
            object-fit: cover;
          "
          onerror="this.src='https://github.com/${collab.username}.png'"
        />
        <div style="
          position: absolute;
          top: -4px;
          right: -4px;
          background: #1DB954;
          color: #000;
          font-size: ${parseInt(styles.fontSize) - 4}px;
          font-weight: 700;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${index + 1}
        </div>
      </div>
      <div style="flex: 1;">
        <div style="font-size: ${styles.fontSize}; font-weight: 700; color: white;">${collab.username}</div>
        <div style="font-size: ${parseInt(styles.fontSize) - 2}px; color: rgba(255, 255, 255, 0.7);">
          ${collab.interactions} interaction${collab.interactions !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #6B46C1 0%, #553C9A 50%, #2563EB 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <h2 style="font-size: ${styles.titleSize}; font-weight: 800; margin-bottom: ${styles.spacing}; text-align: center;">
        Your Collaboration Circle
      </h2>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: ${styles.spacing}; width: 100%; max-width: 600px; margin-bottom: ${styles.spacing};">
        <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${collaborators.length}</div>
          <div style="font-size: ${styles.fontSize}; color: rgba(255, 255, 255, 0.9); margin-top: 8px;">Top Collaborators</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.titleSize}; font-weight: 800; color: #1DB954;">${totalInteractions}</div>
          <div style="font-size: ${styles.fontSize}; color: rgba(255, 255, 255, 0.9); margin-top: 8px;">Total Interactions</div>
        </div>
      </div>

      <div style="width: 100%; max-width: 700px;">
        <h3 style="font-size: ${styles.subtitleSize}; font-weight: 700; text-align: center; margin-bottom: ${styles.spacing};">
          Your Top Collaborators
        </h3>
        ${collaboratorItems}
      </div>
    </div>
  `;
}
