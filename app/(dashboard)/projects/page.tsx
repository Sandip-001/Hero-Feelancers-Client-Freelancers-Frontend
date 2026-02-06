"use client";

import React, { useState, useMemo } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import {
  EnhancedNewProjectCard,
  ProposalView,
} from "@/components/projects/ui-blocks";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// --- REDUX API HOOKS ---
import { useGetFreelancerJobsQuery } from "@/app/redux/api/jobs.api";
import { useCreateProposalMutation } from "@/app/redux/api/proposals.api";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
} from "@/app/redux/api/bookmarks.api";

// --- UTILS & TYPES ---
import { mapApiJobToUI } from "@/lib/utils/projectMapper";
import { Project } from "@/components/projects/data";

export default function NewProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 1. FETCH JOBS
  const {
    data: rawJobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetFreelancerJobsQuery(undefined, { refetchOnMountOrArgChange: true });

  // 2. FETCH BOOKMARKS
  const { data: bookmarksData } = useGetBookmarksQuery(undefined);

  // 3. MUTATIONS
  const [createProposal, { isLoading: isSubmitting }] =
    useCreateProposalMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  // 4. MERGE DATA (Jobs + Bookmarks)
  const projects = useMemo(() => {
    const jobsArray = Array.isArray(rawJobs) ? rawJobs : rawJobs?.data || [];
    if (!Array.isArray(jobsArray)) return [];

    // 🔥 FIX HERE
    const bookmarksList = bookmarksData?.bookmarks || [];

    const bookmarkSet = new Set<number>();

    bookmarksList.forEach((b: any) => {
      const jobId = b.jobId || b.Job?.id;
      if (jobId) bookmarkSet.add(Number(jobId));
    });

    return jobsArray.map((job) => {
      const uiJob = mapApiJobToUI(job);
      const jobIdNum = Number(uiJob.id);

      return {
        ...uiJob,
        isBookmarked: bookmarkSet.has(jobIdNum),
      };
    });
  }, [rawJobs, bookmarksData]);

  // 5. HANDLER: Toggle Bookmark
  const handleToggleBookmark = async (project: any) => {
    try {
      if (project.isBookmarked) {
        await removeBookmark(Number(project.id)).unwrap();
        toast.success("Removed from bookmarks");
      } else {
        await addBookmark({ jobId: Number(project.id) }).unwrap();
        toast.success("Job bookmarked");
      }
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  // 6. HANDLER: Submit Proposal
  const handleSubmitProposal = async (formData: any) => {
    if (!selectedProject) return;

    const bidValue = formData.bid || formData.amount || formData.proposedAmount;

    if (!bidValue || !formData.duration || !formData.coverLetter) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const payload = {
      jobId: selectedProject.id,
      coverLetter: formData.coverLetter,
      proposedAmount: Number(bidValue),
      duration: formData.duration,
    };

    try {
      await createProposal(payload).unwrap();
      toast.success("Proposal Submitted Successfully!");
      setSelectedProject(null);
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to submit proposal.";
      toast.error(msg);
    }
  };

  // --- RENDER ---
  if (selectedProject) {
    return (
      <ProjectLayout hideSidebars={true}>
        <ProposalView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onSubmitProposal={handleSubmitProposal}
          isSubmitting={isSubmitting}
        />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout hideSidebars={false}>
      {jobsLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : jobsError ? (
        <div className="text-center py-20 text-red-500">
          Failed to load jobs.
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          {projects.length > 0 ? (
            projects.map((project) => (
              <EnhancedNewProjectCard
                key={project.id}
                project={project}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedProject}
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              No projects found.
            </div>
          )}
        </div>
      )}
    </ProjectLayout>
  );
}
