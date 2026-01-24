import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // 🔥 REQUIRED for auth cookies
  }),
  tagTypes: ["Auth", "Jobs", "NewsLetter", "CTAEnquiry"],
  endpoints: () => ({}),
});