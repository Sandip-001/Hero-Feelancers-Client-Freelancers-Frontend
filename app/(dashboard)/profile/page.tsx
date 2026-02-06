"use client";
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { useUpdateFreelancerDetailsMutation } from "@/app/redux/api/freelancerAuth.api";
import { useGetMyWalletDetailsQuery } from "@/app/redux/api/freelancerWallet.api";
import { useGetAwardedJobsForFreelancerQuery } from "@/app/redux/api/jobs.api";
import {
  useCreateProtfolioMutation,
  useDeletePortfolioMutation,
  useGetMyPortfolioQuery,
} from "@/app/redux/api/portfolio.api";
import { useGetMyProposalsQuery } from "@/app/redux/api/proposals.api";
import PortfolioEditComponent from "@/components/layout/portfolioEditComponent";
import { ProjectFormType } from "@/types/portfolio";
import {
  Camera,
  CheckCircle,
  Filter,
  MapPin,
  Plus,
  Star,
  Upload,
  X,
  Trash2,
  Edit2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FreelancerProfile() {
  const [open, setOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const [skillInput, setSkillInput] = useState("");

  const [technologyInput, setTechnologyInput] = useState("");

  const [editPortfolioData, setEditPortfolioData] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const { data, isLoading, error } = useGetMeQuery();
  //console.log(data);
  const freelancerId = data?.user?.id;

  const { data: walletDetails, isLoading: loadingWallet } =
    useGetMyWalletDetailsQuery();

  // 3. PASS ID TO QUERY (AND SKIP IF NOT READY)
  const { data: rawAwardedJobs, isLoading: isProposalsLoading } =
    useGetAwardedJobsForFreelancerQuery(
      { freelancerId, status: "awarded_done" },
      { skip: !freelancerId },
    );

  const [updateProfile, { isLoading: updatingProfile }] =
    useUpdateFreelancerDetailsMutation();

  const [createPortfolio, { isLoading: creatingPortfolio }] =
    useCreateProtfolioMutation();

  const [deletePortfolio] = useDeletePortfolioMutation();

  const { data: portfolioDetails, isLoading: portfolioLoading } =
    useGetMyPortfolioQuery();

  //console.log("portfolioDetails", portfolioDetails);

  const SOCIAL_PLATFORMS = ["facebook", "linkedin", "github"] as const;
  type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

  // Centralized Profile State
  const [profile, setProfile] = useState({
    name: "Manas D.",
    title: "Full Stack Mobile & Web",
    portfolioUrl: "",
    location: "Kolkata, India",
    rate: "3500",
    exp: "15+ yrs",
    avatar: "https://via.placeholder.com/120",
    about:
      "I build high-quality mobile & web apps with a focus on React Native and Node.js. I have over 15 years of experience delivering scalable solutions for startups and enterprises.",
    status: "Available",
    verified: true,
    skills: ["React js", "Node js"],

    socials: [
      { platform: "linkedin", url: "" },
      { platform: "github", url: "" },
      { platform: "facebook", url: "" },
    ],

    services: [
      { serviceName: "Web Dev", title: "MERN", rate: 25, timeline: "2 weeks" },
    ],
  });

  // Project Form State
  const [projectForm, setProjectForm] = useState<ProjectFormType>({
    title: "",
    role: "",
    technologies: [],
    duration: "",
    category: "mobile",
    otherCategory: "",
    imageUrl: "https://via.placeholder.com/800x420",
  });

  // Form state for editing profile
  const [formData, setFormData] = useState(profile);

  const usedPlatforms = formData.socials.map((s) => s.platform);

  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (p) => !usedPlatforms.includes(p),
  );

  // Reset form data to current profile whenever modal opens
  useEffect(() => {
    if (open) {
      setFormData(profile);
    }
  }, [open, profile]);

  // Generic handler for nested array updates in formData
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()],
        });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Generic handler for nested array updates in formData
  const updateArrayItem = (
    arrayName: string,
    index: number,
    field: string,
    value: any,
  ) => {
    const updatedArray = (formData as any)[arrayName].map(
      (item: any, i: number) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      },
    );
    setFormData({ ...formData, [arrayName]: updatedArray });
  }; // Generic handler to remove an item from a nested array in formData

  const removeArrayItem = (arrayName: string, index: number) => {
    const updatedArray = (formData as any)[arrayName].filter(
      (_: any, i: number) => i !== index,
    );
    setFormData({ ...formData, [arrayName]: updatedArray });
  }; // Generic handler to add a new item to a nested array in formData

  // Generic handler to add a new item to a nested array in formData
  const addArrayItem = (arrayName: string, emptyItem: any) => {
    setFormData({
      ...formData,
      [arrayName]: [...(formData as any)[arrayName], emptyItem],
    });
  };

  const handleAddSocial = () => {
    if (availablePlatforms.length === 0) {
      toast.error("You can add only Facebook, LinkedIn and GitHub");
      return;
    }

    addArrayItem("socials", {
      platform: availablePlatforms[0], // auto-pick first free platform
      url: "",
    });
  };

  const handleSocialPlatformChange = (
    index: number,
    newPlatform: SocialPlatform,
  ) => {
    const alreadyUsed = formData.socials.some(
      (s, i) => s.platform === newPlatform && i !== index,
    );

    if (alreadyUsed) {
      toast.error(`${newPlatform} already added`);
      return;
    }

    updateArrayItem("socials", index, "platform", newPlatform);
  };

  // Handle Image Uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPortfolioFile(file);
      setProjectForm({ ...projectForm, imageUrl: URL.createObjectURL(file) });
    }
  };

  // Generic handler for nested array updates in projectForm
  const handleTechnologyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && technologyInput.trim()) {
      e.preventDefault();

      if (!projectForm.technologies.includes(technologyInput.trim())) {
        setProjectForm({
          ...projectForm,
          technologies: [...projectForm.technologies, technologyInput.trim()],
        });
      }
      setTechnologyInput("");
    }
  };

  const removeTechnology = (technology: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter((t) => t !== technology),
    });
  };

  useEffect(() => {
    if (data?.user) {
      setProfile({
        name: data.user.fullName ?? "",
        title: data.user.experienceLevel ?? "",
        portfolioUrl: data.user.portfolioUrl ?? "",
        location: data.user.address ?? "",
        rate: String(data.user.hourlyRate ?? ""),
        exp: String(data.user.totalExperience ?? ""),
        avatar: data.user.profileImage ?? "",
        about: data.user.about ?? "",
        status: data.user.status ?? "Available",
        verified: data.user.isAccountVerified ?? false,

        skills: data.user.skills ?? [],

        socials: data.user.socialLinks ?? [],

        services: data.user.services ?? [],
      });
    }
  }, [data]);

  // Handle Add Portfolio
  const handleAddPortfolio = async () => {
    const fd = new FormData();

    fd.append("title", projectForm.title);
    fd.append("role", projectForm.role);
    fd.append(
      "technologies",
      JSON.stringify(projectForm.technologies.map((s) => s)),
    );
    fd.append("category", projectForm.category);

    if (projectForm.category === "other") {
      fd.append("otherCategory", projectForm.otherCategory);
    }

    fd.append("duration", projectForm.duration);

    if (portfolioFile) {
      fd.append("image", portfolioFile);
    }

    try {
      const res = await createPortfolio(fd).unwrap();
      toast.success(res?.message || "Portfolio Created Successfully");
      setProjectModalOpen(false);
      setProjectForm({
        title: "",
        role: "",
        technologies: [],
        duration: "",
        category: "mobile",
        otherCategory: "",
        imageUrl: "https://via.placeholder.com/800x420",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Portfolio Create failed");
    }
  };

  const handleDeletePortfolio = async (id: number): Promise<void> => {
    if (confirm("Are you sure you want to delete this portfolio details?")) {
      try {
        const res = await deletePortfolio(id).unwrap();
        toast.success(res?.message || "Portfolio deleted successfully!");
      } catch (error: any) {
        console.log(error?.data?.message);
        toast.error(error?.data?.message || "Failed to delete portfolio");
      }
    }
  };

  const handleEditPortfolio = (project: ProjectFormType) => {
    setEditPortfolioData(project);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    const fd = new FormData();

    fd.append("fullName", formData.name);
    fd.append("address", formData.location);
    fd.append("portfolioUrl", formData.portfolioUrl);
    fd.append("hourlyRate", String(formData.rate));
    fd.append("totalExperience", String(formData.exp));
    fd.append("about", formData.about);

    fd.append("skills", JSON.stringify(formData.skills.map((s) => s)));

    fd.append("socialLinks", JSON.stringify(formData.socials));

    fd.append("services", JSON.stringify(formData.services));

    if (profileImageFile) {
      fd.append("profileImage", profileImageFile);
    }

    try {
      await updateProfile(fd).unwrap();
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // Handle Filter Cycle
  const cycleFilter = () => {
    const options = ["All", "mobile", "web", "other"];
    const nextIndex = (options.indexOf(filter) + 1) % options.length;
    setFilter(options[nextIndex]);
    setVisibleCount(6); // reset when filter changes
  };

  const filteredPortfolios =
    filter === "All"
      ? portfolioDetails || []
      : portfolioDetails?.filter((p: any) => p.category === filter) || [];

  const visiblePortfolios = filteredPortfolios.slice(0, visibleCount);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans relative p-6">
      {/* ========================================= */}
      {/* ENHANCED EDIT PROFILE MODAL */}
      {/* ========================================= */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center px-4 backdrop-blur-md transition-all duration-300">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] animate-fadeIn overflow-hidden">
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  Edit Profile
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your professional information
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 hover:rotate-90 group"
              >
                <X
                  size={22}
                  className="text-gray-600 group-hover:text-gray-900"
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 overflow-y-auto space-y-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* ============ BASIC INFO SECTION ============ */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Basic Information
                  </h3>
                </div>

                {/* Avatar Upload */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300">
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                    <div className="relative">
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white shadow-xl ring-2 ring-gray-100"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150")
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer">
                        <div className="text-center">
                          <Camera
                            size={24}
                            className="text-white mx-auto mb-1"
                          />
                          <span className="text-xs text-white font-medium">
                            Change
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Portfolio & Location */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Portfolio URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            portfolioUrl: e.target.value,
                          })
                        }
                        placeholder="https://yourportfolio.com"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      />
                      <svg
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="City, Country"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      />
                      <svg
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Rate & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Hourly Rate
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.rate}
                        onChange={(e) =>
                          setFormData({ ...formData, rate: e.target.value })
                        }
                        placeholder="$50/hr"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      />
                      <svg
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Experience
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.exp}
                        onChange={(e) =>
                          setFormData({ ...formData, exp: e.target.value })
                        }
                        placeholder="5+ years"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      />
                      <svg
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    About / Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.about}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                    placeholder="Tell us about yourself and your expertise..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    {formData.about.length} characters
                  </p>
                </div>
              </section>

              {/* ============ SKILLS SECTION ============ */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">Skills</h3>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl border border-blue-100">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 mb-4"
                  />

                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {formData.skills.length === 0 && (
                      <p className="text-sm text-gray-400 italic">
                        No skills added yet
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* ============ SOCIAL LINKS SECTION ============ */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Social Links
                    </h3>
                  </div>
                  <button
                    onClick={handleAddSocial}
                    disabled={availablePlatforms.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      availablePlatforms.length === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                    }`}
                  >
                    <Plus size={16} /> Add Social
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.socials.map((social, idx) => {
                    const dropdownOptions = SOCIAL_PLATFORMS.filter(
                      (p) =>
                        p === social.platform || !usedPlatforms.includes(p),
                    );

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-200 hover:shadow-md"
                      >
                        <select
                          value={social.platform}
                          onChange={(e) =>
                            handleSocialPlatformChange(
                              idx,
                              e.target.value as SocialPlatform,
                            )
                          }
                          className="px-4 py-3 border border-gray-200 rounded-xl text-sm capitalize font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gradient-to-r from-gray-50 to-white"
                        >
                          {dropdownOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>

                        <input
                          type="url"
                          placeholder="https://platform.com/yourprofile"
                          value={social.url}
                          onChange={(e) =>
                            updateArrayItem(
                              "socials",
                              idx,
                              "url",
                              e.target.value,
                            )
                          }
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />

                        <button
                          onClick={() => removeArrayItem("socials", idx)}
                          className="px-3 py-3 hover:bg-red-50 rounded-xl transition-all duration-200 group self-start sm:self-auto"
                        >
                          <Trash2
                            size={18}
                            className="text-red-400 group-hover:text-red-600"
                          />
                        </button>
                      </div>
                    );
                  })}
                  {formData.socials.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No social links added yet</p>
                    </div>
                  )}
                </div>
              </section>

              {/* ============ SERVICES SECTION ============ */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Services
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      addArrayItem("services", {
                        serviceName: "",
                        title: "",
                        rate: 0,
                        timeline: "",
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <Plus size={16} /> Add Service
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-gradient-to-br from-orange-50/50 to-white rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Service Name
                          </label>
                          <input
                            placeholder="Web Development"
                            value={service.serviceName}
                            onChange={(e) =>
                              updateArrayItem(
                                "services",
                                idx,
                                "serviceName",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Title
                          </label>
                          <input
                            placeholder="Full Stack Development"
                            value={service.title}
                            onChange={(e) =>
                              updateArrayItem(
                                "services",
                                idx,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Rate ($)
                          </label>
                          <input
                            type="number"
                            placeholder="50"
                            value={service.rate}
                            onChange={(e) =>
                              updateArrayItem(
                                "services",
                                idx,
                                "rate",
                                Number(e.target.value),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Timeline
                          </label>
                          <div className="flex gap-2">
                            <input
                              placeholder="2-3 weeks"
                              value={service.timeline}
                              onChange={(e) =>
                                updateArrayItem(
                                  "services",
                                  idx,
                                  "timeline",
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => removeArrayItem("services", idx)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {formData.services.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No services added yet</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="p-6 lg:p-8 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={updatingProfile}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all duration-200 hover:scale-105"
              >
                {updatingProfile ? "saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* ADD PROJECT MODAL */}
      {/* ========================================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Project
              </h2>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Project Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    <img
                      src={projectForm.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/800x420")
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm w-full">
                      <Upload size={16} />
                      Upload Cover
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProjectImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={projectForm.role}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none bg-white"
                  >
                    <option value="mobile">Mobile</option>
                    <option value="web">Web</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {projectForm.category === "other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specify Category
                  </label>
                  <input
                    type="text"
                    value={projectForm.otherCategory}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        otherCategory: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter category"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <div>
                  <input
                    value={technologyInput}
                    onChange={(e) => setTechnologyInput(e.target.value)}
                    onKeyDown={handleTechnologyKeyDown}
                    placeholder="Type a technology and press Enter..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none bg-white"
                  />

                  <div className="flex flex-wrap gap-2 mt-3">
                    {projectForm.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(tech)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {projectForm.technologies.length === 0 && (
                      <p className="text-sm text-gray-400 italic">
                        No technologies added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={projectForm.duration}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, duration: e.target.value })
                  }
                  placeholder="type in days or months"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E9F6E] outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setProjectModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPortfolio}
                className="px-5 py-2.5 rounded-lg bg-[#0E9F6E] text-white font-medium hover:bg-[#09875D] shadow-lg shadow-green-200 transition-all"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MAIN PROFILE PAGE */}
      {/* ========================================= */}

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          {/* IDENTITY CARD */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <img
                  src={data?.user?.profileImage}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150")
                  }
                />
                <span
                  className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${profile.status === "Available" ? "bg-green-500" : "bg-amber-500"}`}
                  title={profile.status}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-gray-900 truncate">
                    {data?.user?.fullName}
                  </h1>
                  {data?.user?.isAccountVerified && (
                    <CheckCircle
                      size={16}
                      className="text-[#0E9F6E] shrink-0"
                      fill="#E1FCEF"
                    />
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-3 truncate">
                  {data?.user?.about}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MapPin size={14} />
                  {data?.user?.address}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                {data?.user?.countryName === "India" ? "₹" : "$"}
                {data?.user?.hourlyRate} / hour
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                {data?.user?.experienceLevel}
              </span>
            </div>

            <div className="mt-5 border-t pt-4 text-sm text-gray-600 space-y-3">
              <div className="flex justify-between items-center">
                <span>Total earnings</span>
                <span className="font-semibold text-gray-900">
                  {data?.user?.countryName === "India" ? "₹" : "$"}
                  {walletDetails?.walletDetails?.totalIncome}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total jobs</span>
                <span className="font-semibold text-gray-900">
                  {rawAwardedJobs?.totalJobs}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Availability</span>
                <span
                  className={`font-semibold ${data?.user?.status === "available" ? "text-green-600" : "text-amber-600"}`}
                >
                  {data?.user?.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Public View
              </button>

              <button
                onClick={() => setOpen(true)}
                className="flex-1 bg-[#0E9F6E] text-white py-2.5 rounded-lg font-medium hover:bg-[#09875D] shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                Edit Profile
              </button>
            </div>
          </section>

          {/* ABOUT */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900">About</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {data?.user?.about}
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-100">
                Strength: Performance
              </span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                Top 1% Devs
              </span>
            </div>
          </section>

          {/* SKILLS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Skills & Expertise</h3>

            <div className="flex flex-wrap gap-3">
              {data?.user?.skills?.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 text-sm font-medium rounded-full
                   bg-emerald-50 text-emerald-700
                   border border-emerald-200
                   hover:bg-emerald-100 hover:scale-105
                   transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </aside>

        {/* MAIN CONTENT */}
        <section className="lg:col-span-8 space-y-6">
          {/* FULL PORTFOLIO */}
          <section
            id="portfolio"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Portfolio — Case Studies
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={cycleFilter}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 min-w-[120px] justify-center"
                >
                  <Filter size={14} />
                  Filter: {filter}
                </button>
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                >
                  <Plus size={14} />
                  Add Project
                </button>
              </div>
            </div>

            {filteredPortfolios?.length === 0 ? (
              <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                No projects found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                {visiblePortfolios?.map((project: any) => (
                  <article
                    key={project.id}
                    className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all bg-white"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden h-48 relative">
                      <img
                        src={project.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Portfolio"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x420")
                        }
                      />

                      {/* CATEGORY BADGE */}
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {project.category}
                      </span>

                      {/* HOVER OVERLAY */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => handleEditPortfolio(project)}
                          className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-blue-50 transition-all"
                        >
                          <Edit2 size={20} />
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDeletePortfolio(project.id)}
                          className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        Role: {project.role} • Duration: {project.duration}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies?.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {visibleCount < filteredPortfolios.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
                >
                  Load More
                </button>
              </div>
            )}
          </section>

          {/* WORK HISTORY */}
          <section
            id="history"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Work History & Feedback
              </h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                21 Reviews
              </div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  title: "E-commerce Store Design",
                  client: "SoulWear Fashion",
                  price: "$1,200",
                  duration: "3 months",
                  rating: "5.0",
                  text: "Excellent work — delivered on time.",
                },
                {
                  title: "Mobile UI Redesign",
                  client: "Retailer A",
                  price: "$800",
                  duration: "1 month",
                  rating: "4.9",
                  text: "Delivered clean UI and reusable components.",
                },
              ].map((job) => (
                <li
                  key={job.title}
                  className="border border-gray-200 p-5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Client: {job.client} • {job.price}
                      </div>
                      <div className="text-sm mt-3 text-gray-600 italic">
                        "{job.text}"
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 min-w-[100px]">
                      <div className="font-semibold text-gray-900">
                        {job.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-700 bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                        <Star
                          size={12}
                          className="fill-yellow-400 text-yellow-400 mr-1"
                        />{" "}
                        {job.rating}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* SERVICES */}
          <section
            id="services"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Services Offered
              </h2>
              <button className="text-sm text-[#0E9F6E] font-semibold hover:underline">
                Manage Services
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.user?.services?.map((srv: any) => (
                <div
                  key={srv.title}
                  className="p-5 border border-gray-200 rounded-xl hover:border-[#0E9F6E] transition-colors group cursor-pointer bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-[#0E9F6E] transition-colors">
                        {srv.title}
                      </h4>
                      <div className="text-sm text-gray-500 mt-2">
                        {srv.serviceName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Est:${srv.rate} Time: {srv.timeline}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EARNINGS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Earnings & Analytics
              </h2>
              <div className="text-sm text-gray-500 space-x-2">
                <span>Export:</span>
                <button className="text-[#0E9F6E] hover:underline font-medium">
                  PDF
                </button>
                <span>•</span>
                <button className="text-[#0E9F6E] hover:underline font-medium">
                  CSV
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Monthly Earnings (6mo)
                </div>
                <div className="h-40 flex items-end gap-2 mt-4">
                  {[40, 56, 32, 48, 64].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all hover:opacity-80 ${i % 2 === 1 || i === 4 ? "bg-[#0E9F6E]" : "bg-gray-300"}`}
                      style={{ height: `${h}%` }}
                      title={`Month ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-xl bg-white">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Top Clients
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-gray-700">
                      SoulWear Fashion
                    </span>
                    <span className="font-bold text-gray-900 bg-green-50 px-2 py-0.5 rounded text-green-700">
                      $2,400
                    </span>
                  </li>
                  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-gray-700">
                      Retailer A
                    </span>
                    <span className="font-bold text-gray-900 bg-green-50 px-2 py-0.5 rounded text-green-700">
                      $800
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SOCIAL & CONTACT */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Social & Contact
            </h2>
            <div className="flex gap-3 flex-wrap">
              {profile.socials.map((s, idx) => (
                <a
                  key={idx}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:text-[#0E9F6E] hover:border-[#0E9F6E] transition-all text-sm font-medium"
                  href={s.url}
                >
                  {s.platform}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full sm:w-auto bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg shadow-gray-200">
                Invite to Job
              </button>
            </div>
          </section>
        </section>
      </main>

      {editModalOpen && editPortfolioData && (
        <PortfolioEditComponent
          data={editPortfolioData}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}
