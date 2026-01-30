import { baseApi } from "./baseApi";

export const bookmarksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Get All Bookmarks
    // Matches Postman: GET {{baseurl}}/api/job-bookmarks
    getBookmarks: builder.query<any, void>({
      query: () => ({
        url: "/api/job-bookmarks",
        method: "GET",
      }),
      providesTags: ["Bookmarks"],
    }),

    // 2. Add Bookmark
    // Matches Postman: POST {{baseurl}}/api/job-bookmarks
    // Body: { "jobId": 2 }
    addBookmark: builder.mutation<any, { jobId: number | string }>({
      query: (body) => ({
        url: "/api/job-bookmarks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookmarks"], 
    }),

    // 3. Remove Bookmark
    // Matches Postman: DELETE {{baseurl}}/api/job-bookmarks/:id
    removeBookmark: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/api/job-bookmarks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmarks"], 
    }),

  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarksApi;