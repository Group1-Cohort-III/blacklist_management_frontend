import {
  BlacklistCriteria,
  BlacklistParams,
  BlacklistResp,
  GetABlacklistResp,
  GetAllBlacklistParams,
  GetAllBlacklistResp,
  RemoveBlacklistParam,
  RemoveBlacklistResp,
} from "../interfaces/services.interface";
import { queryString } from "../utils/query.util";
import baseApi from "./base.api";

const blacklistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // BLACKLIST A PRODUCT
    blacklist: builder.mutation<BlacklistResp, BlacklistParams>({
      query: (requestData) => ({
        url: `Blacklist/blacklist-product`,
        method: "POST",
        body: requestData,
      }),
      transformResponse: (response: BlacklistResp) => response,
      transformErrorResponse: (response) => response,
      invalidatesTags: ["Blacklists"],
    }),
    // GET ALL BLACKLISTED PRODUCTS
    getAllBlacklist: builder.query<GetAllBlacklistResp, GetAllBlacklistParams>({
      query: (requestData) => queryString(requestData),
      transformResponse: (response: GetAllBlacklistResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Blacklists"],
    }),
    // GET A SINGLE BLACKLISTED PRODUCT
    getABlacklist: builder.query<GetABlacklistResp, string>({
      query: (id) => `Blacklist/get-blacklisted-product?blacklistId=${id}`,
      transformResponse: (response: GetABlacklistResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Blacklists"],
    }),
    // REMOVE A PRODUCT FROM BLACKLIST
    removeBlacklist: builder.mutation<
      RemoveBlacklistResp,
      RemoveBlacklistParam
    >({
      query: (requestData) => ({
        url: `Blacklist/remove`,
        method: "PUT",
        body: requestData,
      }),
      transformResponse: (response: RemoveBlacklistResp) => response,
      transformErrorResponse: (response) => response,
      invalidatesTags: ["Blacklists"],
    }),
    // GET ALL CRITERIA FOR BLACKLISTING
    getBlacklistCriteria: builder.query<BlacklistCriteria[], void>({
      query: () => `BlacklistCriteria/get-blacklist-criterias`,
      transformResponse: (response: BlacklistCriteria[]) => response,
      transformErrorResponse: (response) => {
        return response;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useBlacklistMutation,
  useGetABlacklistQuery,
  useGetAllBlacklistQuery,
  useLazyGetAllBlacklistQuery,
  useRemoveBlacklistMutation,
  useGetBlacklistCriteriaQuery
} = blacklistApi;

export default blacklistApi;
