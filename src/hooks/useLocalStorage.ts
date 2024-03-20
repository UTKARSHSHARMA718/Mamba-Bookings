import { encryptData, decryptData } from "@/libs/utils/EncryptionLayer";

const useLocalStoarge = () => {
  const storeValues = (key: string, value: any) => {
    try {
      let updatedvalue: string = JSON.stringify(value);
      updatedvalue = encryptData(updatedvalue) as string;
      window.localStorage.setItem(key, updatedvalue);
    } catch (err) {
      console.log("Error while storing data to local storage: " + err);
    }
  };

  const getValues = (key: string) => {
    try {
      let data = window.localStorage.getItem(key) as string;
      data = decryptData(data) as string;
      return JSON.parse(data);
    } catch (err) {
      console.log("Error while retieving data from local storage: " + err);
    }
  };

  const removeItems = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.log("Error while removing data from local storage: " + err);
    }
  };

  return { storeValues, getValues, removeItems };
};

export default useLocalStoarge;
