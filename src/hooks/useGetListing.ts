import { useEffect, useState } from "react";

import { getListing } from "@/actions/getListing";
import { Listing } from "@prisma/client";
import { GENERAL_ERROR_MESSAGE } from "@/constants/errorMessage";

type GetListingHookType = {
  preventFetchOnInitialLoad: boolean;
  listingId: string;
};

const useGetListing = ({
  preventFetchOnInitialLoad = false,
  listingId,
}: GetListingHookType) => {
  const [listingData, setListingData] = useState<Listing | null>(null);

  const [listingError, setListingError] = useState("");

  const [isListingLoading, setIsListingLoading] = useState(false);

  const getListingData = async () => {
    setIsListingLoading(true);
    try {
      const res = await getListing({ listingId });
      if (res) {
        setListingData(res);
        return;
      }
      setListingError(GENERAL_ERROR_MESSAGE);
    } catch (err: any) {
      setListingError(err?.message || err);
    } finally {
      setIsListingLoading(false);
    }
  };

  useEffect(() => {
    if (!preventFetchOnInitialLoad) {
      getListingData();
    }
  }, []);

  return { getListingData, listingData, listingError, isListingLoading };
};

export default useGetListing;
