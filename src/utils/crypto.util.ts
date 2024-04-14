import { constant } from "../configs/constant.config";
import * as CryptoJS from "crypto-js";

const { cryptoKey } = constant;

export const encrypt = (message: string) =>
  CryptoJS.AES.encrypt(message, cryptoKey).toString();

export const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, cryptoKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
