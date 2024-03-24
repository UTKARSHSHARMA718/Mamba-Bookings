"use server"

import prisma from "@/libs/prismaDB";

interface IGetListing {
  listingId: string;
}

export const getListing = async ({ listingId }: IGetListing) => {
  if (!listingId || typeof listingId !== "string") {
    return null;
  }

  try {
    const data = await prisma?.listing?.findUnique({
      include:{
        user: true,
      },
      where: {
        id: listingId,
      },
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (err) {
    console.log("Error while getting one listing: " + err);
    return null;
  }
};
