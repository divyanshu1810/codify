import { GitHubStats } from "./github";

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
  userImage?: string
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
      ">${username}</h1>
      <p style="font-size: ${styles.subtitleSize}; color: rgba(0, 0, 0, 0.9); margin: ${styles.spacing} 0; text-align: center; font-weight: 600;">
        Your ${year} GitHub Unwrapped
      </p>
      <p style="font-size: ${styles.fontSize}; color: rgba(0, 0, 0, 0.8); margin-top: ${styles.spacing}; text-align: center; font-weight: 500;">
        Let's see what you've built this year
      </p>
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
      <div style="font-size: ${styles.iconSize}; margin-bottom: ${styles.spacing};">🏆</div>
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
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">⭐ ${stars}</div>
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-top: 8px;">Stars</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing}; text-align: center;">
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">💻 ${commits}</div>
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
        <div style="font-size: ${styles.iconSize}; margin-top: ${styles.spacing};">👨‍💻</div>
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
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">🔥 Longest Streak</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${streak} days</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing};">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">📅 Most Productive Day</div>
          <div style="font-size: ${styles.subtitleSize}; font-weight: 800; color: #1DB954;">${mostProductiveDay}</div>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 2px solid #1DB954; border-radius: 12px; padding: ${styles.spacing};">
          <div style="font-size: ${styles.fontSize}; color: #B3B3B3; margin-bottom: 8px;">⏰ Peak Coding Hour</div>
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
        ${username}'s ${year} Summary
      </h1>
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
