"use client";
import React, { useState } from "react";
import ProjectLayout, {
  ManagerProfileModal,
} from "@/components/projects/ProjectLayout";
import { AwardedCard, SubmittedProposalView } from "@/components/projects/ui-blocks";
import {
  DEFAULT_MANAGER,
  ManagerInfo,
  Project,
} from "@/components/projects/data";
import { Loader2 } from "lucide-react";

// Redux & Utils
import { useGetMeQuery } from "@/app/redux/api/auth.api"; // 1. IMPORT THIS
import { useGetAwardedJobsForFreelancerQuery } from "@/app/redux/api/jobs.api";

export default function DisputePage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] =
    useState<ManagerInfo>(DEFAULT_MANAGER);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 2. GET CURRENT USER ID
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const freelancerId = authData?.user?.id;

  // 3. PASS ID TO QUERY (AND SKIP IF NOT READY)
  const { data: rawDisputeJobs, isLoading: isProposalsLoading } =
    useGetAwardedJobsForFreelancerQuery(
      { freelancerId, status: "dispute" },
      { skip: !freelancerId },
    );

  //console.log("Dispute raw Proposal", rawDisputeJobs?.data)

  const isLoading = isAuthLoading || isProposalsLoading;

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
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {rawDisputeJobs?.data.length > 0 ? (
            rawDisputeJobs?.data?.map((project: any) => (
              <AwardedCard
                key={project.id}
                project={project}
                onViewManager={(m) => {
                  setSelectedManager(m);
                  setManagerModalOpen(true);
                }}
                onViewDetails={(p: any) => setSelectedProject(p)}
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
