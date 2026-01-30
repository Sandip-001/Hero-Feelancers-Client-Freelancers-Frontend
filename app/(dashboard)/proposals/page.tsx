"use client";

import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, Briefcase, FileText, 
  Clock, CheckCircle, Search, 
  Filter, Star, 
  Globe, ChevronDown, 
  ChevronUp, MessageSquare, Phone, Zap,
  DollarSign, Calendar, MapPin, Layers,
  BadgeCheck, Loader2, AlertCircle,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // Added toaster import

// --- REDUX IMPORTS ---
import { useGetMeQuery } from "@/app/redux/api/auth.api"; // 1. ADDED IMPORT
import { 
  useGetMyProposalsQuery, 
  useWithdrawProposalMutation 
} from "./../../redux/api/proposals.api";

// ==============================================================================
// 1. SHARED UI COMPONENTS
// ==============================================================================

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm", 
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };
  const sizes: any = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
  };
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants: any = {
    Pending: "bg-gray-100 text-gray-600 border-gray-200",
    Viewed: "bg-blue-50 text-blue-700 border-blue-200",
    Interviewing: "bg-purple-50 text-purple-700 border-purple-200",
    Awarded: "bg-green-100 text-green-700 border-green-200",
    Declined: "bg-red-50 text-red-700 border-red-200",
    Withdrawn: "bg-gray-50 text-gray-400 border-gray-200 dashed",
  };
  // Fallback to Pending if status doesn't match
  const key = variants[variant] ? variant : "Pending";
  return <div className={`${baseStyles} ${variants[key]} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;

// ==============================================================================
// 2. TYPES
// ==============================================================================

type ProposalStatus = "Pending" | "Viewed" | "Interviewing" | "Awarded" | "Declined" | "Withdrawn";

interface Proposal {
  id: string | number;
  jobId: string | number;
  title: string; // Job Title
  category: string;
  description: string; // Job Description
  budget: string; // Client Budget
  budgetVal: number;
  submittedOn: string;
  status: ProposalStatus;
  
  // User's Submitted Proposal Details
  myBid: number;
  myDuration: string;
  coverLetter: string;
  skills: string[];
  
  // Client Details
  clientName: string;
  clientLocation: string;
  clientVerified: boolean;
  clientRating: number;
  clientSpent: string;
  clientMemberSince: string;
  
  lastClientActivity: string;
  totalProposals: string;
}

// ==============================================================================
// 3. SIDEBAR COMPONENTS
// ==============================================================================

const RelationshipManagerCard = () => {
  return (
    <Card className="bg-white border-[#14A9F9]/20 shadow-sm overflow-hidden mb-6 sticky top-12">
      <div className="bg-[#14A9F9]/5 p-4 border-b border-[#14A9F9]/10">
        <h4 className="font-semibold text-gray-900 text-sm">Relationship Manager</h4>
        <p className="text-xs text-gray-500">Your dedicated success partner</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Manager" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">Sophia Williams</div>
            <div className="text-xs text-[#14A9F9] font-medium">Senior Project Lead</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link href="/messages" className="w-full">
            <Button size="sm" variant="blue" className="w-full flex items-center gap-2 h-9">
                <MessageSquare className="h-3.5 w-3.5" /> Message Manager
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

const ProposalFilterSidebar = ({ filters, setFilters }: any) => {
  const toggleStatus = (status: string) => {
    setFilters((prev: any) => {
      const isSelected = prev.status.includes(status);
      return {
        ...prev,
        status: isSelected ? prev.status.filter((s: string) => s !== status) : [...prev.status, status]
      };
    });
  };

  return (
    <div className="hidden lg:block space-y-8 pr-4">
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-6">Filter Proposals</h3>
        
        {/* Status */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Proposal Status</h4>
          <div className="space-y-2.5">
            {["Pending", "Viewed", "Interviewing", "Awarded", "Declined"].map((status) => (
              <label key={status} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9] group">
                <input 
                  type="checkbox" 
                  checked={filters.status.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className="rounded border-gray-300 text-[#14A9F9] focus:ring-[#14A9F9] w-4 h-4" 
                />
                <span className="group-hover:translate-x-1 transition-transform">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-3">My Bid Range</h4>
          <div className="flex items-center gap-2">
             <input 
               type="number" 
               placeholder="Min" 
               className="w-full text-xs p-2 border rounded-md"
               onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
             />
             <span className="text-gray-400">-</span>
             <input 
               type="number" 
               placeholder="Max" 
               className="w-full text-xs p-2 border rounded-md"
               onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
             />
          </div>
        </div>

      </div>
    </div>
  );
};

// ==============================================================================
// 4. FEED COMPONENTS
// ==============================================================================

const ProposalListCard = ({ proposal, onViewDetails }: { proposal: Proposal, onViewDetails: (p: Proposal) => void }) => {
  return (
    <div 
      className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#14A9F9] hover:shadow-md transition-all cursor-pointer relative" 
      onClick={() => onViewDetails(proposal)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-500 font-medium flex items-center">
          <Clock className="h-3 w-3 mr-1" /> Applied {proposal.submittedOn}
        </span>
        <Badge variant={proposal.status}>{proposal.status}</Badge>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#14A9F9] group-hover:underline decoration-2 transition-colors mb-3">
        {proposal.title}
      </h3>
      
      <div className="text-xs text-gray-600 mb-4 flex items-center flex-wrap gap-y-2">
        <span className="font-bold text-gray-900 mr-1">My Bid: ${proposal.myBid}</span> 
        <span className="text-gray-300 mx-2">|</span>
        <span className="font-medium text-gray-900 mr-1">Client Budget: {proposal.budget}</span>
        <span className="text-gray-300 mx-2">|</span>
        <span className="font-medium text-gray-900">{proposal.category}</span>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-5">
        {proposal.description}
      </p>
      
      <div className="pt-4 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-500">
        <div className="flex items-center text-gray-900 font-medium">
           {proposal.clientName}
        </div>
        {proposal.clientVerified && (
          <div className="flex items-center text-blue-600 font-medium">
            <BadgeCheck className="h-4 w-4 mr-1 fill-blue-100" /> Verified
          </div>
        )}
        <div className="flex items-center">
          <Star className="h-3 w-3 fill-[#14A9F9] text-[#14A9F9] mr-1" />
          <span className="font-bold text-gray-900 mr-1">{proposal.clientRating}</span>
        </div>
        <div className="font-medium text-gray-900 hidden sm:block">
          {proposal.clientLocation}
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 5. DETAIL VIEW
// ==============================================================================

const ProposalDetailView = ({ proposal, onBack }: { proposal: Proposal, onBack: () => void }) => {
  // Redux Hook for Withdrawal
  const [withdrawProposal, { isLoading: isWithdrawing }] = useWithdrawProposalMutation();

  const handleWithdraw = async () => {
      if(!confirm("Are you sure you want to withdraw this proposal?")) return;
      try {
          await withdrawProposal(proposal.id).unwrap();
          toast.success("Proposal withdrawn."); // Replaced alert
          onBack();
      } catch (error) {
          console.error(error);
          toast.error("Failed to withdraw proposal"); // Replaced alert
      }
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-[#14A9F9] transition-colors">
          <ArrowLeft className="h-4 w-4 ml-2 mr-1" /> Back to Proposals
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{proposal.title}</h1>
                <Badge variant={proposal.status} className="px-3 py-1">{proposal.status}</Badge>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#14A9F9]" /><span>{proposal.category}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#14A9F9]" /><span>Applied {proposal.submittedOn}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#14A9F9]" /><span>{proposal.clientLocation}</span></div>
            </div>
            
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-700 leading-7">{proposal.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-100 pb-8">
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 font-semibold text-gray-900"><DollarSign className="h-4 w-4" /> {proposal.budget}</div>
                   <span className="text-xs text-gray-500">Client Budget</span>
               </div>
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 font-semibold text-gray-900"><Layers className="h-4 w-4" /> Expert</div>
                   <span className="text-xs text-gray-500">Experience Level</span>
               </div>
               <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2 font-semibold text-gray-900"><CheckCircle className="h-4 w-4" /> Fixed</div>
                   <span className="text-xs text-gray-500">Job Type</span>
               </div>
            </div>

            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                    {proposal.skills?.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
          </div>

          {/* Your Submitted Proposal (READ ONLY FORM) */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Your Submitted Proposal</h2>
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div>
                       <label className="block text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Your Bid Amount</label>
                       <div className="text-2xl font-bold text-gray-900">${proposal.myBid}</div>
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">Proposed Duration</label>
                       <div className="text-lg font-medium text-gray-900">{proposal.myDuration}</div>
                   </div>
                </div>
                
                <div>
                   <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Cover Letter</label>
                   <div className="w-full border border-gray-100 bg-gray-50 rounded-md p-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {proposal.coverLetter}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Action Card */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
             <Button onClick={onBack} variant="outline" className="w-full h-12 text-base mb-3 font-semibold">
               Back to List
             </Button>
             {proposal.status === "Pending" && (
                 <Button 
                   onClick={handleWithdraw} 
                   disabled={isWithdrawing}
                   variant="destructive" 
                   className="w-full h-12 text-base flex items-center justify-center gap-2"
                 >
                   {isWithdrawing ? <Loader2 className="animate-spin" /> : "Withdraw Proposal"}
                 </Button>
             )}
             {proposal.status === "Interviewing" && (
                 <Link href="/messages" className="w-full block">
                   <Button variant="blue" className="w-full h-12 text-base flex items-center justify-center gap-2">
                       <MessageSquare className="h-4 w-4"/> Reply to Message
                   </Button>
                 </Link>
             )}
           </div>

           {/* Client Info Card */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
             <h4 className="font-bold text-gray-900 mb-4">About the Client</h4>
             <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    {proposal.clientVerified ? <BadgeCheck className="h-5 w-5 text-blue-600" /> : <XCircle className="h-5 w-5 text-gray-400" />}
                    <span className="font-medium text-gray-700">{proposal.clientVerified ? "Payment Method Verified" : "Payment Unverified"}</span>
                 </div>
                 <div>
                    <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`h-4 w-4 ${star <= (proposal.clientRating || 0) ? "fill-[#14A9F9] text-[#14A9F9]" : "text-gray-300"}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{proposal.clientRating} of 5 reviews</span>
                    </div>
                 </div>
                 <div>
                    <h5 className="font-bold text-gray-900">{proposal.clientLocation}</h5>
                    <span className="text-sm text-gray-500">10:42 AM Local Time</span>
                 </div>
                 <div>
                    <h5 className="font-bold text-gray-900">{proposal.clientSpent} Total Spent</h5>
                    <span className="text-sm text-gray-500">Member since {proposal.clientMemberSince}</span>
                 </div>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 6. MAIN PAGE LAYOUT
// ==============================================================================

export default function ProposalsPage() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Archived">("All");
  
  const [filters, setFilters] = useState({
    status: [] as ProposalStatus[],
    minBudget: "",
    maxBudget: "",
  });

  // --- 1. GET CURRENT USER ID (ADDED) ---
  const { data: authData } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // --- 2. FETCH DATA WITH ID (UPDATED) ---
  const { data: apiProposals, isLoading, error } = useGetMyProposalsQuery(
    { freelancerId }, 
    { skip: !freelancerId }
  );

  // --- 3. DERIVED STATE (Filters) ---
  const filteredProposals = useMemo(() => {
    // If API is loading or has error, return empty
    if (!apiProposals) return [];
    
    // Handle { data: [...] } structure if API returns it that way
    const proposalsList = Array.isArray(apiProposals) ? apiProposals : (apiProposals.data || []);

    return proposalsList.filter((p: any) => {
      // 1. Search Query
      const searchLower = searchQuery.toLowerCase();
      // Safe checks with optional chaining
      const matchesSearch = (p.title?.toLowerCase() || "").includes(searchLower) || (p.clientName?.toLowerCase() || "").includes(searchLower);

      // 2. Status Filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(p.status);

      // 3. Tab Filter
      let matchesTab = true;
      if (activeTab === "Active") matchesTab = ["Pending", "Viewed", "Interviewing", "Awarded"].includes(p.status);
      if (activeTab === "Archived") matchesTab = ["Declined", "Withdrawn"].includes(p.status);

      // 4. Budget Filter
      const min = filters.minBudget === "" ? 0 : Number(filters.minBudget);
      const max = filters.maxBudget === "" ? Infinity : Number(filters.maxBudget);
      // Ensure budgetVal exists on API data or parse it
      const budgetVal = p.budgetVal || Number(p.myBid) || 0;
      const matchesBudget = budgetVal >= min && budgetVal <= max;

      return matchesSearch && matchesStatus && matchesTab && matchesBudget;
    });
  }, [apiProposals, searchQuery, filters, activeTab]);

  // Handle View Details Scroll
  const handleViewDetails = (p: Proposal) => {
    setSelectedProposal(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProposal) {
    return (
        <div className="bg-[#f9f9f9] min-h-screen pt-4 pb-12">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6">
                <ProposalDetailView 
                    proposal={selectedProposal} 
                    onBack={() => setSelectedProposal(null)} 
                />
            </div>
        </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans xl:p-6 pb-24">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* TOP HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:mt-[-20px]">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-gray-500 mt-1">Manage your applications and track status.</p>
          </div>
          <div className="w-full md:w-auto relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search proposals..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] transition-all bg-white" 
             />
          </div>
        </div>

        {/* 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FILTERS */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
             <ProposalFilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* MIDDLE COLUMN: FEED */}
          <div className="lg:col-span-9 xl:col-span-7 space-y-6">
              
              {/* Tabs Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex overflow-x-auto no-scrollbar shadow-sm">
                {["All", "Active", "Archived"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                      activeTab === tab 
                        ? "bg-[#14A9F9] text-white shadow-sm" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Results Count & Clear */}
              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-gray-500 font-medium">{filteredProposals.length} proposals found</p>
                {(filters.status.length > 0 || filters.minBudget !== "") && (
                    <button onClick={() => setFilters({ status: [], minBudget: "", maxBudget: "" })} className="text-xs text-[#14A9F9] hover:underline">Clear Filters</button>
                )}
              </div>

              {/* Content Area */}
              <div className="min-h-[500px] space-y-4">
                {isLoading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-[#14A9F9]" />
                    </div>
                )}

                {error && (
                    <div className="text-center py-10 text-red-500 bg-white rounded-lg border border-red-100">
                        <AlertCircle className="h-10 w-10 mx-auto mb-2" />
                        <p>Failed to load proposals. Please try again.</p>
                    </div>
                )}

                {!isLoading && !error && filteredProposals.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                        <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="font-medium">No proposals found.</p>
                    </div>
                ) : (
                    filteredProposals.map((item: any) => (
                        <ProposalListCard key={item.id} proposal={item} onViewDetails={handleViewDetails} />
                    ))
                )}
              </div>
          </div>

          {/* RIGHT COLUMN: MANAGER & PROMO */}
          <div className="lg:hidden xl:block xl:col-span-3 space-y-6 relative">
              
              {/* Promo / Tip Card */}
              <div className="bg-gradient-to-br from-[#14A9F9] to-blue-600 rounded-xl p-6 text-white relative shadow-lg overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                 <div className="flex items-start justify-between mb-4 relative z-10">
                    <h4 className="font-bold text-lg">Pro Tip</h4>
                    <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                 </div>
                 <p className="text-sm text-blue-100 mb-4 leading-relaxed relative z-10">
                   Proposals sent within the first 24 hours of a job posting are 40% more likely to be viewed.
                 </p>
              </div>

              <RelationshipManagerCard />
          </div>

        </div>
      </div>
    </div>
  );
}