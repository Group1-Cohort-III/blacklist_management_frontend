import { SetPasswordSliceData } from "../../interfaces/slice.interface";
import { setPassword } from "../../services/actions/setpassword.action";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SetPasswordSliceData = {
  isLoading: false,
  error: null,
  success: false,
  message: null,
  status: null,
};

const setPasswordSlice = createSlice({
  name: "setpassword",
  initialState,
  reducers: {
    resetMsg: (state) => {
      state.message = null;
      state.status = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.success = payload.succeeded;
        state.message = payload.message;
        state.status = payload.statusCode;
      })

      .addCase(setPassword.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(setPassword.rejected, (state, { error }) => {
        const statusCode = error.code || 400;
        const errorMsg = error.message || "An error occurred!";
        state.isLoading = false;
        state.error = error;
        state.status = +(statusCode as string);
        state.message = errorMsg as string;
      });
  },
});

export const { resetMsg, resetSuccess } = setPasswordSlice.actions;
export default setPasswordSlice.reducer;
