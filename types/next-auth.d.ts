import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    username?: string;
    userImage?: string;
    userId?: string;
    isAdmin?: boolean;
  }

  interface User {
    username?: string;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
    isAdmin?: boolean;
    id?: string;
  }
}
