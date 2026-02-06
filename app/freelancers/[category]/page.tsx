"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import {
  Star,
  MapPin,
  Trophy,
  ShieldCheck,
  ChevronDown,
  Search,
  XCircle,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_FREELANCERS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Senior UI/UX Designer | Mobile & Web Expert",
    rateStr: "$65.00/hr",
    rateVal: 65,
    rating: 5.0,
    jobSuccess: 100,
    earned: "$200k+ earned",
    jobs: 142,
    location: "London, UK",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    badge: "Top Rated Plus",
    bio: "I craft user-friendly interfaces for startups and Fortune 500 companies. With 8 years of experience...",
  },
  {
    id: 2,
    name: "David Chen",
    title: "Full Stack Developer (React, Node, Python)",
    rateStr: "$80.00/hr",
    rateVal: 80,
    rating: 4.9,
    jobSuccess: 98,
    earned: "$400k+ earned",
    jobs: 89,
    location: "Toronto, Canada",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    badge: "Top Rated",
    bio: "Specializing in scalable web applications. I have helped 3 Y-Combinator startups launch their MVPs...",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Digital Marketing Strategist & SEO Expert",
    rateStr: "$50.00/hr",
    rateVal: 50,
    rating: 4.8,
    jobSuccess: 92,
    earned: "$80k+ earned",
    jobs: 310,
    location: "Madrid, Spain",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    skills: ["SEO", "Content Strategy", "PPC", "Google Analytics"],
    badge: "Rising Talent",
    bio: "I help e-commerce brands double their organic traffic within 6 months through technical SEO...",
  },
  {
    id: 4,
    name: "Michael Chang",
    title: "3D Motion Graphics Artist",
    rateStr: "$75.00/hr",
    rateVal: 75,
    rating: 5.0,
    jobSuccess: 100,
    earned: "$150k+ earned",
    jobs: 54,
    location: "Singapore",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    skills: ["After Effects", "Cinema 4D", "Blender"],
    badge: "Top Rated",
    bio: "Award-winning motion designer. I create compelling 3D visuals for commercials and tech demos...",
  },
  {
    id: 5,
    name: "Jessica Wu",
    title: "Junior Graphic Designer",
    rateStr: "$25.00/hr",
    rateVal: 25,
    rating: 4.5,
    jobSuccess: 88,
    earned: "$10k+ earned",
    jobs: 12,
    location: "New York, USA",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    skills: ["Photoshop", "Illustrator", "Canva"],
    badge: "",
    bio: "Passionate graphic designer looking to build my portfolio. I specialize in social media graphics.",
  },
];

export default function FreelancerCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = (params.category as string).split("-").join(" ");

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Best Match");
  const [visibleCount, setVisibleCount] = useState(4); // Load More Logic

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

  const handleViewProfile = (profileId: number) => {
    router.push(
      `/login?callbackUrl=/freelancers/${params.category}/${profileId}`,
    );
  };

  // --- LOGIC ---
  const filteredFreelancers = useMemo(() => {
    let result = MOCK_FREELANCERS;

    // 1. Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    // 2. Hourly Rate Filter (Bucketing logic)
    if (selectedRateRanges.length > 0) {
      result = result.filter((f) => {
        return selectedRateRanges.some((range) => {
          if (range === "$10 and below") return f.rateVal <= 10;
          if (range === "$10 - $30") return f.rateVal > 10 && f.rateVal <= 30;
          if (range === "$30 - $60") return f.rateVal > 30 && f.rateVal <= 60;
          if (range === "$60 & above") return f.rateVal > 60;
          return false;
        });
      });
    }

    // 3. Badges (Quality)
    if (selectedBadges.length > 0) {
      result = result.filter((f) => selectedBadges.includes(f.badge));
    }

    // 4. Sorting
    return result.sort((a, b) => {
      if (sortOption === "Highest Rate") return b.rateVal - a.rateVal;
      if (sortOption === "Lowest Rate") return a.rateVal - b.rateVal;
      // Best Match logic (mock: based on job success + rating)
      return b.jobSuccess + b.rating * 20 - (a.jobSuccess + a.rating * 20);
    });
  }, [searchQuery, selectedRateRanges, selectedBadges, sortOption]);

  const visibleFreelancers = filteredFreelancers.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#f2f9ff] font-sans">
      <Navbar />
      <div className="h-24 bg-[#f2f9ff]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {/* Header */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
                Hire the best {categoryName}
              </h1>
              <p className="text-gray-500">
                Browse {filteredFreelancers.length} {categoryName} with verified
                track records.
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700">
              Post a Job
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Filter By</h3>
              {(selectedRateRanges.length > 0 || selectedBadges.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedRateRanges([]);
                    setSelectedBadges([]);
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Hourly Rate */}
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

            {/* Talent Quality */}
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
            </div>
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
                    onClick={() => handleViewProfile(freelancer.id)}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 relative">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                          <img
                            src={freelancer.img}
                            alt={freelancer.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between items-start mb-1">
                          <div>
                            <h3 className="text-lg font-bold text-blue-600 hover:underline">
                              {freelancer.name}
                            </h3>
                            <p className="font-medium text-gray-800 text-sm mb-1">
                              {freelancer.title}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(freelancer.id);
                              }}
                              className="px-6 py-1.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-600 mb-3 font-medium">
                          <span className="font-bold">
                            {freelancer.rateStr}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600">
                            {freelancer.earned}
                          </span>
                          <span className="text-gray-300">|</span>
                          <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                            <Trophy size={12} /> {freelancer.jobSuccess}% Job
                            Success
                          </div>
                          {freelancer.badge && (
                            <div className="flex items-center gap-1 text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
                              <ShieldCheck size={12} /> {freelancer.badge}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                          <MapPin size={12} /> {freelancer.location}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {freelancer.bio}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {freelancer.skills.map((skill, i) => (
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
