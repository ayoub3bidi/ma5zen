import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import  { prisma } from "../../../config/prisma"
import { redirect } from "next/dist/server/api-utils";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({url , baseUrl}) {
      return baseUrl;
    },
    async session ({session, token, user}) {
      if (session?.user) session.user.id = user.id;
      return session;
    }
  },
  events: {},
  debug: false,
});