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
  metadataBase: new URL("https://codify-wrapped.vercel.app"),
  title: {
    default: "Codify Wrapped - Your GitHub Year in Review",
    template: "%s | Codify Wrapped",
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
    "Codify Wrapped",
    "Spotify Wrapped for GitHub",
    "GitHub Activity",
  ],
  authors: [{ name: "Codify Wrapped" }],
  creator: "Codify Wrapped",
  publisher: "Codify Wrapped",
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
    url: "https://codify-wrapped.vercel.app",
    siteName: "Codify Wrapped",
    title: "Codify Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations. Track commits, PRs, issues, streaks, and earn developer nicknames.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codify Wrapped - Your GitHub Year in Review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codify Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations. Track commits, PRs, issues, streaks, and earn developer nicknames.",
    images: ["/og-image.png"],
    creator: "@codifywrapped",
    site: "@codifywrapped",
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
    canonical: "https://codify-wrapped.vercel.app",
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
