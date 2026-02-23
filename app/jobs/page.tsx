"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import {
  MapPin,
  Search,
  Heart,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { useGetFreelancerJobsQuery } from "../redux/api/jobs.api";
import {
  useAddBookmarkMutation,
  useGetBookmarksQuery,
  useRemoveBookmarkMutation,
} from "../redux/api/bookmarks.api";
import { useCreateProposalMutation } from "../redux/api/proposals.api";
import { mapApiJobToUI } from "@/lib/utils/projectMapper";
import { toast } from "sonner";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { ProposalView } from "@/components/projects/ui-blocks";
import { useGetMeQuery } from "../redux/api/auth.api";
import { Project } from "@/components/projects/data";

export default function JobCategoryPage() {
  const router = useRouter();

  const { data: authData } = useGetMeQuery();
  const isLoggedIn = !!authData?.user;
  const userRole = authData?.role; // "client" | "freelancer"

  // 1. FETCH JOBS
  const {
    data: rawJobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetFreelancerJobsQuery(undefined, { refetchOnMountOrArgChange: true });

  console.log("Fetched Jobs:", rawJobs?.data);

  // 2. FETCH BOOKMARKS
  const { data: bookmarksData } = useGetBookmarksQuery(undefined);

  // 3. MUTATIONS
  const [createProposal, { isLoading: isSubmitting }] =
    useCreateProposalMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter States
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // --- HANDLERS ---
  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setCurrentPage(1);
  };

  const handleViewDetails = (project: Project) => {
    if (!isLoggedIn || userRole !== "freelancer") {
      toast.error("Please login as a freelancer to submit a proposal");
      router.push("/login");
      return;
    }

    setSelectedProject(project);
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 4. MERGE DATA (Jobs + Bookmarks)
  const projects = useMemo(() => {
    const jobsArray = Array.isArray(rawJobs) ? rawJobs : rawJobs?.data || [];
    if (!Array.isArray(jobsArray)) return [];

    // 🔥 FIX HERE
    const bookmarksList = bookmarksData?.bookmarks || [];

    const bookmarkSet = new Set<number>();

    bookmarksList.forEach((b: any) => {
      const jobId = b.jobId || b.Job?.id;
      if (jobId) bookmarkSet.add(Number(jobId));
    });

    return jobsArray.map((job) => {
      const uiJob = mapApiJobToUI(job);
      const jobIdNum = Number(uiJob.id);

      return {
        ...uiJob,
        isBookmarked: bookmarkSet.has(jobIdNum),
      };
    });
  }, [rawJobs, bookmarksData]);

  // 5. HANDLER: Toggle Bookmark
  const handleToggleBookmark = async (project: any) => {
    if (!isLoggedIn || userRole !== "freelancer") {
      toast.error("Please login as a freelancer to bookmark jobs");
      router.push("/login");
      return;
    }

    try {
      if (project.isBookmarked) {
        await removeBookmark(Number(project.id)).unwrap();
        toast.success("Removed from bookmarks");
      } else {
        await addBookmark({ jobId: Number(project.id) }).unwrap();
        toast.success("Job bookmarked");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update bookmark");
    }
  };

  // 6. HANDLER: Submit Proposal
  const handleSubmitProposal = async (formData: any) => {
    if (!selectedProject) return;

    const bidValue = formData.bid || formData.amount || formData.proposedAmount;

    if (!bidValue || !formData.duration || !formData.coverLetter) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const payload = {
      jobId: selectedProject.id,
      coverLetter: formData.coverLetter,
      proposedAmount: Number(bidValue),
      duration: formData.duration,
    };

    try {
      await createProposal(payload).unwrap();
      toast.success("Proposal Submitted Successfully!");
      setSelectedProject(null);
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to submit proposal.";
      toast.error(msg);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevels([]);
    setSelectedTypes([]);
    setVerifiedOnly(false);
    setCurrentPage(1);
  };

  // --- FILTERING & SORTING LOGIC ---
  const filteredJobs = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.skills?.some((tag: string) => tag.toLowerCase().includes(q)),
      );
    }

    if (selectedLevels.length > 0) {
      result = result.filter((job) =>
        selectedLevels.includes(job.experienceLevel),
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((job) => selectedTypes.includes(job.type));
    }

    if (verifiedOnly) {
      result = result.filter((job) => job.paymentVerified);
    }

    if (sortOption === "Newest") {
      result.sort((a, b) => b.postedTime - a.postedTime);
    }

    {
      /*if (sortOption === "Client Rating") {
      result.sort((a, b) => b.rating - a.rating);
    } */
    }

    if (sortOption === "Budget (High-Low)") {
      result.sort((a, b) => b.budgetValue - a.budgetValue);
    }

    if (sortOption === "Budget(Low-High)") {
      result.sort((a, b) => a.budgetValue - b.budgetValue);
    }

    return result;
  }, [
    projects,
    searchQuery,
    selectedLevels,
    selectedTypes,
    verifiedOnly,
    sortOption,
  ]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (jobsLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          Loading jobs...
        </div>
      </>
    );
  }

  if (jobsError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Failed to load jobs
        </div>
      </>
    );
  }

  // --- RENDER ---
  if (selectedProject) {
    return (
      <ProjectLayout hideSidebars={true}>
        <ProposalView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onSubmitProposal={handleSubmitProposal}
          isSubmitting={isSubmitting}
        />
      </ProjectLayout>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white font-sans pt-10">
        <div className="h-24 bg-white"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8 pb-12">
          {/* --- FILTERS SIDEBAR --- */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 hidden lg:block sticky top-28 h-fit">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl text-gray-800">Filter By</h3>
              {(selectedLevels.length > 0 ||
                selectedTypes.length > 0 ||
                verifiedOnly ||
                searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-gray-700 mb-3 text-sm">Category</h4>
              <div className="text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded-md capitalize">
                Browse Jobs
              </div>
            </div>

            {/* Experience Level */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-gray-700 mb-3 text-sm">
                Experience Level
              </h4>
              <div className="space-y-2">
                {["Entry Level", "Intermediate", "Expert"].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelChange(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-gray-700 mb-3 text-sm">Job Type</h4>
              <div className="space-y-2">
                {["Hourly", "Fixed"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-gray-700 mb-3 text-sm">
                Client Info
              </h4>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />
                Payment Verified
              </label>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
            {/* Header & Search */}
            <div className="mb-6 bg-white rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  Browse Jobs{" "}
                  <span className="text-gray-400 text-lg font-normal">
                    ({filteredJobs.length})
                  </span>
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 pl-3 pr-8 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none"
                    >
                      <option>Newest</option>
                      <option>Budget(Low-High)</option>
                      <option>Budget (High-Low)</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for jobs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Job List */}
            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <XCircle size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-600">
                  No jobs found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer relative"
                    onClick={() => handleViewDetails(job)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(job);
                      }}
                      className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 bg-white"
                    >
                      <Heart
                        size={16}
                        className={
                          job.isBookmarked ? "text-red-500 fill-red-500" : ""
                        }
                      />
                    </button>

                    <div className="mb-1">
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2 transition-all w-[90%]">
                        {job.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-4 font-medium">
                      <span className="text-gray-600">
                        {job.type}: {job.budget}
                      </span>
                      <span>•</span>
                      <span className="text-gray-600">
                        {job.experienceLevel}
                      </span>
                      <span>•</span>
                      <span>Posted {job.postedTime}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job?.skills?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-200/50 text-gray-600 text-xs rounded-full font-medium hover:bg-gray-300/50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                      {job?.client?.verified ? (
                        <div className="flex items-center gap-1 text-blue-600 font-semibold">
                          <CheckCircle2
                            size={14}
                            fill="currentColor"
                            className="text-green-500"
                          />
                          <span className="text-gray-500">
                            Payment verified
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></span>
                          <span>Payment unverified</span>
                        </div>
                      )}

                      {/*<div className="flex items-center gap-1">
                        <div className="flex text-orange-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={
                                i < Math.floor(job.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                i < Math.floor(job.rating)
                                  ? ""
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-700">
                          {job.rating > 0 ? job.rating : "No reviews"}
                        </span>
                      </div>

                      <span className="font-medium text-gray-700">
                        {job.spend}
                      </span> */}
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {job?.client?.location || "Remote"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex justify-center mt-10 gap-2 items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
