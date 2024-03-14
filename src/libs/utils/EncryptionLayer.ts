import Cryptr from "cryptr";

declare global {
  var cryptrInstance: Cryptr | undefined;
}

// process.env.ENCRYPTION_KEY

const obj = globalThis?.cryptrInstance || new Cryptr("myTotallySecretKey");

const encryptData = (data: string) => {
  try {
    const encryptedString = obj.encrypt(data);
    return encryptedString;
  } catch (err) {
    console.log("Error while encrypting data: " + err);
  }
};

const decryptData = (data: string) => {
  try {
    const decryptedString = obj.decrypt(data);
    return decryptedString;
  } catch (err) {
    console.log("Error while decrypting data: " + err);
  }
};

export { encryptData, decryptData };
