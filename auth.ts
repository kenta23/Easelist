import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";


export const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        })
      ],
    secret: process.env.NEXTAUTH_SECRET as string,
}