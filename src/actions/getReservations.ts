import prisma from "@/libs/prismaDB";

interface IProps {
  userId?: string;
  authorId?: string;
  listingId?: string;
}

export const getReservations = async (props: IProps) => {
  try {
    const { userId, authorId, listingId } = props;
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.authorId = authorId;
    }

    if (listingId) {
      query.listingId = listingId;
    }

    const reservations = await prisma?.reservation.findMany({
      where: query,
      //   TODO: what does below code means/do?
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations?.map((item) => {
      return {
        ...item,
        createdAt: item.createdAt?.toISOString(),
        startDate: item.startDate?.toISOString(),
        endDate: item.endDate?.toISOString(),
        listing: {
          ...item?.listing,
          createdAt: item?.listing?.createdAt?.toISOString(),
        },
      };
    });

    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
};
