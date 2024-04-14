import { DecodedUserType } from "../interfaces/generic.interface";
import { UserData } from "../interfaces/slice.interface";
import { decrypt } from "./crypto.util";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (cypherToken: string | null): boolean => {
  if (!cypherToken) {
    return true;
  }

  try {
    const token = decrypt(cypherToken);
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimeInSeconds;
  } catch (error) {
    return true;
  }
};

export const decodeUserData = (cypherToken: string): UserData | null => {
  try {
    const token = decrypt(cypherToken);
    const decodedToken = jwtDecode<DecodedUserType>(token);

    return {
      userId: decodedToken.sub as string,
      email: decodedToken.email,
      given_name: decodedToken.given_name,
      role: decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] as "BlackListAdmin" | "UserAdmin",
    };
  } catch (error) {
    return null;
  }
};
