"use client";
import React, { useState, useMemo } from "react";
import ProjectLayout, {
  ManagerProfileModal,
} from "@/components/projects/ProjectLayout";
import {
  AppliedCard,
  SubmittedProposalView,
} from "@/components/projects/ui-blocks";
import {
  DEFAULT_MANAGER,
  ManagerInfo,
  Project,
} from "@/components/projects/data";
import { Loader2 } from "lucide-react";

// Redux & Utils
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { useGetMyProposalsQuery } from "@/app/redux/api/proposals.api";

export default function DeclinedPage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] =
    useState<ManagerInfo>(DEFAULT_MANAGER);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 1. Get Current User
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // 2. Pass ID to Query
  const { data: rawProposals, isLoading: isProposalsLoading } =
    useGetMyProposalsQuery(
      { freelancerId, status: "rejected" },
      { skip: !freelancerId },
    );

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
          {rawProposals?.data.map((project: Project) => (
            <AppliedCard
              key={project.id}
              project={project}
              onViewManager={(m) => {
                setSelectedManager(m);
                setManagerModalOpen(true);
              }}
              onViewDetails={(p: any) => setSelectedProject(p)}
            />
          ))}
          {rawProposals?.data.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
              No declined proposals. Great job!
            </div>
          )}
        </div>
      )}
    </ProjectLayout>
  );
}
