import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import SetPasswordReducer from "./slices/setpassword.slice";
import storage from "redux-persist/lib/storage";
import baseApi from "../services/base.api";
import AuthReducer from "./slices/auth.slice";
import GeneralReducer from "./slices/general.slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: AuthReducer,
  setPassword: SetPasswordReducer,
  general: GeneralReducer,
});

const persistConfig = {
  key: "blackguard",
  version: 1,
  storage,
  // Avoid RTK Query Cache Data persisted
  blacklist: [baseApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
});

// Setup listeners
setupListeners(store.dispatch);

export const persistor = persistStore(store);
