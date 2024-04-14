import { AuthSliceData } from "../../interfaces/slice.interface";
import { loginUser } from "../../services/actions/login.action";
import { createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../utils/crypto.util";

const initialState: AuthSliceData = {
  isAuth: false,
  isError: false,
  token: null,
  isExpired: false,
  isLoading: false,
  error: null,
  success: false,
  message: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMsg: (state) => {
      state.message = null;
      state.status = null;
      state.isError = false;
      state.success = false;
    },
    setIsExpired: (state) => {
      state.isExpired = true;
    },
    logoutUser: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isAuth = payload.succeeded;
        state.token = payload.data ? encrypt(payload.data.jwToken) : null;
        state.isLoading = false;
        state.success = payload.succeeded;
        state.message = payload.message;
        state.status = payload.statusCode;
        state.isExpired = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })

      .addCase(loginUser.rejected, (state, { error }) => {
        // console.log("Auth Slice = ", error);
        const statusCode = error.code || 400;
        const errorMsg = error.message || "An error occurred!";
        state.isAuth = false;
        state.isLoading = false;
        state.isError = true;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      });
  },
});

export const { logoutUser, setIsExpired, resetMsg } = authSlice.actions;
export default authSlice.reducer;
