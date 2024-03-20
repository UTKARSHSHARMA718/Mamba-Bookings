import prisma from "@/libs/prismaDB";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { CREDENTIALS } from "@/constants/const";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      // name: CREDENTIALS,
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials Provided!");
        }

        //NOTE: try finding user in our database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashsedPassword) {
          throw new Error("User not found!");
        }

        // NOTE: checking password
        const isPasswordSame = await bcrypt.compare(
          credentials.password,
          user?.hashsedPassword
        );

        if (!isPasswordSame) {
          throw new Error("Invalid credentials!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "http://localhost:3000/hello",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
