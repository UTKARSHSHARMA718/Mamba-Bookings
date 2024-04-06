import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import { API, LISTING } from "@/constants/apiEndpoints";
import { GENERAL_ERROR_MESSAGE } from "@/constants/errorMessage";

const useDeleteListingApi = ({ callBack }: { callBack?: () => void }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const deleteListingHandler = useCallback(
    async (listingId: string) => {
      setIsLoading(true);
      try {
        const url = API + LISTING + `/${listingId}`;
        const res = await axios.delete(url);
        if (res?.data?.ok) {
          toast?.success("Listing deleted successfully!");
          callBack?.();
          router?.refresh();
          return;
        }
        toast.error(GENERAL_ERROR_MESSAGE);
      } catch (err: any) {
        toast.error(err?.messgae);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, toast, isLoading, router]
  );

  return { deleteListingHandler, isLoading };
};

export default useDeleteListingApi;
