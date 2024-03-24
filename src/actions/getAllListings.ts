"use server";

import prisma from "@/libs/prismaDB";

interface GetAllListingProps {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  category?: string[];
  pageNumber?: number;
  pageSize?: number;
}

export const getAllListing = async (props: GetAllListingProps) => {
  const {
    userId,
    category,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    pageNumber,
    pageSize,
  } = props;

  try {
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (category && category?.length > 0) {
      query.category = {
        in: category,
      };
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                endDate: {
                  lte: endDate,
                  gte: startDate,
                },
              },
            ],
          },
        },
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: guestCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: roomCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: bathroomCount,
      };
    }
    const allListings = await prisma?.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (pageNumber && pageSize) {
      const start = (pageNumber - 1) * pageSize;
      const end = pageNumber * pageSize;
      return {
        data: allListings?.slice(start, end),
        total: allListings?.length,
      };
    }

    return { data: allListings, total: allListings?.length };
  } catch (err) {
    console.log("Error while getting all the listings: " + err);
  }
};
