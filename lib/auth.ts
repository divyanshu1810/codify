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
    async signIn() {
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        let username = (user as any).username;
        let isAdmin = (user as any).isAdmin || false;

        const needsUpdate = !username || (user.email === process.env.ADMIN_EMAIL && !isAdmin);

        if (needsUpdate) {
          try {
            const updated = await prisma.user.update({
              where: { id: user.id },
              data: {
                username: username || user.name || user.email?.split('@')[0] || 'user',
                isAdmin: user.email === process.env.ADMIN_EMAIL,
              },
            });
            username = updated.username;
            isAdmin = updated.isAdmin;
          } catch (error) {
            console.error("Error updating user:", error);
          }
        }

        session.userId = user.id;
        session.username = username || user.name || user.email?.split('@')[0] || 'user';
        session.userImage = session.user.image as string;
        session.isAdmin = isAdmin;

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
