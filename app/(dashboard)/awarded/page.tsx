"use client";
import React, { useState } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { INITIAL_PROJECTS, DEFAULT_MANAGER } from "@/components/projects/data";
import { ManagerProfileModal } from "@/components/projects/ProjectLayout";
import { AwardedCard } from "@/components/projects/ui-blocks"; // Extracted Awarded Card

export default function AwardedPage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(DEFAULT_MANAGER);
  
  const projects = INITIAL_PROJECTS.filter(p => p.status === "Awarded");

  return (
    <ProjectLayout>
      <ManagerProfileModal isOpen={managerModalOpen} onClose={() => setManagerModalOpen(false)} manager={selectedManager} />
      <div className="space-y-6">
        {projects.map((project) => (
          <AwardedCard 
            key={project.id} 
            project={project} 
            onViewManager={(m) => { setSelectedManager(m); setManagerModalOpen(true); }}
          />
        ))}
      </div>
    </ProjectLayout>
  );
}