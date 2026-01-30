"use client";
import React, { useState, useMemo } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { EnhancedNewProjectCard, ProposalView } from "@/components/projects/ui-blocks";
import { Loader2 } from "lucide-react";

import { useGetFreelancerJobsQuery, useToggleBookmarkMutation } from "@/app/redux/api/jobs.api";
import { mapApiJobToUI } from "@/lib/utils/projectMapper";
import { Project } from "@/components/projects/data";

export default function BookmarksPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: rawJobs, isLoading } = useGetFreelancerJobsQuery(undefined);
  const [toggleBookmark] = useToggleBookmarkMutation();

  const bookmarkedProjects = useMemo(() => {
    const dataArray = Array.isArray(rawJobs) ? rawJobs : (rawJobs?.data || []);
    if (!Array.isArray(dataArray)) return [];

    return dataArray
      .map(mapApiJobToUI)
      .filter((p) => p.isBookmarked); // Only show bookmarked items
  }, [rawJobs]);

  if (selectedProject) {
    return (
      <ProjectLayout>
        <ProposalView 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
            onSubmitProposal={() => {}} // Usually you can't apply from bookmarks without opening details
        />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout>
      {isLoading ? (
         <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600"/></div>
      ) : (
        <div className="space-y-4">
            {bookmarkedProjects.map((project) => (
                <EnhancedNewProjectCard 
                    key={project.id} 
                    project={project} 
                    onToggleBookmark={() => toggleBookmark(project.id)} 
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