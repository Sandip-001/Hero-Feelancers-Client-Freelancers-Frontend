
import { ClientRegisterPayload, LoginPayload, VerifyOtpPayload } from "@/types/auth";
import { baseApi } from "./baseApi";
import { log } from "console";

export const clientAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerClient: builder.mutation<
      { message: string; status: string },
      ClientRegisterPayload
    >({
      query: (body) => ({
        url: "/api/client/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    verifyClientOtp: builder.mutation<
      { message: string; user: any },
      VerifyOtpPayload
    >({
      query: (body) => ({
        url: "/api/client/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    resendClientOtp: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/api/client/resend-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginClient: builder.mutation<
      { message: string; profieCompletion: number, user: any },
      LoginPayload
    >({
      query: (body) => ({
        url: "/api/client/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutClient: builder.mutation<
      { message: string },
      void
    >({
      query: () => ({
        url: "/api/client/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  
});

export const {
  useRegisterClientMutation,
  useVerifyClientOtpMutation,
  useResendClientOtpMutation,
  useLoginClientMutation,
  useLogoutClientMutation,
} = clientAuthApi;