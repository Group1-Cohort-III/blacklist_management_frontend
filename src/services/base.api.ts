import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { ValidateTokenResp } from "../interfaces/services.interface";
import type { RootState } from "../interfaces/store.interface";
import { logoutUser, setIsExpired } from "../store/slices/auth.slice";
import { constant } from "../configs/constant.config";
import { isTokenExpired } from "../utils/jwt.util";
import { decrypt } from "../utils/crypto.util";
import { REHYDRATE } from "redux-persist";
import { Mutex } from "async-mutex";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${constant.baseURL}/`,
  prepareHeaders: (headers, { getState }) => {
    const cypherToken = (getState() as RootState).auth.token;
    if (cypherToken) {
      headers.set("Authorization", `Bearer ${decrypt(cypherToken)}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQueryWithRetry(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const cypherToken = (api.getState() as RootState).auth.token;

        if (cypherToken) {
          const validateTokenResult = await baseQuery(
            {
              url: "Authentication/Validate-Token",
              method: "POST",
              body: {
                token: decrypt(cypherToken),
              },
            },
            api,
            extraOptions
          );

          const isExpired = isTokenExpired(cypherToken);
          const result = validateTokenResult as ValidateTokenResp;

          const { succeeded, statusCode } = result;

          if (!succeeded || statusCode === 400 || isExpired) {
            await baseQuery(
              {
                url: "Authentication/Logout",
                method: "POST",
              },
              api,
              extraOptions
            );

            api.dispatch(setIsExpired());
            api.dispatch(logoutUser());
          }
        } else {
          api.dispatch(logoutUser());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithRetry(args, api, extraOptions);
    }
  }
  return result;
};

// this baseApi allows for code splitting
const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Blacklists", "Products"],
  endpoints: () => ({}),
  // persistence and rehydration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action: any, { reducerPath }): any {
    if (action.type === REHYDRATE) {
      return action?.payload?.[reducerPath];
    }
  },
  keepUnusedDataFor: 30,
});

export default baseApi;
