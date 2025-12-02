"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { 
  MapPin, Clock, DollarSign, Search, Heart, 
  CheckCircle2, Star, ChevronDown, ChevronLeft, ChevronRight, XCircle 
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior React Developer for SaaS Platform",
    client: "TechFlow Inc.",
    paymentVerified: true,
    rating: 4.9,
    spend: "$50k+ spent",
    location: "United States",
    budget: "$40.00 - $60.00", // Hourly
    budgetVal: 50, // Added for sorting
    type: "Hourly",
    level: "Expert",
    time: "Posted 25 minutes ago",
    timestamp: Date.now() - 1500000,
    proposals: "Less than 5",
    desc: "We are looking for an experienced React developer to help build our new dashboard. You must have experience with Next.js 14, Server Actions, and Tailwind CSS. This is a long-term role...",
    tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: 2,
    title: "UI/UX Designer needed for Fitness App Redesign",
    client: "StartUp Z",
    paymentVerified: false,
    rating: 0,
    spend: "$0 spent",
    location: "Germany",
    budget: "$2,000", // Fixed
    budgetVal: 2000,
    type: "Fixed-Price",
    level: "Intermediate",
    time: "Posted 1 hour ago",
    timestamp: Date.now() - 3600000,
    proposals: "10 to 15",
    desc: "Need a fresh design for our fitness tracking app. We have the wireframes ready, need someone to convert them into high-fidelity Figma designs. Mobile-first approach required.",
    tags: ["Figma", "Mobile Design", "Prototyping", "iOS"],
  },
  {
    id: 3,
    title: "Python Backend Engineer for Data Pipeline",
    client: "DataCorp",
    paymentVerified: true,
    rating: 5.0,
    spend: "$200k+ spent",
    location: "Canada",
    budget: "$60.00 - $90.00",
    budgetVal: 75,
    type: "Hourly",
    level: "Expert",
    time: "Posted 4 hours ago",
    timestamp: Date.now() - 14400000,
    proposals: "20 to 50",
    desc: "Looking for a Python expert to optimize our data processing pipeline. Experience with Apache Airflow, Pandas, and AWS Redshift is mandatory. You will be working with a team of 4.",
    tags: ["Python", "Django", "AWS", "Data Engineering"],
  },
  {
    id: 4,
    title: "SEO Specialist for E-commerce Store",
    client: "Growth Agency",
    paymentVerified: true,
    rating: 4.5,
    spend: "$10k+ spent",
    location: "Australia",
    budget: "$30.00 - $45.00",
    budgetVal: 37,
    type: "Hourly",
    level: "Entry Level",
    time: "Posted 6 hours ago",
    timestamp: Date.now() - 21600000,
    proposals: "5 to 10",
    desc: "We need someone to manage our Google Ads campaigns and improve our organic search ranking. Must be familiar with Shopify and SEMRush.",
    tags: ["SEO", "Google Ads", "Shopify", "Marketing"],
  },
  {
    id: 5,
    title: "Junior Frontend Developer (Vue.js)",
    client: "WebSolutions",
    paymentVerified: true,
    rating: 4.2,
    spend: "$5k+ spent",
    location: "United Kingdom",
    budget: "$20.00 - $35.00",
    budgetVal: 27,
    type: "Hourly",
    level: "Entry Level",
    time: "Posted 1 day ago",
    timestamp: Date.now() - 86400000,
    proposals: "50+",
    desc: "Looking for a junior dev to help with frontend tasks. Must know Vue 3 and Pinia.",
    tags: ["Vue.js", "JavaScript", "HTML/CSS"],
  },
];

export default function JobCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = (params.category as string).split("-").join(" ");
  
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter States
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // --- HANDLERS ---
  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleViewDetails = (jobId: number) => {
    router.push(`/login?callbackUrl=/jobs/${params.category}/${jobId}`);
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
    let result = MOCK_JOBS;

    // 1. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(q) || 
        job.desc.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 2. Experience Level Filter
    if (selectedLevels.length > 0) {
      result = result.filter(job => selectedLevels.includes(job.level));
    }

    // 3. Job Type Filter
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.type));
    }

    // 4. Verified Only
    if (verifiedOnly) {
      result = result.filter(job => job.paymentVerified);
    }

    // 5. Sorting
    return result.sort((a, b) => {
      if (sortOption === "Newest") return b.timestamp - a.timestamp;
      if (sortOption === "Client Rating") return b.rating - a.rating;
      if (sortOption === "Budget (High-Low)") return b.budgetVal - a.budgetVal;
      return 0;
    });

  }, [searchQuery, selectedLevels, selectedTypes, verifiedOnly, sortOption]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="h-24 bg-white"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8 pb-12">
        
        {/* --- FILTERS SIDEBAR --- */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 hidden lg:block">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-xl text-gray-800">Filter By</h3>
             {(selectedLevels.length > 0 || selectedTypes.length > 0 || verifiedOnly || searchQuery) && (
               <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Reset</button>
             )}
          </div>
          
          <div className="border-b border-gray-200 pb-4">
             <h4 className="font-bold text-gray-700 mb-3 text-sm">Category</h4>
             <div className="text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded-md capitalize">
                {categoryName}
             </div>
          </div>

          {/* Experience Level */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-bold text-gray-700 mb-3 text-sm">Experience Level</h4>
            <div className="space-y-2">
              {["Entry Level", "Intermediate", "Expert"].map((level) => (
                <label key={level} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
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
              {["Hourly", "Fixed-Price"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
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
            <h4 className="font-bold text-gray-700 mb-3 text-sm">Client Info</h4>
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
                 {categoryName} Jobs <span className="text-gray-400 text-lg font-normal">({filteredJobs.length})</span>
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
                        <option>Client Rating</option>
                        <option>Budget (High-Low)</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
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
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Job List */}
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
               <XCircle size={48} className="text-gray-300 mb-4" />
               <h3 className="text-lg font-bold text-gray-600">No jobs found</h3>
               <p className="text-gray-400">Try adjusting your search filters.</p>
               <button onClick={clearFilters} className="mt-4 text-blue-600 font-medium hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer relative"
                  onClick={() => handleViewDetails(job.id)}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleViewDetails(job.id); }} 
                    className="absolute top-6 right-6 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 bg-white"
                  >
                    <Heart size={16} />
                  </button>

                  <div className="mb-1">
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 group-hover:underline decoration-2 underline-offset-2 transition-all w-[90%]">
                      {job.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-4 font-medium">
                    <span className="text-gray-600">{job.type}: {job.budget}</span>
                    <span>•</span>
                    <span className="text-gray-600">{job.level}</span>
                    <span>•</span>
                    <span>Posted {job.time}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{job.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-200/50 text-gray-600 text-xs rounded-full font-medium hover:bg-gray-300/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                    {job.paymentVerified ? (
                      <div className="flex items-center gap-1 text-blue-600 font-semibold">
                        <CheckCircle2 size={14} fill="currentColor" className="text-blue-100" />
                        <span className="text-gray-500">Payment verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-400">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></span>
                        <span>Payment unverified</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(job.rating) ? "currentColor" : "none"} className={i < Math.floor(job.rating) ? "" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-700">{job.rating > 0 ? job.rating : "No reviews"}</span>
                    </div>

                    <span className="font-medium text-gray-700">{job.spend}</span>
                    <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center mt-10 gap-2 items-center">
               <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
               >
                 <ChevronLeft size={16} />
               </button>
               <span className="text-sm text-gray-600 font-medium">
                  Page {currentPage} of {totalPages}
               </span>
               <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
  );
}