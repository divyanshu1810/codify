import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || !session.username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const githubService = new GitHubService(session.accessToken, session.username);
    const creationYear = await githubService.getAccountCreationYear();

    return NextResponse.json({ creationYear });
  } catch (error) {
    console.error("Error fetching account info:", error);
    return NextResponse.json({ error: "Failed to fetch account info" }, { status: 500 });
  }
}
