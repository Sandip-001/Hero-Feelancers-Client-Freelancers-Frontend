"use client";

import React, { useState, useEffect } from "react";
import { 
  DollarSign, Calendar, Star, Bookmark, ArrowLeft, MapPin, 
  Clock, BadgeCheck, Layers, Zap, ThumbsUp, Search, Filter, 
  X, Briefcase, ChevronDown, ChevronUp, CheckCircle, XCircle
} from "lucide-react";

// ==============================================================================
// 1. SHARED UI COMPONENTS
// ==============================================================================

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  const variants = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm", 
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };
  // @ts-ignore
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200 border",
    success: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };
  // @ts-ignore
  return <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;
const CardHeader = ({ className = "", children }: any) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }: any) => <h3 className={`text-xl font-bold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ className = "", children }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// Toast Notification
const Toast = ({ message, onUndo, onClose }: { message: string, onUndo?: () => void, onClose: () => void }) => (
  <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
    <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle className="h-4 w-4 text-green-400" />
        {message}
      </div>
      <div className="ml-auto flex items-center gap-3">
        {onUndo && <button onClick={onUndo} className="text-xs font-bold text-[#14A9F9] hover:underline">UNDO</button>}
        <button onClick={onClose}><X className="h-4 w-4 text-gray-400 hover:text-white" /></button>
      </div>
    </div>
  </div>
);

// ==============================================================================
// 2. TYPES & DATA
// ==============================================================================

type Project = {
  id: number; title: string; category: string; description: string; 
  budget: string; type: "Fixed" | "Hourly";
  experienceLevel: "Entry" | "Intermediate" | "Expert"; 
  postedTime: string; dateRange: string; proposals: number; 
  status: string; isBookmarked: boolean;
  matchScore: number;
  privateNote?: string;
  skills: string[];
  client: { name: string; location: string; rating: number; totalSpent: string; memberSince: string; verified: boolean; jobCount: number };
};

const MOCK_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "E-Commerce Shopify Redesign - Conversion Focused", 
    category: "Web Development", 
    type: "Hourly",
    experienceLevel: "Intermediate",
    postedTime: "12 minutes ago",
    description: "Looking for an expert to redesign our Shopify store. Need modern aesthetic and improved conversion funnel. The current theme is slow and unresponsive. We need someone who understands Liquid and React.", 
    budget: "$45/hr", 
    dateRange: "15 Mar - 30 Apr", 
    proposals: 8, 
    status: "Pending", 
    isBookmarked: true,
    matchScore: 98,
    skills: ["Shopify", "React", "Liquid", "CSS", "Conversion Rate Opt"],
    client: { name: "TrendSetter Clothing", location: "London, UK", rating: 4.9, totalSpent: "$120k+", memberSince: "2019", verified: true, jobCount: 42 }
  },
  { 
    id: 2, 
    title: "Crypto Wallet Integration for NFT Marketplace", 
    category: "Web Development", // Adjusted category for simpler filtering demo
    type: "Fixed", 
    experienceLevel: "Expert", 
    postedTime: "4 hours ago", 
    description: "Need a developer to integrate MetaMask and WalletConnect into an existing React frontend. Must have experience with Web3.js and Smart Contract interactions.", 
    budget: "$3,000", 
    dateRange: "Flexible", 
    proposals: 25, 
    status: "Pending", 
    isBookmarked: true, 
    matchScore: 85,
    privateNote: "Need to update my portfolio before applying.",
    skills: ["Web3.js", "React", "Blockchain", "Solidity"],
    client: { name: "CryptoPunk Labs", location: "Berlin, DE", rating: 4.5, totalSpent: "$250k+", memberSince: "2020", verified: true, jobCount: 15 }
  },
  { 
    id: 3, 
    title: "Senior UI/UX Designer for SaaS Dashboard", 
    category: "UI/UX Design", 
    type: "Fixed", 
    experienceLevel: "Expert", 
    postedTime: "1 day ago", 
    description: "Redesigning our core analytics dashboard. Need clean, modern aesthetics similar to Linear or Vercel. Figma deliverables required.", 
    budget: "$5,500", 
    dateRange: "1 Month", 
    proposals: 55, 
    status: "Pending", 
    isBookmarked: true, 
    matchScore: 92,
    skills: ["Figma", "SaaS", "Dashboard", "Prototyping"],
    client: { name: "TechFlow Inc", location: "San Francisco, USA", rating: 5.0, totalSpent: "$500k+", memberSince: "2015", verified: false, jobCount: 80 }
  },
  { 
    id: 4, 
    title: "Blog Writer for Tech Startup", 
    category: "Writing & Translation", 
    type: "Fixed", 
    experienceLevel: "Entry", 
    postedTime: "2 days ago", 
    description: "Looking for a creative writer to handle our weekly blog posts about AI and machine learning trends.", 
    budget: "$200", 
    dateRange: "Ongoing", 
    proposals: 12, 
    status: "Pending", 
    isBookmarked: true, 
    matchScore: 78,
    skills: ["Content Writing", "SEO", "Technical Writing"],
    client: { name: "AI Future", location: "Remote", rating: 4.2, totalSpent: "$5k+", memberSince: "2022", verified: true, jobCount: 5 }
  },
];

// ==============================================================================
// 3. COMPONENTS
// ==============================================================================

// -- 3a. Detailed Functional Filter Sidebar --
const FilterSidebar = ({ filters, onFilterChange, onClearAll }: any) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    jobType: true,
    experience: true,
    clientInfo: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (filterType: string, value: string) => {
    // Logic to toggle values in the array
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const categories = [
    "Web Development", "Mobile App Development", "UI/UX Design", "Game Development",
    "Data Science & AI", "Writing & Translation", "Admin Support", "Sales & Marketing"
  ];

  return (
    <div className="hidden lg:block space-y-6 pr-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xl text-gray-900">Filters</h3>
        <button onClick={onClearAll} className="text-xs text-[#14A9F9] hover:underline font-medium">Clear All</button>
      </div>
      
      {/* Category Filter */}
      <div className="border-b border-gray-100 pb-5">
        <button 
          onClick={() => toggleSection('category')} 
          className="flex items-center justify-between w-full text-sm font-bold text-gray-800 mb-3"
        >
          Category
          {expandedSections.category ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </button>
        {expandedSections.category && (
          <>
            <div className="mb-3 relative">
               <Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
               <input type="text" placeholder="Search categories" className="w-full text-xs pl-7 p-2 border border-gray-200 rounded-md focus:border-[#14A9F9] outline-none" />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9] group">
                  <input 
                    type="checkbox" 
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCheckboxChange("categories", cat)}
                    className="rounded border-gray-300 text-[#14A9F9] focus:ring-[#14A9F9] w-4 h-4" 
                  />
                  <span className={`group-hover:translate-x-1 transition-transform ${filters.categories.includes(cat) ? "text-[#14A9F9] font-medium" : ""}`}>{cat}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Job Type */}
      <div className="border-b border-gray-100 pb-5">
        <button onClick={() => toggleSection('jobType')} className="flex items-center justify-between w-full text-sm font-bold text-gray-800 mb-3">
          Job Type {expandedSections.jobType ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </button>
        {expandedSections.jobType && (
          <div className="space-y-2">
            {["Hourly", "Fixed"].map((type) => (
              <label key={type} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]">
                 <input 
                    type="checkbox" 
                    checked={filters.jobTypes.includes(type)}
                    onChange={() => handleCheckboxChange("jobTypes", type)}
                    className="rounded border-gray-300 text-[#14A9F9] w-4 h-4" 
                 />
                 <span>{type} Price</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="border-b border-gray-100 pb-5">
        <button onClick={() => toggleSection('experience')} className="flex items-center justify-between w-full text-sm font-bold text-gray-800 mb-3">
          Experience Level {expandedSections.experience ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </button>
        {expandedSections.experience && (
          <div className="space-y-2">
            {["Entry", "Intermediate", "Expert"].map((level) => (
              <label key={level} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]">
                <input 
                  type="checkbox" 
                  checked={filters.experience.includes(level)}
                  onChange={() => handleCheckboxChange("experience", level)}
                  className="rounded border-gray-300 text-[#14A9F9] w-4 h-4" 
                />
                <span>{level} Level</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Client Info */}
      <div className="border-b border-gray-100 pb-5">
        <button onClick={() => toggleSection('clientInfo')} className="flex items-center justify-between w-full text-sm font-bold text-gray-800 mb-3">
          Client Info {expandedSections.clientInfo ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </button>
        {expandedSections.clientInfo && (
          <div className="space-y-2">
            <label className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]">
              <input 
                type="checkbox" 
                checked={filters.verifiedOnly}
                onChange={(e) => onFilterChange("verifiedOnly", e.target.checked)}
                className="rounded border-gray-300 text-[#14A9F9] w-4 h-4" 
              />
              <span>Payment Verified Only</span>
            </label>
          </div>
        )}
      </div>

    </div>
  );
};

// -- 3b. Smart Bid Card (For Proposal View) --
const SmartBidCard = ({ projectType, budget }: { projectType: string, budget: string }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | string>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const numBudget = parseInt(budget.replace(/[^0-9]/g, ''));
      const suggestion = projectType === "Hourly" 
        ? `$${numBudget - 5} - $${numBudget + 10}/hr`
        : `$${Math.floor(numBudget * 0.9)} - $${Math.floor(numBudget * 1.05)}`;
      setResult(suggestion);
    }, 1500);
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-600 fill-indigo-100" />
          <CardTitle className="text-base text-indigo-900">AI Smart Bid</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-indigo-700 mb-4">
          Our AI analyzes similar winning bids, your skills, and client history to suggest the optimal price.
        </p>
        {!result && !analyzing && (
           <Button onClick={handleAnalyze} size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-lg">
             Analyze Price
           </Button>
        )}
        {analyzing && (
           <div className="flex items-center justify-center space-x-2 py-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
           </div>
        )}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">Recommended Bid</p>
            <p className="text-xl font-bold text-indigo-700 mt-1">{result}</p>
            <div className="mt-3 flex items-start gap-2">
               <ThumbsUp className="h-3 w-3 text-green-600 mt-0.5" />
               <p className="text-[10px] text-gray-600 leading-tight">High chance of acceptance based on your 5-star rating.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// -- 3c. Enhanced Bookmark Card (Main Feed) --
const EnhancedBookmarkCard = ({ project, onRemove, onView }: any) => {
  return (
    <div 
      onClick={() => onView(project)}
      className="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-[#14A9F9]/50 hover:shadow-lg hover:shadow-[#14A9F9]/5 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[#14A9F9] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-[#14A9F9] bg-[#14A9F9]/10 px-2 py-1 rounded w-fit">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#14A9F9] transition-colors line-clamp-1 mt-2">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {project.matchScore > 90 && (
            <Badge variant="success" className="hidden sm:flex items-center gap-1">
              <Zap className="h-3 w-3" /> {project.matchScore}% Match
            </Badge>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(project.id); }}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
            title="Remove from bookmarks"
          >
            <Bookmark className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
        <div className="flex items-center font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded">
           <Clock className="h-3 w-3 mr-1.5 text-gray-400" /> Posted {project.postedTime}
        </div>
        <div className="flex items-center">
           <DollarSign className="h-3 w-3 mr-1" /> {project.type}: <span className="font-bold text-gray-900 ml-1">{project.budget}</span>
        </div>
        <div className="flex items-center">
           <Layers className="h-3 w-3 mr-1" /> {project.experienceLevel}
        </div>
        <div className="flex items-center">
           <MapPin className="h-3 w-3 mr-1" /> {project.client.location}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-900 transition-colors">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 4).map((skill: string) => (
          <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[11px] rounded-full border border-gray-100 font-medium group-hover:border-gray-200 transition-colors">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            {project.client.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
            <span className="text-gray-900 font-medium hidden sm:inline">{project.client.verified ? "Payment Verified" : "Unverified"}</span>
          </div>
          <div className="flex items-center gap-1">
             <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
             <span className="font-bold text-gray-900">{project.client.rating}</span>
             <span className="text-gray-400">({project.client.jobCount} jobs)</span>
          </div>
        </div>
        <div className="flex items-center text-[#14A9F9] text-xs font-bold gap-1 group-hover:underline">
           View Details
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 4. PROPOSAL VIEW (EXACT PROJECT PAGE REPLICA)
// ==============================================================================

const ProposalView = ({ project, onBack }: { project: Project, onBack: () => void }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("Less than 1 month");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSaved, setIsSaved] = useState(true);

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-[#14A9F9] transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#14A9F9]" /><span>{project.category}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#14A9F9]" /><span>Posted {project.postedTime}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#14A9F9]" /><span>{project.client?.location}</span></div>
            </div>
            <div className="mb-8"><h3 className="font-bold text-lg text-gray-900 mb-3">Job Description</h3><p className="text-gray-700 leading-7">{project.description}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-100 pb-8">
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><DollarSign className="h-4 w-4" /> {project.budget}</div><span className="text-xs text-gray-500">{project.type} Price</span></div>
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><Layers className="h-4 w-4" /> {project.experienceLevel}</div><span className="text-xs text-gray-500">Experience Level</span></div>
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><Calendar className="h-4 w-4" /> {project.dateRange}</div><span className="text-xs text-gray-500">Start Date</span></div>
            </div>
            <div className="mb-8"><h3 className="font-bold text-lg text-gray-900 mb-3">Skills & Expertise</h3><div className="flex flex-wrap gap-2">{project.skills?.map(skill => (<span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">{skill}</span>))}</div></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Submit a Proposal</h2>
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span><input type="number" className="pl-7 w-full border border-gray-300 rounded-md p-2 focus:ring-[#14A9F9] focus:border-[#14A9F9]" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} /></div></div>
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration</label><select className="w-full border border-gray-300 rounded-md p-2 bg-white" value={duration} onChange={(e) => setDuration(e.target.value)}><option>Less than 1 month</option><option>1 to 3 months</option><option>3 to 6 months</option></select></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label><textarea rows={6} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#14A9F9] focus:border-[#14A9F9]" placeholder="Explain why you're the best fit..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}></textarea></div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100"><Button variant="outline" onClick={onBack}>Cancel</Button><Button className="px-8">Send Proposal</Button></div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hidden lg:block">
              <Button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="w-full h-12 text-base mb-4 font-semibold">Apply Now</Button>
              <Button onClick={() => setIsSaved(!isSaved)} variant="outline" className={`w-full h-12 text-base flex items-center justify-center gap-2 ${isSaved ? "bg-[#14A9F9] text-black border-[#14A9F9]" : "text-[#14A9F9] border-[#14A9F9] hover:bg-[#14A9F9]/5"}`}><Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#14A9F9]" : ""}`} /> {isSaved ? "Saved" : "Save Job"}</Button>
           </div>
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">About the Client</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-2">{project.client?.verified ? <BadgeCheck className="h-5 w-5 text-blue-600" /> : <XCircle className="h-5 w-5 text-gray-400" />}<span className="font-medium text-gray-700">{project.client?.verified ? "Payment Method Verified" : "Payment Unverified"}</span></div>
                 <div><div className="flex items-center gap-1 mb-1">{[1,2,3,4,5].map(star => (<Star key={star} className={`h-4 w-4 ${star <= (project.client?.rating || 0) ? "fill-[#14A9F9] text-[#14A9F9]" : "text-gray-300"}`} />))}<span className="text-sm text-gray-600 ml-1">{project.client?.rating} of 5 reviews</span></div></div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.location}</h5><span className="text-sm text-gray-500">{project.postedTime}</span></div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.jobCount} Jobs posted</h5><span className="text-sm text-gray-500">100% Hire rate</span></div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.totalSpent} Total Spent</h5><span className="text-sm text-gray-500">Member since {project.client?.memberSince}</span></div>
              </div>
           </div>
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"><h3 className="font-bold text-lg text-gray-900 mb-3">Activity on this Job</h3><div className="text-sm text-gray-600 space-y-2"><p>Proposals: <span className="font-semibold text-gray-900">{project.proposals}</span></p><p>Interviewing: <span className="font-semibold text-gray-900">2</span></p><p>Invites Sent: <span className="font-semibold text-gray-900">5</span></p></div></div>
           <SmartBidCard projectType={project.type} budget={project.budget} />
           <div className="text-sm text-[#14A9F9] font-medium cursor-pointer hover:underline">Flag as inappropriate</div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 5. MAIN BOOKMARKS PAGE
// ==============================================================================

export default function BookmarksPage() {
  const [projectList, setProjectList] = useState<Project[]>(MOCK_PROJECTS);
  
  // -- STATE: Filters --
  const [filters, setFilters] = useState<any>({ 
    search: "", 
    categories: [], 
    jobTypes: [], 
    experience: [],
    verifiedOnly: false
  });
  
  const [view, setView] = useState<"list" | "proposal">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<{show: boolean, message: string, deletedId?: number} | null>(null);
  const [deletedProject, setDeletedProject] = useState<Project | null>(null);

  // -- HANDLERS: Actions --
  const handleRemoveBookmark = (id: number) => {
    const projectToRemove = projectList.find(p => p.id === id);
    if (projectToRemove) {
      setDeletedProject(projectToRemove);
      setProjectList(prev => prev.filter(p => p.id !== id));
      setToast({ show: true, message: "Bookmark removed", deletedId: id });
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleUndo = () => {
    if (deletedProject) {
      setProjectList(prev => [...prev, deletedProject].sort((a,b) => a.id - b.id)); 
      setToast(null);
      setDeletedProject(null);
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setView("proposal");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ 
      search: "", 
      categories: [], 
      jobTypes: [], 
      experience: [],
      verifiedOnly: false 
    });
  };

  // -- FILTERING LOGIC --
  const filteredProjects = projectList.filter((p) => {
    // 1. Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(searchLower) && !p.description.toLowerCase().includes(searchLower)) return false;
    }
    
    // 2. Categories
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    
    // 3. Job Types
    if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(p.type)) return false;

    // 4. Experience Level
    if (filters.experience.length > 0 && !filters.experience.includes(p.experienceLevel)) return false;

    // 5. Client Verification
    if (filters.verifiedOnly && !p.client.verified) return false;

    return true;
  });

  // Render View Switcher
  if (view === "proposal" && selectedProject) {
    return (
      <div className="bg-[#f9f9f9] min-h-screen pt-4 pb-12">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
           <ProposalView project={selectedProject} onBack={() => setView("list")} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans p-6 pb-24">
      {/* Toast Notification */}
      {toast?.show && <Toast message={toast.message} onUndo={handleUndo} onClose={() => setToast(null)} />}

      <div className="max-w-[1600px] mx-auto md:p-6 lg:p-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:mt-[-40px]">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Bookmarks</h1>
            <p className="text-gray-500 mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              You have {filteredProjects.length} active opportunities saved
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Search bookmarks..." 
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] bg-white text-sm" 
               />
             </div>
             <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:border-[#14A9F9] transition-colors">
               <Filter className="h-4 w-4" /> Sort by: Newest
             </button>
          </div>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ENHANCED FILTERS SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 space-y-8 sticky top-4">
             <FilterSidebar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClearAll={handleClearFilters} 
             />
          </div>

          {/* CENTER: BOOKMARKS FEED */}
          <div className="lg:col-span-9">
             <div className="min-h-[400px]">
                {filteredProjects.length > 0 ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {filteredProjects.map((project) => (
                      <EnhancedBookmarkCard 
                        key={project.id} 
                        project={project} 
                        onRemove={handleRemoveBookmark} 
                        onView={handleViewDetails} 
                      />
                    ))}
                  </div>
                ) : (
                  // EMPTY STATE
                  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center h-[500px]">
                    <div className="bg-blue-50 p-6 rounded-full mb-6 animate-pulse">
                       <Bookmark className="h-12 w-12 text-[#14A9F9] fill-[#14A9F9]/20" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No Matches Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                      We couldn't find any bookmarked projects matching your current filters. Try clearing your filters to see all saved jobs.
                    </p>
                    <Button onClick={handleClearFilters} className="px-8 py-6 text-base shadow-xl shadow-[#14A9F9]/20">
                      Clear Filters
                    </Button>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}