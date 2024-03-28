import { PASSWORD_REGEX } from "@/constants/regex";

export const getSelectedCategory = (strValues: string) => {
  if (!strValues) {
    return "";
  }

  //   TODO: do error handling later
  return strValues;
};

export const compareString = (str1: string, str2: string) => {
  if (!str1 || !str2) {
    return false;
  }
  return str1?.toLowerCase() === str2?.toLowerCase();
};

export const currencyNumberFormatter = (money: number) => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const humanReadableDateFormate = (timeStamp: string) => {
  const date = new Date(timeStamp);

  // Get individual date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const day = date.getDate();

  // Construct human-readable format
  const humanReadableFormat = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return humanReadableFormat;
};

export const isPasswordValid = (input: string) => {
  return !(
    PASSWORD_REGEX?.test(input) &&
    input?.length >= 8 &&
    input?.length <= 16
  );
};
