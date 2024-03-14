import { getCurrentUser } from "@/actions/getCurrentUser";
import { API, FAVOURITE } from "@/constants/apiEndpoints";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useLoginModal from "./useLoginModal";

type MarkFavoriteTypes = {
  listingId: number;
  currentUser: User | null;
};

const useMarkFavourite = ({ listingId, currentUser }: MarkFavoriteTypes) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFavourite = useMemo(() => {
    const favoriteList = currentUser?.favoritesIds;
    return Boolean(favoriteList?.includes(listingId));
  }, [currentUser, listingId]);

  const markFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      loginModal?.onOpen();
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      let user;
      let url = `${API}${FAVOURITE}/${listingId}`;
      if (!hasFavourite) {
        user = await axios.put(url);
      } else {
        user = await axios.delete(url);
      }
      setIsLoading(false);

      if (user?.ok) {
        router?.refresh();
        return;
      }
      setError(user?.message);
    } catch (err) {
      setIsLoading(false);
      setError(err?.message || err);
      console.log(err);
    }
  };

  return { hasFavourite, markFavorite, isLoading, error };
};

export default useMarkFavourite;
