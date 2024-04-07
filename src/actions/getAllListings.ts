"use server";

import prisma from "@/libs/prismaDB";
import {
  NUMBER_GUEST_DID_FAV_BOOKINGS,
  NUMBER_OF_BOOKINGS_TO_CONSIDER_FAV,
} from "@/constants/const";

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
      include: {
        ratings: true,
        reservations: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let updatedListOfAllListing = allListings?.map((singleListing) => {
      const length = singleListing?.ratings?.length || 1;
      const rating =
        singleListing?.ratings?.reduce(
          (cumm, current) => cumm + current?.rating,
          0
        ) / length;
      return {
        ...singleListing,
        ratings: rating,
      };
    });

    updatedListOfAllListing = updatedListOfAllListing?.map((singleListing) => {
      const reservations = singleListing?.reservations;
      const usersMap = new Map();
      reservations?.forEach((reservation) => {
        const value = usersMap?.get(reservation?.userId) || 0;
        usersMap?.set(reservation?.userId, value + 1);
      });
      let validGuest = 0;
      usersMap?.forEach((val, key) => {
        validGuest += val >= NUMBER_OF_BOOKINGS_TO_CONSIDER_FAV ? 1 : 0;
      });
      return {
        ...singleListing,
        isGuestFav: validGuest >= NUMBER_GUEST_DID_FAV_BOOKINGS,
      };
    });

    if (pageNumber && pageSize) {
      const start = (pageNumber - 1) * pageSize;
      const end = pageNumber * pageSize;
      return {
        data: updatedListOfAllListing?.slice(start, end),
        total: updatedListOfAllListing?.length,
      };
    }

    return {
      data: updatedListOfAllListing,
      total: updatedListOfAllListing?.length,
    };
  } catch (err) {
    console.log("Error while getting all the listings: " + err);
    return null;
  }
};
