"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  MapPin,
  ShieldCheck,
  Trophy,
  Globe,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Calendar,
  Star,
  Award,
  Link as LinkIcon,
  ExternalLink,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useGetAllFreelancersQuery } from "@/app/redux/api/freelancerAuth.api";
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/app/_components/Footer";
import { getAvatarColor } from "../page";

// Fallback data configuration
const FALLBACK_DATA = {
  about:
    "Passionate professional dedicated to delivering exceptional results. With a strong commitment to quality and client satisfaction, I bring creativity and expertise to every project. Let's work together to bring your vision to life!",
  hourlyRate: "Negotiable",
  totalExperience: "Available upon request",
  services: [
    {
      serviceName: "Consultation",
      title: "Initial Project Discussion",
      rate: 0,
      timeline: "Flexible",
    },
  ],
  socialLinks: [],
};

// Helper function to get display data with fallback
const getDisplayData = (freelancer: any) => {
  return {
    about: freelancer.about || FALLBACK_DATA.about,
    hourlyRate: freelancer.hourlyRate
      ? `$${freelancer.hourlyRate}/hr`
      : FALLBACK_DATA.hourlyRate,
    totalExperience:
      freelancer.totalExperience || FALLBACK_DATA.totalExperience,
    services:
      freelancer.services?.length > 0
        ? freelancer.services
        : FALLBACK_DATA.services,
    socialLinks: freelancer.socialLinks || FALLBACK_DATA.socialLinks,
    skills: freelancer.skills?.length > 0 ? freelancer.skills : [],
  };
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    available: {
      label: "Available Now",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle2,
    },
    busy: {
      label: "Busy",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Clock,
    },
    unavailable: {
      label: "Unavailable",
      className: "bg-gray-50 text-gray-700 border-gray-200",
      icon: Clock,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.className} font-medium text-sm`}
    >
      <Icon size={16} />
      {config.label}
    </div>
  );
};

export default function FreelancerDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { data: freelancers, isLoading } = useGetAllFreelancersQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const { data: authData, isLoading: authLoading } = useGetMeQuery();

  // 🔐 Protect Page
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!authLoading && !authData?.user && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("Please login to view freelancer details");
      router.replace("/login");
    }
  }, [authData, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!authData?.user) return null;
  if (!freelancers) return null;

  const freelancer = freelancers.find(
    (f: any) => f.fullName.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Sparkles className="text-amber-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Freelancer Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The profile you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/freelancers")}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Browse Freelancers
          </button>
        </div>
      </div>
    );
  }

  const displayData = getDisplayData(freelancer);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        {/* Hero Section with Golden Accent */}
        <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 pt-32 pb-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                  {freelancer.profileImage ? (
                    <img
                      src={freelancer.profileImage}
                      alt={freelancer.fullName}
                      className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl"
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-3xl flex items-center justify-center text-white font-bold text-5xl border-4 border-white shadow-2xl ${getAvatarColor(
                        freelancer.fullName,
                      )}`}
                    >
                      {freelancer.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Online Indicator */}
                  {freelancer.status === "available" && (
                    <div className="absolute bottom-3 right-3 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-white">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                    {freelancer.fullName}
                  </h1>
                  {freelancer.isEmailVerified && (
                    <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <ShieldCheck size={16} />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span className="font-medium text-white">
                      {freelancer.countryName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    <span className="font-medium capitalize text-white">
                      {freelancer.experienceLevel} Level
                    </span>
                  </div>

                  {freelancer.profileCompletion && (
                    <div className="flex items-center gap-2">
                      <Trophy size={18} />
                      <span className="font-medium" text-white>
                        {freelancer.profileCompletion}% Profile Complete
                      </span>
                    </div>
                  )}
                </div>

                <StatusBadge status={freelancer.status || "available"} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {displayData.about}
                </p>
              </div>

              {/* Skills Section */}
              {displayData.skills.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                      <Award className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Skills & Expertise
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {displayData.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Section */}
              {displayData.services.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                      <Briefcase className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Services Offered
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayData.services.map((service: any, index: number) => (
                      <div
                        key={index}
                        className="p-6 rounded-xl border-2 border-amber-100 hover:border-amber-300 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-lg transition-all duration-200 group"
                      >
                        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-amber-600 transition-colors">
                          {service.serviceName || service.title}
                        </h3>
                        {service.title &&
                          service.serviceName !== service.title && (
                            <p className="text-gray-600 text-sm mb-3">
                              {service.title}
                            </p>
                          )}
                        <div className="flex items-center justify-between text-sm">
                          {service.rate > 0 ? (
                            <span className="text-amber-600 font-bold">
                              ${service.rate}/hr
                            </span>
                          ) : (
                            <span className="text-gray-500 font-medium">
                              Rate negotiable
                            </span>
                          )}
                          {service.timeline && (
                            <span className="text-gray-500">
                              {service.timeline}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact & Info */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 hover:shadow-2xl transition-all duration-300 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Sparkles className="text-amber-500" size={20} />
                  Quick Info
                </h3>

                <div className="space-y-5">
                  {/* Hourly Rate */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Hourly Rate
                      </p>
                      <p className="text-gray-800 font-bold text-lg">
                        {displayData.hourlyRate}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Experience
                      </p>
                      <p className="text-gray-800 font-bold">
                        {displayData.totalExperience}
                      </p>
                    </div>
                  </div>

                  {/* Portfolio Link
                  {freelancer.portfolioUrl && (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="text-white" size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                          Portfolio
                        </p>
                        <a
                          href={freelancer.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-2 transition-colors"
                        >
                          Visit Portfolio
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
