import prisma from "@/libs/prismaDB";

export const getAllListing = async () => {
  try {
    const allListings = await prisma?.listing.findMany({});
    return allListings;
  } catch (err) {
    console.log("Error while getting all the listings: " + err);
  }
};
