
import { baseApi } from "./baseApi";

export const ctaEnquiryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createEnquiry: builder.mutation({
            query: (body) => ({
                url: "/api/cta-enquiry",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CTAEnquiry"],
        }),
    }),
});

export const {
    useCreateEnquiryMutation,
} = ctaEnquiryApi;