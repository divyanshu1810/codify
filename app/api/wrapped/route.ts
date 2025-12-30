import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";

export const maxDuration = 60; // 60 seconds timeout for Vercel

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || !session.username) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    const currentYear = new Date().getFullYear();
    if (year < 2008 || year > currentYear + 1) {
      return NextResponse.json(
        { error: `Invalid year. Must be between 2008 and ${currentYear}` },
        { status: 400 }
      );
    }

    const githubService = new GitHubService(session.accessToken, session.username);
    const stats = await githubService.getYearWrapped(year);

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Error fetching wrapped data:", error);

    // Handle specific error types
    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        { error: "GitHub authentication failed. Please sign in again." },
        { status: 401 }
      );
    }

    if (error.status === 404) {
      return NextResponse.json(
        { error: "GitHub user or data not found" },
        { status: 404 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: "GitHub API rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to fetch wrapped data" },
      { status: 500 }
    );
  }
}
