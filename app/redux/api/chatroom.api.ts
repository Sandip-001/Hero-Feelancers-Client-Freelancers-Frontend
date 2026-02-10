import { baseApi } from "./baseApi";

export const chatRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChatRoom: builder.mutation({
      query: (body) => ({
        url: "/api/chat-room",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chatroom"],
    }),
    getchatrooms: builder.query({
      query: ({ userId, userType }) =>
        `api/chat-room?userId=${userId}&userType=${userType}`,
      providesTags: ["Chatroom"],
    }),
  }),
});

export const { useGetchatroomsQuery, useCreateChatRoomMutation } = chatRoomApi;
