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
  title: "Codify Wrapped - Your GitHub Year in Review",
  description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations",
  openGraph: {
    title: "Codify Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations",
    type: "website",
    siteName: "Codify Wrapped",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codify Wrapped - Your GitHub Year in Review",
    description: "Discover your GitHub stats, achievements, and coding patterns from the past year with beautiful Spotify-style animations",
  },
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
