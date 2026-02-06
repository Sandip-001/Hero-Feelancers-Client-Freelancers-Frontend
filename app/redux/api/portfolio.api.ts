import { baseApi } from "./baseApi";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getMyPortfolio: builder.query<any, void>({
      query: () => ({
        url: "/api/portfolio",
        method: "GET",
      }),
      providesTags: ["Portfolio"],
    }),

    createProtfolio: builder.mutation<
      { message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/api/portfolio",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Portfolio"],
    }),

    deletePortfolio: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/api/portfolio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Portfolio"], 
    }),

    updateProtfolio: builder.mutation({
      query: ({formData, id}) => ({
        url: `/api/portfolio/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Portfolio"],
    }),

  }),
});

export const {
  useGetMyPortfolioQuery,
  useCreateProtfolioMutation,
  useDeletePortfolioMutation,
  useUpdateProtfolioMutation,
} = portfolioApi