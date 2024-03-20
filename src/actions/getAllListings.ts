import prisma from "@/libs/prismaDB";

interface GetAllListingProps {
  userId?: string | null;
  guestCount?: number | null;
  roomCount?: number | null;
  bathroomCount?: number | null;
  locationValue?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  category?: string[] | null;
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
  } = props;

  try {
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (category) {
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
    return allListings;
  } catch (err) {
    console.log("Error while getting all the listings: " + err);
  }
};
