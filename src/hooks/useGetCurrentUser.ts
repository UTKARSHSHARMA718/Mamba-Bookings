import { useEffect, useState } from "react";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types/DataBaseModes/DataBaseModes";
import { GENERAL_ERROR_MESSAGE } from "@/constants/errorMessage";

type GetCurrentUserHookType = {
  preventFetchOnInitialLoad: boolean;
};

const useGetCurrentUser = ({
  preventFetchOnInitialLoad = false,
}: GetCurrentUserHookType) => {
  const [userData, setUserData] = useState<SafeUser | null>(null);
  const [userError, setUserError] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getUserData = async () => {
    setIsUserLoading(true);
    try {
      const res = await getCurrentUser();
      if (res) {
        setUserData(res);
        return;
      }
      setUserError(GENERAL_ERROR_MESSAGE);
    } catch (err: any) {
      setUserError(err?.response?.data?.message || err);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    if(!preventFetchOnInitialLoad){
      getUserData();
    }
  }, []);

  return { getUserData, userData, userError, isUserLoading };
};

export default useGetCurrentUser;
