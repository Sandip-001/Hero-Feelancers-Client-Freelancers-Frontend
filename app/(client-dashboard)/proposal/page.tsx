"use client"
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  FileText,
  Filter,
  Globe,
  IndianRupee,
  Layers,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  Trophy,
  User,
  X,
  Zap,
  BadgeCheck,
  XCircle,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner"; // Added toaster import

// --- REDUX IMPORTS ---
import {
  useGetProposalsByJobIdQuery,
  useAssignFreelancerMutation,
  useRejectProposalMutation,
} from "@/app/redux/api/proposals.api";

import { useGetClientJobsQuery } from "@/app/redux/api/jobs.api";
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import {
  useCreateChatRoomMutation,
  useGetchatroomsQuery,
} from "@/app/redux/api/chatroom.api";
import { useRouter } from "next/navigation";

// --- INTERFACES ---
interface Review {
  client: string;
  rating: number;
  comment: string;
  date: string;
}

interface Proposal {
  id: string | number;
  freelancerId: string | number;
  name: string;
  title: string;
  rating: number;
  badge?: string;
  description: string;
  bid: string | number;
  delivery: string;
  success: string;
  time: string;
  location: string;
  totalEarned: string;
  jobsCompleted: number;
  hourlyRate: string;
  skills: string[];
  bio: string;
  currency: string;
  reviews: Review[];
  status?: string;
  submittedOn?: string;
  clientLocation?: string;
  clientVerified?: boolean;
  clientRating?: number;
  clientSpent?: string;
  clientMemberSince?: string;
  totalProposals?: string;
  lastClientActivity?: string;
  myBid?: string;
  myDuration?: string;
  coverLetter?: string;
}

// --- REUSABLE COMPONENTS ---
function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

function Meta({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {label}
      </p>
      <div className="flex items-center gap-1 text-sm font-bold text-gray-800 mt-0.5">
        {children}
      </div>
    </div>
  );
}

interface ActionBtnProps {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

function ActionBtn({
  children,
  color,
  onClick,
  className = "",
  disabled,
}: ActionBtnProps) {
  const baseStyle =
    "flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition duration-150 whitespace-nowrap w-full sm:w-auto active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  let colorStyle =
    color === "indigo"
      ? "text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200"
      : color === "emerald"
        ? "text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200"
        : color === "ghost"
          ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          : "text-white bg-blue-600 hover:bg-blue-700";
  return (
    <button
      className={`${baseStyle} ${colorStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "blue" | "green" | "purple";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    purple: "bg-purple-50 text-purple-700",
  };
  const IconMap = { blue: BarChart3, green: Zap, purple: Star };
  const Icon = IconMap[color];
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl ${colorMap[color]} shadow-sm border border-transparent hover:border-current transition-all`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} />}
        <p className="text-xs font-semibold">{label}</p>
      </div>
      <p className="text-xl font-extrabold">{value}</p>
    </div>
  );
}

function Badge({
  children,
  variant,
  className = "",
}: {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}) {
  const variants: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Interviewing: "bg-blue-100 text-blue-700",
    Active: "bg-green-100 text-green-700",
    Urgent: "bg-red-100 text-red-700",
    Accepted: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-rose-100 text-rose-700",
  };
  const style = variants[variant || "Pending"] || variants.Pending;
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${style} ${className}`}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "destructive" | "blue";
  className?: string;
}) {
  const base =
    "px-4 py-2 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50";
  const variants: any = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    blue: "bg-[#14A9F9] text-white hover:bg-blue-600",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// --- SUB-COMPONENT: FREELANCER INFO FETCHER ---
// Since the data is already in the main list, this component just acts as a display wrapper
// But can be extended if separate fetching is needed later
const FreelancerInfo = ({ name, rate }: { name: string; rate: string }) => {
  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 hover:underline cursor-pointer">
        {name}
      </h2>
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mt-1">
        <span className="flex items-center gap-0.5 text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
          {rate}
        </span>
      </div>
    </div>
  );
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-50 text-blue-700";
    case "awarded_pending":
      return "bg-amber-50 text-amber-700";
    case "awarded":
      return "bg-emerald-50 text-emerald-700";
    case "awarded_rejected":
      return "bg-rose-50 text-rose-700";
    case "dispute":
      return "bg-purple-50 text-purple-700";
    case "completed":
      return "bg-green-50 text-green-700";
    case "closed_by_client":
      return "bg-gray-100 text-gray-700";
    case "closed_by_admin":
      return "bg-slate-200 text-slate-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const formatProjectPrice = (project: any) => {
  const symbol = project.currency === "INR" ? "₹" : "$";

  if (project.priceType === "hourly") {
    return `${symbol} ${project.projectValue}/hour`;
  }

  return `${symbol} ${project.projectValue}`;
};

// --- PROPOSAL DETAIL DRAWER ---
function ProposalBriefModal({
  proposal,
  jobId,
  jobTitle,
  jobDescription,
  onClose,
  onViewProfile,
}: {
  proposal: Proposal | null;
  jobId: number | string;
  jobTitle: string;
  jobDescription: string;
  onClose: () => void;
  onViewProfile: (p: Proposal) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [assignFreelancer, { isLoading: isHiring }] =
    useAssignFreelancerMutation();
  const [rejectProposal, { isLoading: isRejecting }] =
    useRejectProposalMutation();

  useEffect(() => {
    if (proposal) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [proposal]);

  const handleHire = async () => {
    if (!proposal) return;
    if (
      !confirm(`Are you sure you want to award this job to ${proposal.name}?`)
    )
      return;
    try {
      await assignFreelancer({
        jobId: jobId,
        freelancerId: proposal.freelancerId,
      }).unwrap();
      toast.success("Job Awarded Successfully!"); // Replaced alert
      onClose();
    } catch (error: any) {
      toast.error(
        "Failed to award job. " + (error?.data?.message || "Please try again."),
      ); // Replaced alert
    }
  };

  const handleReject = async () => {
    if (!proposal) return;
    if (!confirm(`Reject proposal from ${proposal.name}?`)) return;
    try {
      await rejectProposal(proposal.id).unwrap();
      toast.success("Proposal Rejected."); // Replaced alert
      onClose();
    } catch (error: any) {
      toast.error(
        "Failed to reject proposal. " +
          (error?.data?.message || "Please try again."),
      ); // Replaced alert
    }
  };

  if (!proposal) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end isolate">
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative w-full lg:w-[60%] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0 bg-white z-10">
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
              <FileText size={20} className="text-indigo-600" /> Full Proposal
              Discussion
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Review the detailed bid and execution plan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide bg-gray-50/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white rounded-2xl border border-indigo-100 shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 text-2xl shadow-inner shrink-0">
              {(proposal.name || "U")[0]}
            </div>
            <div className="flex-1">
              {/* Integrated FreelancerInfo for Modal Header */}
              <FreelancerInfo name={proposal.name} rate={proposal.hourlyRate} />
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  <MapPin size={12} /> {proposal.location}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  <Globe size={12} /> Fluent English
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
              <MessageCircle size={18} className="text-indigo-600" />
              <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Detailed Project Brief
              </h5>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-slate-600 leading-7 text-sm whitespace-pre-line">
                {proposal.coverLetter || proposal.description}
              </p>
              <div className="bg-white p-6 space-y-8 mt-4 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <span>
                        {proposal.currency === "INR" ? "₹" : "$"} {proposal.bid}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      Proposed Amount
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <Layers size={18} className="text-gray-600" />
                      <span>Expert</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      Experience Level
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <Calendar size={18} className="text-gray-600" />
                      <span>{proposal.delivery}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      Duration
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    Skills & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proposal.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-50 text-gray-600 text-sm font-semibold rounded-full border border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white border-t border-gray-100 flex gap-4 shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] safe-area-bottom">
          <Button onClick={onClose} variant="outline" className="flex-1 py-3.5">
            Dismiss
          </Button>
          <button
            onClick={handleHire}
            disabled={isHiring || isRejecting}
            className="flex-[2] py-2.5 px-4 md:py-3.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 text-xs md:text-sm font-bold transition-all uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isHiring ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Hire Freelancer"
            )}
          </button>
          <button
            onClick={handleReject}
            disabled={isHiring || isRejecting}
            className="flex-1 py-2.5 px-4 md:py-3.5 text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 rounded-xl text-xs md:text-sm font-bold transition-all uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isRejecting ? (
              <Loader2 className="animate-spin text-rose-600" />
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- PROFILE SLIDE OVER MODAL ---
function ProfileModal({
  freelancer,
  onClose,
}: {
  freelancer: Proposal | null;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (freelancer) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [freelancer]);
  if (!freelancer) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative w-full sm:w-[500px] md:w-[600px] h-[100dvh] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="h-40 bg-gradient-to-r from-indigo-600 to-purple-700 relative">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 active:scale-95 transition-all shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-6 sm:px-8 pb-8">
            <div className="relative -mt-16 mb-6 flex flex-col items-start">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-gray-400 shadow-lg overflow-hidden">
                  <User size={60} />
                </div>
                <div
                  className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"
                  title="Online"
                ></div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    {/* Integrated FreelancerInfo for Profile Modal */}
                    <FreelancerInfo
                      name={freelancer.name}
                      rate={freelancer.hourlyRate}
                    />
                    <p className="text-indigo-600 font-medium">
                      {freelancer.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {freelancer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={14} /> Fluent English
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-gray-100 mb-6" />
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Success
                </p>
                <p className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                  {freelancer.success}{" "}
                  <Trophy size={14} className="text-amber-500" />
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Earned
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {freelancer.totalEarned}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Jobs
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {freelancer.jobsCompleted}
                </p>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 text-lg mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {freelancer.bio}
              </p>
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-white p-4 sm:px-8 flex items-center justify-between gap-4 safe-area-bottom shrink-0 z-50">
          <Link href="/messages" className="flex-1">
            <button
              onClick={onClose}
              className="w-full px-3 py-3 text-white font-bold rounded-xl transition-colors bg-green-600 hover:bg-green-700 shadow-md shadow-green-200 flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Message
            </button>
          </Link>
          <button className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
            Hire Freelancer
          </button>
        </div>
      </div>
    </div>
  );
}

// --- JOB CARD (FIXED BUDGET & PROPOSAL COUNT) ---
const JobCard = ({
  job,
  onClick,
  count,
}: {
  job: any;
  onClick: () => void;
  count: number;
}) => {
  const getTechTags = () => {
    if (Array.isArray(job.tech)) return job.tech;
    if (Array.isArray(job.technologies)) return job.technologies;
    if (typeof job.technologies === "string") {
      const techStr = job.technologies.trim();
      if (techStr.startsWith("[")) {
        try {
          return JSON.parse(techStr);
        } catch {
          return [techStr];
        }
      }
      return techStr
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }
    return [];
  };

  const {
    data: proposalsResponse,
    isLoading: isProposalsLoading,
    error: proposalsError,
  } = useGetProposalsByJobIdQuery(job?.id);

  const tags = getTechTags();

  return (
    <Card
      className="group cursor-pointer hover:border-indigo-300"
      onClick={onClick}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {job.createdAt}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${getStatusStyles(
                  job.status,
                )}`}
              >
                {job.status.replace(/_/g, " ")}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              {job.priceType}
            </p>
            <p className="text-base font-bold text-gray-900 flex items-center justify-end">
              {formatProjectPrice(job)}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-2">
          {job.description}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded font-bold uppercase tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-3 items-center justify-between mt-1">
          <div className="flex items-center gap-2 text-gray-700 font-medium text-xs">
            <div className="flex -space-x-1.5">
              {proposalsResponse?.data?.map((p: any, i: number) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                >
                  {p.Freelancer?.profileImage ? (
                    <img
                      src={p.Freelancer.profileImage}
                      alt={p.Freelancer.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] flex items-center justify-center w-full h-full text-gray-600">
                      {p.Freelancer?.fullName?.charAt(0)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Display total proposals */}
            {proposalsResponse?.total} Proposals
          </div>
          <ActionBtn color="indigo" onClick={onClick}>
            View Proposals
          </ActionBtn>
        </div>
      </div>
    </Card>
  );
};

/* ------------------- Main Component ------------------- */
export default function ProposalPage() {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [profileToView, setProfileToView] = useState<Proposal | null>(null);
  const [proposalBrief, setProposalBrief] = useState<Proposal | null>(null);
  const [jobProposalsMap, setJobProposalsMap] = useState<
    Record<string, number>
  >({});

  // States & Filters
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterRate, setFilterRate] = useState<number>(2000);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [jobSearchText, setJobSearchText] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sidebar State
  const [isRMOpen, setIsRMOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  // 1. Fetch Client's Jobs
  const { data: jobsResponse, isLoading: isJobsLoading } =
    useGetClientJobsQuery(undefined);
  const jobsList = useMemo(() => {
    if (!jobsResponse) return [];
    return Array.isArray(jobsResponse) ? jobsResponse : jobsResponse.data || [];
  }, [jobsResponse]);

  // 2. Fetch Proposals (Only if job selected)
  const {
    data: proposalsResponse,
    isLoading: isProposalsLoading,
    error: proposalsError,
  } = useGetProposalsByJobIdQuery(selectedJob?.id, {
    skip: !selectedJob,
    pollingInterval: 15000,
  });

  const { data: authData } = useGetMeQuery();

  const { data: chatrooms } = useGetchatroomsQuery(
    {
      userId: authData?.user?.id,
      userType: authData?.user?.userType,
    },
    { skip: !authData?.user?.id },
  );

  const [createChatRoom, { isLoading: isCreatingChatRoom }] =
    useCreateChatRoomMutation();

  const handleOpenChat = async (proposal: any) => {
    const jobId = selectedJob?.id;
    const jobProposalId = proposal.id;
    const freelancerId = proposal.freelancerId;
    const clientId = authData?.user?.id;
    const managerId = proposal?.Job?.RelationShipManager?.id || null;

    if (!jobId || !jobProposalId || !freelancerId || !clientId) {
      toast.error("Missing chat data");
      return;
    }

    // Check if room already exists
    const existingRoom = chatrooms?.data?.find(
      (room: any) => room.jobProposalId === jobProposalId,
    );

    const existingRoomId = existingRoom?.id;

    if (existingRoomId) {
      toast.success("Opening existing chat");
      router.push(`/messages?roomId=${existingRoomId}`);
      return;
    }

    // Create new room
    try {
      const res = await createChatRoom({
        jobId,
        jobProposalId,
        freelancerId,
        clientId,
        managerId,
      }).unwrap();

      const roomId = res?.room?.id;

      if (roomId) {
        toast.success("Chat opened");
        router.push(`/messages?roomId=${roomId}`);
      }
    } catch (err: any) {
      const existingRoomId = err?.data?.room?.id;

      if (existingRoomId) {
        toast.success("Opening existing chat");
        router.push(`/messages?roomId=${existingRoomId}`);
        return;
      }

      toast.error(err?.data?.message || "Message Failed");
    }
  };

  // Filtering Logic for JOBS
  const filteredJobs = useMemo(() => {
    return jobsList.filter((job: any) => {
      const matchSearch =
        (job.title?.toLowerCase() || "").includes(
          jobSearchText.toLowerCase(),
        ) ||
        (job.description?.toLowerCase() || "").includes(
          jobSearchText.toLowerCase(),
        );
      const matchStatus =
        jobStatusFilter === "All" || job.status === jobStatusFilter;
      const matchType =
        jobTypeFilter === "All" || job.priceType === jobTypeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [jobsList, jobSearchText, jobStatusFilter, jobTypeFilter]);

  // Filtering Logic for PROPOSALS
  const parseRate = (rateStr: string) =>
    parseInt(rateStr.replace(/[^0-9]/g, ""), 10) || 0;

  const filteredProposals = useMemo(() => {
    if (!selectedJob || !proposalsResponse) return [];

    // Check if 'data' array exists (as per your JSON response)
    const allProposals = Array.isArray(proposalsResponse)
      ? proposalsResponse
      : proposalsResponse.data || [];

    return allProposals
      .map((p: any) => ({
        id: p._id || p.id,
        freelancerId: p.freelancerId,

        // --- NAME / RATE FIX: Directly use capitalized 'Freelancer' key ---
        name: p.Freelancer?.fullName || "Unknown Freelancer",

        hourlyRate: p.Freelancer?.hourlyRate || 0,
        hourlyRateDisplay: p.Freelancer?.hourlyRate
          ? `₹${p.Freelancer.hourlyRate}/hr`
          : "N/A",

        title: p.Freelancer?.experienceLevel || "Freelancer",
        skills: p.Freelancer?.skills || [],
        location: p.Freelancer?.address || "Remote",
        bio: p.Freelancer?.about || "No bio available.",
        rating: p.Freelancer?.profileCompletion
          ? p.Freelancer.profileCompletion / 20
          : 0,

        coverLetter: p.coverLetter,
        bid: p.proposedAmount,
        currency: p.Job?.currency,
        delivery: p.duration,
        status: p.status,
        submittedOn: p.createdAt
          ? new Date(p.createdAt).toLocaleDateString()
          : "Just now",
        description: p.coverLetter,

        success: "100%",
        totalEarned: "₹0",
        jobsCompleted: 0,
        reviews: [],
        clientVerified: true,
        clientRating: 0,
        clientLocation: "Remote",
        myBid: p.proposedAmount,
        myDuration: p.duration,
      }))
      .filter((p: any) => {
        const matchText =
          (p.name?.toLowerCase() || "").includes(filterText.toLowerCase()) ||
          (p.title?.toLowerCase() || "").includes(filterText.toLowerCase());
        const rateVal = p.hourlyRate || 0;
        const matchRate = rateVal <= filterRate;

        const matchRating = filterRating
          ? (p.rating || 0) >= filterRating
          : true;
        const pSkills = p.skills || [];
        const matchSkills =
          filterSkills.length > 0
            ? filterSkills.some((skill: string) => pSkills.includes(skill))
            : true;
        return matchText && matchRate && matchRating && matchSkills;
      });
  }, [
    selectedJob,
    proposalsResponse,
    filterText,
    filterRate,
    filterRating,
    filterSkills,
  ]);

  const relationshipManager = useMemo(() => {
    if (!selectedJob) return null;

    const firstProposal = proposalsResponse?.data?.[0];

    if (!firstProposal) return undefined;

    const manager = firstProposal.Job?.RelationShipManager;

    if (!manager) return undefined;

    return manager;
  }, [selectedJob, proposalsResponse]);

  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProposals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProposals, currentPage]);

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const availableSkills = useMemo(() => {
    if (!proposalsResponse) return [];
    const list = Array.isArray(proposalsResponse)
      ? proposalsResponse
      : proposalsResponse.data || [];
    const allSkills = list.flatMap((p: any) => p.Freelancer?.skills || []);
    return Array.from(new Set(allSkills)) as string[];
  }, [proposalsResponse]);

  const toggleSkill = (skill: string) => {
    setFilterSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
    setCurrentPage(1);
  };
  const handleViewProfile = (proposal: Proposal) => {
    setProfileToView(proposal);
  };
  const handleMessage = (freelancerName: string) => {
    console.log(`Navigating to message with ${freelancerName}`);
  };

  // Effects
  useEffect(() => {
    setFilterText("");
    setFilterRate(2000);
    setFilterRating(null);
    setFilterSkills([]);
    setShowMobileFilters(false);
    setIsRMOpen(false);
    setIsInsightsOpen(false);
    setCurrentPage(1);
  }, [selectedJob]);
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (selectedJob) {
        setSelectedJob(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedJob]);
  useEffect(() => {
    if (selectedJob) {
      window.history.pushState({ view: "job" }, "");
    }
  }, [selectedJob]);

  // Use the 'total' field directly from the API response for the selected job
  const rawProposalsCount = useMemo(() => {
    if (!proposalsResponse) return 0;
    // Access the 'total' property if it exists, otherwise fall back to array length
    return proposalsResponse.total !== undefined
      ? proposalsResponse.total
      : proposalsResponse.data?.length || 0;
  }, [proposalsResponse]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 relative text-slate-900">
      <ProfileModal
        freelancer={profileToView}
        onClose={() => setProfileToView(null)}
      />
      <ProposalBriefModal
        proposal={proposalBrief}
        jobId={selectedJob?.id}
        jobTitle={selectedJob?.title || ""}
        jobDescription={selectedJob?.description || ""}
        onClose={() => setProposalBrief(null)}
        onViewProfile={handleViewProfile}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          {selectedJob ? (
            <div className="space-y-1">
              <button
                onClick={() => {
                  if (window.history.state?.view === "job") {
                    window.history.back();
                  } else {
                    setSelectedJob(null);
                  }
                }}
                className="flex items-center text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-1 uppercase tracking-wider"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to My Jobs
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Proposals for{" "}
                  <span className="text-indigo-600">{selectedJob.title}</span>
                </h1>
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Manage Your Jobs
            </h1>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        {/* --- LEFT SIDEBAR (FILTER) --- */}
        {selectedJob && (
          <aside
            className={`lg:col-span-1 space-y-4 ${showMobileFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="sticky top-6">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <Filter size={16} className="text-indigo-600" />
                <h3 className="font-bold text-sm text-gray-800">
                  Filter Candidates
                </h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Search Keywords
                  </label>
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-2.5 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Name or Title..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Max Hourly Rate
                    </label>
                    <span className="text-xs font-bold text-indigo-600">
                      ₹{filterRate}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={filterRate}
                    onChange={(e) => setFilterRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                    <span>₹500</span>
                    <span>₹5000+</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Min Rating
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3].map((r) => (
                      <button
                        key={r}
                        onClick={() =>
                          setFilterRating(filterRating === r ? null : r)
                        }
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${filterRating === r ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                      >
                        {r} <Star size={10} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>
                {availableSkills.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Skills
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {availableSkills.map((skill) => (
                        <label
                          key={skill}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filterSkills.includes(skill) ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300 group-hover:border-indigo-400"}`}
                          >
                            {filterSkills.includes(skill) && (
                              <CheckCircle2 size={12} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={filterSkills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">
                            {skill}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setFilterText("");
                    setFilterRate(5000);
                    setFilterRating(null);
                    setFilterSkills([]);
                  }}
                  className="w-full py-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors border-t border-gray-100 pt-3"
                >
                  Reset Filters
                </button>
              </div>
            </Card>
          </aside>
        )}

        {/* --- MAIN CONTENT (JOB LIST OR PROPOSAL LIST) --- */}
        <section
          className={`${selectedJob ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}
        >
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
              {selectedJob
                ? isProposalsLoading
                  ? "Loading Applicants..."
                  : `${filteredProposals.length} Applicants Found`
                : `${filteredJobs.length} Active Job Postings`}
            </h2>
          </div>

          {!selectedJob ? (
            // Job List
            <div className="space-y-3">
              {isJobsLoading && (
                <div className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
                </div>
              )}
              {!isJobsLoading && filteredJobs.length > 0
                ? filteredJobs.map((job: any) => (
                    // NOTE: The 'count' prop here is static because the count is only fetched when a job is selected.
                    // To show accurate counts for ALL jobs in this list view, the API 'my-jobs' endpoint must return a count.
                    // Assuming 'job.proposalCount' exists from 'my-jobs' response.
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => setSelectedJob(job)}
                      count={job.proposalCount || 0}
                    />
                  ))
                : !isJobsLoading && (
                    <div className="text-center py-12 text-gray-500 border border-dashed rounded-xl">
                      No jobs found.
                    </div>
                  )}
            </div>
          ) : (
            // Proposal List
            <div className="space-y-4">
              {isProposalsLoading && (
                <div className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
                </div>
              )}
              {proposalsError && (
                <div className="text-center py-10 text-red-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>Failed to load proposals.</p>
                </div>
              )}
              {!isProposalsLoading &&
              !proposalsError &&
              filteredProposals.length > 0
                ? filteredProposals.map((p: any, idx: number) => (
                    <Card
                      key={idx}
                      className="border-l-4 border-l-indigo-500 hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                            {(p.name || "U")[0]}
                          </div>
                          <div className="flex-1">
                            {/* Integrated FreelancerInfo for List View */}
                            <FreelancerInfo
                              name={p.name}
                              rate={p.hourlyRateDisplay}
                            />
                            <div className="flex flex-wrap items-center gap-x-2 mt-1.5">
                              <p className="text-xs text-gray-500 font-medium">
                                {p.title}
                              </p>
                              <span className="text-gray-300 hidden sm:inline">
                                •
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant={p.status || "Pending"}>
                            {p.status || "Pending"}
                          </Badge>
                          <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={
                                  i < (p.rating || 0) ? "currentColor" : "none"
                                }
                              />
                            ))}
                            <span className="ml-1 text-xs font-black text-gray-800">
                              {p.rating}.0
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="flex flex-wrap gap-4 sm:gap-10 mb-3">
                          <Meta label="Bid Amount">
                            {p.currency === "INR" ? (
                              <IndianRupee size={14} strokeWidth={2.5} />
                            ) : (
                              <DollarSign size={14} strokeWidth={2.5} />
                            )}{" "}
                            {p.bid}
                          </Meta>
                          <Meta label="Delivery">
                            <Clock size={14} strokeWidth={2.5} /> {p.delivery}
                          </Meta>
                          <Meta label="Success Score">
                            <span className="text-green-600 font-black">
                              {p.success}
                            </span>
                          </Meta>
                        </div>
                        <p className="text-xs pb-6 text-gray-600 italic line-clamp-2">
                          "{p.description}"
                        </p>
                      </div>
                      <div className="mt-1 flex flex-col sm:flex-row gap-2 justify-end items-stretch sm:items-center">
                        <ActionBtn
                          color="ghost"
                          onClick={() => setProposalBrief(p)}
                        >
                          View Proposal
                        </ActionBtn>
                        <ActionBtn
                          color="ghost"
                          onClick={() => handleViewProfile(p)}
                        >
                          Profile
                        </ActionBtn>
                        <ActionBtn
                          color="emerald"
                          onClick={() => handleOpenChat(p)}
                          disabled={isCreatingChatRoom}
                        >
                          <MessageCircle size={14} />
                          {isCreatingChatRoom ? "Opening..." : "Message"}
                        </ActionBtn>
                      </div>
                    </Card>
                  ))
                : !isProposalsLoading &&
                  !proposalsError && (
                    <div className="text-center py-10 text-gray-500 border border-dashed rounded-xl">
                      No proposals match your filters.
                    </div>
                  )}
            </div>
          )}
        </section>

        {/* --- RIGHT SIDEBAR (ACCOUNT INSIGHTS) --- */}
        <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BarChart3 size={18} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                Account Insights
              </h3>
            </div>
            <div className="space-y-2">
              <Stat
                label="Active Jobs"
                value={selectedJob ? "1" : (jobsList?.length || 0).toString()}
                color="blue"
              />
              <Stat
                label="Total Proposals"
                value={selectedJob ? rawProposalsCount.toString() || "0" : "0"}
                color="green"
              />
            </div>
          </div>

          {/* Relationship Manager Accordion */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <button
              onClick={() => setIsRMOpen(!isRMOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <User size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800 text-sm leading-none">
                    Relationship Manager
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Support Contact
                  </p>
                </div>
              </div>
              {isRMOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isRMOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"}`}
            >
              <div className="p-4">
                {/* Case 1: No job selected */}
                {!selectedJob && (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    Please select a job to view the assigned manager.
                  </div>
                )}

                {/* Case 2: Job selected but no manager */}
                {selectedJob && relationshipManager === undefined && (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No manager assigned yet. Please wait.
                  </div>
                )}

                {/* Case 3: Manager exists */}
                {selectedJob && relationshipManager && (
                  <>
                    <div className="h-20 bg-indigo-500 w-full relative rounded-lg mb-10">
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <img
                          src={
                            relationshipManager.profileImage ||
                            "https://i.pravatar.cc/150"
                          }
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                          alt="Manager"
                        />
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="font-bold text-slate-800 text-base">
                        {relationshipManager.fullName}
                      </h3>
                      <p className="text-indigo-500 font-semibold text-xs">
                        Assigned Manager
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        href="/messages"
                        className="flex flex-col items-center justify-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors gap-1 shadow-sm no-underline"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[9px] font-bold">Chat</span>
                      </Link>

                      <a
                        href={`https://wa.me/${relationshipManager.whatsapp?.replace(
                          /\D/g,
                          "",
                        )}`}
                        className="flex flex-col items-center justify-center py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors gap-1 shadow-sm no-underline"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-[9px] font-bold">WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${relationshipManager.phone}`}
                        className="flex flex-col items-center justify-center py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors gap-1 shadow-sm no-underline"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-[9px] font-bold">Call</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
