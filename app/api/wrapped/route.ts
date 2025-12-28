import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";

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

    const githubService = new GitHubService(session.accessToken, session.username);
    const stats = await githubService.getYearWrapped(year);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching wrapped data:", error);
    return NextResponse.json(
      { error: "Failed to fetch wrapped data" },
      { status: 500 }
    );
  }
}
