
import { baseApi } from "./baseApi";

export const newsLetterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createNewsLetter: builder.mutation({
            query: (body) => ({
                url: "/api/newsletter/subscribe",
                method: "POST",
                body,
            }),
            invalidatesTags: ["NewsLetter"],
        }),
    }),
});

export const {
    useCreateNewsLetterMutation,
} = newsLetterApi;