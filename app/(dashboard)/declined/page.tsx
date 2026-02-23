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
  const [filters, setFilters] = useState({
    categories: [] as string[],
    jobTypes: [] as string[],
  });

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

  const allCategories = useMemo(() => {
    const techSet = new Set<string>();

    rawProposals?.data?.forEach((proposal: any) => {
      proposal.Job?.technologies?.forEach((tech: string) => {
        techSet.add(tech);
      });
    });

    return Array.from(techSet).sort();
  }, [rawProposals?.data]);

  const filteredProjects = useMemo(() => {
    const proposals = rawProposals?.data || [];

    return proposals.filter((proposal: any) => {
      const job = proposal.Job;

      // CATEGORY FILTER
      if (filters.categories.length > 0) {
        const hasCategory = job?.technologies?.some((tech: string) =>
          filters.categories.includes(tech),
        );
        if (!hasCategory) return false;
      }

      // JOB TYPE FILTER
      if (filters.jobTypes.length > 0) {
        const jobType = job?.priceType?.toLowerCase(); // fixed or hourly
        if (!filters.jobTypes.includes(jobType)) return false;
      }

      return true;
    });
  }, [rawProposals?.data, filters]);

  const handleFilterChange = (category: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [category]: values,
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      jobTypes: [],
    });
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
    <ProjectLayout
      filters={filters}
      onFilterChange={handleFilterChange}
      categories={allCategories}
      onClearFilters={clearFilters}
    >
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
          {filteredProjects.map((project: Project) => (
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
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
              No declined proposals. Great job!
            </div>
          )}
        </div>
      )}
    </ProjectLayout>
  );
}
