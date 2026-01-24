
import { FreelancerRegisterPayload, LoginPayload, VerifyOtpPayload } from "@/types/auth";
import { baseApi } from "./baseApi";

export const freelancerAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerFreelancer: builder.mutation<
      { message: string; status: string },
      FormData
    >({
      query: (formData) => ({
        url: "/api/freelancer/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    verifyFreelancerOtp: builder.mutation<
      { message: string; user: any },
      VerifyOtpPayload
    >({
      query: (body) => ({
        url: "/api/freelancer/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    resendFreelancerOtp: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/api/freelancer/resend-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginFreelancer: builder.mutation<
      { message: string, user: any },
      LoginPayload
    >({
      query: (body) => ({
        url: "/api/freelancer/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutFreelancer: builder.mutation<
      { message: string },
      void
    >({
      query: () => ({
        url: "/api/freelancer/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterFreelancerMutation,
  useVerifyFreelancerOtpMutation,
  useResendFreelancerOtpMutation,
  useLoginFreelancerMutation,
  useLogoutFreelancerMutation,
} = freelancerAuthApi;
