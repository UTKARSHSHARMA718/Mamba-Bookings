"use server";

import { getServerSession } from "next-auth";

import prisma from "@/libs/prismaDB";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import {
  SafeUser,
  UserWithReservation,
} from "@/types/DataBaseModes/DataBaseModes";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser: (
  v?: any
) => Promise<SafeUser | UserWithReservation | null> = async (
  isReservationRequired?: boolean
) => {
  try {
    const session = await getSession();

    if (!session || !session?.user?.email) {
      return null;
    }

    const user = await prisma.user?.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        reservations: !!isReservationRequired,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: user?.createdAt?.toISOString(),
      updatedAt: user?.updatedAt?.toISOString(),
    };
  } catch (err: any) {
    console.error("Error while getting current User" + err);
    return null;
  }
};
