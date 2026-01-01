"use client";

import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, Briefcase, FileText, 
  Clock, CheckCircle, ShieldCheck, XCircle, Search, 
  Filter, ChevronRight, Mail, Star, 
  Download, Globe, ChevronDown, 
  ChevronUp, Wallet, List, LayoutGrid,
  MessageSquare, Phone, Zap, Bookmark,
  DollarSign, Calendar, MapPin, Layers,
  BadgeCheck
} from "lucide-react";

// ==============================================================================
// 1. SHARED UI COMPONENTS (Exact match from Projects Page)
// ==============================================================================

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm", 
    blueOutline: "border border-[#14A9F9] text-[#14A9F9] bg-white hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  };
  const sizes: any = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants: any = {
    default: "bg-gray-100 text-gray-700 border-gray-200 border",
    Pending: "bg-gray-100 text-gray-600 border-gray-200",
    Viewed: "bg-blue-50 text-blue-700 border-blue-200",
    Interviewing: "bg-purple-50 text-purple-700 border-purple-200",
    Awarded: "bg-green-100 text-green-700 border-green-200",
    Declined: "bg-red-50 text-red-700 border-red-200",
    Withdrawn: "bg-gray-50 text-gray-400 border-gray-200 dashed",
    info: "bg-[#14A9F9] text-white border-transparent", 
  };
  const key = variants[variant] ? variant : "default";
  return <div className={`${baseStyles} ${variants[key]} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;

// ==============================================================================
// 2. MOCK DATA
// ==============================================================================

type ProposalStatus = "Pending" | "Viewed" | "Interviewing" | "Awarded" | "Declined" | "Withdrawn";

interface Proposal {
  id: number;
  title: string;
  category: string;
  description: string;
  budget: string;
  budgetVal: number;
  submittedOn: string;
  status: ProposalStatus;
  
  // User's Submitted Proposal Details
  myBid: number;
  myDuration: string;
  coverLetter: string;
  attachments: string[];
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

const ALL_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "Cab App Development (Uber Clone)",
    category: "Mobile App",
    description: "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation...",
    budget: "$4,500",
    budgetVal: 4500,
    submittedOn: "Oct 12, 2023",
    status: "Viewed",
    myBid: 4100,
    myDuration: "7 Days",
    coverLetter: "Hi there, I have extensive experience with Flutter and UI/UX design. I have reviewed your requirements for the Cab App and I am confident I can deliver a high-quality interface similar to Uber/Lyft but with the luxury aesthetic you described.",
    attachments: ["portfolio_v2.pdf", "wireframes.png"],
    skills: ["Flutter", "UI/UX", "iOS", "Figma"],
    clientName: "Adarsh Group",
    clientLocation: "New York, USA",
    clientVerified: true,
    clientRating: 4.8,
    clientSpent: "$50k+",
    clientMemberSince: "2018",
    lastClientActivity: "2 hours ago",
    totalProposals: "20-50"
  },
  {
    id: 2,
    title: "Real Estate Portal App",
    category: "Web Development",
    description: "Full stack development for a property listing app. Geolocation, Maps integration...",
    budget: "$8,000",
    budgetVal: 8000,
    submittedOn: "Aug 15, 2023",
    status: "Awarded",
    myBid: 8000,
    myDuration: "2 Months",
    coverLetter: "I specialize in map-based applications using Flutter...",
    attachments: ["case_study_realestate.pdf"],
    skills: ["React", "Node.js", "MongoDB", "Google Maps API"],
    clientName: "EstateFindr Inc.",
    clientLocation: "London, UK",
    clientVerified: true,
    clientRating: 5.0,
    clientSpent: "$120k+",
    clientMemberSince: "2020",
    lastClientActivity: "1 day ago",
    totalProposals: "5-10"
  },
  {
    id: 3,
    title: "Crypto Wallet Integration",
    category: "Blockchain",
    description: "Need a developer to integrate MetaMask wallet connect into our existing React application.",
    budget: "$3,000",
    budgetVal: 3000,
    submittedOn: "Sept 10, 2023",
    status: "Declined",
    myBid: 2800,
    myDuration: "14 Days",
    coverLetter: "I am a Web3 developer with 3 years of experience...",
    attachments: [],
    skills: ["Web3.js", "React", "MetaMask"],
    clientName: "CryptoSecure",
    clientLocation: "Berlin, Germany",
    clientVerified: false,
    clientRating: 0,
    clientSpent: "$0",
    clientMemberSince: "2023",
    lastClientActivity: "5 days ago",
    totalProposals: "50+"
  },
];

// ==============================================================================
// 3. SIDEBAR COMPONENTS (Matches Projects Page)
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
          <Button size="sm" variant="blue" className="w-full flex items-center gap-2 h-9">
            <MessageSquare className="h-3.5 w-3.5" /> Message Manager
          </Button>
          <Button size="sm" variant="outline" className="w-full flex items-center gap-2 h-9 text-gray-600 hover:text-[#14A9F9] hover:border-[#14A9F9]">
            <Phone className="h-3.5 w-3.5" /> Schedule Call
          </Button>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 text-center">
          Available: Mon-Fri, 9AM - 6PM EST
        </div>
      </div>
    </Card>
  );
};

// Adapted FilterSidebar to match the visual style of Project Page (Simple List)
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

        {/* Budget (Simplified for UI consistency) */}
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
// 4. FEED COMPONENTS (Styled like Projects Page)
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
// 5. DETAIL VIEW (Mirrors Project Page "View Proposal" section)
// ==============================================================================

const ProposalTimeline = ({ status }: { status: string }) => {
    const stages = ["Pending", "Viewed", "Interviewing", "Awarded"];
    const currentIdx = stages.indexOf(status) === -1 ? 0 : stages.indexOf(status);
 
    return (
       <div className="w-full mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase">Application Status</h3>
          <div className="flex justify-between mb-2">
             {stages.map((stage, i) => (
                <div key={stage} className={`text-xs font-medium ${i <= currentIdx ? 'text-[#14A9F9]' : 'text-gray-400'}`}>{stage}</div>
             ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full w-full flex">
             {stages.map((stage, i) => (
                <div key={stage} className={`h-full flex-1 first:rounded-l-full last:rounded-r-full border-r border-white last:border-0 transition-all ${i <= currentIdx ? 'bg-[#14A9F9]' : 'bg-transparent'}`}></div>
             ))}
          </div>
       </div>
    );
 };

const ProposalDetailView = ({ proposal, onBack }: { proposal: Proposal, onBack: () => void }) => {
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
            
            {/* Timeline within the main card flow */}
            {/* <ProposalTimeline status={proposal.status} /> */}

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
                    {proposal.skills?.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">{skill}</span>
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

                {/* {proposal.attachments.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Attachments</label>
                        <div className="flex gap-3">
                            {proposal.attachments.map(file => (
                                <div key={file} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-[#14A9F9]">
                                    <Download className="h-4 w-4" /> {file}
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
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
                  <Button variant="destructive" className="w-full h-12 text-base flex items-center justify-center gap-2">
                      Withdraw Proposal
                  </Button>
              )}
              {proposal.status === "Interviewing" && (
                  <Button variant="blue" className="w-full h-12 text-base flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4"/> Reply to Message
                  </Button>
              )}
           </div>

           {/* Client Info Card (Matches Project Page) */}
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

           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
               <h3 className="font-bold text-lg text-gray-900 mb-3">Activity on this Job</h3>
               <div className="text-sm text-gray-600 space-y-2">
                   <p>Proposals: <span className="font-semibold text-gray-900">{proposal.totalProposals}</span></p>
                   <p>Last Active: <span className="font-semibold text-gray-900">{proposal.lastClientActivity}</span></p>
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

  // Derived State (LOGIC)
  const filteredProposals = useMemo(() => {
    return ALL_PROPOSALS.filter((p) => {
      // 1. Search Query
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = p.title.toLowerCase().includes(searchLower) || p.clientName.toLowerCase().includes(searchLower);

      // 2. Status Filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(p.status);

      // 3. Tab Filter
      let matchesTab = true;
      if (activeTab === "Active") matchesTab = ["Pending", "Viewed", "Interviewing", "Awarded"].includes(p.status);
      if (activeTab === "Archived") matchesTab = ["Declined", "Withdrawn"].includes(p.status);

      // 4. Budget Filter
      const min = filters.minBudget === "" ? 0 : Number(filters.minBudget);
      const max = filters.maxBudget === "" ? Infinity : Number(filters.maxBudget);
      const matchesBudget = p.budgetVal >= min && p.budgetVal <= max;

      return matchesSearch && matchesStatus && matchesTab && matchesBudget;
    });
  }, [searchQuery, filters, activeTab]);

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
          
          {/* LEFT COLUMN: FILTERS (Fixed Width/Col Span) */}
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
                {filteredProposals.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                        <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="font-medium">No proposals found.</p>
                    </div>
                ) : (
                    filteredProposals.map((item) => (
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