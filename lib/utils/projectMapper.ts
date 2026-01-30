import { Project } from "@/components/projects/data";

export const mapApiJobToUI = (apiJob: any): Project => {
  const clientInfo = apiJob.client || {};

  return {
    id: apiJob._id || apiJob.id,
    title: apiJob.title || "Untitled Project",
    category: apiJob.jobType || "General",
    description: apiJob.description || "",
    
    // Format Budget: "₹ 50,000" or "₹ 500/hr"
    budget: apiJob.projectValue 
      ? `${apiJob.currency || '₹'} ${Number(apiJob.projectValue).toLocaleString()}${apiJob.priceType === 'hourly' ? '/hr' : ''}` 
      : "Negotiable",
      
    type: (apiJob.priceType || "").toLowerCase() === "hourly" ? "Hourly" : "Fixed",
    
    experienceLevel: apiJob.experienceLevel || "Intermediate",
    postedTime: new Date(apiJob.createdAt || Date.now()).toLocaleDateString(),
    dateRange: apiJob.hireTimeline || "Flexible",
    proposals: apiJob.proposalCount || 0,
    
    // Map Backend Status ("Open") to UI Status ("Pending")
    status: (apiJob.status === "Open" || apiJob.status === "Active") ? "Pending" : apiJob.status, 
    
    closed: null,
    rating: null,
    milestones: [],
    // Check if the backend sends an 'isBookmarked' flag, otherwise default false
    isBookmarked: apiJob.isBookmarked || false,
    
    skills: Array.isArray(apiJob.technologies) ? apiJob.technologies : [],
    
    client: {
      name: clientInfo.fullName || "Hidden Client",
      location: clientInfo.location || "Remote",
      rating: clientInfo.rating || 0,
      totalSpent: clientInfo.totalSpent || "₹0",
      memberSince: clientInfo.createdAt ? new Date(clientInfo.createdAt).getFullYear().toString() : "2024",
      verified: clientInfo.isVerified || false,
    },
    
    // Map existing proposal details if present (for Applied/Awarded tabs)
    myBidAmount: apiJob.myProposal?.bidAmount ? `₹${apiJob.myProposal.bidAmount}` : undefined,
    bidStatus: apiJob.myProposal?.status,
  };
};