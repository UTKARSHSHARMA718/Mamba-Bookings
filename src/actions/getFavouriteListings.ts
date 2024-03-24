"use server";

import { getCurrentUser } from "./getCurrentUser";

interface IFavoriteListing {
  pageSize?: number;
  pageNumber?: number;
}

export const getFavouriteListing = async (props: IFavoriteListing) => {
  try {
    const user = await getCurrentUser();
    const { pageSize, pageNumber } = props;

    if (!user) {
      return null;
    }

    const res = await prisma?.listing?.findMany({
      where: {
        id: {
          in: [...(user?.favoritesIds || {})],
        },
      },
    });

    // TODO: also send the total number of favorites items as a single key
    if (pageNumber && pageSize) {
      const start = (pageNumber - 1) * pageSize;
      const end = pageNumber * pageSize;
      return res?.slice(start, end);
    }

    return res;
  } catch (err) {
    console.log("Error while getting favorites listings: " + err);
    return null;
  }
};
