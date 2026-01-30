"use client";
import { DEFAULT_MANAGER, ManagerInfo, Project } from "@/components/projects/data";
import ProjectLayout, { ManagerProfileModal } from "@/components/projects/ProjectLayout";
import { AppliedCard, SubmittedProposalView } from "@/components/projects/ui-blocks";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Added toaster import

// Redux Hooks
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { useGetJobByIdQuery } from "@/app/redux/api/jobs.api";
import { useGetMyProposalsQuery, useWithdrawProposalMutation } from "@/app/redux/api/proposals.api";
import { mapApiJobToUI } from "@/lib/utils/projectMapper";

// --- SUB-COMPONENT: Proposal Item ---
const ProposalItem = ({ proposal, onViewManager, onViewDetails, onWithdraw, isWithdrawing }: any) => {
    
    // FIX: Check for "Job" (Capital J from backend) OR "job" (lowercase fallback)
    const jobData = proposal.Job || proposal.job; 
    
    // Check if we have the actual job object with a title
    const hasJobDetails = jobData && typeof jobData === 'object' && jobData.title;
    
    // Get ID from the proposal root (jobId) or nested object
    const jobId = proposal.jobId || jobData?.id || jobData?._id;

    // Only fetch if we are strictly missing the details
    const { data: jobDetailsData, isLoading: isJobLoading } = useGetJobByIdQuery(jobId, {
        skip: hasJobDetails || !jobId
    });

    // Merge Logic: Use embedded "Job" data first, then fetched data
    const rawJob = hasJobDetails ? jobData : (jobDetailsData?.data || jobDetailsData || {});
    
    // Fallback while loading
    if (!hasJobDetails && isJobLoading) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }

    // Map to UI using your utility
    const baseJob = mapApiJobToUI(rawJob);
    
    // Normalize status
    const normalizeStatus = (backendStatus: string) => {
        if (!backendStatus) return "Applied";
        const lower = backendStatus.toLowerCase();
        if (lower === 'rejected' || lower === 'declined') return 'Declined';
        if (lower === 'awarded' || lower === 'accepted' || lower === 'hired') return 'Awarded';
        if (lower === 'withdrawn') return 'Withdrawn';
        return 'Applied';
    };

    const cleanStatus = normalizeStatus(proposal.status);

   const projectUI: Project = {
        // 1. Spread the base job details first (description, category, etc.)
        ...baseJob,

        // 2. Add the specific fields required by the Project interface
        id: jobId,
        proposalId: proposal._id || proposal.id,
        
        // Use title from the mapped job, or fallback to ID
        title: (baseJob.title && baseJob.title !== "Untitled Project") ? baseJob.title : `Job #${jobId}`,
        
        status: cleanStatus as any,
        appliedDate: new Date(proposal.createdAt || Date.now()).toLocaleDateString(),
        
        // Use 'proposedAmount' from proposal root, fallback to job budget if missing
        myBidAmount: proposal.proposedAmount ? `₹${proposal.proposedAmount}` : baseJob.budget,
        proposedDuration: proposal.duration || "N/A",
        coverLetter: proposal.coverLetter || "No cover letter.",
        
        // FIX: Cast this to 'any' to satisfy the strict type requirement
        bidStatus: cleanStatus as any
    };

    return (
        <AppliedCard 
            project={projectUI} 
            onViewManager={onViewManager} 
            onViewDetails={onViewDetails} 
            onWithdraw={onWithdraw} 
            isWithdrawing={isWithdrawing}
        />
    );
};

// --- MAIN PAGE COMPONENT ---
export default function AppliedPage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<ManagerInfo>(DEFAULT_MANAGER);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 1. Fetch Current User
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // 2. Fetch Proposals 
  // API Call: /api/job-proposals?freelancerId=9&status=applied
  const { 
    data: rawProposals, 
    isLoading: isProposalsLoading, 
    refetch 
  } = useGetMyProposalsQuery(
    { freelancerId, status: 'applied' }, 
    {
      skip: !freelancerId, 
      refetchOnMountOrArgChange: true,
    }
  );

  const isLoading = isAuthLoading || isProposalsLoading;

  // 3. Withdraw Mutation
  const [withdrawProposal, { isLoading: isWithdrawing }] = useWithdrawProposalMutation();

  const handleWithdraw = async (proposalId: string | number) => {
    if (!confirm("Are you sure you want to withdraw this proposal?")) return;

    try {
        await withdrawProposal(proposalId).unwrap();
        toast.success("Proposal Withdrawn Successfully."); // Replaced alert
        refetch(); 
    } catch (error: any) {
        console.error("Withdraw Error:", error);
        toast.error(error?.data?.message || "Failed to withdraw."); // Replaced alert
        refetch();
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

  // Handle { total: 1, data: [...] } structure
  const proposalsList = Array.isArray(rawProposals) 
    ? rawProposals 
    : (rawProposals?.data || []);

  return (
    <ProjectLayout>
      <ManagerProfileModal isOpen={managerModalOpen} onClose={() => setManagerModalOpen(false)} manager={selectedManager} />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-indigo-600 w-8 h-8"/>
            <p className="text-sm text-gray-400">Loading your applications...</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {proposalsList.length > 0 ? (
                proposalsList.map((proposal: any, index: number) => (
                    <ProposalItem 
                        key={proposal._id || proposal.id || index}
                        proposal={proposal}
                        onViewManager={(m: any) => { setSelectedManager(m); setManagerModalOpen(true); }}
                        onViewDetails={(p: any) => setSelectedProject(p)}
                        onWithdraw={() => handleWithdraw(proposal._id || proposal.id)}
                        isWithdrawing={isWithdrawing}
                    />
                ))
            ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <AlertCircle className="text-gray-400 w-6 h-6" />
                    </div>
                    <h3 className="text-gray-900 font-medium">No active applications</h3>
                    <p className="text-gray-500 text-sm mt-1">You haven't applied to any jobs yet.</p>
                </div>
            )}
        </div>
      )}
    </ProjectLayout>
  );
}