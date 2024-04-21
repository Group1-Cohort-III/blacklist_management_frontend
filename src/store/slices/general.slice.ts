import { Blacklist, Product, User } from "../../interfaces/services.interface";
import { GeneralSliceData } from "../../interfaces/slice.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GeneralSliceData = {
  products: [],
  blacklist: [],
  users: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setBlacklist: (state, { payload }: PayloadAction<Blacklist[]>) => {
      state.blacklist = payload;
    },
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload;
    },
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setBlacklist, setProducts, setUsers, reset } =
  generalSlice.actions;
export default generalSlice.reducer;
