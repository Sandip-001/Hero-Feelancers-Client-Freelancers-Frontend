import { baseApi } from "./baseApi";


export const chatMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getchatHistory: builder.query({
      query: ({ chatId }) =>
        `api/chat/chat-room/${chatId}`,
      providesTags: ["ChatMessage"],
    }),
  }),
});

export const { useGetchatHistoryQuery } = chatMessageApi

