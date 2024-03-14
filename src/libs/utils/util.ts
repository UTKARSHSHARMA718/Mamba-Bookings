export const getSelectedCategory = (strValues: string) => {
  if (!strValues) {
    return "";
  }
  console.log({ strValues, vv: strValues.split(",") });
//   TODO: do error handling later
  return strValues;
};
