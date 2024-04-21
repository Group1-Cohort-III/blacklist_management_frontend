import {
  CreateProductParams,
  CreateProductResp,
  DeleteProductResp,
  GetAProductResp,
  GetAllProductsParams,
  GetAllProductsResp,
  UpdateProductParams,
  UpdateProductResp,
} from "../interfaces/services.interface";
import baseApi from "./base.api";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE A PRODUCT
    createProduct: builder.mutation<CreateProductResp, CreateProductParams>({
      query: (requestData) => ({
        url: `Product`,
        method: "POST",
        body: requestData,
      }),
      transformResponse: (response: CreateProductResp) => response,
      transformErrorResponse: (response) => response,
      invalidatesTags: ["Products"],
    }),
    // GET ALL PRODUCTS
    getAllProducts: builder.query<GetAllProductsResp, GetAllProductsParams>({
      query: ({ perPage, page }) => `Product?perPage=${perPage}&page=${page}`,
      transformResponse: (response: GetAllProductsResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Products", "Blacklists"],
    }),
    // GET A SINGLE PRODUCT
    getAProduct: builder.query<GetAProductResp, string>({
      query: (id) => `Product/${id}`,
      transformResponse: (response: GetAProductResp) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["Products"],
    }),
    // UPDATE A PRODUCT
    updateProduct: builder.mutation<UpdateProductResp, UpdateProductParams>({
      query: ({ productName, productDescription, id }) => ({
        url: `Product/${id}`,
        method: "PUT",
        body: { productName, productDescription },
      }),
      transformResponse: (response: UpdateProductResp) => response,
      transformErrorResponse: (response) => response,
      invalidatesTags: ["Products"],
    }),
    // DELETE A PRODUCT
    deleteProduct: builder.mutation<DeleteProductResp, string>({
      query: (id) => ({
        url: `Product/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: DeleteProductResp) => {
        console.log("ResDEL => ", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log("ErrDEL => ", response);
        return response;
      },
      invalidatesTags: ["Products"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetAProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
