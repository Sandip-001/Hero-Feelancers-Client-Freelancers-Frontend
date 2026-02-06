"use client";
import {
  DEFAULT_MANAGER,
  ManagerInfo,
  Project,
} from "@/components/projects/data";
import ProjectLayout, {
  ManagerProfileModal,
} from "@/components/projects/ProjectLayout";
import {
  AppliedCard,
  SubmittedProposalView,
} from "@/components/projects/ui-blocks";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Added toaster import

// Redux Hooks
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import {
  useGetMyProposalsQuery,
  useWithdrawProposalMutation,
} from "@/app/redux/api/proposals.api";

export default function AppliedPage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] =
    useState<ManagerInfo>(DEFAULT_MANAGER);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null);

  // 1. Fetch Current User
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // 2. Fetch Proposals
  // API Call: /api/job-proposals?freelancerId=9&status=applied
  const {
    data: rawProposals,
    isLoading: isProposalsLoading,
    refetch,
  } = useGetMyProposalsQuery(
    { freelancerId, status: "applied" },
    {
      skip: !freelancerId,
      refetchOnMountOrArgChange: true,
    },
  );

  const isLoading = isAuthLoading || isProposalsLoading;

  // 3. Withdraw Mutation
  const [withdrawProposal, { isLoading: isWithdrawing }] =
    useWithdrawProposalMutation();

  const handleWithdraw = async (proposalId: number) => {
    if (!confirm("Are you sure you want to withdraw this proposal?")) return;
    
    try {
      setWithdrawingId(proposalId);
      await withdrawProposal(proposalId).unwrap();
      toast.success("Proposal withdrawn successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to withdraw");
    } finally {
      setWithdrawingId(null);
    }
  };

  if (selectedProject) {
    return (
      <ProjectLayout hideSidebars={true}>
        <SubmittedProposalView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout>
      <ManagerProfileModal
        isOpen={managerModalOpen}
        onClose={() => setManagerModalOpen(false)}
        manager={selectedManager}
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
          <p className="text-sm text-gray-400">Loading your applications...</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {rawProposals?.data.length > 0 ? (
            rawProposals?.data?.map((proposal: any, index: number) => (
              <AppliedCard
                key={proposal.id || index}
                project={proposal}
                onViewManager={(m: any) => {
                  setSelectedManager(m);
                  setManagerModalOpen(true);
                }}
                onViewDetails={(p: any) => setSelectedProject(p)}
                onWithdraw={() => handleWithdraw(proposal.id)}
                isWithdrawing={isWithdrawing}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
              <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="text-gray-400 w-6 h-6" />
              </div>
              <h3 className="text-gray-900 font-medium">
                No active applications
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                You haven't applied to any jobs yet.
              </p>
            </div>
          )}
        </div>
      )}
    </ProjectLayout>
  );
}
