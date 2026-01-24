import { baseApi } from "./baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<
      { user: any; role: "client" | "freelancer" },
      void
    >({
      query: () => "/api/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetMeQuery } = authApi;
