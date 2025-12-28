# Codify - Your GitHub Year Wrapped

A beautiful, Spotify-inspired web application that showcases your GitHub activity and achievements throughout the year. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- GitHub OAuth authentication
- Comprehensive GitHub statistics:
  - Total commits, pull requests, and issues resolved
  - Lines of code written (added/deleted/net)
  - Code review statistics
  - Favorite repository
  - AI tools detection in commit messages
  - Productivity patterns (streak, most productive day/hour)
- Personalized nicknames based on your coding patterns
- Spotify-themed UI with smooth animations
- Interactive slide navigation with keyboard support
- Social media sharing capabilities

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: React Icons
- **GitHub API**: Octokit

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A GitHub account
- A GitHub OAuth App (instructions below)

## Setup Instructions

### 1. Clone and Install

```bash
cd codify
npm install
```

### 2. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Codify (or your preferred name)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy your **Client ID**
6. Generate a new **Client Secret** and copy it

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

To generate a NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click "Sign in with GitHub" on the home page
2. Authorize the application
3. Wait for your stats to load
4. Navigate through the slides using:
   - Arrow buttons at the bottom
   - Keyboard arrow keys (left/right)
   - Slide indicators (dots)
5. Share your wrapped on social media!

## Features Breakdown

### Statistics Tracked

- **Commits**: Total commits made in the year
- **Pull Requests**: Number of PRs merged
- **Issues**: Number of issues resolved
- **Lines of Code**: Added, deleted, and net change
- **Code Reviews**: Estimated lines of code reviewed
- **Favorite Repository**: Repo with most commits
- **AI Tools**: Detected AI tools in commit messages (Copilot, ChatGPT, Claude, etc.)
- **Productivity**: Longest streak, most productive day, and peak coding hour

### Nicknames

The app assigns you a nickname based on your activity:
- **Night Owl**: Code mostly at night
- **Early Bird**: Active in early morning
- **Code Machine**: 500+ commits
- **PR Champion**: 50+ PRs merged
- **Bug Slayer**: 30+ issues resolved
- **Line Warrior**: 10k+ lines added
- **Delete Master**: Delete more than you write
- **Review King**: 5k+ lines reviewed
- **Streak Master**: 30+ day streak
- And more!

## Customization

### Changing the Year

The app defaults to the current year. To change it, modify the year parameter in the API call.

### Adding More Slides

1. Create a new component in `components/slides/`
2. Import and add it to the slides array in `app/wrapped/page.tsx`

### Modifying Spotify Colors

Edit the color variables in `app/globals.css`:

```css
--spotify-green: #1DB954;
--spotify-dark: #121212;
--spotify-darker: #000000;
```

## Deployment

### Deploy to Vercel

The app is currently deployed at: [https://codify-wrapped.vercel.app](https://codify-wrapped.vercel.app)

#### Steps to Deploy:

1. **Push your code to GitHub**

2. **Create a new GitHub OAuth App for production**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: Codify Wrapped (Production)
     - **Homepage URL**: `https://codify-wrapped.vercel.app`
     - **Authorization callback URL**: `https://codify-wrapped.vercel.app/api/auth/callback/github`
   - Save the Client ID and Client Secret

3. **Import to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings (Framework Preset: Next.js)

4. **Add Environment Variables in Vercel**:
   Go to Project Settings → Environment Variables and add:
   ```
   GITHUB_ID=your_production_github_client_id
   GITHUB_SECRET=your_production_github_client_secret
   NEXTAUTH_URL=https://codify-wrapped.vercel.app
   NEXTAUTH_SECRET=your_generated_secret
   ```
   Generate NEXTAUTH_SECRET with: `openssl rand -base64 32`

5. **Deploy**: Click "Deploy" and wait for the build to complete

#### Important Notes:
- Keep separate OAuth Apps for development and production
- Never commit `.env.local` to version control
- Make sure to update the OG image URL in production if needed
- The app uses `/og-image.png` for social media previews

## Known Limitations

- GitHub API rate limits apply (5000 requests/hour for authenticated users)
- Some statistics are estimates (e.g., lines of code, reviewed lines)
- Follower growth tracking requires historical data (currently shows total followers)
- The app uses GitHub Search API which has some limitations on date ranges

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Spotify Wrapped
- Built with Next.js and the amazing open-source community

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
