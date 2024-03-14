import qs from "query-string";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParamsTypes = {
  isMultiSelect?: boolean;
};

const useQueryParams = (props: QueryParamsTypes) => {
  const { isMultiSelect = true } = props;
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (queryName: string, optionName: string) => {
      const paramsString = params.toString();
      let value = qs.parse(paramsString); // value is in form of object
      let selectedValueArray: Array<string> = [];

      if (value?.[optionName]) {
        const queryString = value?.[optionName] as string;
        selectedValueArray = queryString?.split(",");
      }

      if (selectedValueArray.includes(queryName)) {
        selectedValueArray = selectedValueArray?.filter((v) => v !== queryName);
      } else {
        if (isMultiSelect) {
          selectedValueArray?.push(queryName);
        } else {
          selectedValueArray = [queryName];
        }
      }

      if (selectedValueArray?.length === 0) {
        delete value?.[optionName];
      } else {
        value = {
          ...value,
          [optionName]: selectedValueArray?.join(","),
        };
      }

      const updatedQuery = qs.stringify(value);

      router.push(`/?${updatedQuery}`);
    },
    [router, params]
  );

  return { handleClick };
};

export default useQueryParams;
