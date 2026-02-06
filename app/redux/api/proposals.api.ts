  import { baseApi } from "./baseApi";

  export const proposalsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
      // 1. Create Proposal (Freelancer)
      createProposal: builder.mutation<any, any>({
        query: (body) => ({
          url: "/api/job-proposals",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Jobs"],
      }),

      // 2. Withdraw Proposal (Freelancer)
      withdrawProposal: builder.mutation<any, string | number>({
        query: (id) => ({
          url: `/api/job-proposals/${id}/withdraw`,
          method: "PUT",
        }),
        invalidatesTags: ["Jobs"],
      }),

      // 3. Reject Proposal (Client)
      rejectProposal: builder.mutation<any, string | number>({
        query: (id) => ({
          url: `/api/job-proposals/${id}/reject`,
          method: "PUT",
        }),
        invalidatesTags: ["Jobs"],
      }),

      // 4. Get Proposals by Job ID (Client View)
      getProposalsByJobId: builder.query<any, string | number>({
        query: (jobId) => ({
          url: `/api/job-proposals/job/${jobId}`,
          method: "GET",
        }),
        providesTags: ["Jobs"],
      }),

      getproposalByJobIdandFreelacnerId: builder.query({
        query: ({jobId, freelancerId}) => ({
          url: `/api/job-proposals/proposal/${jobId}/${freelancerId}`,
          method: "GET"
        }),
        providesTags: ["Jobs"],
      }),

      // 5. Get My Proposals (Freelancer View)
      // Matches Postman: /api/job-proposals?freelancerId=9&status=applied
      getMyProposals: builder.query<any, { freelancerId: string | number; status?: string }>({
      query: ({ freelancerId, status }) => {
        // Construct query parameters
        console.log("Fetching proposals with:", { freelancerId, status });
        const params = new URLSearchParams();
        if (freelancerId) params.append("freelancerId", freelancerId.toString());
        if (status) params.append("status", status);
        
        return {
          url: `/api/job-proposals?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Jobs"],
    }),

      // 6. Assign Freelancer (Award Job)
      assignFreelancer: builder.mutation<any, { jobId: string | number; freelancerId: string | number }>({
        query: (body) => ({
          url: "/api/jobs/award", 
          method: "POST",
          body,
        }),
        invalidatesTags: ["Jobs"],
      }),

      // 7. Generate AI Proposal
      generateProposal: builder.mutation<any, { jobDescription: string }>({
        query: (body) => ({
          url: "/api/ai/generate-proposal",
          method: "POST",
          body,
        }),
      }),
    }),
  });

  export const {
    useCreateProposalMutation,
    useWithdrawProposalMutation,
    useRejectProposalMutation,
    useGetProposalsByJobIdQuery,
    useGetMyProposalsQuery,
    useAssignFreelancerMutation,
    useGenerateProposalMutation,

    useGetproposalByJobIdandFreelacnerIdQuery,
  } = proposalsApi;