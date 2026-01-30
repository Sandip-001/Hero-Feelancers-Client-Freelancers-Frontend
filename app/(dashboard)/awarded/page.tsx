"use client";
import { DEFAULT_MANAGER, ManagerInfo, Project } from "@/components/projects/data";
import ProjectLayout, { ManagerProfileModal } from "@/components/projects/ProjectLayout";
import { AwardedCard } from "@/components/projects/ui-blocks";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

// Redux & Utils
import { useGetMeQuery } from "@/app/redux/api/auth.api"; // 1. IMPORT THIS
import { useGetMyProposalsQuery } from "@/app/redux/api/proposals.api";
import { mapApiJobToUI } from "@/lib/utils/projectMapper";

export default function AwardedPage() {
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

  // 4. Filter & Map
  const awardedProjects = useMemo(() => {
    // Handle { data: [...] } or [...] structure
    const list = rawProposals?.data || rawProposals;
    
    if (!list || !Array.isArray(list)) return [];
    
    return list
        // Filter for 'Accepted' status (Backend usually uses 'Accepted' for awarded jobs)
        .filter((p: any) => p.status === 'Accepted' || p.status === 'Awarded') 
        .map((p: any) => {
            const job = mapApiJobToUI(p.job || p.Job); // Check lowercase or uppercase
            return {
                ...job,
                status: "Awarded", // Force UI status
                appliedDate: new Date(p.createdAt).toLocaleDateString(),
                myBidAmount: p.bidAmount || p.proposedAmount, // Fallback for amount
                bidStatus: "Accepted"
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
            {awardedProjects.length > 0 ? (
                awardedProjects.map((project) => (
                    <AwardedCard 
                        key={project.id} 
                        project={project} 
                        onViewManager={(m) => { setSelectedManager(m); setManagerModalOpen(true); }}
                    />
                ))
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    <p>You haven't been awarded any projects yet.</p>
                    <p className="text-xs mt-1">Keep applying to new jobs!</p>
                </div>
            )}
        </div>
      )}
    </ProjectLayout>
  );
}