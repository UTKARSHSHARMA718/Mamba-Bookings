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
