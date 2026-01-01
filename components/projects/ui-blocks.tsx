"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  DollarSign, Calendar, Star, Bookmark, CheckCircle, 
  XCircle, AlertCircle, Briefcase, ChevronDown, ChevronUp, 
  ArrowLeft, MapPin, Clock, ShieldCheck, Zap, ThumbsUp,
  Phone, MessageSquare, BadgeCheck, Layers, Check, Lock, MessageCircle
} from "lucide-react";
import { Project, ManagerInfo, DEFAULT_MANAGER } from "./data"; // Ensure you have created data.ts as per previous step

// ==============================================================================
// 1. BASE UI COMPONENTS (Reusable Helpers)
// ==============================================================================

export const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm", 
    blueOutline: "border border-[#14A9F9] text-[#14A9F9] bg-white hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    green: "bg-green-600 text-white hover:bg-green-700",
  };
  const sizes: any = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

export const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants: any = {
    default: "bg-gray-100 text-gray-700 border-gray-200 border",
    outline: "text-gray-600 border-gray-300 border",
    pending: "bg-[#14A9F9]/10 text-[#14A9F9] border-transparent",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    destructive: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    info: "bg-[#14A9F9] text-white border-transparent", 
  };
  return <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};

export const Card = ({ className = "", children }: any) => <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;
export const CardHeader = ({ className = "", children }: any) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
export const CardTitle = ({ className = "", children }: any) => <h3 className={`text-xl font-bold leading-none tracking-tight ${className}`}>{children}</h3>;
export const CardContent = ({ className = "", children }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
export const CardFooter = ({ className = "", children }: any) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

// ==============================================================================
// 2. HELPER COMPONENTS (SmartBid)
// ==============================================================================

export const SmartBidCard = ({ projectType, budget }: { projectType: string, budget: string }) => {
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

// ==============================================================================
// 3. PROJECT CARD COMPONENTS (For the Feed)
// ==============================================================================

// --- A. NEW PROJECT / BOOKMARK CARD ---
export const EnhancedNewProjectCard = ({ project, onToggleBookmark, onViewDetails }: { project: Project, onToggleBookmark: (id: number) => void, onViewDetails: (p: Project) => void }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#14A9F9] hover:shadow-md transition-all cursor-pointer relative" onClick={() => onViewDetails(project)}>
      
      {/* Top Meta */}
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
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#14A9F9] group-hover:underline decoration-2 transition-colors mb-3">
        {project.title}
      </h3>

      {/* Stats */}
      <div className="text-xs text-gray-600 mb-4 flex items-center flex-wrap gap-y-2">
        <span className="font-bold text-gray-900 mr-1">{project.type} Price</span> 
        <span className="text-gray-300 mx-2">|</span>
        <span className="font-medium text-gray-900 mr-1">{project.experienceLevel} Level</span>
        <span className="text-gray-300 mx-2">|</span>
        <span className="font-medium text-gray-900">Est. Budget: {project.budget}</span>
      </div>

      {/* Desc */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
        {project.description}
      </p>

      {/* Skills */}
      {project.skills && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.slice(0, 4).map((skill: string) => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium hover:bg-gray-200 transition-colors">
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && <span className="text-xs text-gray-500 self-center">+{project.skills.length - 4} more</span>}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-500">
        {project.client?.verified && (
          <div className="flex items-center text-blue-600 font-medium">
            <BadgeCheck className="h-4 w-4 mr-1 fill-blue-100" /> Verified
          </div>
        )}
        <div className="flex items-center">
          <Star className="h-3 w-3 fill-[#14A9F9] text-[#14A9F9] mr-1" />
          <span className="font-bold text-gray-900 mr-1">{project.client?.rating}</span>
        </div>
        <div className="font-medium text-gray-900">
          {project.client?.totalSpent} <span className="text-gray-500 font-normal">spent</span>
        </div>
        <div className="flex items-center hidden sm:flex">
          <MapPin className="h-3 w-3 mr-1" /> {project.client?.location}
        </div>
      </div>
    </div>
  );
};

// --- B. APPLIED CARD ---
export const AppliedCard = ({ project, onViewManager }: { project: Project, onViewManager: (m: ManagerInfo) => void }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 uppercase hover:text-[#14A9F9] cursor-pointer">{project.title}</h3>
            <span className="text-xs font-medium text-gray-500">{project.proposals} Proposals</span>
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase mb-4">{project.category}</div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">{project.description}</p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-gray-700 font-medium"><DollarSign className="h-5 w-5 text-gray-500" /><span>{project.budget.replace('$', '')}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="h-5 w-5 text-gray-500" /><span>{project.dateRange}</span></div>
          </div>
          {project.myBidAmount && (
            <div className="mt-6">
               <div className="flex items-end gap-4">
                  <div><span className="text-2xl font-bold text-gray-900">{project.myBidAmount}</span><p className="text-xs text-gray-500 mt-1">Amount</p></div>
                  <div className="mb-2"><Badge variant="info" className="px-3 py-1 rounded text-xs">{project.bidStatus || "Pending"}</Badge></div>
               </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start gap-3 w-full lg:w-48 shrink-0">
           <Button variant="blue" className="w-full h-11 font-semibold" onClick={() => router.push('/proposals')}>View Your apply</Button>
           <Button variant="blueOutline" className="w-full h-11 font-semibold" onClick={() => router.push('/workstream')}>Send Message</Button>
           <button onClick={() => onViewManager(project.manager || DEFAULT_MANAGER)} className="text-xs text-center text-gray-400 font-medium hover:text-gray-600 transition-colors mt-2">View manager profile</button>
        </div>
      </div>
    </div>
  );
};

// --- C. AWARDED CARD (With Milestones) ---
export const AwardedCard = ({ project, onViewManager }: { project: Project, onViewManager: (m: ManagerInfo) => void }) => {
  const router = useRouter();
  const [showMilestones, setShowMilestones] = useState(false);
  
  // Calculations
  const totalEarned = project.milestones?.reduce((acc: any, curr: any) => acc + parseFloat(curr.amount.replace(/[^0-9.]/g, '')), 0) || 0;
  const completedMilestones = project.milestones?.filter((m: any) => m.completed).length || 0;
  const totalMilestones = project.milestones?.length || 1;
  const progress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-4">
      <Card className="border border-green-200 bg-green-50/20 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2"><CardTitle className="text-xl">{project.title}</CardTitle><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div className="flex items-center gap-3">
                 <Badge variant="success" className="mt-2 bg-green-100 text-green-800 border-green-200">Active Contract</Badge>
                 <div className="mt-2 flex items-center gap-2 text-xs text-green-700">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div></div>
                    <span>{progress}% Complete</span>
                 </div>
              </div>
            </div>
            <div className="text-right"><p className="text-3xl font-bold text-green-700">${totalEarned.toLocaleString()}</p><p className="text-xs text-gray-500">Total Earnings</p></div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{project.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500"><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Contract Started: {project.dateRange}</span></div>
        </CardContent>
        <CardFooter className="border-t border-green-100 pt-4 flex flex-col gap-4">
          <div className="flex justify-between w-full">
             <div className="flex gap-2">
                <Button variant="outline" size="sm">Download Invoice</Button>
                <Button variant="ghost" size="sm" className="text-green-700 flex gap-2 font-medium" onClick={() => setShowMilestones(!showMilestones)}>{showMilestones ? "Hide Milestones" : "View Milestones"}{showMilestones ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}</Button>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full pt-2 border-t border-green-100">
             <Button size="sm" variant="blue" onClick={() => router.push('/proposals')}>View Your Apply</Button>
             <Button size="sm" variant="blueOutline" onClick={() => router.push('/workstream')}>Send Message</Button>
             <Button size="sm" variant="ghost" onClick={() => onViewManager(project.manager || DEFAULT_MANAGER)}>View Manager Profile</Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* ANIMATED STEP-BY-STEP MILESTONES */}
      {showMilestones && project.milestones && (
        <Card className="ml-4 md:ml-8 border-l-4 border-l-green-500 animate-in slide-in-from-top-2 bg-white">
          <CardContent className="p-8">
            <h4 className="font-bold text-lg mb-6 text-gray-900">Project Roadmap</h4>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
              {project.milestones.map((m: any, i: number) => (
                <div key={i} className="relative ml-8 group">
                  <span className={`absolute -left-[43px] flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white transition-colors duration-500 ${m.completed ? 'bg-green-500' : 'bg-red-400 animate-pulse'}`}>
                    {m.completed ? <Check className="w-3 h-3 text-white" /> : <Lock className="w-3 h-3 text-white" />}
                  </span>
                  <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${m.completed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div className="flex justify-between items-center mb-1">
                        <h5 className={`font-bold ${m.completed ? 'text-green-800' : 'text-red-800'}`}>{m.name}</h5>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${m.completed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{m.completed ? "Paid" : "Not Received"}</span>
                     </div>
                     <p className="text-sm text-gray-600 mb-2">{m.description}</p>
                     <div className="flex justify-between items-center text-xs"><span className="text-gray-500 font-mono">{m.date}</span><span className="font-bold text-gray-900">{m.amount}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// --- D. DECLINED CARD ---
export const DeclinedCard = ({ project, onViewManager }: { project: Project, onViewManager: (m: ManagerInfo) => void }) => {
  const router = useRouter();
  return (
    <Card className="opacity-80 hover:opacity-100 transition-opacity border-red-100">
      <CardHeader>
          <div className="flex justify-between items-start"><CardTitle className="text-gray-700 line-through decoration-red-500">{project.title}</CardTitle><Badge variant="destructive" className="flex gap-1"><XCircle className="h-3 w-3" /> Declined</Badge></div>
          <p className="text-xs text-gray-400">Applied on {project.appliedDate}</p>
      </CardHeader>
      <CardContent>
          <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-4"><p className="text-xs font-bold text-red-800 uppercase mb-1">Reason for Decline</p><p className="text-sm text-red-700">{project.declineReason}</p></div>
          <div className="flex justify-between text-sm text-gray-500"><span>Category: {project.category}</span><span>Budget: {project.budget}</span></div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
         <Button size="sm" variant="outline" onClick={() => router.push('/proposals')}>View Your Apply</Button>
         <Button size="sm" variant="outline" onClick={() => router.push('/workstream')}>Send Message</Button>
         <Button size="sm" variant="ghost" onClick={() => onViewManager(project.manager || DEFAULT_MANAGER)}>View Manager Profile</Button>
      </CardFooter>
    </Card>
  );
};

// --- E. DISPUTE CARD ---
export const DisputeCard = ({ project, onViewManager }: { project: Project, onViewManager: (m: ManagerInfo) => void }) => {
  const router = useRouter();
  return (
    <Card className="border-l-4 border-l-orange-500 border-orange-200 shadow-md">
      <CardHeader className="bg-orange-50/50 border-b border-orange-100">
        <div className="flex justify-between items-start"><CardTitle className="text-orange-950">{project.title}</CardTitle><div className="flex items-center text-orange-600 font-bold text-sm gap-1 animate-pulse"><AlertCircle className="h-4 w-4" /> Action Required</div></div>
      </CardHeader>
      <CardContent className="pt-6">
        <h4 className="text-sm font-semibold mb-2">Dispute Details</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border mb-4">"{project.disputeReason}"</p>
        <div className="flex gap-4 text-sm text-gray-500"><span>Amount at risk: <span className="text-gray-900 font-medium">{project.budget}</span></span></div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 justify-end border-t pt-4">
        <div className="flex gap-2 justify-end w-full"><Button variant="outline" size="sm">Contact Support</Button><Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700">View Case File</Button></div>
        <div className="flex gap-2 justify-end w-full border-t border-orange-100 pt-2">
           <Button size="sm" variant="ghost" onClick={() => router.push('/proposals')}>View Your Apply</Button>
           <Button size="sm" variant="ghost" onClick={() => router.push('/workstream')}>Send Message</Button>
           <Button size="sm" variant="ghost" onClick={() => onViewManager(project.manager || DEFAULT_MANAGER)}>View Manager Profile</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// ==============================================================================
// 4. FULL DETAIL PAGE COMPONENT (Replaces ProposalView)
// ==============================================================================

export const ProposalView = ({ project, onBack, onSubmitProposal }: { project: Project, onBack: () => void, onSubmitProposal: (id: number) => void }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("Less than 1 month");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSaved, setIsSaved] = useState(project.isBookmarked);

  const handleSubmit = () => {
    onSubmitProposal(project.id);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-[#14A9F9] transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* JOB DETAILS CARD */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#14A9F9]" /><span>{project.category}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#14A9F9]" /><span>Posted {project.postedTime}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#14A9F9]" /><span>{project.client?.location}</span></div>
            </div>
            
            <div className="mb-8">
               <h3 className="font-bold text-lg text-gray-900 mb-3">Job Description</h3>
               <p className="text-gray-700 leading-7">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-100 pb-8">
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><DollarSign className="h-4 w-4" /> {project.budget}</div><span className="text-xs text-gray-500">{project.type} Price</span></div>
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><Layers className="h-4 w-4" /> {project.experienceLevel}</div><span className="text-xs text-gray-500">Experience Level</span></div>
               <div className="flex flex-col gap-1"><div className="flex items-center gap-2 font-semibold text-gray-900"><Calendar className="h-4 w-4" /> {project.dateRange.split(' ')[0]}</div><span className="text-xs text-gray-500">Start Date</span></div>
            </div>

            <div className="mb-8">
               <h3 className="font-bold text-lg text-gray-900 mb-3">Skills & Expertise</h3>
               <div className="flex flex-wrap gap-2">
                  {project.skills?.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">{skill}</span>
                  ))}
               </div>
            </div>

            <div>
               <h3 className="font-bold text-lg text-gray-900 mb-3">Activity on this Job</h3>
               <div className="text-sm text-gray-600 space-y-2">
                  <p>Proposals: <span className="font-semibold text-gray-900">{project.proposals}</span></p>
                  <p>Interviewing: <span className="font-semibold text-gray-900">2</span></p>
                  <p>Invites Sent: <span className="font-semibold text-gray-900">5</span></p>
               </div>
            </div>
          </div>

          {/* PROPOSAL FORM */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Submit a Proposal</h2>
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount</label>
                      <div className="relative">
                         <span className="absolute left-3 top-2 text-gray-500">$</span>
                         <input type="number" className="pl-7 w-full border border-gray-300 rounded-md p-2 focus:ring-[#14A9F9] focus:border-[#14A9F9]" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 bg-white" value={duration} onChange={(e) => setDuration(e.target.value)}>
                         <option>Less than 1 month</option>
                         <option>1 to 3 months</option>
                         <option>3 to 6 months</option>
                      </select>
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                   <textarea rows={6} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#14A9F9] focus:border-[#14A9F9]" placeholder="Explain why you're the best fit..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                   <Button variant="outline" onClick={onBack}>Cancel</Button>
                   <Button onClick={handleSubmit} className="px-8">Send Proposal</Button>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
           {/* Actions */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hidden lg:block">
              <Button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="w-full h-12 text-base mb-4 font-semibold">
                 Apply Now
              </Button>
              <Button 
                onClick={handleSaveJob} 
                variant="outline" 
                className={`w-full h-12 text-base flex items-center justify-center gap-2 ${isSaved ? "bg-[#14A9F9] text-white border-[#14A9F9]" : "text-[#14A9F9] border-[#14A9F9] hover:bg-[#14A9F9]/5"}`}
              >
                 <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} /> 
                 {isSaved ? "Saved" : "Save Job"}
              </Button>
           </div>

           {/* Client Info */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">About the Client</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    {project.client?.verified ? <BadgeCheck className="h-5 w-5 text-blue-600" /> : <XCircle className="h-5 w-5 text-gray-400" />}
                    <span className="font-medium text-gray-700">{project.client?.verified ? "Payment Method Verified" : "Payment Unverified"}</span>
                 </div>
                 <div>
                    <div className="flex items-center gap-1 mb-1">
                       {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`h-4 w-4 ${star <= (project.client?.rating || 0) ? "fill-[#14A9F9] text-[#14A9F9]" : "text-gray-300"}`} />
                       ))}
                       <span className="text-sm text-gray-600 ml-1">{project.client?.rating} of 5 reviews</span>
                    </div>
                 </div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.location}</h5><span className="text-sm text-gray-500">{project.postedTime}</span></div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.jobCount} Jobs posted</h5><span className="text-sm text-gray-500">100% Hire rate</span></div>
                 <div><h5 className="font-bold text-gray-900">{project.client?.totalSpent} Total Spent</h5><span className="text-sm text-gray-500">Member since {project.client?.memberSince}</span></div>
              </div>
           </div>

           {/* Smart Bid */}
           <SmartBidCard projectType={project.type} budget={project.budget} />

           <div className="text-sm text-[#14A9F9] font-medium cursor-pointer hover:underline">
              Flag as inappropriate
           </div>
        </div>
      </div>
    </div>
  );
};