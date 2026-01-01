"use client";

import {
  Search,
  ChevronDown,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle,
  FileText,
  DollarSign,
  SortAsc,
  SortDesc,
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  List,
  Calendar,
  X,
  MessageSquare,
  Paperclip,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

// --- Mock Data ---
interface ProjectProps {
  id: number;
  title: string;
  freelancer: string;
  role: string;
  status: "In Progress" | "Completed" | "Pending Start" | "On Hold";
  statusDetail: string;
  progress: number;
  budget: number;
  dueDate: string;
  avatarUrl: string;
  description?: string;
  skills?: string[];
}

const PROJECTS_DATA: ProjectProps[] = [
  {
    id: 4,
    title: "Blog Content (5 Articles)",
    freelancer: "Arjun Reddy",
    role: "Content Writer",
    status: "In Progress",
    statusDetail: "Drafting Stage",
    progress: 40,
    budget: 15000,
    dueDate: "2025-12-15",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    description:
      "Series of 5 long-form blog posts (1500 words each) covering 'Future of Fintech in India'. Includes keyword research and meta descriptions.",
    skills: ["Content Writing", "SEO", "Research", "Fintech", "Copywriting"],
  },
  {
    id: 2,
    title: "Mobile App UI Redesign",
    freelancer: "Rohan Patel",
    role: "UI/UX Designer",
    status: "Completed",
    statusDetail: "Final Review",
    progress: 100,
    budget: 45000,
    dueDate: "2025-11-20",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    description:
      "Complete overhaul of the existing iOS and Android app interface. Focus on accessibility, dark mode implementation, and simplified checkout flow.",
    skills: ["Figma", "Mobile Design", "Prototyping", "iOS", "Auto Layout"],
  },
  {
    id: 1,
    title: "E-commerce Spiritual Store",
    freelancer: "Priya Singh",
    role: "Full Stack Dev",
    status: "In Progress",
    statusDetail: "Awaiting QA",
    progress: 65,
    budget: 85000,
    dueDate: "2025-12-30",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    description:
      "Building a comprehensive Shopify-based e-commerce platform for spiritual artifacts. Includes custom theme development and payment gateway integration.",
    skills: ["Shopify", "React", "Node.js", "Liquid", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "SEO Optimization Campaign",
    freelancer: "Sarah Jen",
    role: "SEO Specialist",
    status: "Pending Start",
    statusDetail: "Contract Signed",
    progress: 15,
    budget: 35000,
    dueDate: "2026-01-15",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    description:
      "Quarterly SEO strategy focusing on backlink acquisition, technical SEO audit, and content optimization.",
    skills: ["Google Analytics", "SEMrush", "Backlinking", "Technical SEO"],
  },
  {
    id: 5,
    title: "Server Migration",
    freelancer: "Vijay Sharma",
    role: "DevOps Engineer",
    status: "On Hold",
    statusDetail: "Awaiting API keys",
    progress: 20,
    budget: 120000,
    dueDate: "2026-03-01",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay",
    description:
      "Migrating legacy infrastructure from AWS EC2 to Kubernetes clusters on Google Cloud.",
    skills: ["Kubernetes", "AWS", "GCP", "Docker", "Terraform"],
  },
];

const PROJECT_TRENDS = {
  active: [10, 12, 11, 15, 13, 16, 17, 18, 19, 15, 17],
  pending: [3, 4, 2, 5, 3, 4, 6, 5, 7, 4, 3],
  completed: [5, 6, 8, 7, 9, 10, 8, 9, 11, 12, 10],
};

const STATUS_OPTIONS = [
  "All",
  "In Progress",
  "Completed",
  "Pending Start",
  "On Hold",
];
const SORT_OPTIONS = [
  { value: "dueDate_asc", label: "Due Date (Asc)", icon: SortAsc },
  { value: "dueDate_desc", label: "Due Date (Desc)", icon: SortDesc },
  { value: "progress_desc", label: "Progress (High to Low)", icon: SortDesc },
  { value: "progress_asc", label: "Progress (Low to High)", icon: SortAsc },
];

export default function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate_asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  const filteredProjects = useMemo(() => {
    let projects = [...PROJECTS_DATA];
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerSearchTerm) ||
          p.freelancer.toLowerCase().includes(lowerSearchTerm)
      );
    }
    if (statusFilter !== "All") {
      projects = projects.filter((p) => p.status === statusFilter);
    }
    projects.sort((a, b) => {
      if (sortBy === "dueDate_asc")
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === "dueDate_desc")
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      if (sortBy === "progress_desc") return b.progress - a.progress;
      if (sortBy === "progress_asc") return a.progress - b.progress;
      return 0;
    });
    return projects;
  }, [searchTerm, statusFilter, sortBy]);

  const kpis = {
    inProgress: PROJECTS_DATA.filter(
      (p) => p.status === "In Progress" || p.status === "On Hold"
    ).length,
    pendingAction: PROJECTS_DATA.filter(
      (p) =>
        p.statusDetail.includes("Review") || p.statusDetail.includes("Payment")
    ).length,
    completed: PROJECTS_DATA.filter((p) => p.status === "Completed").length,
  };

  const activeProjectsCount = PROJECTS_DATA.filter(
    (p) => p.status === "In Progress" || p.status === "On Hold"
  );
  const averageProgress =
    activeProjectsCount.length > 0
      ? Math.round(
          activeProjectsCount.reduce((sum, p) => sum + p.progress, 0) /
            activeProjectsCount.length
        )
      : 0;

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Sort By: Date";

  return (
    <div className="relative px-0 py-4 sm:p-6 lg:p-8 space-y-8 font-sans text-slate-900 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="px-4 sm:px-0 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Your Project Dashboard
          </h2>
          <p className="text-slate-500 mt-1">
            Manage current, pending, and completed project engagements.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
          <ActionCard
            title="Active Projects"
            value={kpis.inProgress}
            icon={Clock}
            colorClass="bg-indigo-600 text-white"
            iconColorClass="text-indigo-600 bg-white"
            chartData={PROJECT_TRENDS.active}
            chartColor="indigo"
            progressRingValue={averageProgress}
            detailValue="+2"
            detailText="since last month"
          />
          <ActionCard
            title="Pending Action"
            value={kpis.pendingAction}
            icon={DollarSign}
            colorClass="bg-orange-500 text-white"
            iconColorClass="text-orange-500 bg-white"
            chartData={PROJECT_TRENDS.pending}
            chartColor="orange"
            detailValue="-1"
            detailText="items this week"
          />
          <ActionCard
            title="Total Completed"
            value={kpis.completed}
            icon={CheckCircle}
            colorClass="bg-emerald-600 text-white"
            iconColorClass="text-emerald-600 bg-white"
            chartData={PROJECT_TRENDS.completed}
            chartColor="emerald"
            detailValue="+12%"
            detailText="YoY completion rate"
          />
        </div>

        {/* Controls Bar - UPDATED FOR ALIGNMENT */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm py-4 px-4 sm:px-0">
          {/* Search bar centered on mobile */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                size={18}
                className="text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              />
            </div>
            <input
              placeholder="Search by title or freelancer..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Buttons container: center on mobile, right on desktop */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center lg:justify-end">
            {/* View Mode Switcher */}
            <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-slate-100 text-indigo-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-slate-100 text-indigo-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all shadow-sm ${
                  statusFilter !== "All"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter size={16} />
                <span>{statusFilter === "All" ? "Status" : statusFilter}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 lg:right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        status === statusFilter
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm"
              >
                <SortAsc size={16} className="text-slate-500" />
                <span>{currentSortLabel}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                        option.value === sortBy
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <option.icon size={16} /> {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4 px-0 sm:px-0">
          <h3 className="text-xl font-bold text-slate-800 px-4 sm:px-0 text-center sm:text-left">
            All Projects{" "}
            <span className="text-slate-400 font-normal ml-1">
              ({filteredProjects.length})
            </span>
          </h3>

          {filteredProjects.length > 0 ? (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }`}
            >
              {filteredProjects.map((project) =>
                viewMode === "grid" ? (
                  <div key={project.id} className="px-4 sm:px-0">
                    <ProjectCard
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  </div>
                ) : (
                  <div key={project.id} className="px-4 sm:px-0">
                    <ProjectRow
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mx-4 sm:mx-0 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-700">
                No projects found
              </p>
            </div>
          )}
        </div>

        <div className="h-8" />
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

// --- Helper Components (Kept for completeness) ---

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: ProjectProps | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  const styles = getStatusColor(project.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 transition-opacity animate-in fade-in"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-start justify-between p-6 pb-2 bg-white z-10 shrink-0">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}
              >
                {project.status}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {project.statusDetail}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/proposal" passHref>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-700 hover:text-white text-black text-sm font-medium rounded-lg transition-colors shadow-sm">
                <FileText size={16} />
                <span className="hidden sm:inline">View Proposal</span>
              </button>
            </Link>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex px-6 border-b border-slate-100 gap-6 text-sm font-medium text-slate-500 shrink-0">
          {["Overview", "Milestones", "Files"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-3 border-b-[2px] transition-all ${
                activeTab === tab.toLowerCase()
                  ? "border-indigo-600 text-indigo-600 font-semibold"
                  : "border-transparent hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white scrollbar-hide">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={project.avatarUrl}
                      alt={project.freelancer}
                      className="w-12 h-12 rounded-full object-cover bg-slate-100"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{project.freelancer}</p>
                    <p className="text-xs text-slate-500">{project.role}</p>
                  </div>
                </div>
                <Link href="/messages">
                  <button className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                    <MessageSquare size={18} />
                  </button>
                </Link>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">Project Description</h4>
                <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {project.description}
                </div>
              </div>

              <div className="bg-white p-6 space-y-8">
                <div className="grid grid-cols-3 gap-6 border-b border-slate-100 pb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <DollarSign size={18} className="text-slate-600" />
                      <span>₹{project.budget.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">Fixed Price</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <Layers size={18} className="text-slate-600" />
                      <span>Expert</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">Experience Level</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <Calendar size={18} className="text-slate-600" />
                      <span>{new Date(project.dueDate).getDate()}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">Start Date</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-full border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-slate-900">Overall Progress</span>
                  <span className="text-indigo-600 font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <p className="text-slate-500 text-sm italic">Milestone tracking features coming soon.</p>
            </div>
          )}

          {activeTab === "files" && (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <Paperclip className="text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-600">No files attached yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusColor(s: ProjectProps["status"]) {
  switch (s) {
    case "In Progress":
      return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
    case "Completed":
      return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
    case "Pending Start":
      return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" };
    default:
      return { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };
  }
}

function ProjectCard({ project, onSelect }: { project: ProjectProps; onSelect: () => void }) {
  const styles = getStatusColor(project.status);
  const formattedDueDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={project.avatarUrl} alt={project.freelancer} className="w-10 h-10 rounded-full bg-slate-100 ring-2 ring-white shadow-sm" />
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none">{project.freelancer}</p>
            <p className="text-xs text-slate-500 mt-1">{project.role}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles.bg} ${styles.text} ${styles.border}`}>
          {project.status}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-bold text-lg text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {project.title}
        </h4>
        <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div>
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><DollarSign size={10} /> Budget</p>
            <p className="font-semibold text-slate-700 text-sm">₹{project.budget.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Calendar size={10} /> Deadline</p>
            <p className="font-semibold text-slate-700 text-sm">{formattedDueDate}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-500">{project.statusDetail}</span>
          <span className="font-bold text-slate-700">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div className={`h-full rounded-full transition-all duration-1000 ease-out ${project.status === "Completed" ? "bg-emerald-500" : "bg-indigo-600"}`} style={{ width: `${project.progress}%` }} />
        </div>
        <button className="w-full py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 group-hover:border-indigo-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ProjectRow({ project, onSelect }: { project: ProjectProps; onSelect: () => void }) {
  const styles = getStatusColor(project.status);
  const formattedDueDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer group"
    >
      <div className="flex-1 w-full sm:w-auto flex items-center gap-4">
        <img src={project.avatarUrl} alt={project.freelancer} className="w-10 h-10 rounded-full bg-slate-100 ring-1 ring-slate-200" />
        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{project.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">by <span className="font-medium text-slate-700">{project.freelancer}</span></p>
        </div>
      </div>
      <div className="w-full sm:w-32 flex sm:justify-center">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}>{project.status}</span>
      </div>
      <div className="w-full sm:w-48">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400">{project.statusDetail}</span>
          <span className="font-bold text-slate-700">{project.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${project.progress}%` }} />
        </div>
      </div>
      <div className="w-full sm:w-40 flex justify-between sm:block sm:text-right">
        <div>
          <p className="text-xs text-slate-400">Budget</p>
          <p className="font-semibold text-slate-700">₹{project.budget.toLocaleString("en-IN")}</p>
        </div>
        <div className="sm:mt-2">
          <p className="text-xs text-slate-500">{formattedDueDate}</p>
        </div>
      </div>
      <div className="hidden sm:block">
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function SparklineAreaChart({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length === 0) return null;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal;
  const points = data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((val - minVal) / (range || 1)) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="h-16 w-full absolute bottom-0 left-0 opacity-20 pointer-events-none">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <path d={`M0,100 L${points} L100,100 L0,100 Z`} fill="currentColor" />
      </svg>
    </div>
  );
}

function CircularProgressRing({ radius, stroke, progress, color }: { radius: number; stroke: number; progress: number; color: string }) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
      <circle stroke="currentColor" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} className="text-white/20" />
      <circle stroke="currentColor" strokeLinecap="round" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} className="text-white" style={{ strokeDasharray: circumference, strokeDashoffset, transition: "stroke-dashoffset 0.8s ease-out" }} />
    </svg>
  );
}

function ActionCard({ title, value, icon: Icon, colorClass, chartData, chartColor, progressRingValue, detailValue, detailText }: any) {
  const isPositive = detailValue && (detailValue.startsWith("+") || (Number.isFinite(detailValue) && detailValue >= 0));
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  return (
    <div className={`rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl relative overflow-hidden flex flex-col justify-between h-40 ${colorClass}`}>
      {chartData && <SparklineAreaChart data={chartData} color={chartColor} />}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
            <Icon size={20} className="text-white" />
          </div>
          <p className="text-sm font-medium text-white/90">{title}</p>
        </div>
        {progressRingValue !== undefined && (
          <div className="w-12 h-12 flex items-center justify-center relative">
            <CircularProgressRing radius={24} stroke={3} progress={progressRingValue} color="white" />
            <span className="absolute text-[10px] font-bold text-white">{progressRingValue}%</span>
          </div>
        )}
      </div>
      <div className="relative z-10 mt-auto">
        <h4 className="text-3xl font-bold tracking-tight text-white">{value.toLocaleString()}</h4>
        {detailValue && (
          <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
            <span className={`font-bold ${isPositive ? "bg-white/20" : "bg-red-500/20"} px-1.5 py-0.5 rounded flex items-center gap-1`}>
              {TrendIcon && <TrendIcon size={10} />} {detailValue}
            </span>
            <span>{detailText}</span>
          </div>
        )}
      </div>
    </div>
  );
}