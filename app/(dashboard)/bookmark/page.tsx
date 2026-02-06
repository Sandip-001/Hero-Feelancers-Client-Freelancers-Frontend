"use client";
import React, { useState, useMemo } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import {
  EnhancedNewProjectCard,
  ProposalView,
} from "@/components/projects/ui-blocks";
import { Loader2 } from "lucide-react";

import { mapApiJobToUI } from "@/lib/utils/projectMapper";
import { Project } from "@/components/projects/data";
import {
  useAddBookmarkMutation,
  useGetBookmarksQuery,
  useRemoveBookmarkMutation,
} from "@/app/redux/api/bookmarks.api";
import { useCreateProposalMutation } from "@/app/redux/api/proposals.api";
import { toast } from "sonner";

export default function BookmarksPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: rawJobs, isLoading } = useGetBookmarksQuery();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const [createProposal, { isLoading: isSubmitting }] =
    useCreateProposalMutation();

  console.log("Bookmark data is", rawJobs?.bookmarks);

  const bookmarkedProjects = useMemo(() => {
    if (!rawJobs?.bookmarks) return [];

    return rawJobs.bookmarks.map((bookmark: any) =>
      mapApiJobToUI({
        ...bookmark.Job,
        isBookmarked: true,
        bookmarkId: bookmark.id,
      }),
    );
  }, [rawJobs]);

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

  const handleToggleBookmark = async (project: Project) => {
    try {
      if (project.isBookmarked) {
        await removeBookmark(Number(project.id)).unwrap();
        toast.success("Removed from bookmarks");
      } else {
        await addBookmark({ jobId: Number(project.id) }).unwrap();
        toast.success("Job bookmarked");
      }
    } catch (err) {
      toast.error("Failed to update bookmark");
    }
  };

  return (
    <ProjectLayout>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedProjects.map((project: Project) => (
            <EnhancedNewProjectCard
              key={project.id}
              project={project}
              onToggleBookmark={handleToggleBookmark}
              onViewDetails={setSelectedProject}
            />
          ))}
          {bookmarkedProjects.length === 0 && (
            <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
              No saved projects.
            </div>
          )}
        </div>
      )}
    </ProjectLayout>
  );
}
