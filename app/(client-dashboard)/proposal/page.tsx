"use client";
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
    Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// --- ENRICHED DATA STRUCTURES ---

interface Review {
  client: string;
  rating: number;
  comment: string;
  date: string;
}

interface Proposal {
  name: string;
  title: string;
  rating: number;
  badge: string;
  description: string;
  bid: string;
  delivery: string;
  success: string;
  time: string;
  location: string;
  totalEarned: string;
  jobsCompleted: number;
  hourlyRate: string;
  skills: string[];
  bio: string;
  reviews: Review[];
}

const proposalsJob1: Proposal[] = [
  {
    name: "John Matthew",
    title: "Top Rated • 5+ Years Full Stack",
    rating: 5,
    badge: "Submitted 2 hrs ago",
    description:
      "Strong experience in React, REST APIs, and scalable UI systems. Can deliver a production-ready solution within 3 weeks. I focus on writing clean, documented code and providing daily updates on progress. I have worked with 30+ startups to build their MVPs.",
    bid: "35,000",
    delivery: "21 Days",
    success: "97%",
    time: "20 days",
    location: "Bangalore, India",
    totalEarned: "₹45L+",
    jobsCompleted: 142,
    hourlyRate: "₹1,200/hr",
    skills: ["React.js", "Node.js", "TypeScript", "AWS", "MongoDB", "Redux"],
    bio: "I am a Senior Full Stack Developer with over 5 years of experience building scalable web applications. I specialize in the MERN stack and have helped 30+ startups launch their MVPs.",
    reviews: [
      {
        client: "TechFlow Inc.",
        rating: 5,
        comment: "John is an absolute beast at coding. Delivered 2 days early.",
        date: "Oct 2025",
      },
      {
        client: "Startup Hub",
        rating: 5,
        comment: "Great communication and very skilled.",
        date: "Sept 2025",
      },
    ],
  },
  {
    name: "Priya Verma",
    title: "UI/UX Expert • 150+ Projects",
    rating: 4,
    badge: "AI Recommended",
    description:
      "Specialized in conversion-focused UX/UI and modern design systems that improve usability and brand trust. I will provide high-fidelity Figma prototypes before moving to development. My process includes deep user research to ensure your dashboard solves actual pain points.",
    bid: "42,000",
    delivery: "18 Days",
    success: "99%",
    location: "Mumbai, India",
    totalEarned: "₹60L+",
    time: "18 days",
    jobsCompleted: 210,
    hourlyRate: "₹1,800/hr",
    skills: ["Figma", "Mobile Design", "Prototyping", "iOS", "Auto Layout"],
    bio: "I bridge the gap between design and engineering. With a background in Graphic Design and Frontend Dev, I create interfaces that look beautiful and work perfectly.",
    reviews: [
      {
        client: "Alpha Designs",
        rating: 4,
        comment:
          "Excellent designs, but communication could be slightly faster.",
        date: "Nov 2025",
      },
    ],
  },
  {
    name: "Vikram Singh",
    title: "Frontend Architect",
    rating: 3,
    badge: "New",
    description:
      "I can build this using standard templates to save time. Good with HTML/CSS.",
    bid: "15,000",
    delivery: "10 Days",
    success: "80%",
    time: "5 days",
    location: "Pune, India",
    totalEarned: "₹2L+",
    jobsCompleted: 10,
    hourlyRate: "₹600/hr",
    skills: ["HTML", "CSS", "Bootstrap"],
    bio: "Junior developer looking for opportunities.",
    reviews: [],
  },
];

const proposalsJob2: Proposal[] = [
  {
    name: "Amit Sharma",
    title: "Full Stack Dev • Python/Django",
    rating: 4.8,
    badge: "Submitted 5 hrs ago",
    description:
      "I have built similar dashboards using Python and Next.js. I can integrate the API seamlessley.",
    bid: "25,000",
    delivery: "14 Days",
    success: "95%",
    time: "20 days",
    location: "Delhi, India",
    totalEarned: "₹20L+",
    jobsCompleted: 45,
    hourlyRate: "₹900/hr",
    skills: ["Python", "Django", "PostgreSQL", "Next.js"],
    bio: "Python expert with a knack for backend optimization.",
    reviews: [],
  },
];

const myJobs = [
  {
    id: 1,
    title: "Build a Responsive E-commerce Dashboard",
    type: "Fixed Price",
    budget: "45,000",
    posted: "2 days ago",
    description:
      "Looking for an expert React developer to convert Figma designs into a fully functional dashboard with charts.",
    tech: ["React", "Tailwind", "Charts.js"],
    proposalCount: 3,
    status: "Active",
    proposals: proposalsJob1,
  },
  {
    id: 2,
    title: "Backend API Integration for Mobile App",
    type: "Hourly",
    budget: "800/hr",
    posted: "5 days ago",
    description:
      "Need a backend developer to connect our React Native app with an existing Node.js backend.",
    tech: ["Node.js", "API", "Mobile"],
    proposalCount: 1,
    status: "Urgent",
    proposals: proposalsJob2,
  },
];

/* ------------------- Reusable Components ------------------- */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
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
  color: "indigo" | "emerald" | "ghost" | "red" | string;
  onClick: () => void;
  className?: string;
}

function ActionBtn({
  children,
  color,
  onClick,
  className = "",
}: ActionBtnProps) {
  const baseStyle =
    "flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition duration-150 whitespace-nowrap w-full sm:w-auto active:scale-95";
  let colorStyle = "";

  if (color === "indigo") {
    colorStyle =
      "text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200";
  } else if (color === "emerald") {
    colorStyle =
      "text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200";
  } else if (color === "ghost") {
    colorStyle =
      "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50";
  } else if (color === "red") {
    colorStyle = "text-white bg-red-600 hover:bg-red-700";
  } else {
    colorStyle = "text-white bg-blue-600 hover:bg-blue-700";
  }

  return (
    <button
      className={`${baseStyle} ${colorStyle} ${className}`}
      onClick={onClick}
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

// --- PROPOSAL DETAIL DRAWER ---
function ProposalBriefModal({
  proposal,
  onClose,
}: {
  proposal: Proposal | null;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!proposal) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end isolate">
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full md:w-[60%] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
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
              {proposal.name[0]}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-xl leading-tight">
                {proposal.name}
              </h4>
              <p className="text-sm text-indigo-600 font-semibold">
                {proposal.title}
              </p>
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
                {proposal.description}
              </p>
              <div className="bg-white p-6 space-y-8">
                <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <DollarSign size={18} className="text-gray-600" />
                      <span>₹{proposal.bid}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      Fixed Price
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
                      <span>22/10/2025</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">
                      Start Date
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    Skills & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {proposal.skills.map((skill, i) => (
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
          <button
            onClick={onClose}
            className="flex-1 py-3.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wide"
          >
            Dismiss
          </button>
          <Link href="/messages" className="flex-[2] w-full">
            <button
              onClick={() => {}}
              className="w-full py-2.5 px-4 md:py-3.5 md:mt-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 text-xs md:text-sm font-bold transition-all uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} className="shrink-0" />
              <span className="hidden xs:inline">
                Start Technical Discussion
              </span>
              <span className="xs:hidden">Discuss</span>
            </button>
          </Link>
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
    <div className="fixed inset-0 z-[100] flex justify-end"> {/* Raised Z-index to cover bottom nav */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full sm:w-[500px] md:w-[600px] h-[100dvh] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
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
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {freelancer.name}
                      <CheckCircle2
                        size={20}
                        className="text-blue-500 fill-blue-50"
                      />
                    </h2>
                    <p className="text-indigo-600 font-medium">
                      {freelancer.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">
                      Rate
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {freelancer.hourlyRate}
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
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> 4:30 PM local time
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
                {freelancer.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center justify-between">
                Work History
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-tighter">
                  Recent
                </span>
              </h3>

              {freelancer.reviews.length > 0 ? (
                <div className="space-y-4">
                  {freelancer.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm"
                    >
                      <h4 className="font-bold text-gray-900 text-sm">
                        {review.client}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, si) => (
                            <Star
                              key={si}
                              size={12}
                              fill={
                                si < review.rating ? "currentColor" : "none"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          • {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                  <Briefcase className="mx-auto mb-2 opacity-50" size={24} />
                  <p className="text-sm font-medium">
                    No reviews available yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Updated Footer Container with forced safe area handling */}
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

/* ------------------- Main Component ------------------- */

export default function ProposalPage() {
  const [selectedJob, setSelectedJob] = useState<(typeof myJobs)[0] | null>(
    null
  );
  const [profileToView, setProfileToView] = useState<Proposal | null>(null);
  const [proposalBrief, setProposalBrief] = useState<Proposal | null>(null);
  
  // --- Right Sidebar Accordion States ---
  const [isRMOpen, setIsRMOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  // --- Proposal Filter States ---
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterRate, setFilterRate] = useState<number>(2000);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSkills, setFilterSkills] = useState<string[]>([]);

  // --- JOB Filter States ---
  const [jobSearchText, setJobSearchText] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");

  // Reset filters when changing jobs
  useEffect(() => {
    setFilterText("");
    setFilterRate(2000);
    setFilterRating(null);
    setFilterSkills([]);
    setShowMobileFilters(false);
    setIsRMOpen(false);
    setIsInsightsOpen(false);
  }, [selectedJob]);

  const handleViewProfile = (freelancer: Proposal) => {
    setProfileToView(freelancer);
  };

  const handleMessage = (name: string) => console.log("Message:", name);

  // Helper to parse rate string "₹1,200/hr" to number 1200
  const parseRate = (rateStr: string) => {
    return parseInt(rateStr.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // --- Proposal Filter Logic ---
  const filteredProposals = useMemo(() => {
    if (!selectedJob) return [];

    return selectedJob.proposals.filter((p) => {
      const matchText =
        p.name.toLowerCase().includes(filterText.toLowerCase()) ||
        p.title.toLowerCase().includes(filterText.toLowerCase());
      const rateVal = parseRate(p.hourlyRate);
      const matchRate = rateVal <= filterRate;
      const matchRating = filterRating ? p.rating >= filterRating : true;
      const matchSkills =
        filterSkills.length > 0
          ? filterSkills.every((skill) =>
              p.skills.some((s) => s.includes(skill))
            )
          : true;

      return matchText && matchRate && matchRating && matchSkills;
    });
  }, [selectedJob, filterText, filterRate, filterRating, filterSkills]);

  // --- JOB Filter Logic ---
  const filteredJobs = useMemo(() => {
    return myJobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(jobSearchText.toLowerCase()) ||
        job.description.toLowerCase().includes(jobSearchText.toLowerCase());
      const matchStatus =
        jobStatusFilter === "All" || job.status === jobStatusFilter;
      const matchType = jobTypeFilter === "All" || job.type === jobTypeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [jobSearchText, jobStatusFilter, jobTypeFilter]);

  // Extract unique skills from current proposals for the filter list
  const availableSkills = useMemo(() => {
    if (!selectedJob) return [];
    const allSkills = selectedJob.proposals.flatMap((p) => p.skills);
    return Array.from(new Set(allSkills));
  }, [selectedJob]);

  const toggleSkill = (skill: string) => {
    setFilterSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 relative text-slate-900">
      {/* Modals */}
      <ProfileModal
        freelancer={profileToView}
        onClose={() => setProfileToView(null)}
      />

      <ProposalBriefModal
        proposal={proposalBrief}
        onClose={() => setProposalBrief(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          {selectedJob ? (
            <div className="space-y-1">
              <button
                onClick={() => setSelectedJob(null)}
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
        {/* --- LEFT SIDEBAR (FILTERS - Only for Proposals) --- */}
        {selectedJob && (
          <aside
            className={`lg:col-span-1 space-y-4 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Card className="sticky top-6">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <Filter size={16} className="text-indigo-600" />
                <h3 className="font-bold text-sm text-gray-800">
                  Filter Candidates
                </h3>
              </div>

              <div className="space-y-5">
                {/* Search */}
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

                {/* Hourly Rate */}
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

                {/* Rating */}
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
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          filterRating === r
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {r} <Star size={10} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
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
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              filterSkills.includes(skill)
                                ? "bg-indigo-600 border-indigo-600"
                                : "bg-white border-gray-300 group-hover:border-indigo-400"
                            }`}
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

                {/* Reset */}
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

        {/* --- MAIN CONTENT (MIDDLE) --- */}
        <section
          className={`${
            selectedJob ? "lg:col-span-2" : "lg:col-span-3"
          } space-y-4`}
        >
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
              {selectedJob
                ? `${filteredProposals.length} Applicants Found`
                : `${filteredJobs.length} Active Job Postings`}
            </h2>
          </div>

          {!selectedJob ? (
            <>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search jobs by title or keyword..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all"
                      value={jobSearchText}
                      onChange={(e) => setJobSearchText(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <select
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 focus:outline-none focus:border-indigo-500 bg-white cursor-pointer hover:bg-gray-50"
                      value={jobStatusFilter}
                      onChange={(e) => setJobStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <select
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 focus:outline-none focus:border-indigo-500 bg-white cursor-pointer hover:bg-gray-50"
                      value={jobTypeFilter}
                      onChange={(e) => setJobTypeFilter(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Fixed Price">Fixed Price</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="group cursor-pointer hover:border-indigo-300"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {job.posted}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  job.status === "Urgent"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-green-50 text-green-600"
                                }`}
                              >
                                {job.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                              {job.type}
                            </p>
                            <p className="text-base font-bold text-gray-900 flex items-center justify-end">
                              <IndianRupee size={14} strokeWidth={2.5} />{" "}
                              {job.budget}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex gap-1.5 flex-wrap">
                          {job.tech.map((tag, i) => (
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
                              {[1, 2].map((x) => (
                                <div
                                  key={x}
                                  className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white"
                                ></div>
                              ))}
                            </div>
                            {job.proposalCount} Proposals
                          </div>
                          <ActionBtn
                            color="indigo"
                            onClick={() => setSelectedJob(job)}
                          >
                            View Proposals
                          </ActionBtn>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <Search
                      className="mx-auto mb-2 opacity-30 text-gray-400"
                      size={32}
                    />
                    <p className="text-gray-500 font-medium">
                      No jobs match your search.
                    </p>
                    <button
                      onClick={() => {
                        setJobSearchText("");
                        setJobStatusFilter("All");
                        setJobTypeFilter("All");
                      }}
                      className="text-indigo-600 text-sm font-bold mt-2 hover:underline"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((p, idx) => (
                  <Card
                    key={idx}
                    className="border-l-4 border-l-indigo-500 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0 border border-indigo-100 font-bold">
                          {p.name[0]}
                        </div>
                        <div>
                          <h2
                            className="text-base font-bold text-gray-900 hover:underline decoration-indigo-300 underline-offset-4 cursor-pointer leading-none"
                            onClick={() => handleViewProfile(p)}
                          >
                            {p.name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-2 mt-1.5">
                            <p className="text-xs text-gray-500 font-medium">
                              {p.title}
                            </p>
                            <span className="text-gray-300 hidden sm:inline">
                              •
                            </span>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                              <span className="flex items-center gap-0.5 text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                                {p.hourlyRate}
                              </span>
                              <span className="flex items-center gap-1 text-slate-500">
                                <Clock size={11} />
                                {p.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end mt-1 sm:mt-0 flex-shrink-0">
                        <span className="flex gap-1 items-center text-[10px] bg-green-50 text-green-700 font-black px-2 py-0.5 rounded uppercase tracking-tighter border border-green-100">
                          <Zap size={10} fill="currentColor" /> {p.badge}
                        </span>
                        <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < p.rating ? "currentColor" : "none"}
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
                          <IndianRupee size={14} strokeWidth={2.5} />
                          {p.bid}
                        </Meta>
                        <Meta label="Delivery">
                          <Clock size={14} strokeWidth={2.5} />
                          {p.delivery}
                        </Meta>
                        <Meta label="Success Score">
                          <span className="text-green-600 font-black">
                            {p.success}
                          </span>
                        </Meta>
                      </div>
                      <p className="text-xs pb-6 text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-100 italic line-clamp-2">
                        <span className="font-bold text-gray-900 not-italic block mb-0.5  uppercase text-[10px] tracking-widest text-gray-400">
                          Proposal Highlight:
                        </span>
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
                     <Link href="/messages">
                           <ActionBtn
                        color="emerald"
                        onClick={() => handleMessage(p.name)}
                      >
                        <MessageCircle size={14} /> Message
                      </ActionBtn>
                     </Link>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-400 font-medium">
                    No proposals match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setFilterText("");
                      setFilterRate(5000);
                      setFilterRating(null);
                      setFilterSkills([]);
                    }}
                    className="text-indigo-600 text-sm font-bold mt-2 hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* --- RIGHT SIDEBAR (MODULAR ACCORDIONS) --- */}
        <aside className="lg:col-span-1 space-y-4">
          
          {/* Accordion 1: Relationship Manager */}
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

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isRMOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"}`}>
              <div className="p-4">
                <div className="h-20 bg-indigo-500 w-full relative rounded-lg mb-10">
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                      alt="Manager"
                    />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-bold text-slate-800 text-base">Rohan Malhotra</h3>
                  <p className="text-indigo-500 font-semibold text-xs">Assigned Manager</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Link href="/messages" className="flex flex-col items-center justify-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors gap-1 shadow-sm no-underline">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Chat</span>
                  </Link>
                  <a href="https://wa.me/15550000000" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-2 bg-emerald-50 text-white rounded-lg hover:bg-emerald-600 transition-colors gap-1 shadow-sm no-underline">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[9px] font-bold">WhatsApp</span>
                  </a>
                  <a href="tel:+15550000000" className="flex flex-col items-center justify-center py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors gap-1 shadow-sm no-underline">
                    <Phone className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion 2: Insights */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <button
              onClick={() => setIsInsightsOpen(!isInsightsOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <BarChart3 size={18} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800 text-sm leading-none">
                    {selectedJob ? "Job Insights" : "Account Insights"}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Stats Overview
                  </p>
                </div>
              </div>
              {isInsightsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isInsightsOpen ? "max-h-[500px] border-t border-gray-100" : "max-h-0"}`}>
              <div className="p-4 space-y-2">
                <Stat
                  label="Active Jobs"
                  value={selectedJob ? "1" : myJobs.length.toString()}
                  color="blue"
                />
                <Stat
                  label="Total Proposals"
                  value={selectedJob ? selectedJob.proposals.length.toString() : "5"}
                  color="green"
                />
                <Stat label="Shortlisted" value="1" color="purple" />
              </div>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}