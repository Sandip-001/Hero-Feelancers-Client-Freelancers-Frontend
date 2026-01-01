"use client";
import React, { useState } from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { INITIAL_PROJECTS, DEFAULT_MANAGER } from "@/components/projects/data";
import { ManagerProfileModal } from "@/components/projects/ProjectLayout"; // Import modal component
import { DeclinedCard } from "@/components/projects/ui-blocks"; // Extracted Applied Card

export default function DeclinedPage() {
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(DEFAULT_MANAGER);

  const projects = INITIAL_PROJECTS.filter(p => p.status === "Declined");
  return (
    <ProjectLayout>
      <ManagerProfileModal isOpen={managerModalOpen} onClose={() => setManagerModalOpen(false)} manager={selectedManager} />
      
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
        {projects.map((project) => (
          <DeclinedCard 
            key={project.id} 
            project={project} 
            onViewManager={(m) => { setSelectedManager(m); setManagerModalOpen(true); }} 
          />
        ))}
        {projects.length === 0 && <div className="text-center py-10 text-gray-500">No active applications.</div>}
      </div>
    </ProjectLayout>
  );
}