import { baseApi } from "./baseApi";

export const freelancerWalletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getMyClientWalletDetails: builder.query<any, void>({
      query: () => ({
        url: "/api/client-wallet",
        method: "GET",
      }),
      providesTags: ["ClientWallet"],
    }),

  }),
});

export const {
  useGetMyClientWalletDetailsQuery
} = freelancerWalletApi;