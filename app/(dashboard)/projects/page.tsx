"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  DollarSign, Calendar, Star, Filter, Bookmark, CheckCircle, 
  XCircle, AlertCircle, Send, Briefcase, ChevronDown, ChevronUp, 
  ArrowLeft, MapPin, Clock, ShieldCheck, Zap, User, ThumbsUp,
  Search, Phone, MessageSquare, MoreHorizontal, BadgeCheck
} from "lucide-react";

// ==============================================================================
// 1. SHARED UI COMPONENTS
// ==============================================================================

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm", 
    blueOutline: "border border-[#14A9F9] text-[#14A9F9] bg-white hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
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
    outline: "text-gray-600 border-gray-300 border",
    pending: "bg-[#14A9F9]/10 text-[#14A9F9] border-transparent",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    destructive: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    info: "bg-[#14A9F9] text-white border-transparent", 
  };
  // @ts-ignore
  return <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;
const CardHeader = ({ className = "", children }: any) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }: any) => <h3 className={`text-xl font-bold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ className = "", children }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ className = "", children }: any) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

// ==============================================================================
// 2. TYPES & MOCK DATA
// ==============================================================================

type Milestone = { name: string; description: string; amount: string; date: string; completed: boolean; };
type Applicant = { id: number; name: string; rating: number; earnings: string; appliedTime: string; about: string; avatar: string; };
type ClientInfo = { name: string; location: string; rating: number; totalSpent: string; memberSince: string; verified: boolean; };

type Project = {
  id: number; title: string; category: string; description: string; 
  budget: string; type: "Fixed" | "Hourly";
  experienceLevel: "Entry" | "Intermediate" | "Expert"; // New field for Upwork style
  postedTime: string; // New field
  dateRange: string; proposals: number; 
  status: "Pending" | "Applied" | "Awarded" | "Declined" | "Dispute";
  closed: string | null; rating: number | null; milestones: Milestone[] | null; isBookmarked: boolean;
  appliedDate?: string; declineReason?: string; disputeReason?: string;
  client?: ClientInfo; 
  applicants?: Applicant[];
  skills?: string[];
  myBidAmount?: string; 
  bidStatus?: "Pending" | "Accepted" | "Rejected";
};

// --- MOCK APPLICANTS ---
const MOCK_APPLICANTS: Applicant[] = [
  { id: 101, name: "Sarah J.", rating: 4.9, earnings: "$45k+", appliedTime: "2 hours ago", about: "Expert UI/UX designer...", avatar: "SJ" },
];

// --- INITIAL DATA ---
const INITIAL_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Cab App UI/UX Design for iOS - Luxury Travel", 
    category: "FIGMA", 
    type: "Fixed",
    experienceLevel: "Expert",
    postedTime: "5 hours ago",
    description: "I will design UI UX for mobile app with figma for ios. Adarsh Group is venturing into homes Inspired by the millennial generation. We need a clean, modern interface that rivals Uber and Lyft but focuses on luxury travel. The design must be pixel perfect and ready for development.", 
    budget: "$4,500", 
    dateRange: "22 Jan - 22 Feb", 
    proposals: 12, 
    status: "Pending", 
    closed: null, rating: null, milestones: null, isBookmarked: false,
    skills: ["Figma", "Mobile Design", "Prototyping", "iOS", "Auto Layout"],
    client: { name: "Adarsh Group", location: "New York, USA", rating: 4.9, totalSpent: "$150k+", memberSince: "2018", verified: true },
    applicants: MOCK_APPLICANTS
  },
  { 
    id: 2, 
    title: "E-Commerce Shopify Redesign - Conversion Focused", 
    category: "REACT", 
    type: "Hourly",
    experienceLevel: "Intermediate",
    postedTime: "12 minutes ago",
    description: "Looking for an expert to redesign our Shopify store. Need modern aesthetic and improved conversion funnel. The current theme is slow and unresponsive. We need someone who understands Liquid and React.", 
    budget: "$45/hr", 
    dateRange: "15 Mar - 30 Apr", 
    proposals: 8, 
    status: "Pending", 
    closed: null, rating: null, milestones: null, isBookmarked: true,
    skills: ["Shopify", "React", "Liquid", "CSS"],
    client: { name: "TrendSetter Clothing", location: "London, UK", rating: 4.5, totalSpent: "$20k+", memberSince: "2021", verified: true },
    applicants: MOCK_APPLICANTS
  },
  { 
    id: 3, 
    title: "CAB APP DEVELOPMENT", 
    category: "FLUTTER", 
    type: "Fixed", 
    experienceLevel: "Expert",
    postedTime: "2 days ago",
    description: "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens...", 
    budget: "$4,500", 
    dateRange: "22-01-22 to 22-01-22", 
    proposals: 12, 
    status: "Applied", 
    closed: null, rating: null, milestones: null, isBookmarked: false, 
    appliedDate: "Oct 12, 2023",
    myBidAmount: "$137.00", 
    bidStatus: "Pending" 
  },
  { id: 4, title: "Real Estate Portal App", category: "FLUTTER", type: "Fixed", experienceLevel: "Expert", postedTime: "1 month ago", description: "Full stack development for a property listing app.", budget: "$8,000", dateRange: "Completed", proposals: 12, status: "Awarded", closed: "12 May 2025", rating: 5, isBookmarked: false, milestones: [] },
  { id: 5, title: "Crypto Wallet Integration", category: "BLOCKCHAIN", type: "Fixed", experienceLevel: "Expert", postedTime: "2 weeks ago", description: "Need a developer to integrate MetaMask.", budget: "$3,000", dateRange: "Flexible", proposals: 50, status: "Declined", closed: null, rating: null, milestones: null, isBookmarked: false, appliedDate: "Sept 10, 2023", declineReason: "Client required a developer located in EST timezone only." },
  { id: 6, title: "Corporate Landing Page", category: "WORDPRESS", type: "Fixed", experienceLevel: "Entry", postedTime: "3 days ago", description: "Build a 5-page corporate website.", budget: "$800", dateRange: "Urgent", proposals: 5, status: "Dispute", closed: null, rating: null, milestones: null, isBookmarked: false, disputeReason: "Client is claiming the work does not match the provided Figma design." },
];

// ==============================================================================
// 3. SIDEBAR & HEADER COMPONENTS
// ==============================================================================

const RelationshipManagerCard = () => {
  return (
    <Card className="bg-white border-[#14A9F9]/20 shadow-sm overflow-hidden mb-6">
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

const FilterSidebar = ({ filters, onFilterChange }: any) => {
  return (
    <div className="hidden lg:block space-y-6 pr-4">
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Filter By</h3>
        
        {/* Category */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            {["Web Development", "Mobile Dev", "Design", "Writing"].map((cat) => (
              <label key={cat} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]">
                <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9] focus:ring-[#14A9F9]" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Experience Level</h4>
          <div className="space-y-2">
            {["Entry Level", "Intermediate", "Expert"].map((level) => (
              <label key={level} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]">
                <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9] focus:ring-[#14A9F9]" />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Job Type</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9]" />
               <span>Hourly ($/hr)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9]" />
               <span>Fixed Price</span>
            </label>
          </div>
        </div>

        {/* Client History */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Client History</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9]" />
               <span>No hires yet</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9]" />
               <span>1 to 9 hires</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
               <input type="checkbox" className="rounded border-gray-300 text-[#14A9F9]" />
               <span>10+ hires</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 4. MAIN PROJECT CARDS
// ==============================================================================

const EnhancedNewProjectCard = ({ project, onToggleBookmark, onViewDetails }: any) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#14A9F9] hover:shadow-md transition-all cursor-pointer relative" onClick={() => onViewDetails(project)}>
      
      {/* Top Meta: Time */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-500 font-medium flex items-center">
          <Clock className="h-3 w-3 mr-1" /> Posted {project.postedTime}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(project.id); }}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#14A9F9] transition-colors"
        >
          <Bookmark className={`h-5 w-5 ${project.isBookmarked ? "fill-[#14A9F9] text-[#14A9F9]" : ""}`} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#14A9F9] group-hover:underline decoration-2 transition-colors mb-4">
        {project.title}
      </h3>

      {/* Primary Stats */}
      <div className="text-xs text-gray-600 mb-4 flex items-center flex-wrap gap-y-2">
        <span className="font-bold text-gray-900 mr-1">{project.type} Price</span> 
        <span className="text-gray-400 mx-2">•</span>
        <span className="font-medium text-gray-900 mr-1">{project.experienceLevel}</span>
        <span className="text-gray-400 mx-2">•</span>
        <span className="font-medium text-gray-900">Est. Budget: {project.budget}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Skills */}
      {project.skills && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.slice(0, 4).map((skill: string) => (
            <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium hover:bg-gray-200">
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && <span className="text-xs text-gray-500 self-center">+{project.skills.length - 4} more</span>}
        </div>
      )}

      {/* Client Info Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
        {project.client?.verified && (
          <div className="flex items-center text-blue-600 font-medium">
            <BadgeCheck className="h-4 w-4 mr-1 fill-blue-100" /> Payment Verified
          </div>
        )}
        <div className="flex items-center">
          <Star className="h-3 w-3 fill-[#14A9F9] text-[#14A9F9] mr-1" />
          <span className="font-bold text-gray-900">{project.client?.rating}</span>
        </div>
        <div className="font-medium text-gray-900">
          {project.client?.totalSpent} <span className="text-gray-500 font-normal">spent</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" /> {project.client?.location}
        </div>
      </div>
    </div>
  );
};

// --- APPLIED SECTION (UPDATED) ---
const AppliedSection = ({ projects }: any) => {
  const router = useRouter();

  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No active applications.</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {projects.map((project: any) => (
        <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Content Area */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 uppercase hover:text-[#14A9F9] cursor-pointer">{project.title}</h3>
                <span className="text-xs font-medium text-gray-500">{project.proposals} Proposals</span>
              </div>
              
              <div className="text-xs font-semibold text-gray-500 uppercase mb-4">{project.category}</div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center gap-10">
                {/* Project Budget */}
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span>{project.budget.replace('$', '')}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{project.dateRange}</span>
                </div>
              </div>
              
              {/* My Bid Section (Matching Screenshot) */}
              {project.myBidAmount && (
                <div className="mt-6">
                   <div className="flex items-end gap-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{project.myBidAmount}</span>
                        <p className="text-xs text-gray-500 mt-1">Amount</p>
                      </div>
                      <div className="mb-2">
                         <Badge variant="info" className="px-3 py-1 rounded text-xs">
                            {project.bidStatus || "Pending"}
                         </Badge>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Right Action Area */}
            <div className="flex flex-col justify-start gap-3 w-full lg:w-48 shrink-0">
               {/* 1. View Your Apply - Redirects to Proposal Page */}
               <Button 
                  variant="blue" 
                  className="w-full h-11 font-semibold"
                  onClick={() => router.push('/proposals')}
               >
                 View Your apply
               </Button>

               {/* 2. Send Message - Redirects to Workstream */}
               <Button 
                  variant="blueOutline" 
                  className="w-full h-11 font-semibold"
                  onClick={() => router.push('/workstream')}
               >
                 Send Message
               </Button>

               {/* 3. View Manager Profile */}
               <button className="text-xs text-center text-gray-400 font-medium hover:text-gray-600 transition-colors mt-2">
                 View manager profile
               </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

// ... Other Sections (Bookmarks, Awarded, Declined, Dispute) ...
// Keeping them simple for brevity but they should follow the new Card style if desired.
const BookmarksSection = ({ projects, onToggleBookmark, onViewDetails }: any) => {
  if (projects.length === 0) return (
    <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
      <Bookmark className="h-10 w-10 text-gray-300 mx-auto mb-2" />
      <p className="font-medium">No bookmarked projects.</p>
    </div>
  );
  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <Card key={project.id} className="border-l-4 border-l-[#14A9F9]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div><CardTitle className="text-lg">{project.title}</CardTitle><div className="flex gap-2 mt-2"><Badge variant="outline">{project.status}</Badge></div></div>
              <button onClick={() => onToggleBookmark(project.id)}><Bookmark className="h-5 w-5 fill-[#14A9F9] text-[#14A9F9]" /></button>
            </div>
          </CardHeader>
          <CardContent><p className="text-sm text-gray-600 mb-2">{project.description}</p><div className="text-sm text-gray-500 font-medium">{project.budget}</div></CardContent>
          <CardFooter className="pt-0 border-t bg-gray-50/50 p-4">
            {project.status === "Pending" ? (<Button size="sm" onClick={() => onViewDetails(project)} className="w-full bg-[#14A9F9]">View Details</Button>) : (<Button size="sm" variant="outline" className="w-full" disabled>Applied</Button>)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AwardedSection = ({ projects }: any) => {
  const AwardedItem = ({ project }: any) => {
    const [showMilestones, setShowMilestones] = useState(false);
    const totalEarned = project.milestones?.reduce((acc: any, curr: any) => acc + parseFloat(curr.amount.replace(/[^0-9.]/g, '')), 0) || 0;
    return (
      <div className="space-y-4">
        <Card className="border-green-100 bg-green-50/30">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div><div className="flex items-center gap-2"><CardTitle className="text-xl">{project.title}</CardTitle><CheckCircle className="h-5 w-5 text-green-600" /></div><Badge variant="success" className="mt-2 bg-green-100 text-green-800 border-green-200">Project Completed</Badge></div>
              <div className="text-right"><p className="text-2xl font-bold text-green-700">${totalEarned.toLocaleString()}</p><p className="text-xs text-gray-500">Total Earnings</p></div>
            </div>
          </CardHeader>
          <CardContent><p className="text-sm text-gray-600 mb-4">{project.description}</p><div className="flex items-center gap-4 text-sm text-gray-500"><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Closed: {project.closed}</span></div></CardContent>
          <CardFooter className="border-t border-green-100 pt-4 flex justify-between bg-white/50">
            <Button variant="outline" size="sm">Download Invoice</Button>
            <Button variant="ghost" size="sm" className="text-green-700 flex gap-2" onClick={() => setShowMilestones(!showMilestones)}>{showMilestones ? "Hide Milestones" : "View Milestones"}{showMilestones ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}</Button>
          </CardFooter>
        </Card>
        {showMilestones && project.milestones && (<Card className="ml-4 md:ml-8 border-l-4 border-l-green-500 animate-in slide-in-from-top-2"><CardContent className="p-6"><div className="space-y-4">{project.milestones.map((m: any, i: number) => (<div key={i} className="flex justify-between py-2 border-b last:border-0"><div><p className="font-medium text-sm">{m.name}</p><p className="text-xs text-gray-500">{m.date}</p></div><div className="text-right"><p className="font-bold text-green-600">{m.amount}</p></div></div>))}</div></CardContent></Card>)}
      </div>
    );
  };
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No awarded projects yet.</div>;
  return <div className="space-y-6">{projects.map((project: any) => (<AwardedItem key={project.id} project={project} />))}</div>;
};

const DeclinedSection = ({ projects }: any) => {
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No declined projects.</div>;
  return (<div className="space-y-4">{projects.map((project: any) => (<Card key={project.id} className="opacity-90"><CardHeader><div className="flex justify-between items-start"><CardTitle className="text-gray-700">{project.title}</CardTitle><Badge variant="destructive" className="flex gap-1"><XCircle className="h-3 w-3" /> Declined</Badge></div></CardHeader><CardContent><div className="bg-red-50 border border-red-100 p-4 rounded-md mb-4"><p className="text-xs font-bold text-red-800 uppercase mb-1">Reason for Decline</p><p className="text-sm text-red-700">{project.declineReason}</p></div></CardContent></Card>))}</div>);
};

const DisputeSection = ({ projects }: any) => {
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No disputes found.</div>;
  return (<div className="space-y-4">{projects.map((project: any) => (<Card key={project.id} className="border-orange-200"><CardHeader className="bg-orange-50/50 border-b border-orange-100"><div className="flex justify-between items-start"><CardTitle className="text-orange-950">{project.title}</CardTitle><div className="flex items-center text-orange-600 font-bold text-sm gap-1"><AlertCircle className="h-4 w-4" /> Action Required</div></div></CardHeader><CardContent className="pt-6"><p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border mb-4">"{project.disputeReason}"</p></CardContent><CardFooter className="flex gap-3 justify-end border-t pt-4"><Button variant="outline" size="sm">Contact Support</Button><Button size="sm" className="bg-orange-600 text-white">View Case</Button></CardFooter></Card>))}</div>);
};

const SmartBidCard = ({ projectType, budget }: { projectType: string, budget: string }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const handleAnalyze = () => { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setResult(projectType === "Hourly" ? "$40 - $50/hr" : "$4,200 - $4,600"); }, 1500); };
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <CardHeader className="pb-2"><div className="flex items-center gap-2"><Zap className="h-5 w-5 text-indigo-600" /><CardTitle className="text-base text-indigo-900">AI Smart Bid</CardTitle></div></CardHeader>
      <CardContent>
        <p className="text-xs text-indigo-700 mb-4">AI suggests optimal bid.</p>
        {!result && !analyzing && (<Button onClick={handleAnalyze} size="sm" className="w-full bg-indigo-600 text-white shadow-lg">Analyze Price</Button>)}
        {analyzing && (<div className="flex justify-center space-x-2 py-2"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div></div>)}
        {result && (<div className="animate-in fade-in"><p className="text-xs font-semibold text-gray-500">Recommended</p><p className="text-xl font-bold text-indigo-700 mt-1">{result}</p></div>)}
      </CardContent>
    </Card>
  );
};

const ProposalView = ({ project, onBack, onSubmitProposal }: { project: Project, onBack: () => void, onSubmitProposal: (id: number) => void }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("Less than 1 month");
  const [coverLetter, setCoverLetter] = useState("");
  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects</button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex justify-between items-start"><h1 className="text-2xl font-bold text-gray-900">{project.title}</h1><Badge variant="purple">{project.type} Price</Badge></div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3 mb-6"><span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> {project.budget}</span><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {project.dateRange}</span></div>
            <h3 className="font-semibold text-lg mb-2">Description</h3><p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
          </div>
          <Card className="border-gray-300 shadow-md">
            <CardHeader className="bg-gray-50 border-b"><CardTitle>Submit Your Proposal</CardTitle></CardHeader>
            <CardContent className="space-y-6 pt-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount</label><input type="number" className="block w-full border border-gray-300 rounded-md p-2" placeholder="0.00" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration</label><select className="block w-full border border-gray-300 rounded-md p-2 bg-white" value={duration} onChange={(e) => setDuration(e.target.value)}><option>Less than 1 month</option><option>1-3 months</option></select></div>
               </div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label><textarea rows={6} className="block w-full border border-gray-300 rounded-md p-2" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}></textarea></div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-end gap-3"><Button variant="outline" onClick={onBack}>Cancel</Button><Button onClick={() => onSubmitProposal(project.id)} className="px-8">Submit Proposal</Button></CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
           <Card><CardHeader className="bg-gray-50 border-b pb-4"><CardTitle className="text-base">Client Information</CardTitle></CardHeader><CardContent className="pt-6 space-y-4"><div className="flex items-center gap-3"><div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white font-bold">{project.client?.name.substring(0,2)}</div><div><div className="font-medium">{project.client?.name}</div></div></div></CardContent></Card>
           <SmartBidCard projectType={project.type} budget={project.budget} />
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 5. MAIN PAGE LAYOUT
// ==============================================================================

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [projectList, setProjectList] = useState<Project[]>(INITIAL_PROJECTS);
  const [filters, setFilters] = useState({});
  
  // VIEW STATE
  const [view, setView] = useState<"list" | "proposal">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // ACTIONS
  const toggleBookmark = (id: number) => {
    setProjectList(prev => prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setView("proposal");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedProject(null);
  };

  const handleApply = (id: number) => {
    setProjectList(prev => prev.map(p => 
      p.id === id ? { 
        ...p, status: "Applied", isBookmarked: false, 
        appliedDate: new Date().toLocaleDateString(), myBidAmount: "$150.00", bidStatus: "Pending" 
      } : p
    ));
    setView("list");
    setActiveTab("applied");
  };

  // FILTERING LOGIC
  const getFilteredProjects = (statusFilter: string | null, onlyBookmarks = false) => {
    return projectList.filter((p) => {
      if (onlyBookmarks && !p.isBookmarked) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      return true;
    });
  };

  // --- RENDER PROPOSAL VIEW ---
  if (view === "proposal" && selectedProject) {
    return (
      <div className="p-4 md:p-8 pt-10 max-w-7xl mx-auto font-sans text-gray-900 bg-[#f9f9f9] min-h-screen">
         <ProposalView 
            project={selectedProject} 
            onBack={handleBackToList} 
            onSubmitProposal={handleApply}
         />
      </div>
    );
  }

  // --- RENDER DASHBOARD VIEW ---
  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-500 mt-1">Find new work and manage your active contracts.</p>
          </div>
          <div className="w-full md:w-auto relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input type="text" placeholder="Search for jobs..." className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] transition-all" />
          </div>
        </div>

        {/* 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: FILTERS (25%) */}
          <div className="lg:col-span-3">
             <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* MIDDLE COLUMN: FEED (55%) */}
          <div className="lg:col-span-6 space-y-6">
             
             {/* Custom Tabs */}
             <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 gap-6">
                {[
                  { id: "new", label: "Best Matches", count: getFilteredProjects("Pending").length },
                  { id: "applied", label: "Applied", count: getFilteredProjects("Applied").length },
                  { id: "bookmarks", label: "Saved", count: getFilteredProjects(null, true).length },
                  { id: "awarded", label: "Active", count: getFilteredProjects("Awarded").length },
                  { id: "declined", label: "Declined", count: getFilteredProjects("Declined").length },
                  { id: "dispute", label: "Dispute", count: getFilteredProjects("Dispute").length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                      activeTab === tab.id 
                        ? "border-[#14A9F9] text-[#14A9F9]" 
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-[#14A9F9]/10 text-[#14A9F9]" : "bg-gray-100 text-gray-500"}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
             </div>

             {/* Content Area */}
             <div className="min-h-[500px]">
                {activeTab === "new" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    {getFilteredProjects("Pending").map(p => (
                      <EnhancedNewProjectCard key={p.id} project={p} onToggleBookmark={toggleBookmark} onViewDetails={handleViewDetails} />
                    ))}
                    {getFilteredProjects("Pending").length === 0 && <div className="text-center py-12 text-gray-500">No jobs found matching your skills.</div>}
                  </div>
                )}

                {activeTab === "applied" && <AppliedSection projects={getFilteredProjects("Applied")} />}
                {activeTab === "bookmarks" && <BookmarksSection projects={getFilteredProjects(null, true)} onToggleBookmark={toggleBookmark} onViewDetails={handleViewDetails} />}
                {activeTab === "awarded" && <AwardedSection projects={getFilteredProjects("Awarded")} />}
                {activeTab === "declined" && <DeclinedSection projects={getFilteredProjects("Declined")} />}
                {activeTab === "dispute" && <DisputeSection projects={getFilteredProjects("Dispute")} />}
             </div>
          </div>

          {/* RIGHT COLUMN: MANAGER & PROMO (20%) */}
          <div className="lg:col-span-3 space-y-6">
             <RelationshipManagerCard />
             
             {/* Promo / Tip Card */}
             <div className="bg-gradient-to-br from-[#14A9F9] to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                   <h4 className="font-bold text-lg">Boost your profile</h4>
                   <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                </div>
                <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                   Freelancers with verified skills are 30% more likely to get hired. Take a skill test today.
                </p>
                <Button className="w-full bg-white text-[#14A9F9] hover:bg-gray-50 border-0">
                   Take Skill Test
                </Button>
             </div>

             <div className="text-xs text-gray-400 text-center pt-4">
                &copy; 2025 HeroFreelancer
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}