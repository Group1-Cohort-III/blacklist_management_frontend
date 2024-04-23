import { JwtPayload } from "jwt-decode";

export interface DecodedUserType extends JwtPayload {
  email: string;
  given_name: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export interface OptType {
  [key: string]: boolean;
}

export interface DecodedUserData {
  email: string;
  given_name: string;
  role: string;
}

export interface RTKError {
  status: string;
  error: string;
}

export interface RTKUpdErr {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

export interface InputValueType {
  [key: string]: string;
}
