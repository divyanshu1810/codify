import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";

export const maxDuration = 30; // 30 seconds timeout for Vercel

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || !session.username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const githubService = new GitHubService(session.accessToken, session.username);
    const creationYear = await githubService.getAccountCreationYear();

    return NextResponse.json({ creationYear });
  } catch (error: any) {
    console.error("Error fetching account info:", error);

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        { error: "GitHub authentication failed" },
        { status: 401 }
      );
    }

    if (error.status === 404) {
      return NextResponse.json(
        { error: "GitHub user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to fetch account info" },
      { status: 500 }
    );
  }
}
