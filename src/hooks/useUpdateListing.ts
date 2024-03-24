import { useState } from "react";
import axios from "axios";

import { ListingPayload } from "@/types/DataBaseModes/DataBaseModes";

const useUpdateListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const updateListingHandler = async ({
    payload,
  }: {
    payload: ListingPayload;
  }) => {
    setIsLoading(true);
    try {
      const url = "";
      const res = await axios.patch(url, payload);
      if (res?.data?.ok) {
        setData(res?.data?.data);
        return;
      }
      setError(res?.data?.message);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateListingHandler, error, data, isLoading };
};

export default useUpdateListing;
