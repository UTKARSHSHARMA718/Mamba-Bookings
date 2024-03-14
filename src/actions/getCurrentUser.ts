import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextAuth]";
import prisma from "@/libs/prismaDB";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session || !session?.user?.email) {
      return null;
    }

    const user = await prisma.user?.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: user?.createdAt?.toISOString,
      updatedAt: user?.updatedAt?.toISOString,
    };
  } catch (err: any) {
    console.error("Error while getting current User" + err);
    return null;
  }
};
