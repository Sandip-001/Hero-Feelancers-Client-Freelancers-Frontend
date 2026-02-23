"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { MapPin, Trophy, ShieldCheck, Search, XCircle } from "lucide-react";
import { useGetAllFreelancersQuery } from "../redux/api/freelancerAuth.api";
import { useGetMeQuery } from "../redux/api/auth.api";
import { toast } from "sonner";

export const getAvatarColor = (name: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export default function FreelancersPage() {
  const router = useRouter();

  const {
    data: freelancers,
    isLoading: laodingFreelancers,
    isError: errorFreelancers,
  } = useGetAllFreelancersQuery(undefined, { refetchOnMountOrArgChange: true });

  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery(); // Get current user data

  //console.log("Freelancers Data:", freelancers);

  const maskName = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].slice(0, 4) + " J...";
    }
    return parts[0].slice(0, 4) + " " + parts[1][0] + "...";
  };

  const handlePushtoJob = () => {
    if (authData?.user?.userType !== "client") {
      toast.error("Only clients can post jobs. Please login as a client.");
      return;
    }
    router.push("/jobpost");
  };

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Best Match");
  const [visibleCount, setVisibleCount] = useState(4); // Load More Logic

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    string[]
  >([]);

  // Filters
  const [selectedRateRanges, setSelectedRateRanges] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  // --- HANDLERS ---
  const handleRateChange = (range: string) => {
    setSelectedRateRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range],
    );
  };

  const handleBadgeChange = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge],
    );
  };

  // 🔥 Get Unique Skills From API
  const uniqueSkills = useMemo<string[]>(() => {
    if (!freelancers) return [];

    const allSkills: string[] = freelancers.flatMap((f: any) => f.skills || []);

    return Array.from(new Set(allSkills));
  }, [freelancers]);

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleExperienceChange = (level: string) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  // --- LOGIC ---
  const filteredFreelancers = useMemo(() => {
    if (!freelancers) return [];

    let result = [...freelancers];

    const q = searchQuery.toLowerCase();

    // 🔎 SEARCH by Name OR Skills
    if (searchQuery) {
      result = result.filter(
        (f) =>
          f.fullName?.toLowerCase().includes(q) ||
          f.skills?.some((s: string) => s.toLowerCase().includes(q)),
      );
    }

    // 🎯 SKILL FILTER
    if (selectedSkills.length > 0) {
      result = result.filter((f) =>
        f.skills?.some((skill: string) => selectedSkills.includes(skill)),
      );
    }

    // 🎯 EXPERIENCE FILTER
    if (selectedExperienceLevels.length > 0) {
      result = result.filter((f) =>
        selectedExperienceLevels.includes(f.experienceLevel),
      );
    }

    // SORTING
    if (sortOption === "Highest Rate") {
      result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
    } else if (sortOption === "Lowest Rate") {
      result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
    }

    return result;
  }, [
    freelancers,
    searchQuery,
    selectedSkills,
    sortOption,
    selectedExperienceLevels,
  ]);

  const visibleFreelancers = filteredFreelancers.slice(0, visibleCount);

  if (laodingFreelancers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading freelancers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f9ff] font-sans">
      <Navbar />
      <div className="h-24 bg-[#f2f9ff]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12 mt-2">
        {/* Header */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
                Hire the best Freelacners
              </h1>
              <p className="text-gray-500">
                Discover top verified professionals ready to deliver quality
                work.
              </p>
            </div>
            <button
              className="px-4 py-2 text-white rounded-full font-bold text-sm bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500  hover:bg-yellow-600"
              onClick={handlePushtoJob}
            >
              Post a Job
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block space-y-6 sticky top-28 h-fit">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Filter By</h3>
              {(selectedRateRanges.length > 0 ||
                selectedSkills.length > 0 ||
                selectedExperienceLevels.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedRateRanges([]);
                    setSelectedSkills([]);
                    setSelectedExperienceLevels([]);
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Skills Filter */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Skills</h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {uniqueSkills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level Filter */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">
                Experience Level
              </h4>

              <div className="space-y-2">
                {[
                  { label: "Beginner (0-1 years)", value: "beginner" },
                  { label: "Intermediate (1-3 years)", value: "intermediate" },
                  { label: "Expert (3-5 years)", value: "expert" },
                  { label: "Senior (5+ years)", value: "senior" },
                ].map((exp) => (
                  <label
                    key={exp.value}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                      checked={selectedExperienceLevels.includes(exp.value)}
                      onChange={() => handleExperienceChange(exp.value)}
                    />
                    {exp.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Hourly Rate 
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">
                Hourly Rate
              </h4>
              <div className="space-y-2">
                {["$10 and below", "$10 - $30", "$30 - $60", "$60 & above"].map(
                  (range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                        checked={selectedRateRanges.includes(range)}
                        onChange={() => handleRateChange(range)}
                      />
                      {range}
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Talent Quality
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">
                Talent Quality
              </h4>
              <div className="space-y-2">
                {["Top Rated Plus", "Top Rated", "Rising Talent"].map(
                  (badge) => (
                    <label
                      key={badge}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                        checked={selectedBadges.includes(badge)}
                        onChange={() => handleBadgeChange(badge)}
                      />
                      {badge}
                    </label>
                  ),
                )}
              </div>
            </div>  */}
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or keyword..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden md:block">
                  Sort:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-sm font-medium border-none bg-transparent cursor-pointer hover:text-blue-600 outline-none"
                >
                  <option>Best Match</option>
                  <option>Highest Rate</option>
                  <option>Lowest Rate</option>
                </select>
              </div>
            </div>

            {/* Cards */}
            {visibleFreelancers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <XCircle size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-600">
                  No freelancers found
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBadges([]);
                    setSelectedRateRanges([]);
                  }}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 relative">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                          {freelancer.profileImage ? (
                            <img
                              src={freelancer.profileImage}
                              alt={freelancer.fullName}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div
                              className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl ${getAvatarColor(
                                freelancer.fullName,
                              )}`}
                            >
                              {freelancer.fullName?.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between items-start mb-1">
                          <div>
                            <h3 className="text-lg font-bold text-blue-600 hover:underline">
                              {freelancer.fullName}
                            </h3>
                            <p className="font-medium text-gray-800 text-sm mb-1">
                              {freelancer.title || "No title provided"}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <button
                              onClick={() => {
                                const slug = freelancer.fullName
                                  .toLowerCase()
                                  .replace(/\s+/g, "-");

                                router.push(`/freelancers/${slug}`);
                              }}
                              className="px-6 py-1.5 rounded-full  text-white font-bold text-sm bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500  hover:bg-yellow-600 transition-colors"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-600 mb-3 font-medium">
                          <span className="font-bold">
                            {freelancer.experienceLevel || "5"}
                          </span>
                          {/*<span className="text-gray-300">|</span>
                          <span className="text-gray-600">
                            {freelancer.earned || "No earnings data"}
                          </span> */}
                          <span className="text-gray-300">|</span>
                          <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                            <Trophy size={12} /> {freelancer.jobSuccess || 0}%
                            Job Success
                          </div>
                          {freelancer.isEmailVerified && (
                            <div className="flex items-center gap-1 text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                              <ShieldCheck size={12} />{" "}
                              {freelancer.isEmailVerified
                                ? "Verified"
                                : "Unverified"}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                          <MapPin size={12} /> {freelancer.countryName}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {freelancer.about}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {freelancer.skills.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button Logic */}
            {visibleCount < filteredFreelancers.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="px-6 py-2 border border-gray-300 rounded-full text-sm font-bold text-blue-600 hover:bg-blue-50"
                >
                  Load More Profiles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
