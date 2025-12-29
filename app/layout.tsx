import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://git-unwrapped.vercel.app"),
  title: {
    default: "GitHub Wrapped - Your GitHub Year in Review",
    template: "%s | GitHub Wrapped",
  },
  description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations. Track commits, PRs, issues, streaks, and earn developer nicknames.",
  keywords: [
    "GitHub Wrapped",
    "GitHub Stats",
    "GitHub Year in Review",
    "Developer Analytics",
    "Coding Stats",
    "GitHub Insights",
    "Developer Achievements",
    "Spotify Wrapped for GitHub",
    "GitHub Activity",
  ],
  authors: [{ name: "GitHub Wrapped" }],
  creator: "GitHub Wrapped",
  publisher: "GitHub Wrapped",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://git-unwrapped.vercel.app",
    siteName: "GitHub Wrapped",
    title: "GitHub Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations. Track commits, PRs, issues, streaks, and earn developer nicknames.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitHub Wrapped - Your GitHub Year in Review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations. Track commits, PRs, issues, streaks, and earn developer nicknames.",
    images: ["/og-image.png"],
    creator: "@githubwrapped",
    site: "@githubwrapped",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://git-unwrapped.vercel.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
