"use client";
import React, { useState, useMemo } from "react";
import ProjectLayout, { ManagerProfileModal } from "@/components/projects/ProjectLayout";
import { AppliedCard } from "@/components/projects/ui-blocks"; 
import { DEFAULT_MANAGER, ManagerInfo, Project } from "@/components/projects/data";
import { Loader2 } from "lucide-react";

// Redux & Utils
import { useGetMeQuery } from "@/app/redux/api/auth.api"; // 1. IMPORT THIS
import { useGetMyProposalsQuery } from "@/app/redux/api/proposals.api";
import { mapApiJobToUI } from "@/lib/utils/projectMapper";

export default function DisputePage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<ManagerInfo>(DEFAULT_MANAGER);

  // 2. GET CURRENT USER ID
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // 3. PASS ID TO QUERY (AND SKIP IF NOT READY)
  const { data: rawProposals, isLoading: isProposalsLoading } = useGetMyProposalsQuery(
    { freelancerId }, 
    { skip: !freelancerId }
  );

  const isLoading = isAuthLoading || isProposalsLoading;

  const disputeProjects = useMemo(() => {
    // Handle { data: [...] } vs [...] structure
    const list = Array.isArray(rawProposals) ? rawProposals : (rawProposals?.data || []);

    if (!list || list.length === 0) return [];
    
    return list
        .filter((p: any) => p.status === 'Dispute') 
        .map((p: any) => {
            const job = mapApiJobToUI(p.job || p.Job); // Handle casing
            return {
                ...job,
                status: "Dispute",
                disputeReason: p.disputeReason || "Payment or delivery conflict pending review.",
                appliedDate: new Date(p.createdAt).toLocaleDateString(),
                myBidAmount: p.bidAmount || p.proposedAmount,
                bidStatus: "Pending" // Disputes usually revert to a holding status
            } as Project;
        });
  }, [rawProposals]);

  return (
    <ProjectLayout>
      <ManagerProfileModal isOpen={managerModalOpen} onClose={() => setManagerModalOpen(false)} manager={selectedManager} />
      
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600"/></div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {/* Added explicit type ": Project" to prevent implicit any error */}
            {disputeProjects.map((project: Project) => (
            <AppliedCard 
                key={project.id} 
                project={project} 
                onViewManager={(m) => { setSelectedManager(m); setManagerModalOpen(true); }}
                onViewDetails={(p) => console.log("View details clicked", p)}
            />
            ))}
            {disputeProjects.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    No active disputes.
                </div>
            )}
        </div>
      )}
    </ProjectLayout>
  );
}