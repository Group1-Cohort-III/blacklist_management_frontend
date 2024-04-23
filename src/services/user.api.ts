import {
  CreateUserParams,
  CreateUserResp,
  GetAllUsersParams,
  GetAllUsersResp,
  GetUserResp,
  UpdateUserParams,
} from "../interfaces/services.interface";
import baseApi from "./base.api";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE A USER
    createUser: builder.mutation<CreateUserResp, CreateUserParams>({
      query: (requestData) => ({
        url: `UserAdmin/CreateUser`,
        method: "POST",
        body: requestData,
      }),
      transformResponse: (response: CreateUserResp) => response,
      transformErrorResponse: (response) => response,
      invalidatesTags: ["Users"],
    }),
    // GET ALL USERS
    getAllUsers: builder.query<GetAllUsersResp, GetAllUsersParams>({
      query: ({ perPage, page }) =>
        `UserAdmin/Get-All-Users?page=${page}&perPage=${perPage}`,
      transformResponse: (response: GetAllUsersResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Users"],
    }),
    // GET A USER
    getUser: builder.query<GetUserResp, string>({
      query: (email) => `UserAdmin/GetUserByEmail?emailAddress=${email}`,
      transformResponse: (response: GetUserResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Users"],
    }),
    // UPDATE USER
    updateUser: builder.mutation<string, UpdateUserParams>({
      query: (requestData) => ({
        url: `UserAdmin/updateUser`,
        method: "PUT",
        body: requestData,
      }),
      transformResponse: (response: string) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Users"],
    }),
    // DELETE A USER
    deleteUser: builder.mutation<string, string>({
      query: (email) => ({
        url: `UserAdmin/deleteUser?emailAddress=${email}`,
        method: "DELETE",
      }),
      transformResponse: (response: string) => {
        return response;
      },
      transformErrorResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = userApi;

export default userApi;
