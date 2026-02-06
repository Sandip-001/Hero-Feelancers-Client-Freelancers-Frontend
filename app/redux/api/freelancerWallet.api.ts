import { baseApi } from "./baseApi";

export const freelancerWalletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getMyWalletDetails: builder.query<any, void>({
      query: () => ({
        url: "/api/freelancer-wallet",
        method: "GET",
      }),
      providesTags: ["FreelancerWallet"],
    }),

  }),
});

export const {
  useGetMyWalletDetailsQuery
} = freelancerWalletApi;