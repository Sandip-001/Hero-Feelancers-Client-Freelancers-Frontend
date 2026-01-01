"use client";
import React, { useState } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { INITIAL_PROJECTS } from "@/components/projects/data";
import { EnhancedNewProjectCard, ProposalView } from "@/components/projects/ui-blocks";

export default function BookmarksPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = INITIAL_PROJECTS.filter(p => p.isBookmarked);

  if (selectedProject) {
    return (
      <ProjectLayout>
        <ProposalView project={selectedProject} onBack={() => setSelectedProject(null)} onSubmitProposal={() => {}} />
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout>
      <div className="space-y-4">
        {projects.map((project) => (
          <EnhancedNewProjectCard 
            key={project.id} 
            project={project} 
            onToggleBookmark={() => {}} 
            onViewDetails={setSelectedProject} 
          />
        ))}
        {projects.length === 0 && <div className="text-center py-10 text-gray-500">No saved projects.</div>}
      </div>
    </ProjectLayout>
  );
}