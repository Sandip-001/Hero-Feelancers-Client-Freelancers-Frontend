import { baseApi } from "./baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- QUERIES (GET) ---

    // 1. Get Client's Own Jobs (For Client Dashboard)
    getClientJobs: builder.query<any, void>({
      query: () => "/api/jobs/my-jobs",
      providesTags: ["Jobs"],
    }),

    // 2. Get Freelancer Visible Active Jobs (For Freelancer Find Work Page)
    getFreelancerJobs: builder.query<any, void>({
      query: () => "/api/jobs/freelancer/visible-jobs",
      providesTags: ["Jobs"],
    }),

    // 3. Get Single Job Details (For Job Details Page / Edit Page)
    getJobById: builder.query<any, string | number>({
      query: (id) => `/api/jobs/${id}`,
      providesTags: ["Jobs"],
    }),

    getAwardedJobsForFreelancer: builder.query({
      query: ({ freelancerId, status }) =>
        `api/jobs?freelancerId=${freelancerId}&status=${status}`,
      providesTags: ["Jobs"],
    }),

    // --- MUTATIONS (POST/PUT/DELETE) ---

    // 4. Create Job (Client)
    createJob: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/jobs/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 5. Update Job (Client)
    // Supports both JSON and FormData (for file updates)
    updateJob: builder.mutation<
      any,
      { id: number | string; data: FormData | any }
    >({
      query: ({ id, data }) => ({
        url: `/api/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 6. Delete Job (Client)
    deleteJob: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/api/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 7. Assign Freelancer / Award Job (Client)
    assignFreelancer: builder.mutation<
      any,
      { jobId: string | number; freelancerId: string | number }
    >({
      query: (body) => ({
        url: "/api/jobs/award",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 8. Generate Job Description via AI (Client)
    generateJobDescription: builder.mutation<
      any,
      { title: string}
    >({
      query: (body) => ({
        url: "/api/ai/generate-job-description", // Maps to: "generate job description through ai"
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // 9. Toggle Bookmark Job (Freelancer)
    toggleBookmark: builder.mutation<any, string | number>({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/bookmark`,
        method: "POST", // or PUT depending on backend
      }),
      invalidatesTags: ["Jobs"],
    }),

    getCurrenices: builder.query({
      query: () => "/api/currency",
      providesTags: ["Jobs"],
    }),
  }),
});

export const {
  // Queries
  useGetClientJobsQuery,
  useGetFreelancerJobsQuery,
  useGetJobByIdQuery,

  useGetAwardedJobsForFreelancerQuery,

  // Mutations
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useAssignFreelancerMutation,
  useGenerateJobDescriptionMutation,
  useToggleBookmarkMutation,
  useGetCurrenicesQuery,
} = jobsApi;
