import countries from "world-countries";

const allCountries = countries?.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    latlgn: country.latlng,
    region: country.region,
    flag: country.flag,
  };
});

const useCountryInfo = () => {
  const getAll = () => allCountries;

  const getCountryByValue = (value: string) => {
    return allCountries?.filter((item) => {
      return item?.value === value;
    });
  };

  return {
    getAll,
    getCountryByValue,
  };
};

export default useCountryInfo;
