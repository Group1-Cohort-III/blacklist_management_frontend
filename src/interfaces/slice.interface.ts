import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UserData {
  userId: string;
  email: string;
  given_name: string;
  role: "BlackListAdmin" | "UserAdmin";
}

export interface AuthSliceData {
  isAuth: boolean;
  isError: boolean;
  token: string | null;
  isExpired: boolean;
  isLoading: boolean;
  error: SerializedError | null | AxiosError;
  success: boolean;
  message: string | null;
  status: number | null;
}

export interface SetPasswordSliceData {
  isLoading: boolean;
  error: SerializedError | null | AxiosError;
  success: boolean;
  message: string | null;
  status: number | null;
}

export interface ProdEditData {
  ph: string;
  value: string;
}

export interface GeneralSliceData {
  product: ProdEditData[];
}
