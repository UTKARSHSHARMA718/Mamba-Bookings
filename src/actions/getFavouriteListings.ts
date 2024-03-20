import { getCurrentUser } from "./getCurrentUser";

export const getFavouriteListing = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return null
    }

    const res = await prisma?.listing?.findMany({
      where: {
        id: {
          in: [...(user?.favoritesIds || {})],
        },
      },
    });

    return res
  } catch (err) {
    console.log("Error while getting favorites listings: " + err);
    return null
  }
};
