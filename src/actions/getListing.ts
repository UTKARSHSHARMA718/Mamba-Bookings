"use server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "./getCurrentUser";
import { canUserProvideReview } from "@/libs/utils/util";
import { UserWithReservation } from "@/types/DataBaseModes/DataBaseModes";

interface IGetListing {
  listingId: string;
}

export const getListing = async ({ listingId }: IGetListing) => {
  if (!listingId || typeof listingId !== "string") {
    return null;
  }

  try {
    const data = await prisma?.listing?.findUnique({
      include: {
        user: true,
        reservations: true,
        ratings: {
          include: {
            user: true,
          },
        },
      },
      where: {
        id: listingId,
      },
    });

    if (!data) {
      return null;
    }

    const user = (await getCurrentUser({
      isReservationRequired: true,
    })) as UserWithReservation;

    if (!user) {
      return data;
    }

    return {
      ...data,
      canProvideReview: canUserProvideReview(user, listingId),
    };
  } catch (err) {
    console.log("Error while getting one listing: " + err);
    return null;
  }
};
