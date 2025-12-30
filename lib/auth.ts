import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile && user?.id) {
        try {
          // Update user with GitHub username and check if admin
          await prisma.user.update({
            where: { id: user.id },
            data: {
              username: (profile as any).login,
              isAdmin: user.email === process.env.ADMIN_EMAIL,
            },
          });
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.userId = user.id;
        session.username = (user as any).username;
        session.userImage = session.user.image as string;
        session.isAdmin = (user as any).isAdmin || false;

        // Get access token from accounts table
        const account = await prisma.account.findFirst({
          where: { userId: user.id, provider: "github" },
          select: { access_token: true },
        });
        session.accessToken = account?.access_token || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
