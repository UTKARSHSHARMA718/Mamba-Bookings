import Cryptr from "cryptr";

declare global {
  var cryptrInstance: Cryptr | undefined;
}

// process.env.ENCRYPTION_KEY

const obj = globalThis?.cryptrInstance || new Cryptr("myTotallySecretKey");

const encryptData = (data: string) => {
  try {
    // TODO: make this thing work currently it is taking too much time/not performant
    // const encryptedString = obj.encrypt(data);
    // return encryptedString;
    return data;
  } catch (err) {
    console.log("Error while encrypting data: " + err);
  }
};

const decryptData = (data: string) => {
  try {
    // const decryptedString = obj.decrypt(data);
    // return decryptedString;
    return data;
  } catch (err) {
    console.log("Error while decrypting data: " + err);
  }
};

export { encryptData, decryptData };
