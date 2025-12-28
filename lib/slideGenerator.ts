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
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

  return `
    <div style="
      width: ${config.width}px;
      height: ${config.height}px;
      background: linear-gradient(135deg, #000000 0%, #121212 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: white;
      padding: ${styles.padding};
    ">
      <div style="font-size: ${styles.iconSize}; margin-bottom: ${styles.spacing};">💻</div>
      <h1 style="
        font-size: ${styles.titleSize};
        font-weight: 800;
        background: linear-gradient(to right, #1DB954, #1ed760);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: ${styles.spacing} 0;
        text-align: center;
      ">Codify Wrapped</h1>
      <p style="font-size: ${styles.subtitleSize}; color: #B3B3B3; margin: ${styles.spacing} 0; text-align: center;">
        ${username}'s ${year} in Code
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
  tools: string[],
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
              <span style="font-size: ${styles.fontSize}; color: #1DB954; font-weight: 600;">${tool}</span>
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
  config: SlideGeneratorConfig
): string {
  const styles = getResponsiveStyles(config.format);

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
