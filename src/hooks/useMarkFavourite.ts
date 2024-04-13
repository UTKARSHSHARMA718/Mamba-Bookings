import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/types/DataBaseModes/DataBaseModes";
import { API, FAVOURITE } from "@/constants/apiEndpoints";
import toast from "react-hot-toast";

type MarkFavoriteTypes = {
  listingId: string;
  currentUser: SafeUser | null;
};

const useMarkFavourite = ({ listingId, currentUser }: MarkFavoriteTypes) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

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
    try {
      let user: { data: any };
      let url = `/${API}${FAVOURITE}/${listingId}`;
      if (!hasFavourite) {
        user = await axios.put(url);
      } else {
        user = await axios.delete(url);
      }
      setIsLoading(false);

      if (user?.data?.ok) {
        router?.refresh();
        toast?.success(user?.data?.message);
        return;
      }
      toast?.error("Something went wrong!");
    } catch (err: any) {
      setIsLoading(false);
      toast?.error(err?.response?.data?.message || err);
      console.log(err);
    }
  };

  return { hasFavourite, markFavorite, isLoading };
};

export default useMarkFavourite;
