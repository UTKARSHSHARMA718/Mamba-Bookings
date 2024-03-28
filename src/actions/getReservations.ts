"use server";

import prisma from "@/libs/prismaDB";
import { redis } from "@/libs/redis/redis";

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
      query.listing = { userId: authorId };
    }

    if (listingId) {
      query.listingId = listingId;
    }
    const cacheKey = JSON.stringify(props);
    const cachedData: string = (await redis.get(cacheKey)) as string;
    // if (cachedData) {
    //   return cachedData;
    // }

    const reservations = await prisma?.reservation.findMany({
      where: query,
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

    await redis.set(cacheKey, JSON.stringify(safeReservations), {
      ex: 60, // 1min expiery time
    });

    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
};
