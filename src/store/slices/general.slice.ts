import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GeneralSliceData,
  ProdEditData,
} from "../../interfaces/slice.interface";

const initialState: GeneralSliceData = {
  product: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setProdEditData: (state, { payload }: PayloadAction<ProdEditData[]>) => {
        console.log("SLICE => ", payload);
      state.product = payload;
    },
  },
});

export const { setProdEditData } = generalSlice.actions;
export default generalSlice.reducer;
