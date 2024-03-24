import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import qs from "query-string";

const useQueryParams = () => {
  const router = useRouter();
  const params = useSearchParams();

  const setQueryParams = useCallback(
    ({
      queryName,
      value,
      currentUrl,
    }: {
      queryName: string;
      value: string;
      currentUrl?: string;
    }) => {
      const paramsString = params?.toString() || "";
      let queryParamsValue = qs.parse(paramsString); // value is in form of object

      queryParamsValue = {
        ...queryParamsValue,
        [queryName]: value,
      };

      const updatedQuery = qs.stringify(queryParamsValue);
      const url = (currentUrl ? currentUrl : "/") + "?" + updatedQuery;
      router.push(url);
    },
    [router, params]
  );

  const removeQuery = ({
    key,
    currentUrl,
  }: {
    key: string | string[];
    currentUrl?: string;
  }) => {
    const paramsString = params?.toString() || "";
    let value = qs.parse(paramsString);
    if (Array.isArray(key)) {
      key?.forEach((v) => {
        delete value?.[v];
      });
    } else {
      delete value?.[key];
    }
    const updatedQuery = qs.stringify(value);
    const url = (currentUrl ? currentUrl : "/") + "?" + updatedQuery;
    router.push(url);
  };

  const getQueryParams = () => {
    let queryParams = {};
    if (params?.toString()) {
      queryParams = qs.parse(params?.toString());
    }
    return queryParams;
  };

  return { setQueryParams, removeQuery, getQueryParams };
};

export default useQueryParams;
