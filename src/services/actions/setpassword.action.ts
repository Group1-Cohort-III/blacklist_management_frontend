import { SetPasswordData } from "../../interfaces/action.interface";
import { constant } from "../../configs/constant.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { baseURL } = constant;

export const setPassword = createAsyncThunk(
  "setPassword",
  async (SetPasswordData: SetPasswordData) => {
    try {
      const resp = await axios.post(
        `${baseURL}Authentication/Set-Password`,
        SetPasswordData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = resp.data;
      // console.log("SUCCESS => ", data);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log("ERROR => ", error);
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);
