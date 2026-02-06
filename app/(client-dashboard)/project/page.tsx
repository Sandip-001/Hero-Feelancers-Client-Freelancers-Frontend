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
  Loader2,
  Trash2,
  Edit2,
  Save,
  UploadCloud,
  Briefcase,
  Eye,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner"; // Added toaster import

// --- REDUX API HOOKS ---
import {
  useGetClientJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "@/app/redux/api/jobs.api";

// --- TYPES ---
interface ProjectProps {
  id: string;
  title: string;
  freelancer?: string;
  role?: string;
  status:
    | "active"
    | "awarded_pending"
    | "awarded"
    | "awarded_rejected"
    | "awarded"
    | "dispute"
    | "completed"
    | "closed_by_admin";
  statusDetail?: string;
  progress: number;
  budget: number;
  priceType?: string;
  hireTimeline?: string;
  dueDate: string;
  avatarUrl?: string;
  description?: string;
  skills?: string[];
  documents?: string[]; // Array of file URLs/names
}

// --- MOCK TRENDS ---
const PROJECT_TRENDS = {
  active: [10, 12, 11, 15, 13, 16, 17, 18, 19, 15, 17],
  pending: [3, 4, 2, 5, 3, 4, 6, 5, 7, 4, 3],
  completed: [5, 6, 8, 7, 9, 10, 8, 9, 11, 12, 10],
};

export default function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const formatStatusLabel = (status: string) =>
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // 1. FETCH JOBS
  const {
    data: rawData,
    isLoading,
    error,
  } = useGetClientJobsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(rawData);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load projects.
      </div>
    );

  const projects = rawData?.data || [];

  const activeCount = projects.filter((p: any) => p.status === "active").length;

  const awardedCount = projects.filter(
    (p: any) => p.status === "awarded",
  ).length;

  const completedCount = projects.filter(
    (p: any) => p.status === "completed",
  ).length;

  // unique statuses
  const statusOptions: string[] = [
    "All",
    ...(Array.from(new Set(projects.map((p: any) => p.status))) as string[]),
  ];

  const filteredProjects = projects.filter((project: any) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      project.title?.toLowerCase().includes(search) ||
      project.projectValue?.toString().includes(search) ||
      project.status?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
            value={activeCount}
            icon={Clock}
            colorClass="bg-indigo-600 text-white"
            chartData={PROJECT_TRENDS.active}
          />
          <ActionCard
            title="Awarded"
            value={awardedCount}
            icon={Layers}
            colorClass="bg-orange-500 text-white"
            chartData={PROJECT_TRENDS.pending}
          />
          <ActionCard
            title="Total Completed"
            value={completedCount}
            icon={CheckCircle}
            colorClass="bg-emerald-600 text-white"
            chartData={PROJECT_TRENDS.completed}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm py-4 px-4 sm:px-0">
          <div className="relative w-full lg:w-96 group">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search by title..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-slate-100 text-indigo-600" : "text-slate-400"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-slate-100 text-indigo-600" : "text-slate-400"}`}
              >
                <List size={18} />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50"
              >
                <Filter size={16} />{" "}
                {statusFilter === "All" ? "Status" : statusFilter}{" "}
                <ChevronDown size={14} />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-30">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 text-slate-700"
                    >
                      {status === "All" ? "All" : formatStatusLabel(status)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            All Projects ({paginatedProjects.length})
          </h3>
          {rawData?.data?.length > 0 ? (
            <div
              className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}
            >
              {paginatedProjects.map((project: any) => (
                <div key={project.id}>
                  {viewMode === "grid" ? (
                    <ProjectCard
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  ) : (
                    <ProjectRow
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <FileText size={40} className="mx-auto mb-4 text-slate-300" />
              <p className="text-slate-500 font-medium">No projects found.</p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

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

// --- MAIN DETAILS MODAL ---
function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: any | null;
  onClose: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const [editForm, setEditForm] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Initialize form when project opens
  useEffect(() => {
    if (project) {
      setEditForm({
        title: project.title,
        description: project.description || "",
        budget: project.projectValue,
        hireTimeline: project.hireTimeline,
        priceType: project.priceType,
        skills: project.technologies ? project.technologies.join(", ") : "",
      });
      setIsEditing(false);
      setSelectedFile(null);
    }
  }, [project]);

  if (!project) return null;

  const handleUpdate = async () => {
    try {
      const payload = new FormData();
      // STRICT Postman-based mapping
      payload.append("title", editForm.title);
      payload.append("description", editForm.description);
      payload.append("projectValue", editForm.budget.toString());
      payload.append("priceType", editForm.priceType);
      payload.append("hireTimeline", editForm.hireTimeline);

      const skillsArray = editForm.skills
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      payload.append("technologies", JSON.stringify(skillsArray));

      if (selectedFile) {
        payload.append("document", selectedFile);
      }

      const res = await updateJob({ id: project.id, data: payload }).unwrap();
      toast.success(res?.message || "Job updated successfully!"); // Replaced alert
      setIsEditing(false);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update job."); // Replaced alert
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(project.id).unwrap();
      toast.success("Job deleted."); // Replaced alert
      onClose();
    } catch (error) {
      toast.error("Failed to delete job."); // Replaced alert
    }
  };

  // Helper to extract file name from URL or string
  const getFileName = (url: string) => {
    if (!url) return "Document";
    // Handle full URL path
    const parts = url.split(/[/\\]/);
    return parts[parts.length - 1];
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div className="flex-1">
            {isEditing ? (
              <input
                className="text-xl font-bold text-slate-800 border-b border-gray-300 w-full outline-none pb-1"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-800">
                {project.title}
              </h2>
            )}
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold capitalize ${getStatusStyles(
                  project.status,
                )}`}
              >
                {project.status.replace(/_/g, " ")}
              </span>
              <span>ID: {project.id}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                >
                  <Edit2 size={18} />
                </button>
                {/*<button
                  onClick={handleDelete}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button> */}
              </>
            ) : (
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Save size={16} />
                )}{" "}
                Save
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                className="w-full p-3 border border-slate-200 rounded-lg text-sm h-32"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Budget
              </label>
              {isEditing ? (
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={editForm.budget}
                  onChange={(e) =>
                    setEditForm({ ...editForm, budget: e.target.value })
                  }
                />
              ) : (
                <p className="font-bold text-slate-800">
                  {formatProjectPrice(project)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Type
              </label>
              {isEditing ? (
                <select
                  className="w-full p-2 border rounded bg-white"
                  value={editForm.priceType}
                  onChange={(e) =>
                    setEditForm({ ...editForm, priceType: e.target.value })
                  }
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              ) : (
                <p className="font-bold text-slate-800">{project.priceType}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                Technologies
              </label>
              {isEditing ? (
                <input
                  className="w-full p-2 border rounded"
                  value={editForm.skills}
                  onChange={(e) =>
                    setEditForm({ ...editForm, skills: e.target.value })
                  }
                  placeholder="Comma separated"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-100 text-xs rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- UPDATED DOCUMENTS SECTION (Fix for "No documents attached") --- */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
              <Paperclip size={14} /> Document
            </label>

            {/* Existing Document */}
            {project.projectDocumentUrl ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-red-100 p-2 rounded text-red-600">
                    <FileText size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                    {getFileName(project.projectDocumentUrl)}
                  </span>
                </div>

                <a
                  href={project.projectDocumentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  View <Eye size={12} />
                </a>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic mb-4">
                No document attached.
              </p>
            )}

            {/* Upload in edit mode */}
            {isEditing && (
              <div className="border-2 border-dashed border-slate-200 p-4 rounded-lg text-center cursor-pointer hover:bg-slate-50 relative bg-slate-50/50">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    e.target.files && setSelectedFile(e.target.files[0])
                  }
                />
                <UploadCloud className="mx-auto text-slate-400 mb-1" />
                <span className="text-sm text-indigo-600 font-medium">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to replace/upload document"}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Uploading a new file will replace the existing one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- VISUAL COMPONENTS ---
function ActionCard({ title, value, icon: Icon, colorClass, chartData }: any) {
  return (
    <div
      className={`rounded-xl p-5 shadow-lg ${colorClass} relative overflow-hidden h-32 flex flex-col justify-between`}
    >
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon size={20} className="text-white" />
        </div>
        <span className="font-medium text-white/90">{title}</span>
      </div>
      <div className="text-3xl font-bold text-white relative z-10">{value}</div>
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d={`M0,20 L${chartData.map((v: number, i: number) => `${i * 10},${20 - v}`).join(" L")} L100,20 Z`}
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: any;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex justify-between mb-4">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
          {project.title.charAt(0)}
        </div>

        {/* STATUS BADGE */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold h-fit capitalize ${getStatusStyles(
            project.status,
          )}`}
        >
          {project.status.replace(/_/g, " ")}
        </span>
      </div>

      <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 line-clamp-1">
        {project.title}
      </h3>

      <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
        {project.description}
      </p>

      <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
        {/* PRICE */}
        <div className="font-bold text-slate-800">
          {formatProjectPrice(project)}
        </div>

        <div className="text-slate-400">{project.hireTimeline}</div>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  onSelect,
}: {
  project: any;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:shadow-md cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500">
          {project.title.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{project.title}</h4>
          <p className="text-xs text-slate-500">ID: {project.id}</p>
        </div>
      </div>
      <div className="font-bold text-slate-700">
        {formatProjectPrice(project)}
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyles(
          project.status,
        )}`}
      >
        {project.status.replace(/_/g, " ")}
      </div>
      <ArrowRight size={18} className="text-slate-300" />
    </div>
  );
}
